import type { ScoreResult } from '../../types';
import { getStatusLabel, getStatusEmoji } from '../../utils/scoring';

interface ReasoningCardProps {
  scores: ScoreResult[];
  type: 'numbers' | 'stars';
  avgAbsences: number;
}

function StatusBadge({ status }: { status: ScoreResult['status'] }) {
  const label = getStatusLabel(status);
  const emoji = getStatusEmoji(status);

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border
        status-${status}
      `}
    >
      {emoji && <span>{emoji}</span>}
      {label}
    </span>
  );
}

export function ReasoningCard({ scores, type, avgAbsences }: ReasoningCardProps) {
  if (scores.length === 0) return null;

  const title = type === 'numbers' ? 'Main Numbers' : 'Lucky Stars';
  const icon = type === 'numbers' ? '🔢' : '⭐';

  return (
    <div className="bg-white/60 rounded-xl p-4 border border-lottery-blue/10">
      <h4 className="text-sm font-semibold text-lottery-blue mb-3 flex items-center gap-2">
        <span>{icon}</span>
        {title} Selection Reasoning
      </h4>

      <div className="space-y-2">
        {scores.map((score) => {
          const absenceStatus =
            score.absences > avgAbsences * 1.5
              ? 'VERY OVERDUE'
              : score.absences > avgAbsences
              ? 'OVERDUE'
              : 'RECENT';

          return (
            <div
              key={score.number}
              className="flex items-center justify-between text-sm py-2 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-bold text-white
                    ${type === 'numbers' ? 'bg-lottery-pink' : 'bg-lottery-gold'}
                  `}
                >
                  {score.number}
                </span>
                <div className="flex flex-col">
                  <span className="text-gray-700">
                    Drawn <span className="font-semibold">{score.timesDrawn}×</span>
                  </span>
                  <span className="text-xs text-gray-500">
                    Absent {score.absences} draws ({absenceStatus})
                  </span>
                </div>
              </div>
              <StatusBadge status={score.status} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
