"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, HeartHandshake, LogIn } from "lucide-react";
import { claimMyEightInvite, readSession } from "@/lib/afiyah-supabase-rest";

export default function JoinMyEightPage(){
  const params=useSearchParams(); const owner=params.get("owner")||""; const slot=Number(params.get("slot")||0); const [message,setMessage]=useState(""); const [claimed,setClaimed]=useState(false); const [busy,setBusy]=useState(false); const signedIn=!!readSession();
  async function claim(){if(!signedIn){location.href=`/afiyah-gift/account`;return}setBusy(true);setMessage("");try{const result=await claimMyEightInvite(owner,slot);setClaimed(true);setMessage(`You joined My Eight in slot ${result.slot}. Your Academy progress can now update that Circle progress ring.`)}catch(e:any){setMessage(e.message)}finally{setBusy(false)}}
  const valid=owner&&slot>=1&&slot<=8;
  return <main className="min-h-screen bg-[#061B26] px-4 py-10 text-[#F8F3E9]"><section className="mx-auto max-w-lg rounded-[32px] border border-[#AD8633]/30 bg-[#003629]/55 p-7 text-center"><HeartHandshake className="mx-auto h-9 w-9 text-[#D6B46D]"/><div className="mt-4 text-xs font-bold uppercase tracking-[.22em] text-[#AD8633]">∞ × ∞ · My Eight invitation</div><h1 className="mt-3 font-serif text-4xl">Carry one pillar forward.</h1><p className="mt-3 text-sm leading-7 text-white/55">Accepting links your Afiyah Academy progress to this Circle slot. It does not share your private reflections, quiz answers, journal entries or wellbeing data.</p>{!valid?<p className="mt-5 rounded-2xl bg-black/20 p-4 text-sm text-[#E8A2AA]">This invitation link is incomplete.</p>:claimed?<div className="mt-6"><CheckCircle2 className="mx-auto h-10 w-10 text-[#D6B46D]"/><p className="mt-3 text-sm text-white/65">{message}</p><Link href="/afiyah-gift" className="mt-5 block rounded-2xl bg-[#AD8633] px-5 py-4 text-xs font-bold uppercase tracking-[.18em] text-[#061B26]">Open my Academy</Link></div>:<button onClick={claim} disabled={busy} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#AD8633] px-5 py-4 text-xs font-bold uppercase tracking-[.18em] text-[#061B26] disabled:opacity-50">{signedIn?<HeartHandshake className="h-4 w-4"/>:<LogIn className="h-4 w-4"/>}{busy?"Joining…":signedIn?"Accept & join My Eight":"Sign in to accept"}</button>}{message&&!claimed&&<p className="mt-4 text-xs text-white/55">{message}</p>}</section></main>;
}
