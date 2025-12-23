import type { NumberStats, Weights, ScoreResult, NumberStatus } from '../types';
import { STATUS_THRESHOLDS } from './constants';

export function calculateScore(
  stats: NumberStats,
  weights: Weights,
  allStats: NumberStats[]
): ScoreResult {
  // Normalize weights to 0-1 range
  const w = {
    overdue: weights.overdue / 100,
    frequency: weights.frequency / 100,
    random: weights.randomness / 100,
  };

  // Calculate statistics for normalization
  const maxAbsences = Math.max(...allStats.map(s => s.absences), 1);
  const avgDrawn = allStats.reduce((sum, s) => sum + s.timesDrawn, 0) / allStats.length;
  const maxDrawn = Math.max(...allStats.map(s => s.timesDrawn));
  const minDrawn = Math.min(...allStats.map(s => s.timesDrawn));
  const drawnRange = maxDrawn - minDrawn || 1;

  // Calculate individual contributions
  const overdueContribution = w.overdue * (stats.absences / maxAbsences);

  // Frequency: normalize to 0-1 range, higher frequency = higher score
  const frequencyContribution = w.frequency * (
    0.5 + (stats.timesDrawn - avgDrawn) / (2 * drawnRange)
  );

  const randomContribution = w.random * Math.random();

  const score = overdueContribution + frequencyContribution + randomContribution;

  // Determine status based on thresholds
  const avgAbsences = allStats.reduce((sum, s) => sum + s.absences, 0) / allStats.length;
  let status: NumberStatus;

  if (stats.absences > avgAbsences * STATUS_THRESHOLDS.overdue) {
    status = 'overdue';
  } else if (stats.timesDrawn > avgDrawn * STATUS_THRESHOLDS.hot) {
    status = 'hot';
  } else if (stats.timesDrawn < avgDrawn * STATUS_THRESHOLDS.cold) {
    status = 'cold';
  } else {
    status = 'neutral';
  }

  return {
    number: stats.number,
    score,
    overdueContribution,
    frequencyContribution,
    randomContribution,
    status,
    timesDrawn: stats.timesDrawn,
    absences: stats.absences,
  };
}

export function generateNumbers(
  stats: NumberStats[],
  weights: Weights,
  count: number
): ScoreResult[] {
  // Calculate scores for all numbers
  const scores = stats.map(s => calculateScore(s, weights, stats));

  // Sort by score descending and take top N
  const sorted = [...scores].sort((a, b) => b.score - a.score);
  const selected = sorted.slice(0, count);

  // Return sorted by number for display
  return selected.sort((a, b) => a.number - b.number);
}

export function getStatusLabel(status: NumberStatus): string {
  switch (status) {
    case 'hot': return 'HOT';
    case 'cold': return 'COLD';
    case 'overdue': return 'OVERDUE';
    case 'neutral': return 'NORMAL';
  }
}

export function getStatusEmoji(status: NumberStatus): string {
  switch (status) {
    case 'hot': return '🔥';
    case 'cold': return '❄️';
    case 'overdue': return '⏰';
    case 'neutral': return '';
  }
}

export function getAbsenceLabel(absences: number, avgAbsences: number): string {
  if (absences > avgAbsences * 1.5) return 'VERY OVERDUE';
  if (absences > avgAbsences) return 'OVERDUE';
  return 'RECENT';
}
