import { MAIN_NUMBERS_COUNT } from '../../utils/constants';
import { Tooltip } from '../ui/Tooltip';
import { NumberTooltipContent } from './NumberTooltipContent';
import type { ScoreResult } from '../../types';

interface NumberGridProps {
  selectedNumbers: number[];
  scores?: ScoreResult[];
  isAnimating?: boolean;
  isDisabled?: boolean;
}

export function NumberGrid({ selectedNumbers, scores, isAnimating = false, isDisabled = false }: NumberGridProps) {
  const numbers = Array.from({ length: MAIN_NUMBERS_COUNT }, (_, i) => i + 1);

  const getScoreForNumber = (num: number): ScoreResult | undefined => {
    return scores?.find((s) => s.number === num);
  };

  return (
    <div className="grid grid-cols-6 gap-0.5">
      {numbers.map((num) => {
        const isSelected = selectedNumbers.includes(num);
        const animationDelay = isSelected
          ? `${selectedNumbers.indexOf(num) * 100}ms`
          : '0ms';
        const score = isSelected ? getScoreForNumber(num) : undefined;

        const numberElement = (
          <div
            className={`
              aspect-square flex items-center justify-center text-[10px] font-semibold rounded
              transition-all duration-200
              ${isDisabled
                ? 'bg-gray-200/50 text-gray-400 border border-gray-300/30'
                : isSelected
                  ? `bg-lottery-pink text-white shadow-number-selected ${isAnimating ? 'animate-pop' : ''} cursor-pointer`
                  : 'bg-white/70 text-lottery-blue/70 border border-lottery-blue/20'
              }
            `}
            style={isAnimating && isSelected ? { animationDelay } : undefined}
          >
            {num}
          </div>
        );

        if (isSelected && score && !isDisabled) {
          return (
            <Tooltip key={num} content={<NumberTooltipContent score={score} />}>
              {numberElement}
            </Tooltip>
          );
        }

        return <div key={num}>{numberElement}</div>;
      })}
    </div>
  );
}
