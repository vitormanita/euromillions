import { MAIN_NUMBERS_COUNT } from '../../utils/constants';

interface NumberGridProps {
  selectedNumbers: number[];
  isAnimating?: boolean;
}

export function NumberGrid({ selectedNumbers, isAnimating = false }: NumberGridProps) {
  const numbers = Array.from({ length: MAIN_NUMBERS_COUNT }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-6 gap-1">
      {numbers.map((num) => {
        const isSelected = selectedNumbers.includes(num);
        const animationDelay = isSelected
          ? `${selectedNumbers.indexOf(num) * 100}ms`
          : '0ms';

        return (
          <div
            key={num}
            className={`
              w-7 h-7 flex items-center justify-center text-xs font-semibold rounded
              transition-all duration-200
              ${isSelected
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
