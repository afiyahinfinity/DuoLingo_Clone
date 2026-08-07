"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, CircleDashed, Copy, Infinity as InfinityIcon, Mail, Send, Users } from "lucide-react";
import { AFIYAH_PILLARS } from "@/lib/afiyah-academy-types";
import { getDashboardState, readSession, saveMyEightSlot } from "@/lib/afiyah-supabase-rest";

export default function MyEightPage(){
  const [rows,setRows]=useState<any[]>([]);
  const [email,setEmail]=useState<Record<number,string>>({});
  const [busy,setBusy]=useState<number|null>(null);
  const [message,setMessage]=useState("");
  const [signedIn,setSignedIn]=useState(false);
  const [lastLink,setLastLink]=useState("");

  async function load(){
    const s=readSession(); setSignedIn(!!s); if(!s)return;
    try{const state=await getDashboardState();setRows(state.myEight||[])}catch(e:any){setMessage(e.message)}
  }

  useEffect(()=>{load()},[]);
  const bySlot=useMemo(()=>Object.fromEntries(rows.map(r=>[r.slot_number,r])),[rows]);
  const joined=rows.filter(r=>r.status!=="invited").length;
  const multiplied=rows.filter(r=>r.status==="multiplied").length;
  const openSlots=AFIYAH_PILLARS.filter((_,i)=>!bySlot[i+1]).length;

  async function invite(slot:number,pillar:string){
    const s=readSession();
    if(!s){location.href="/afiyah-gift/account";return}
    const value=(email[slot]||"").trim().toLowerCase();
    if(!value || !/^\S+@\S+\.\S+$/.test(value)){setMessage("Enter a valid Sister email address first.");return}
    setBusy(slot);setMessage("");
    try{
      await saveMyEightSlot(slot,pillar,value);
      const link=`${location.origin}/afiyah-gift/my-eight/join?owner=${s.user.id}&slot=${slot}`;
      setLastLink(link);

      const mailRes=await fetch("/api/my-eight/send-invite",{
        method:"POST",
        headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.access_token}`},
        body:JSON.stringify({to:value,slot,pillar,joinUrl:link})
      });
      const mail=await mailRes.json().catch(()=>({}));

      if(mailRes.ok){
        setMessage(`Invitation emailed to ${value} from hello@afiyahverse.com. The private claim link is also available below.`);
      }else{
        try{await navigator.clipboard.writeText(link);setMessage(`Invite saved for ${value}. Email delivery is not active yet, so the private claim link was copied for you.`)}
        catch{setMessage(`Invite saved for ${value}. Email delivery is not active yet; copy the private claim link below.`)}
      }
      await load();
    }catch(e:any){setMessage(e.message)}finally{setBusy(null)}
  }

  async function copyLink(){if(!lastLink)return;await navigator.clipboard.writeText(lastLink);setMessage("Private Sister join link copied.")}

  return <main className="min-h-screen bg-[#061B26] px-4 py-8 text-[#F8F3E9]"><div className="mx-auto max-w-5xl">
    <Link href="/afiyah-gift" className="inline-flex items-center gap-2 text-sm text-[#D6B46D]"><ArrowLeft className="h-4 w-4"/>Academy</Link>

    <section className="mt-5 overflow-hidden rounded-[32px] border border-[#AD8633]/30 bg-[radial-gradient(circle_at_top,#0c4a3a,#003629_45%,#061B26_100%)] p-6 lg:p-9">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><div className="text-xs font-bold uppercase tracking-[.25em] text-[#D6B46D]">∞ × ∞ · Multiplication</div><h1 className="mt-3 font-serif text-5xl">My Eight</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">Invite eight real women by email. Each Sister receives her own private claim link from <strong className="text-white/75">hello@afiyahverse.com</strong>, joins with her own Afiyah account, and only her agreed learning status appears here.</p></div><div className="rounded-3xl border border-[#D6B46D]/25 bg-black/20 px-5 py-4"><div className="flex items-center gap-2 text-[#D6B46D]"><Users className="h-5 w-5"/><strong>{rows.length} / 8 invited</strong></div><div className="mt-2 text-xs text-white/45">{joined} joined · {multiplied} multiplied · {openSlots} open</div></div></div>
    </section>

    {!signedIn&&<Link href="/afiyah-gift/account" className="mt-5 block rounded-2xl border border-[#D6B46D]/30 bg-[#AD8633]/10 p-4 text-center text-sm text-[#D6B46D]">Sign in to invite your eight Sisters</Link>}

    <section className="mt-5 rounded-[28px] border border-[#D6B46D]/30 bg-[#003629]/55 p-5 lg:p-6">
      <div className="flex gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#AD8633]/15 text-[#D6B46D]"><Mail className="h-6 w-6"/></div><div><div className="text-xs font-bold uppercase tracking-[.2em] text-[#D6B46D]">Step 1 · Enter her email</div><h2 className="mt-1 font-serif text-3xl">Invite a Sister</h2><p className="mt-2 max-w-3xl text-sm leading-7 text-white/55">Choose an open pillar below, enter the Sister's email address, then tap <strong className="text-white/75">Email Sister Invite</strong>. Afiyah saves the invitation first, then sends her private claim link. If mail delivery is unavailable, the link remains available for Copy/WhatsApp sharing.</p></div></div>
    </section>

    <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{AFIYAH_PILLARS.map((pillar,i)=>{
      const slot=i+1;const member=bySlot[slot];const progress=member?.progress_percent??0;const status=member?.status??"empty";
      return <article key={pillar.key} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.04] p-5"><div className="absolute -right-6 -top-6 h-24 w-24 rounded-full border border-[#AD8633]/15"/><div className="flex items-start justify-between"><div className="font-serif text-3xl text-[#D6B46D]">{pillar.ar}</div>{status==="multiplied"?<CheckCircle2 className="h-5 w-5 text-[#D6B46D]"/>:<CircleDashed className="h-5 w-5 text-white/25"/>}</div><div className="mt-1 font-serif text-xl">{pillar.label} <span className="text-xs text-white/40">· {pillar.english}</span></div><div className="mt-5 flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#AD8633]/30 bg-black/20 font-serif text-xl">{progress}%</div><div className="mt-4 flex items-end justify-between"><div><div className="max-w-[150px] truncate font-semibold">{member?.invite_email||"Open Sister slot"}</div><div className="text-xs text-white/40">Week {member?.current_week??1} · {status}</div></div><span className="text-xs text-[#D6B46D]">{slot}/8</span></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#D6B46D]" style={{width:`${progress}%`}}/></div>{!member&&<div className="mt-4"><label className="mb-2 block text-[10px] font-bold uppercase tracking-[.16em] text-[#D6B46D]">Sister's email address</label><div className="relative"><Mail className="absolute left-3 top-3 h-4 w-4 text-white/30"/><input type="email" inputMode="email" autoComplete="email" value={email[slot]||""} onChange={e=>setEmail(c=>({...c,[slot]:e.target.value}))} placeholder="sister@example.com" className="w-full rounded-xl border border-white/10 bg-black/20 py-2.5 pl-10 pr-3 text-xs outline-none focus:border-[#AD8633]"/></div><button disabled={busy===slot||!(email[slot]||"").trim()} onClick={()=>invite(slot,pillar.key)} className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#AD8633] px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#061B26] disabled:opacity-40"><Send className="h-4 w-4"/>{busy===slot?"Sending…":"Email Sister Invite"}</button></div>}</article>
    })}</section>

    {lastLink&&<section className="mt-5 rounded-2xl border border-[#D6B46D]/25 bg-[#003629]/50 p-4"><div className="text-xs font-bold uppercase tracking-[.16em] text-[#D6B46D]">Private Sister join link</div><p className="mt-2 text-xs leading-5 text-white/45">Fallback sharing remains available even after email delivery. Send this only to the Sister whose email you entered.</p><div className="mt-2 break-all rounded-xl bg-black/20 p-3 text-xs text-white/65">{lastLink}</div><button onClick={copyLink} className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[#D6B46D]/30 px-3 py-2 text-xs text-[#D6B46D]"><Copy className="h-4 w-4"/>Copy private link</button></section>}

    {message&&<p className="mt-5 rounded-2xl border border-white/10 bg-black/15 p-4 text-center text-xs text-white/65">{message}</p>}

    <section className="mt-6 rounded-3xl border border-[#5D234F]/60 bg-[#5D234F]/20 p-6"><div className="flex items-center gap-3"><InfinityIcon className="h-7 w-7 text-[#D6B46D]"/><div><div className="font-serif text-2xl">When all eight carry it forward</div><p className="mt-1 text-sm text-white/55">The chain becomes ∞ × ∞. Rewards they choose to GIVE flow into the Infinity Well; KEEP remains on each woman’s own dashboard.</p></div></div></section>
  </div></main>;
}
