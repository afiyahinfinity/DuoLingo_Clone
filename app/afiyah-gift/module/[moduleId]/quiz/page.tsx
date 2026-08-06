"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Gift, HeartHandshake, RotateCcw, Trophy, XCircle } from "lucide-react";

import { AFIYAH_GIFT_MODULES } from "@/data/afiyah-gift-modules";
import { AFIYAH_SOURCE_CURRICULUM, type AfiyahCurriculumWeek } from "@/data/afiyah-eight-source-curriculum";

export default function QuizPage({ params }: { params: { moduleId: string } }) {
  const moduleNumber = Math.min(8, Math.max(1, Number(params.moduleId))) as AfiyahCurriculumWeek;
  const module = AFIYAH_GIFT_MODULES.find((item) => item.id === moduleNumber) ?? AFIYAH_GIFT_MODULES[0];
  const curriculum = AFIYAH_SOURCE_CURRICULUM[moduleNumber];
  const questions = curriculum.questions;
  const storageKey = `afiyah-eight:quiz:${moduleNumber}`;

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [latest, setLatest] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const [rewardChoice, setRewardChoice] = useState<"kept" | "given" | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (saved) {
        setLatest(typeof saved.latest === "number" ? saved.latest : null);
        setBest(typeof saved.best === "number" ? saved.best : null);
        setRewardChoice(saved.rewardChoice || null);
      }
    } catch {}
  }, [storageKey]);

  const score = useMemo(
    () => questions.reduce((total, question) => total + (answers[question.num] === question.correct ? 1 : 0), 0),
    [answers, questions],
  );

  const passed = submitted && score >= 9;
  const allAnswered = Object.keys(answers).length === questions.length;

  function submitQuiz() {
    if (!allAnswered) return;
    const nextBest = Math.max(best ?? 0, score);
    setLatest(score);
    setBest(nextBest);
    setSubmitted(true);
    localStorage.setItem(storageKey, JSON.stringify({ latest: score, best: nextBest, rewardChoice }));
  }

  function retry() {
    setAnswers({});
    setSubmitted(false);
  }

  function chooseReward(choice: "kept" | "given") {
    setRewardChoice(choice);
    localStorage.setItem(
      storageKey,
      JSON.stringify({ latest: latest ?? score, best: Math.max(best ?? 0, score), rewardChoice: choice }),
    );
  }

  return (
    <main className="min-h-screen bg-[#061B26] px-4 py-8 text-[#F8F3E9]">
      <div className="mx-auto max-w-2xl">
        <Link href={`/afiyah-gift/module/${module.id}`} className="inline-flex items-center gap-2 text-sm text-[#D6B46D]">
          <ArrowLeft className="h-4 w-4" /> Module {module.id}
        </Link>

        <section className="mt-6 rounded-[32px] border border-[#AD8633]/30 bg-[#003629]/55 p-7 text-center">
          <Trophy className="mx-auto h-9 w-9 text-[#D6B46D]" />
          <div className="mt-4 text-xs font-bold uppercase tracking-[.22em] text-[#AD8633]">
            Mastery · {module.pillarAr} {module.pillar}
          </div>
          <h1 className="mt-3 font-serif text-4xl">Pass at 90%</h1>
          <p className="mt-3 text-sm leading-7 text-white/55">
            10 source assessment questions · 9 correct required. Your latest attempt and best score are tracked separately.
          </p>
        </section>

        <section className="mt-5 rounded-3xl border border-white/10 bg-white/[.035] p-5">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-black/20 p-4"><div className="text-xs text-white/40">Latest</div><div className="mt-1 font-serif text-3xl">{latest ?? "—"}</div></div>
            <div className="rounded-2xl bg-black/20 p-4"><div className="text-xs text-white/40">Best</div><div className="mt-1 font-serif text-3xl">{best ?? "—"}</div></div>
            <div className="rounded-2xl bg-black/20 p-4"><div className="text-xs text-white/40">Pass</div><div className="mt-1 font-serif text-3xl text-[#D6B46D]">9/10</div></div>
          </div>
        </section>

        <section className="mt-5 space-y-4">
          {questions.map((question) => (
            <article key={question.num} className="rounded-3xl border border-white/10 bg-white/[.035] p-5">
              <div className="text-[10px] font-bold uppercase tracking-[.2em] text-[#AD8633]">Question {question.num}/10</div>
              <h2 className="mt-2 font-serif text-xl leading-8">{question.text}</h2>
              <div className="mt-4 space-y-2">
                {Object.entries(question.options).map(([key, value]) => {
                  const selected = answers[question.num] === key;
                  const correct = submitted && key === question.correct;
                  const wrongSelected = submitted && selected && key !== question.correct;
                  return (
                    <button
                      key={key}
                      type="button"
                      disabled={submitted}
                      onClick={() => setAnswers((current) => ({ ...current, [question.num]: key }))}
                      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm leading-6 transition ${
                        correct
                          ? "border-[#D6B46D] bg-[#AD8633]/20"
                          : wrongSelected
                            ? "border-[#B66F78] bg-[#B66F78]/15"
                            : selected
                              ? "border-[#D6B46D]/70 bg-[#AD8633]/10"
                              : "border-white/10 bg-black/10 hover:border-[#AD8633]/45"
                      }`}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-xs font-bold">{key}</span>
                      <span>{value}</span>
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <div className={`mt-4 flex gap-2 rounded-2xl p-4 text-xs leading-6 ${answers[question.num] === question.correct ? "bg-[#003629]/70 text-[#F8F3E9]/70" : "bg-[#5D234F]/25 text-[#F8F3E9]/70"}`}>
                  {answers[question.num] === question.correct ? <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#D6B46D]" /> : <XCircle className="mt-1 h-4 w-4 shrink-0 text-[#B66F78]" />}
                  <span>{question.explanation}</span>
                </div>
              )}
            </article>
          ))}
        </section>

        {!submitted ? (
          <button
            type="button"
            disabled={!allAnswered}
            onClick={submitQuiz}
            className="mt-5 w-full rounded-2xl bg-[#AD8633] px-5 py-4 text-xs font-bold uppercase tracking-[.18em] text-[#061B26] disabled:cursor-not-allowed disabled:opacity-30"
          >
            Submit mastery quiz
          </button>
        ) : (
          <section className={`mt-5 rounded-3xl border p-6 text-center ${passed ? "border-[#D6B46D]/45 bg-[#003629]/65" : "border-[#B66F78]/50 bg-[#5D234F]/20"}`}>
            <div className="font-serif text-6xl text-[#D6B46D]">{score}/10</div>
            <h2 className="mt-3 font-serif text-3xl">{passed ? "Passed · Mastery unlocked" : "Review and retake"}</h2>
            <p className="mt-2 text-sm leading-7 text-white/55">
              {passed ? "You reached the Afiyah 90% mastery gate." : "Your best score remains. Review the lesson and try again when ready."}
            </p>
            {!passed && (
              <button type="button" onClick={retry} className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-[#D6B46D]/35 px-5 py-3 text-xs font-bold uppercase tracking-[.16em] text-[#D6B46D]">
                <RotateCcw className="h-4 w-4" /> Retry
              </button>
            )}
          </section>
        )}

        {passed && (
          <section className="mt-5 rounded-3xl border border-[#5D234F]/60 bg-[#5D234F]/20 p-6">
            <div className="text-xs font-bold uppercase tracking-[.22em] text-[#D6B46D]">First-pass reward</div>
            <h2 className="mt-2 font-serif text-3xl">+8∞</h2>
            <p className="mt-2 text-sm text-white/55">Choose what your earned reward does.</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => chooseReward("kept")} className={`rounded-2xl border p-4 text-left ${rewardChoice === "kept" ? "border-[#D6B46D] bg-[#AD8633]/15" : "border-[#D6B46D]/40"}`}>
                <Gift className="h-5 w-5 text-[#D6B46D]" /><strong className="mt-3 block">KEEP</strong><span className="mt-1 block text-xs text-white/45">+8∞ stays on your dashboard.</span>
              </button>
              <button type="button" onClick={() => chooseReward("given")} className={`rounded-2xl p-4 text-left text-[#061B26] ${rewardChoice === "given" ? "bg-[#D6B46D]" : "bg-[#AD8633]"}`}>
                <HeartHandshake className="h-5 w-5" /><strong className="mt-3 block">GIVE</strong><span className="mt-1 block text-xs opacity-70">+8∞ pours into the Infinity Well.</span>
              </button>
            </div>
            {rewardChoice && <p className="mt-4 text-center text-xs text-[#D6B46D]">Reward marked {rewardChoice === "kept" ? "KEEP · Dashboard" : "GIVE · Infinity Well"}.</p>}
          </section>
        )}

        <p className="mt-6 text-center text-[11px] leading-5 text-white/30">
          Source assessment: {curriculum.sourceFile}. The original delivery pack uses 8/10; Afiyah deliberately applies a stricter 9/10 product mastery gate.
        </p>
      </div>
    </main>
  );
}
