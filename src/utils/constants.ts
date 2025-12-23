import type { Weights } from '../types';

export const DEFAULT_WEIGHTS: Weights = {
  overdue: 50,
  frequency: 30,
  randomness: 20,
};

export const WEIGHT_PRESETS: Record<string, Weights> = {
  balanced: { overdue: 33, frequency: 34, randomness: 33 },
  hotNumbers: { overdue: 20, frequency: 60, randomness: 20 },
  overdueFocus: { overdue: 70, frequency: 15, randomness: 15 },
  pureRandom: { overdue: 0, frequency: 0, randomness: 100 },
};

export const MAIN_NUMBERS_COUNT = 50;
export const STARS_COUNT = 12;
export const NUMBERS_TO_SELECT = 5;
export const STARS_TO_SELECT = 2;
export const GAMES_COUNT = 5;

export const PRIZE_AMOUNT = 40_000_000;
export const MAX_JACKPOT = 250_000_000;

export const STATUS_THRESHOLDS = {
  hot: 1.05,      // 5% above average
  cold: 0.95,     // 5% below average
  overdue: 1.5,   // 50% above average absences
};
