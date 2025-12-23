import { MAIN_NUMBERS_COUNT } from '../../utils/constants';

interface NumberGridProps {
  selectedNumbers: number[];
  isAnimating?: boolean;
  isDisabled?: boolean;
}

export function NumberGrid({ selectedNumbers, isAnimating = false, isDisabled = false }: NumberGridProps) {
  const numbers = Array.from({ length: MAIN_NUMBERS_COUNT }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-6 gap-0.5">
      {numbers.map((num) => {
        const isSelected = selectedNumbers.includes(num);
        const animationDelay = isSelected
          ? `${selectedNumbers.indexOf(num) * 100}ms`
          : '0ms';

        return (
          <div
            key={num}
            className={`
              aspect-square flex items-center justify-center text-[10px] font-semibold rounded
              transition-all duration-200
              ${isDisabled
                ? 'bg-gray-200/50 text-gray-400 border border-gray-300/30'
                : isSelected
                  ? `bg-lottery-pink text-white shadow-number-selected ${isAnimating ? 'animate-pop' : ''}`
                  : 'bg-white/70 text-lottery-blue/70 border border-lottery-blue/20'
              }
            `}
            style={isAnimating && isSelected ? { animationDelay } : undefined}
          >
            {num}
          </div>
        );
      })}
    </div>
  );
}
