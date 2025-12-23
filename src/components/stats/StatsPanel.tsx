import { useState } from 'react';
import { ReasoningCard } from './ReasoningCard';
import type { GeneratedGame, Statistics } from '../../types';

interface StatsPanelProps {
  games: GeneratedGame[];
  statistics: Statistics | null;
}

export function StatsPanel({ games, statistics }: StatsPanelProps) {
  const [expandedGames, setExpandedGames] = useState<Set<number>>(new Set());

  if (games.length === 0 || !statistics) return null;

  // Calculate average absences for context
  const avgMainAbsences =
    statistics.mainNumbers.reduce((sum, n) => sum + n.absences, 0) /
    statistics.mainNumbers.length;
  const avgStarAbsences =
    statistics.stars.reduce((sum, n) => sum + n.absences, 0) /
    statistics.stars.length;

  const toggleGame = (index: number) => {
    setExpandedGames(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-ticket overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-base font-semibold text-lottery-blue flex items-center gap-2">
          <span>📊</span>
          Selection Analysis
        </h3>
      </div>

      <div className="divide-y divide-gray-100">
        {games.map((game, index) => {
          const isExpanded = expandedGames.has(index);

          return (
            <div key={index}>
              {/* Game header */}
              <button
                onClick={() => toggleGame(index)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-lottery-blue/60">
                    Game {index + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-lottery-pink">
                      {game.mainNumbers.join(' - ')}
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className="text-sm font-bold text-lottery-gold">
                      ⭐ {game.stars.join(' ')}
                    </span>
                  </div>
                </div>
                <span
                  className={`
                    text-lottery-blue/40 transition-transform duration-200
                    ${isExpanded ? 'rotate-180' : ''}
                  `}
                >
                  <svg
                    className="w-5 h-5"
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
                  ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="px-4 pb-4 grid md:grid-cols-2 gap-3">
                  <ReasoningCard
                    scores={game.mainScores}
                    type="numbers"
                    avgAbsences={avgMainAbsences}
                  />
                  <ReasoningCard
                    scores={game.starScores}
                    type="stars"
                    avgAbsences={avgStarAbsences}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
