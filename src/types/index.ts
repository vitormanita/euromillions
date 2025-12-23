export interface NumberStats {
  number: number;
  timesDrawn: number;
  absences: number;
}

export interface Statistics {
  mainNumbers: NumberStats[];
  stars: NumberStats[];
  lastUpdated: string;
}

export interface Weights {
  overdue: number;
  frequency: number;
  randomness: number;
}

export type NumberStatus = 'hot' | 'cold' | 'overdue' | 'neutral';

export interface ScoreResult {
  number: number;
  score: number;
  overdueContribution: number;
  frequencyContribution: number;
  randomContribution: number;
  status: NumberStatus;
  timesDrawn: number;
  absences: number;
}

export interface GeneratedGame {
  mainNumbers: number[];
  stars: number[];
  mainScores: ScoreResult[];
  starScores: ScoreResult[];
}

export interface GameState {
  games: GeneratedGame[];
  isGenerating: boolean;
  hasGenerated: boolean;
}
