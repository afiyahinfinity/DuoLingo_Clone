import Link from "next/link";
import { ArrowLeft, BookOpenCheck, ShieldCheck } from "lucide-react";

import { LessonCompleteButton } from "@/components/afiyah/lesson-complete-button";
import { AFIYAH_GIFT_MODULES } from "@/data/afiyah-gift-modules";
import { AFIYAH_SOURCE_CURRICULUM, type AfiyahCurriculumWeek } from "@/data/afiyah-eight-source-curriculum";

function LessonBody({ body }: { body: string }) {
  return (
    <div className="mt-6 space-y-4">
      {body.split("\n\n").map((block, index) => {
        if (block.startsWith("### ")) {
          return <h2 key={index} className="pt-3 font-serif text-2xl text-[#D6B46D]">{block.replace(/^###\s+/, "")}</h2>;
        }
        const isInteraction = /^(Interaction:|Knowledge check:|Activity:|Prompt:|Boundary:|Outcome:)/.test(block);
        return <p key={index} className={isInteraction ? "rounded-2xl border border-[#AD8633]/25 bg-[#003629]/60 p-4 text-sm leading-7 text-[#F8F3E9]/75" : "text-base leading-8 text-[#F8F3E9]/72"}>{block}</p>;
      })}
    </div>
  );
}

export default function LessonPage({ params }: { params: { moduleId: string; lessonNo: string } }) {
  const moduleNumber = Math.min(8, Math.max(1, Number(params.moduleId))) as AfiyahCurriculumWeek;
  const lessonNumber = Math.min(4, Math.max(1, Number(params.lessonNo)));
  const module = AFIYAH_GIFT_MODULES.find((item) => item.id === moduleNumber) ?? AFIYAH_GIFT_MODULES[0];
  const curriculum = AFIYAH_SOURCE_CURRICULUM[moduleNumber];
  const lesson = curriculum.lessons[lessonNumber - 1];
  const nextHref = lessonNumber < 4 ? `/afiyah-gift/module/${module.id}/lesson/${lessonNumber + 1}` : `/afiyah-gift/module/${module.id}/quiz`;

  return <main className="min-h-screen bg-[#061B26] px-4 py-8 text-[#F8F3E9]"><article className="mx-auto max-w-2xl"><Link href={`/afiyah-gift/module/${module.id}`} className="inline-flex items-center gap-2 text-sm text-[#D6B46D]"><ArrowLeft className="h-4 w-4"/>Module {module.id}</Link><div className="mt-8 text-xs font-bold uppercase tracking-[.25em] text-[#AD8633]">Source lesson · {lessonNumber}/4</div><div className="mt-3 flex items-baseline gap-3"><span className="font-serif text-5xl text-[#D6B46D]">{module.pillarAr}</span><span className="font-serif text-2xl">{module.pillar} · {module.english}</span></div><h1 className="mt-7 font-serif text-4xl leading-tight lg:text-5xl">{lesson.title}</h1><p className="mt-3 text-sm leading-6 text-white/45">{curriculum.sourceTitle}</p><div className="mt-8 rounded-[32px] border border-white/10 bg-white/[.035] p-6 lg:p-8"><div className="flex items-center justify-between gap-4"><BookOpenCheck className="h-7 w-7 text-[#D6B46D]"/><div className="rounded-full border border-[#AD8633]/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-[#D6B46D]">Islamic.University</div></div><LessonBody body={lesson.body}/></div><div className="mt-5 flex gap-3 rounded-2xl border border-white/10 bg-black/15 p-4 text-xs leading-6 text-white/45"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#D6B46D]"/><span>Source: {curriculum.sourceFile}. Afiyah applies a 9/10 mastery gate. Case-specific religious, legal, financial, or safeguarding questions still require qualified review.</span></div><div className="mt-6 flex items-center justify-between text-xs text-white/35"><span>Week {module.id} · Lesson {lessonNumber} of 4</span><span>{Math.round((lessonNumber/4)*100)}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#D6B46D]" style={{width:`${(lessonNumber/4)*100}%`}}/></div><LessonCompleteButton moduleNo={module.id} lessonNo={lessonNumber} nextHref={nextHref} label={lessonNumber<4?"Complete & continue":"Complete & take mastery quiz"}/><p className="mt-3 text-center text-[11px] leading-5 text-white/30">Completion is saved to your Afiyah account. If you are not signed in, you will be taken to the account screen first.</p></article></main>;
}
