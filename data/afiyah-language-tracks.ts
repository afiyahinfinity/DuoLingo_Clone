export type AfiyahLanguage = {
  code: string;
  name: string;
  nativeName: string;
  rewardMultiplier: number;
  amanahMultiplier: number;
  featured?: boolean;
};

export const AFIYAH_LANGUAGES: AfiyahLanguage[] = [
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    rewardMultiplier: 2,
    amanahMultiplier: 2,
    featured: true,
  },
  { code: "bn", name: "Bangla", nativeName: "বাংলা", rewardMultiplier: 1, amanahMultiplier: 1 },
  { code: "en", name: "English", nativeName: "English", rewardMultiplier: 1, amanahMultiplier: 1 },
  { code: "fr", name: "French", nativeName: "Français", rewardMultiplier: 1, amanahMultiplier: 1 },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", rewardMultiplier: 1, amanahMultiplier: 1 },
];

export const ARABIC_DOUBLE_REWARD_COPY = {
  title: "Arabic · Double Infinity",
  subtitle: "Pass the lesson at 90% or higher to earn ×2 product rewards.",
  infinity: "+16∞",
  amanah: "+16 Amanah",
  disclaimer: "Infinity and Amanah points are Afiyah product progression points, not a measure of religious merit.",
} as const;
