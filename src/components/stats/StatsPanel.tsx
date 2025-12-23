import { useState } from 'react';
import { ReasoningCard } from './ReasoningCard';
import type { GeneratedGame, Statistics } from '../../types';

interface StatsPanelProps {
  games: GeneratedGame[];
  statistics: Statistics | null;
}

export function StatsPanel({ games, statistics }: StatsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (games.length === 0 || !statistics) return null;

  // Use the first game for detailed stats
  const firstGame = games[0];

  // Calculate average absences for context
  const avgMainAbsences =
    statistics.mainNumbers.reduce((sum, n) => sum + n.absences, 0) /
    statistics.mainNumbers.length;
  const avgStarAbsences =
    statistics.stars.reduce((sum, n) => sum + n.absences, 0) /
    statistics.stars.length;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-ticket overflow-hidden">
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-lottery-blue flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Selection Analysis
        </h3>
        <span
          className={`
            text-lottery-blue/60 transition-transform duration-200
            ${isExpanded ? 'rotate-180' : ''}
          `}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      {/* Expandable content */}
      <div
        className={`
          transition-all duration-300 ease-in-out overflow-hidden
          ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-6 pb-6 space-y-4">
          {/* Quick summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-lottery-pink/10 rounded-xl p-4 text-center">
              <p className="text-sm text-lottery-pink/70 mb-1">Main Numbers</p>
              <p className="text-2xl font-bold text-lottery-pink">
                {firstGame.mainNumbers.join(' - ')}
              </p>
            </div>
            <div className="bg-lottery-gold/10 rounded-xl p-4 text-center">
              <p className="text-sm text-lottery-gold/70 mb-1">Lucky Stars</p>
              <p className="text-2xl font-bold text-lottery-gold">
                ⭐ {firstGame.stars.join(' ⭐ ')}
              </p>
            </div>
          </div>

          {/* Detailed reasoning */}
          <div className="grid md:grid-cols-2 gap-4">
            <ReasoningCard
              scores={firstGame.mainScores}
              type="numbers"
              avgAbsences={avgMainAbsences}
            />
            <ReasoningCard
              scores={firstGame.starScores}
              type="stars"
              avgAbsences={avgStarAbsences}
            />
          </div>

          {/* Note about other games */}
          {games.length > 1 && (
            <p className="text-xs text-center text-gray-500 pt-2">
              Note: Analysis shown is for Game 1. Each game uses independent random factors.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
