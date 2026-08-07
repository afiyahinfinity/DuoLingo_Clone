"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Cloud, LogIn } from "lucide-react";
import { markLessonComplete, readSession } from "@/lib/afiyah-supabase-rest";

export function LessonCompleteButton({moduleNo,lessonNo,nextHref,label}:{moduleNo:number;lessonNo:number;nextHref:string;label:string}){
  const router=useRouter(); const [busy,setBusy]=useState(false); const [error,setError]=useState("");
  async function complete(){ if(!readSession()){ router.push("/afiyah-gift/account"); return; } setBusy(true); setError(""); try{ await markLessonComplete(moduleNo,lessonNo); router.push(nextHref); }catch(e:any){ setError(e.message); }finally{ setBusy(false); } }
  return <><button type="button" onClick={complete} disabled={busy} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#AD8633] px-5 py-4 text-xs font-bold uppercase tracking-[.18em] text-[#061B26] transition hover:bg-[#D6B46D] disabled:opacity-50">{readSession()?<Cloud className="h-4 w-4"/>:<LogIn className="h-4 w-4"/>}{busy?"Saving…":label}<ArrowRight className="h-4 w-4"/></button>{error&&<p className="mt-3 text-center text-xs text-[#E8A2AA]">{error}</p>}</>;
}
