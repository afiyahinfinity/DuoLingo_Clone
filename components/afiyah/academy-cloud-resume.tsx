"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cloud, Flame, LogIn } from "lucide-react";
import { getDashboardState, readSession } from "@/lib/afiyah-supabase-rest";

export function AcademyCloudResume(){
  const [state,setState]=useState<any>(null); const [signedIn,setSignedIn]=useState(false);
  useEffect(()=>{const s=readSession();setSignedIn(!!s);if(s){getDashboardState().then(setState).catch(()=>{})}},[]);
  if(!signedIn) return <Link href="/afiyah-gift/account" className="mt-6 flex items-center justify-between rounded-3xl border border-[#AD8633]/30 bg-[#003629]/40 p-5 transition hover:border-[#D6B46D]/60"><div><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#D6B46D]"><LogIn className="h-4 w-4"/>Sync your journey</div><p className="mt-2 text-sm text-white/55">Sign in once. Continue the same lesson, score, streak and rewards on another device.</p></div><span className="text-[#D6B46D]">→</span></Link>;
  const e=state?.enrollment; return <Link href={state?.resume?.href||"/afiyah-gift/module/1/lesson/1"} className="mt-6 block rounded-3xl border border-[#D6B46D]/30 bg-gradient-to-r from-[#003629] to-[#0B3540] p-5 transition hover:-translate-y-0.5"><div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#D6B46D]"><Cloud className="h-4 w-4"/>Continue where you stopped</div><h2 className="mt-2 font-serif text-3xl">Week {state?.resume?.week||1} · Lesson {state?.resume?.lessonNumber||1}</h2><p className="mt-2 text-sm text-white/55">Day {e?.current_day||1}/56 · Wallet {state?.kept||0}∞ · Well {state?.given||0}∞</p></div><div className="rounded-2xl border border-[#D6B46D]/25 bg-black/15 px-4 py-3 text-center"><Flame className="mx-auto h-5 w-5 text-[#D6B46D]"/><strong className="mt-1 block font-serif text-2xl">{e?.streak_days||0}</strong><span className="text-[10px] text-white/40">day streak</span></div></div></Link>;
}
