import type { ScoreResult, NumberStatus } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

interface NumberTooltipContentProps {
  score: ScoreResult;
}

const STATUS_COLORS: Record<NumberStatus, string> = {
  hot: 'bg-red-500',
  cold: 'bg-blue-400',
  overdue: 'bg-orange-500',
  neutral: 'bg-gray-400',
};

const STATUS_EMOJIS: Record<NumberStatus, string> = {
  hot: '🔥',
  cold: '❄️',
  overdue: '⏰',
  neutral: '',
};

export function NumberTooltipContent({ score }: NumberTooltipContentProps) {
  const { t } = useLanguage();

  const statusLabel = t.status[score.status];
  const statusColor = STATUS_COLORS[score.status];
  const statusEmoji = STATUS_EMOJIS[score.status];

  return (
    <div className="flex flex-col gap-1.5 min-w-[120px]">
      {/* Status badge */}
      <div className="flex items-center justify-center gap-1">
        <span
          className={`${statusColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}
        >
          {statusEmoji} {statusLabel}
        </span>
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-0.5 text-[11px]">
        <div className="flex justify-between gap-3">
          <span className="text-white/70">{t.tooltip.timesDrawn}:</span>
          <span className="font-semibold">{score.timesDrawn}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-white/70">{t.tooltip.absences}:</span>
          <span className="font-semibold">{score.absences}</span>
        </div>
      </div>
    </div>
  );
}
