import { NextRequest, NextResponse } from "next/server";

const COUNTRY_CODE = /^[A-Za-z]{2,3}$/;

export async function GET(
  _request: NextRequest,
  { params }: { params: { code: string } },
) {
  const code = params.code.trim();
  if (!COUNTRY_CODE.test(code)) {
    return NextResponse.json({ error: "invalid_country_code" }, { status: 400 });
  }

  const fields = [
    "name",
    "cca2",
    "cca3",
    "currencies",
    "capital",
    "region",
    "subregion",
    "flag",
    "flags",
    "languages",
    "timezones",
  ].join(",");

  const url = `https://restcountries.com/v3.1/alpha/${encodeURIComponent(code)}?fields=${fields}`;

  try {
    const response = await fetch(url, { next: { revalidate: 86400 } });
    if (!response.ok) {
      return NextResponse.json({ error: "country_not_found" }, { status: response.status });
    }

    const payload = await response.json();
    const country = Array.isArray(payload) ? payload[0] : payload;

    return NextResponse.json(
      { provider: "restcountries.com", country },
      { headers: { "Cache-Control": "s-maxage=86400, stale-while-revalidate=3600" } },
    );
  } catch {
    return NextResponse.json({ error: "country_service_unavailable" }, { status: 502 });
  }
}
