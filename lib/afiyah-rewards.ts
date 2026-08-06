export const AFIYAH_PASS_THRESHOLD = 90;
export const BASE_INFINITY_REWARD = 8;
export const ARABIC_INFINITY_MULTIPLIER = 2;

export type LearningTrack = "gift-module" | "language-arabic" | "language-other";

export type AfiyahReward = {
  passed: boolean;
  infinityPoints: number;
  amanahPoints: number;
  multiplier: number;
};

/**
 * Product points only. These are not a measure of religious merit.
 * A learner must score at least 90% before any completion reward is granted.
 */
export function calculateAfiyahReward(
  scorePercent: number,
  track: LearningTrack,
): AfiyahReward {
  const passed = scorePercent >= AFIYAH_PASS_THRESHOLD;

  if (!passed) {
    return {
      passed: false,
      infinityPoints: 0,
      amanahPoints: 0,
      multiplier: 0,
    };
  }

  if (track === "language-arabic") {
    return {
      passed: true,
      infinityPoints: BASE_INFINITY_REWARD * ARABIC_INFINITY_MULTIPLIER,
      amanahPoints: BASE_INFINITY_REWARD * ARABIC_INFINITY_MULTIPLIER,
      multiplier: ARABIC_INFINITY_MULTIPLIER,
    };
  }

  return {
    passed: true,
    infinityPoints: BASE_INFINITY_REWARD,
    amanahPoints: track === "gift-module" ? BASE_INFINITY_REWARD : 0,
    multiplier: 1,
  };
}
