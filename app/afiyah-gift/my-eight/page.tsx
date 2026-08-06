import Link from "next/link";
import { ArrowLeft, CheckCircle2, CircleDashed, Infinity as InfinityIcon, Send, Users } from "lucide-react";
import { AFIYAH_PILLARS } from "@/lib/afiyah-academy-types";

const demo = [
  { name: "Amina", progress: 100, week: 8, status: "multiplied" },
  { name: "Maryam", progress: 76, week: 6, status: "learning" },
  { name: "Sara", progress: 62, week: 5, status: "learning" },
  { name: "Huda", progress: 50, week: 4, status: "learning" },
  { name: "Layla", progress: 38, week: 3, status: "learning" },
  { name: "Noor", progress: 25, week: 2, status: "joined" },
  { name: "Fatima", progress: 12, week: 1, status: "joined" },
  { name: "Invite", progress: 0, week: 1, status: "invited" },
];

export default function MyEightPage() {
  return <main className="min-h-screen bg-[#061B26] px-4 py-8 text-[#F8F3E9]">
    <div className="mx-auto max-w-5xl">
      <Link href="/afiyah-gift" className="inline-flex items-center gap-2 text-sm text-[#D6B46D]"><ArrowLeft className="h-4 w-4"/>Academy</Link>
      <section className="mt-5 overflow-hidden rounded-[32px] border border-[#AD8633]/30 bg-[radial-gradient(circle_at_top,#0c4a3a,#003629_45%,#061B26_100%)] p-6 lg:p-9">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div><div className="text-xs font-bold uppercase tracking-[.25em] text-[#D6B46D]">∞ × ∞ · Multiplication</div><h1 className="mt-3 font-serif text-5xl">My Eight</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">Eight actual women. Eight different pillars. Their progress is theirs; this screen shows only the learning status they choose to share with your Circle.</p></div>
          <div className="rounded-3xl border border-[#D6B46D]/25 bg-black/20 px-5 py-4"><div className="flex items-center gap-2 text-[#D6B46D]"><Users className="h-5 w-5"/><strong>7 / 8 joined</strong></div><div className="mt-2 text-xs text-white/45">1 chain multiplied · 5 actively learning</div></div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {AFIYAH_PILLARS.map((pillar,i)=>{const member=demo[i]; return <article key={pillar.key} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.04] p-5">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full border border-[#AD8633]/15"/>
          <div className="flex items-start justify-between"><div className="font-serif text-3xl text-[#D6B46D]">{pillar.ar}</div>{member.status==='multiplied'?<CheckCircle2 className="h-5 w-5 text-[#D6B46D]"/>:<CircleDashed className="h-5 w-5 text-white/25"/>}</div>
          <div className="mt-1 font-serif text-xl">{pillar.label} <span className="text-xs text-white/40">· {pillar.english}</span></div>
          <div className="mt-5 flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#AD8633]/30 bg-black/20 font-serif text-xl">{member.progress}%</div>
          <div className="mt-4 flex items-end justify-between"><div><div className="font-semibold">{member.name}</div><div className="text-xs text-white/40">Week {member.week} · {member.status}</div></div><span className="text-xs text-[#D6B46D]">{i+1}/8</span></div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#D6B46D]" style={{width:`${member.progress}%`}}/></div>
          {member.status==='invited' && <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#AD8633] px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#061B26]"><Send className="h-4 w-4"/>Invite Sister</button>}
        </article>})}
      </section>

      <section className="mt-6 rounded-3xl border border-[#5D234F]/60 bg-[#5D234F]/20 p-6"><div className="flex items-center gap-3"><InfinityIcon className="h-7 w-7 text-[#D6B46D]"/><div><div className="font-serif text-2xl">When all eight carry it forward</div><p className="mt-1 text-sm text-white/55">The chain becomes ∞ × ∞. Rewards they choose to GIVE flow into the shared Infinity Well; KEEP stays on their own dashboard.</p></div></div></section>
    </div>
  </main>;
}
