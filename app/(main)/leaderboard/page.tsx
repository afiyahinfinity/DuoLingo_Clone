import Link from "next/link";

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-[#061B26] px-4 py-10 text-[#F8F3E9]">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-[#AD8633]/30 bg-[#003629]/45 p-8">
        <div className="text-xs font-bold uppercase tracking-[.22em] text-[#D6B46D]">Afiyah Academy</div>
        <h1 className="mt-3 font-serif text-5xl">Progress over ranking.</h1>
        <p className="mt-4 text-sm leading-7 text-white/60">The legacy Duolingo leaderboard is retired in the Afiyah build. Your real learning progress, streak, Infinity Points and My Eight live in the Sisters Academy dashboard.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/afiyah-gift" className="rounded-2xl bg-[#AD8633] px-5 py-3 text-sm font-bold text-[#061B26]">Open Academy</Link>
          <Link href="/afiyah-gift/account" className="rounded-2xl border border-[#D6B46D]/30 px-5 py-3 text-sm font-bold text-[#D6B46D]">My Dashboard</Link>
        </div>
      </div>
    </main>
  );
}
