import Link from "next/link";
import { Languages, Sparkles } from "lucide-react";

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[#061B26] px-4 py-10 text-[#F8F3E9]">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-[#AD8633]/30 bg-[#003629]/45 p-7 lg:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#AD8633]/15 text-[#D6B46D]"><Languages/></div>
        <div className="mt-5 text-xs font-bold uppercase tracking-[.22em] text-[#D6B46D]">Afiyah Language Learning</div>
        <h1 className="mt-2 font-serif text-5xl">العربية · Arabic</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">The original clone course route has been retired from the Afiyah deployment. Language learning now lives inside the Supabase-backed Academy, where Arabic is the featured ×2 Infinity Points track.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/afiyah-gift" className="inline-flex items-center gap-2 rounded-2xl bg-[#AD8633] px-5 py-3 text-sm font-bold text-[#061B26]"><Sparkles className="h-4 w-4"/>Open Afiyah Academy</Link>
          <Link href="/afiyah-gift/account" className="rounded-2xl border border-[#D6B46D]/30 px-5 py-3 text-sm text-[#D6B46D]">Sign in / Register</Link>
        </div>
      </div>
    </main>
  );
}
