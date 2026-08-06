import Link from "next/link";
import { Gift, Languages, LockKeyhole, Sparkles } from "lucide-react";

import { AFIYAH_GIFT_MODULES, GIFT_PROGRAM_RULES } from "@/data/afiyah-gift-modules";
import { ARABIC_DOUBLE_REWARD_COPY } from "@/data/afiyah-language-tracks";

const progress = [100, 72, 0, 0, 0, 0, 0, 0];

export default function AfiyahGiftPage() {
  return (
    <main className="min-h-screen bg-[#061B26] text-[#F8F3E9] px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-3xl border border-[#AD8633]/30 bg-[#003629]/45 p-6 lg:p-8 shadow-2xl">
          <div className="flex items-center gap-3 text-[#D6B46D]">
            <Gift className="h-6 w-6" />
            <span className="text-xs font-bold uppercase tracking-[0.24em]">A gift from Afiyah</span>
          </div>

          <div className="mt-4 grid gap-6 lg:grid-cols-[1.5fr_.75fr] lg:items-end">
            <div>
              <h1 className="font-serif text-4xl lg:text-6xl">The Afiyah Eight</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#F8F3E9]/65 lg:text-base">
                Eight pillars. Eight modules. Eight weeks. Complete the lessons, pass each final quiz at 90% or higher, and carry the learning forward.
              </p>
            </div>

            <div className="rounded-2xl border border-[#AD8633]/25 bg-black/15 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-[#D6B46D]">Journey progress</div>
              <div className="mt-2 flex items-end justify-between gap-4">
                <strong className="font-serif text-4xl">22%</strong>
                <span className="text-xs text-[#F8F3E9]/50">Week 2 · Day 10</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[22%] rounded-full bg-[#D6B46D]" />
              </div>
              <div className="mt-3 text-xs text-[#F8F3E9]/55">
                Pass mark {GIFT_PROGRAM_RULES.passPercent}% · +{GIFT_PROGRAM_RULES.rewardPerPassedModule}∞ per module
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-[#D6B46D]/30 bg-gradient-to-r from-[#003629] to-[#0B3540] p-5 lg:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#AD8633]/20 text-[#D6B46D]">
                <Languages />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-2xl">العربية · Arabic</h2>
                  <Sparkles className="h-4 w-4 text-[#D6B46D]" />
                </div>
                <p className="mt-1 text-sm text-[#F8F3E9]/60">{ARABIC_DOUBLE_REWARD_COPY.subtitle}</p>
              </div>
            </div>
            <div className="flex gap-2 text-sm font-bold">
              <span className="rounded-full border border-[#D6B46D]/35 px-4 py-2 text-[#D6B46D]">{ARABIC_DOUBLE_REWARD_COPY.infinity}</span>
              <span className="rounded-full border border-[#D6B46D]/35 px-4 py-2 text-[#D6B46D]">{ARABIC_DOUBLE_REWARD_COPY.amanah}</span>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-[#F8F3E9]/40">{ARABIC_DOUBLE_REWARD_COPY.disclaimer}</p>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {AFIYAH_GIFT_MODULES.map((module, index) => {
            const pct = progress[index] ?? 0;
            const locked = index > 1;
            return (
              <article key={module.id} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-0.5 hover:border-[#AD8633]/40">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#AD8633]">Module {String(module.id).padStart(2, "0")}</div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-serif text-3xl text-[#D6B46D]">{module.pillarAr}</span>
                      <span className="font-serif text-xl">{module.pillar}</span>
                      <span className="text-xs text-[#F8F3E9]/45">{module.english}</span>
                    </div>
                  </div>
                  {locked ? <LockKeyhole className="h-5 w-5 text-[#F8F3E9]/25" /> : <span className="rounded-full bg-[#AD8633]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#D6B46D]">{pct === 100 ? "Passed" : "Active"}</span>}
                </div>

                <h3 className="mt-4 font-serif text-2xl">{module.title}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-[#F8F3E9]/55">{module.promise}</p>

                <div className="mt-5 flex items-center justify-between text-xs text-[#F8F3E9]/45">
                  <span>{module.lessonCount} lessons</span>
                  <span>{module.quizQuestions} quiz questions</span>
                  <span>{module.passPercent}% to pass</span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[#D6B46D] transition-all" style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-2 text-right text-xs font-bold text-[#D6B46D]">{pct}%</div>

                <Link
                  href={locked ? "#" : "/learn"}
                  aria-disabled={locked}
                  className={`mt-4 block rounded-2xl px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] transition ${
                    locked
                      ? "cursor-not-allowed bg-white/5 text-white/20"
                      : "bg-[#AD8633] text-[#061B26] hover:bg-[#D6B46D]"
                  }`}
                >
                  {locked ? "Complete previous module" : pct === 100 ? "Review module" : "Continue learning"}
                </Link>
              </article>
            );
          })}
        </section>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-6 text-[#F8F3E9]/35">
          Educational product progression only. Module content that touches faith, finance, health or wellbeing requires the relevant Afiyah governance and expert review before public release.
        </p>
      </div>
    </main>
  );
}
