export type GiftModule = {
  id: number;
  pillarAr: string;
  pillar: string;
  english: string;
  title: string;
  promise: string;
  lessonCount: number;
  quizQuestions: number;
  passPercent: number;
  sourceLayer: "afiyah" | "mental-wellness" | "anythingllm-approved-docs";
};

export const AFIYAH_GIFT_MODULES: GiftModule[] = [
  {
    id: 1,
    pillarAr: "نيّة",
    pillar: "Niyyah",
    english: "Intention",
    title: "Purpose Before Progress",
    promise: "Turn intention into a clear, practical decision framework for work and life.",
    lessonCount: 4,
    quizQuestions: 10,
    passPercent: 90,
    sourceLayer: "afiyah",
  },
  {
    id: 2,
    pillarAr: "عافية",
    pillar: "Afiyah",
    english: "Wellbeing",
    title: "Nafs & Nūr: Everyday Wellbeing",
    promise: "Build bounded, practical skills for stress, rest, reflection and seeking appropriate support.",
    lessonCount: 4,
    quizQuestions: 10,
    passPercent: 90,
    sourceLayer: "mental-wellness",
  },
  {
    id: 3,
    pillarAr: "عدل",
    pillar: "Adl",
    english: "Justice",
    title: "Financial Agency for Her",
    promise: "Understand ownership, earnings, fair access, informed choice and financial agency.",
    lessonCount: 4,
    quizQuestions: 10,
    passPercent: 90,
    sourceLayer: "afiyah",
  },
  {
    id: 4,
    pillarAr: "أمانة",
    pillar: "Amanah",
    english: "Trust",
    title: "Digital Amanah",
    promise: "Learn privacy, data stewardship, AI disclosure, consent and safe digital habits.",
    lessonCount: 4,
    quizQuestions: 10,
    passPercent: 90,
    sourceLayer: "anythingllm-approved-docs",
  },
  {
    id: 5,
    pillarAr: "دين",
    pillar: "Deen",
    english: "Faith",
    title: "Faith-Aligned Decision Making",
    promise: "Recognize when faith should shape a decision and when qualified scholarly guidance is needed.",
    lessonCount: 4,
    quizQuestions: 10,
    passPercent: 90,
    sourceLayer: "afiyah",
  },
  {
    id: 6,
    pillarAr: "إحسان",
    pillar: "Ihsan",
    english: "Excellence",
    title: "Learn Better, Build Better",
    promise: "Practice deliberate learning, reflection, iteration and quality without perfection paralysis.",
    lessonCount: 4,
    quizQuestions: 10,
    passPercent: 90,
    sourceLayer: "afiyah",
  },
  {
    id: 7,
    pillarAr: "بركة",
    pillar: "Barakah",
    english: "Blessed Increase",
    title: "Money, Value & Barakah",
    promise: "Build practical money knowledge around value, risk, benefit and Shariah-conscious choices.",
    lessonCount: 4,
    quizQuestions: 10,
    passPercent: 90,
    sourceLayer: "afiyah",
  },
  {
    id: 8,
    pillarAr: "صدقة",
    pillar: "Sadaqah",
    english: "Giving",
    title: "Give Forward",
    promise: "Design giving habits that are intentional, sustainable and connected to community benefit.",
    lessonCount: 4,
    quizQuestions: 10,
    passPercent: 90,
    sourceLayer: "afiyah",
  },
];

export const GIFT_PROGRAM_RULES = {
  giftName: "The Afiyah Eight",
  moduleCount: 8,
  weeks: 8,
  passPercent: 90,
  rewardPerPassedModule: 8,
  completionReward: 64,
  progressModel: "lesson + quiz + module + 8-week journey",
} as const;
