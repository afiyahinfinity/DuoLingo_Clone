"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { KeyRound, LockKeyhole } from "lucide-react";
import { AFIYAH_GIFT_MODULES } from "@/data/afiyah-gift-modules";
import { getAttemptStats, getLessonProgress, readSession } from "@/lib/afiyah-supabase-rest";
import { getAcademyAccess } from "@/lib/afiyah-qa-access";

type ModuleState={completedLessons:number;passed:boolean;best:number|null};
export function AcademyModuleGrid(){
  const [states,setStates]=useState<Record<number,ModuleState>>({});
  const [signedIn,setSignedIn]=useState(false);
  const [qaBypass,setQaBypass]=useState(false);

  useEffect(()=>{const s=readSession();setSignedIn(!!s);if(!s)return;(async()=>{const access=await getAcademyAccess();setQaBypass(access.qaBypass);const out:Record<number,ModuleState>={};for(const m of AFIYAH_GIFT_MODULES){try{const [lessons,stats]=await Promise.all([getLessonProgress(m.id),getAttemptStats(m.id)]);out[m.id]={completedLessons:lessons.filter((l:any)=>l.completed).length,passed:stats.everPassed,best:stats.best};}catch{out[m.id]={completedLessons:0,passed:false,best:null}}}setStates(out)})()},[]);

  return <section className="mt-6">
    {qaBypass&&<div className="mb-4 flex items-center gap-3 rounded-2xl border border-[#D6B46D]/35 bg-[#AD8633]/10 p-4 text-sm text-[#D6B46D]"><KeyRound className="h-5 w-5"/><div><strong>QA Access Mode</strong><div className="mt-1 text-xs text-white/50">All eight modules are navigable for testing. Scores, rewards and private data still follow normal Supabase rules.</div></div></div>}
    <div className="grid gap-4 md:grid-cols-2">{AFIYAH_GIFT_MODULES.map((module)=>{const state=states[module.id]||{completedLessons:0,passed:false,best:null};const previousPassed=module.id===1||states[module.id-1]?.passed;const locked=signedIn&&!qaBypass&&!previousPassed;const pct=signedIn?Math.min(100,state.completedLessons*20+(state.passed?20:0)):0;return <article key={module.id} className="rounded-3xl border border-white/10 bg-white/[.035] p-5 transition hover:-translate-y-0.5 hover:border-[#AD8633]/40"><div className="flex items-start justify-between gap-4"><div><div className="text-xs font-bold uppercase tracking-[.2em] text-[#AD8633]">Week {module.id} · Module {String(module.id).padStart(2,"0")}</div><div className="mt-2 flex items-baseline gap-2"><span className="font-serif text-3xl text-[#D6B46D]">{module.pillarAr}</span><span className="font-serif text-xl">{module.pillar}</span><span className="text-xs text-white/45">{module.english}</span></div></div>{locked?<LockKeyhole className="h-5 w-5 text-white/25"/>:<span className="rounded-full bg-[#AD8633]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#D6B46D]">{qaBypass?"QA open":state.passed?"Passed":signedIn?"Active":"Preview"}</span>}</div><h3 className="mt-4 font-serif text-2xl">{module.title}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-white/55">{module.promise}</p><div className="mt-5 flex items-center justify-between text-xs text-white/45"><span>{state.completedLessons}/4 lessons</span><span>Best {state.best===null?"—":`${state.best}/10`}</span><span>90% pass</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#D6B46D] transition-all" style={{width:`${pct}%`}}/></div><div className="mt-2 text-right text-xs font-bold text-[#D6B46D]">{pct}%</div><Link href={locked?"#":`/afiyah-gift/module/${module.id}`} aria-disabled={locked} className={`mt-4 block rounded-2xl px-4 py-3 text-center text-xs font-bold uppercase tracking-[.16em] ${locked?"cursor-not-allowed bg-white/5 text-white/20":"bg-[#AD8633] text-[#061B26] hover:bg-[#D6B46D]"}`}>{locked?"Pass previous module":qaBypass?"Open in QA mode":state.passed?"Review module":"Open lessons"}</Link></article>})}</div>
  </section>;
}
