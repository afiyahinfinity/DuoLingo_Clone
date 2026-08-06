export const AFIYAH_PILLARS = [
  { key: "niyyah", ar: "نيّة", label: "Niyyah", english: "Intention" },
  { key: "afiyah", ar: "عافية", label: "Afiyah", english: "Wellbeing" },
  { key: "adl", ar: "عدل", label: "Adl", english: "Justice" },
  { key: "amanah", ar: "أمانة", label: "Amanah", english: "Trust" },
  { key: "deen", ar: "دين", label: "Deen", english: "Faith" },
  { key: "ihsan", ar: "إحسان", label: "Ihsan", english: "Excellence" },
  { key: "barakah", ar: "بركة", label: "Barakah", english: "Increase" },
  { key: "sadaqah", ar: "صدقة", label: "Sadaqah", english: "Giving" },
] as const;

export type AfiyahPillarKey = (typeof AFIYAH_PILLARS)[number]["key"];

export const ACADEMY_FLOW = [
  "User",
  "Week",
  "Module",
  "Lesson",
  "Quiz attempt",
  "Score",
  "Best score",
  "Pass",
  "Reward",
  "KEEP / GIVE",
  "Infinity Well",
  "Streak",
  "My Eight",
] as const;

export const PASS_PERCENT = 90;
export const PASS_SCORE_OUT_OF_TEN = 9;
export const MODULE_REWARD = 8;
export const ARABIC_REWARD = 16;
