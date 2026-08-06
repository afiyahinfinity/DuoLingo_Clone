import { NextRequest, NextResponse } from "next/server";
import { convertCurrency, getLatestRates } from "@/lib/integrations/exchangerates";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const from = (searchParams.get("from") || searchParams.get("base") || "EUR").toUpperCase();
    const to = searchParams.get("to")?.toUpperCase();
    const amountParam = searchParams.get("amount");

    if (to && amountParam !== null) {
      const amount = Number(amountParam);
      const result = await convertCurrency(amount, from, to);
      return NextResponse.json(result, {
        headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=300" },
      });
    }

    const symbols = (searchParams.get("symbols") || "USD,AED,BDT,GBP,SAR")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .slice(0, 20);

    const snapshot = await getLatestRates(from, symbols);
    return NextResponse.json(snapshot, {
      headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=300" },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "exchange_rate_unavailable",
        message: error instanceof Error ? error.message : "Unable to load exchange rates",
      },
      { status: 502 },
    );
  }
}
