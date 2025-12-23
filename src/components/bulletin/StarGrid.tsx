import { STARS_COUNT } from '../../utils/constants';

interface StarGridProps {
  selectedStars: number[];
  isAnimating?: boolean;
  isDisabled?: boolean;
}

function StarIcon({ filled, number, isDisabled }: { filled: boolean; number: number; isDisabled?: boolean }) {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 24 24"
        className={`w-8 h-8 transition-all duration-200 ${
          isDisabled
            ? 'text-gray-300'
            : filled
              ? 'text-lottery-gold drop-shadow-lg'
              : 'text-lottery-pink/30'
        }`}
        fill="currentColor"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center text-[11px] font-bold ${
          isDisabled
            ? 'text-gray-400'
            : filled ? 'text-lottery-blue-dark' : 'text-lottery-pink/50'
        }`}
      >
        {number}
      </span>
    </div>
  );
}

export function StarGrid({ selectedStars, isAnimating = false, isDisabled = false }: StarGridProps) {
  const stars = Array.from({ length: STARS_COUNT }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-6 gap-0.5 justify-items-center">
      {stars.map((num) => {
        const isSelected = selectedStars.includes(num);
        const animationDelay = isSelected
          ? `${(selectedStars.indexOf(num) + 5) * 100}ms`
          : '0ms';

        return (
          <div
            key={num}
            className={`
              transition-all duration-200
              ${isSelected && isAnimating && !isDisabled ? 'animate-bounce-in' : ''}
              ${isSelected && !isDisabled ? 'transform scale-110' : ''}
            `}
            style={isAnimating && isSelected ? { animationDelay } : undefined}
          >
            <StarIcon filled={isSelected && !isDisabled} number={num} isDisabled={isDisabled} />
          </div>
        );
      })}
    </div>
  );
}
