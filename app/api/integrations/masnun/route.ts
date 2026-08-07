import { NextRequest, NextResponse } from "next/server";

const BASE = "https://raw.githubusercontent.com/afiyahinfinity/masnun-dua/main";
const ALLOWED_LANGS = new Set(["en","ar","bn"]);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = ALLOWED_LANGS.has(searchParams.get("lang") || "") ? (searchParams.get("lang") as string) : "en";
  const category = searchParams.get("category") || "";

  try {
    const [categoriesRes, subcategoriesRes] = await Promise.all([
      fetch(`${BASE}/categories/${lang}.json`, { next: { revalidate: 3600 } }),
      fetch(`${BASE}/sub-categories/${lang}.json`, { next: { revalidate: 3600 } }),
    ]);

    if (!categoriesRes.ok || !subcategoriesRes.ok) {
      return NextResponse.json({ error: "Masnun source unavailable" }, { status: 502 });
    }

    const categories = await categoriesRes.json();
    const subcategories = await subcategoriesRes.json();
    const filtered = category ? subcategories.filter((item: any) => item.category === category) : subcategories;

    return NextResponse.json({
      source: "afiyahinfinity/masnun-dua",
      language: lang,
      categories,
      subcategories: filtered,
      category,
    });
  } catch {
    return NextResponse.json({ error: "Unable to load Masnun library" }, { status: 500 });
  }
}
