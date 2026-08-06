const EXCHANGE_API_BASE = "https://api.exchangeratesapi.io/v1";

const CURRENCY_CODE = /^[A-Z]{3}$/;

function apiKey() {
  const key = process.env.EXCHANGERATES_API_KEY;
  if (!key) {
    throw new Error("EXCHANGERATES_API_KEY is not configured");
  }
  return key;
}

function cleanCode(value: string) {
  const code = value.trim().toUpperCase();
  if (!CURRENCY_CODE.test(code)) {
    throw new Error(`Invalid currency code: ${value}`);
  }
  return code;
}

export type ExchangeSnapshot = {
  provider: "exchangeratesapi.io";
  sourceBase: "EUR";
  base: string;
  date: string;
  timestamp?: number;
  rates: Record<string, number>;
};

export async function getLatestRates(
  requestedBase = "EUR",
  requestedSymbols: string[] = ["USD", "AED", "BDT", "GBP", "SAR"],
): Promise<ExchangeSnapshot> {
  const base = cleanCode(requestedBase);
  const symbols = Array.from(new Set(requestedSymbols.map(cleanCode)));

  // ExchangeratesAPI defaults to EUR and some plans do not allow changing base.
  // We therefore fetch EUR quotes once and normalize server-side when another
  // base is requested. This keeps the integration compatible with lower plans.
  const upstreamSymbols = Array.from(new Set([...symbols, ...(base === "EUR" ? [] : [base])]))
    .filter((code) => code !== "EUR");

  const url = new URL(`${EXCHANGE_API_BASE}/latest`);
  url.searchParams.set("access_key", apiKey());
  if (upstreamSymbols.length) {
    url.searchParams.set("symbols", upstreamSymbols.join(","));
  }

  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Exchange provider HTTP ${response.status}`);
  }

  const payload = await response.json();
  if (!payload?.success || !payload?.rates) {
    throw new Error(payload?.error?.info || "Exchange provider returned an invalid response");
  }

  const eurRates: Record<string, number> = { EUR: 1, ...payload.rates };
  const baseRate = eurRates[base];
  if (!baseRate) {
    throw new Error(`Exchange provider did not return base currency ${base}`);
  }

  const rates: Record<string, number> = {};
  for (const symbol of symbols) {
    const rate = eurRates[symbol];
    if (!rate) continue;
    rates[symbol] = rate / baseRate;
  }
  rates[base] = 1;

  return {
    provider: "exchangeratesapi.io",
    sourceBase: "EUR",
    base,
    date: payload.date,
    timestamp: payload.timestamp,
    rates,
  };
}

export async function convertCurrency(amount: number, from: string, to: string) {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("Amount must be a non-negative number");
  }

  const source = cleanCode(from);
  const target = cleanCode(to);
  const snapshot = await getLatestRates(source, [target]);
  const rate = snapshot.rates[target];
  if (!rate) throw new Error(`No exchange rate available for ${source}/${target}`);

  return {
    ...snapshot,
    from: source,
    to: target,
    amount,
    rate,
    result: amount * rate,
  };
}
