"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, BookHeart, ChevronRight, Languages, MoonStar, Sparkles } from "lucide-react";

const FEATURED = [
  "morning-and-evening","sleep","debt","anxiety","travel","hajj-and-umrah","quranic-dua","40-rabbana-duas"
];

type Category = {name:string;url:string;meta:string};
type Subcategory = {id:number;title:string;category:string;"dua-ids":number[]};

export default function MasnunLibraryPage(){
  const [lang,setLang]=useState("en");
  const [categories,setCategories]=useState<Category[]>([]);
  const [subcategories,setSubcategories]=useState<Subcategory[]>([]);
  const [selected,setSelected]=useState("morning-and-evening");
  const [busy,setBusy]=useState(true);

  useEffect(()=>{(async()=>{setBusy(true);try{const r=await fetch(`/api/integrations/masnun?lang=${lang}`);const d=await r.json();setCategories(d.categories||[]);setSubcategories(d.subcategories||[])}finally{setBusy(false)}})()},[lang]);

  const featured = useMemo(()=>FEATURED.map(slug=>categories.find(c=>c.url===slug)).filter(Boolean) as Category[],[categories]);
  const selectedCategory = categories.find(c=>c.url===selected);
  const selectedSubs = subcategories.filter(s=>s.category===selected);
  const duaCount = selectedSubs.reduce((n,s)=>n+s["dua-ids"].length,0);

  return <main className="min-h-screen bg-[#061B26] px-4 py-8 text-[#F8F3E9]"><div className="mx-auto max-w-5xl">
    <Link href="/afiyah-gift" className="inline-flex items-center gap-2 text-sm text-[#D6B46D]"><ArrowLeft className="h-4 w-4"/>Academy</Link>

    <section className="mt-5 rounded-[32px] border border-[#AD8633]/30 bg-[radial-gradient(circle_at_top_left,#0c4a3a,#003629_45%,#061B26_100%)] p-6 lg:p-9"><div className="flex items-center gap-3 text-[#D6B46D]"><BookHeart className="h-6 w-6"/><span className="text-xs font-bold uppercase tracking-[.22em]">Masnun Library · أذكار وأدعية</span></div><h1 className="mt-4 font-serif text-5xl lg:text-6xl">Daily remembrance, from source.</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-white/60">Browse the Masnun Dua repository inside Afiyah: 1,001+ duʿā and adhkār organised across 44 categories and 118 subcategories. This library is source content, not Noor-generated text.</p><div className="mt-5 flex flex-wrap gap-2"><button onClick={()=>setLang("en")} className={`rounded-full px-4 py-2 text-xs font-bold ${lang==="en"?"bg-[#AD8633] text-[#061B26]":"border border-white/10 text-white/55"}`}>English</button><button onClick={()=>setLang("ar")} className={`rounded-full px-4 py-2 text-xs font-bold ${lang==="ar"?"bg-[#AD8633] text-[#061B26]":"border border-white/10 text-white/55"}`}>العربية</button><button onClick={()=>setLang("bn")} className={`rounded-full px-4 py-2 text-xs font-bold ${lang==="bn"?"bg-[#AD8633] text-[#061B26]":"border border-white/10 text-white/55"}`}>বাংলা</button></div></section>

    <section className="mt-6"><div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#D6B46D]"><Sparkles className="h-4 w-4"/>Featured daily collections</div><div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">{busy?Array.from({length:8}).map((_,i)=><div key={i} className="h-28 animate-pulse rounded-3xl bg-white/[.04]"/>):featured.map((c)=><button key={c.url} onClick={()=>setSelected(c.url)} className={`rounded-3xl border p-5 text-left transition ${selected===c.url?"border-[#D6B46D]/50 bg-[#AD8633]/10":"border-white/10 bg-white/[.035] hover:border-[#AD8633]/35"}`}><div className="font-serif text-2xl">{c.name}</div><div className="mt-2 text-xs text-white/40">{c.meta}</div></button>)}</div></section>

    <section className="mt-6 rounded-[28px] border border-white/10 bg-white/[.035] p-5 lg:p-7"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><div className="text-xs font-bold uppercase tracking-[.18em] text-[#AD8633]">Selected collection</div><h2 className="mt-2 font-serif text-4xl">{selectedCategory?.name||"Loading…"}</h2></div><div className="rounded-2xl border border-[#D6B46D]/20 bg-black/15 px-4 py-3 text-sm text-[#D6B46D]">{selectedSubs.length} sections · {duaCount} linked duʿā</div></div><div className="mt-5 space-y-3">{selectedSubs.map((s)=><article key={s.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-black/15 p-4"><div><div className="font-medium">{s.title}</div><div className="mt-1 text-xs text-white/35">{s["dua-ids"].length} duʿā · IDs {s["dua-ids"].slice(0,5).join(", ")}{s["dua-ids"].length>5?"…":""}</div></div><ChevronRight className="h-4 w-4 text-[#D6B46D]"/></article>)}</div></section>

    <section className="mt-6 grid gap-4 md:grid-cols-2"><div className="rounded-3xl border border-[#5D234F]/50 bg-[#5D234F]/15 p-6"><MoonStar className="h-6 w-6 text-[#D6B46D]"/><h3 className="mt-3 font-serif text-2xl">Daily anchor</h3><p className="mt-2 text-sm leading-6 text-white/50">Use Morning & Evening, Sleep and travel collections as optional remembrance pathways. Completion should never be scored as spiritual rank.</p></div><div className="rounded-3xl border border-[#AD8633]/30 bg-[#003629]/45 p-6"><Languages className="h-6 w-6 text-[#D6B46D]"/><h3 className="mt-3 font-serif text-2xl">53-language source</h3><p className="mt-2 text-sm leading-6 text-white/50">Afiyah currently exposes English, Arabic and Bangla first. The source repository includes 53 languages for future expansion.</p></div></section>

    <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-6 text-white/35">Source: afiyahinfinity/masnun-dua · maintained from Qurʾan and Hadith source material. Afiyah should preserve text integrity and surface corrections through the source repository rather than rewriting supplications.</p>
  </div></main>;
}
