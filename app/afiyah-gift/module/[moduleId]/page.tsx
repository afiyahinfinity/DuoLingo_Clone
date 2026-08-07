import Link from "next/link";
import { ArrowLeft, BookOpen, Check, LockKeyhole, Trophy } from "lucide-react";
import { AFIYAH_GIFT_MODULES } from "@/data/afiyah-gift-modules";

const lessonNames = ["Learn", "Apply", "Reflect", "Prepare for Mastery"];

export default function ModuleJourneyPage({ params }: { params: { moduleId: string } }) {
  const id = Number(params.moduleId);
  const module = AFIYAH_GIFT_MODULES.find((m)=>m.id===id) ?? AFIYAH_GIFT_MODULES[0];
  const completed = id===1 ? 4 : id===2 ? 2 : 0;
  return <main className="min-h-screen bg-[#061B26] px-4 py-8 text-[#F8F3E9]"><div className="mx-auto max-w-3xl">
    <Link href="/afiyah-gift" className="inline-flex items-center gap-2 text-sm text-[#D6B46D]"><ArrowLeft className="h-4 w-4"/>The Afiyah Eight</Link>
    <section className="mt-5 rounded-[32px] border border-[#AD8633]/30 bg-[#003629]/55 p-6 lg:p-8"><div className="text-xs font-bold uppercase tracking-[.22em] text-[#AD8633]">Week {module.id} · Module {module.id}</div><div className="mt-3 flex items-baseline gap-3"><span className="font-serif text-5xl text-[#D6B46D]">{module.pillarAr}</span><h1 className="font-serif text-4xl">{module.pillar}</h1><span className="text-white/40">{module.english}</span></div><p className="mt-4 text-sm leading-7 text-white/60">{module.promise}</p><div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-[#D6B46D]" style={{width:`${completed/4*100}%`}}/></div><div className="mt-2 text-right text-xs text-[#D6B46D]">{completed}/4 lessons complete</div></section>

    <section className="mt-6 space-y-3">{lessonNames.map((name,i)=>{const done=i<completed; const active=i===completed; const locked=i>completed; return <Link key={name} href={locked?'#':`/afiyah-gift/module/${module.id}/lesson/${i+1}`} aria-disabled={locked} className={`flex items-center gap-4 rounded-3xl border p-5 transition ${active?'border-[#D6B46D]/50 bg-[#AD8633]/10':done?'border-[#AD8633]/25 bg-white/[.035]':'border-white/5 bg-white/[.02] opacity-45'}`}><div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${done?'bg-[#AD8633] text-[#061B26]':active?'border border-[#D6B46D]/50 text-[#D6B46D]':'bg-white/5'}`}>{done?<Check/>:locked?<LockKeyhole/>:<BookOpen/>}</div><div className="flex-1"><div className="text-[10px] font-bold uppercase tracking-[.2em] text-[#AD8633]">Lesson {i+1}</div><div className="mt-1 font-serif text-2xl">{name}</div><div className="mt-1 text-xs text-white/45">{done?'Completed':active?'Continue from here':'Complete the previous lesson first'}</div></div></Link>})}</section>

    <section className={`mt-6 rounded-3xl border p-6 ${completed===4?'border-[#D6B46D]/50 bg-[#AD8633]/10':'border-white/10 bg-white/[.025]'}`}><div className="flex items-center gap-3"><Trophy className="text-[#D6B46D]"/><div><div className="font-serif text-2xl">Mastery Quiz · 10 questions</div><p className="mt-1 text-sm text-white/50">Pass at 9/10 (90%). Your best score is retained across attempts.</p></div></div><Link href={completed===4?`/afiyah-gift/module/${module.id}/quiz`:'#'} className={`mt-5 block rounded-2xl px-5 py-4 text-center text-xs font-bold uppercase tracking-[.18em] ${completed===4?'bg-[#AD8633] text-[#061B26]':'bg-white/5 text-white/20'}`}>{completed===4?'Take mastery quiz':'Finish lessons to unlock'}</Link></section>
  </div></main>;
}
