import Link from "next/link";
import { BookHeart, Gift, Languages, Sparkles, Users } from "lucide-react";
import { AcademyCloudResume } from "@/components/afiyah/academy-cloud-resume";
import { AcademyModuleGrid } from "@/components/afiyah/academy-module-grid";
import { GIFT_PROGRAM_RULES } from "@/data/afiyah-gift-modules";
import { ARABIC_DOUBLE_REWARD_COPY } from "@/data/afiyah-language-tracks";

export default function AfiyahGiftPage() {
  return <main className="min-h-screen bg-[#061B26] px-4 py-8 text-[#F8F3E9] lg:px-8"><div className="mx-auto max-w-5xl">
    <section className="rounded-[32px] border border-[#AD8633]/30 bg-[#003629]/45 p-6 shadow-2xl lg:p-8"><div className="flex items-center gap-3 text-[#D6B46D]"><Gift className="h-6 w-6"/><span className="text-xs font-bold uppercase tracking-[.24em]">A gift from Afiyah</span></div><div className="mt-4"><h1 className="font-serif text-4xl lg:text-6xl">The Afiyah Eight</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-white/65 lg:text-base">Eight pillars. Eight modules. Eight weeks. Learn from the source lessons, pass each mastery quiz at 90% or higher, choose KEEP or GIVE, and carry the learning to My Eight.</p></div><AcademyCloudResume/></section>

    <section className="mt-6 rounded-3xl border border-[#D6B46D]/30 bg-gradient-to-r from-[#003629] to-[#0B3540] p-5 lg:p-6"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="flex gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#AD8633]/20 text-[#D6B46D]"><Languages/></div><div><div className="flex items-center gap-2"><h2 className="font-serif text-2xl">العربية · Arabic</h2><Sparkles className="h-4 w-4 text-[#D6B46D]"/></div><p className="mt-1 text-sm text-white/60">{ARABIC_DOUBLE_REWARD_COPY.subtitle}</p></div></div><div className="flex gap-2 text-sm font-bold"><span className="rounded-full border border-[#D6B46D]/35 px-4 py-2 text-[#D6B46D]">{ARABIC_DOUBLE_REWARD_COPY.infinity}</span><span className="rounded-full border border-[#D6B46D]/35 px-4 py-2 text-[#D6B46D]">{ARABIC_DOUBLE_REWARD_COPY.amanah}</span></div></div></section>

    <AcademyModuleGrid/>

    <section className="mt-6 grid gap-4 md:grid-cols-3"><Link href="/afiyah-gift/account" className="rounded-3xl border border-[#5D234F]/50 bg-[#5D234F]/15 p-6"><div className="text-xs font-bold uppercase tracking-[.2em] text-[#D6B46D]">Dashboard + Infinity Well</div><div className="mt-2 font-serif text-4xl">Your saved ∞</div><p className="mt-3 text-xs leading-5 text-white/45">See KEEP points, GIVE contributions, current week/day and streak from your Supabase account.</p></Link><Link href="/afiyah-gift/my-eight" className="rounded-3xl border border-[#AD8633]/30 bg-[#003629]/45 p-6"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#D6B46D]"><Users className="h-4 w-4"/>∞ × ∞</div><div className="mt-2 font-serif text-4xl">My Eight</div><p className="mt-3 text-sm leading-6 text-white/50">Eight women, eight pillars, week numbers, progress rings and multiplication status.</p></Link><Link href="/afiyah-gift/masnun" className="rounded-3xl border border-[#D6B46D]/30 bg-[#0B3540]/70 p-6"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#D6B46D]"><BookHeart className="h-4 w-4"/>Masnun Library</div><div className="mt-2 font-serif text-4xl">Duʿā & Adhkār</div><p className="mt-3 text-sm leading-6 text-white/50">Browse source-based daily collections in English, Arabic and Bangla.</p></Link></section>

    <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-6 text-white/35">Pass mark {GIFT_PROGRAM_RULES.passPercent}%. Signed-in progress, lesson completion, quiz attempts, best score, reward disposition, streak and My Eight are persisted in the active Afiyah Supabase project.</p>
  </div></main>;
}
