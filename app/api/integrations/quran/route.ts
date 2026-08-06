import { NextRequest, NextResponse } from "next/server";

const REFERENCE = /^(?:[1-9]|[1-9][0-9]|1[01][0-4]):(?:[1-9]|[1-9][0-9]{1,2})$/;
const ALLOWED_EDITIONS = new Set(["quran-uthmani", "en.sahih"]);

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("ref") || "2:261";
  const edition = request.nextUrl.searchParams.get("edition") || "quran-uthmani";

  if (!REFERENCE.test(reference)) {
    return NextResponse.json(
      { error: "invalid_reference", message: "Use a Surah:Ayah reference such as 2:261" },
      { status: 400 },
    );
  }

  if (!ALLOWED_EDITIONS.has(edition)) {
    return NextResponse.json(
      { error: "edition_not_allowed", allowed: Array.from(ALLOWED_EDITIONS) },
      { status: 400 },
    );
  }

  const url = `https://api.alquran.cloud/v1/ayah/${encodeURIComponent(reference)}/${encodeURIComponent(edition)}`;

  try {
    const response = await fetch(url, { next: { revalidate: 86400 } });
    if (!response.ok) {
      return NextResponse.json({ error: "quran_source_unavailable" }, { status: 502 });
    }

    const payload = await response.json();
    if (payload?.code !== 200 || !payload?.data) {
      return NextResponse.json({ error: "quran_source_invalid_response" }, { status: 502 });
    }

    const ayah = payload.data;
    return NextResponse.json(
      {
        provider: "alquran.cloud",
        reference,
        edition,
        text: ayah.text,
        surah: {
          number: ayah.surah?.number,
          name: ayah.surah?.name,
          englishName: ayah.surah?.englishName,
          englishNameTranslation: ayah.surah?.englishNameTranslation,
        },
        numberInSurah: ayah.numberInSurah,
        juz: ayah.juz,
        page: ayah.page,
        note: "External source retrieval only. Religious interpretation and curriculum use remain subject to Afiyah Shariah review.",
      },
      { headers: { "Cache-Control": "s-maxage=86400, stale-while-revalidate=3600" } },
    );
  } catch {
    return NextResponse.json({ error: "quran_source_unavailable" }, { status: 502 });
  }
}
