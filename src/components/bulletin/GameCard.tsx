import { NumberGrid } from './NumberGrid';
import { StarGrid } from './StarGrid';
import type { GeneratedGame } from '../../types';

interface GameCardProps {
  game: GeneratedGame | null;
  gameNumber: number;
  isAnimating?: boolean;
  isDisabled?: boolean;
}

export function GameCard({ game, gameNumber, isAnimating = false, isDisabled = false }: GameCardProps) {
  return (
    <div className={`flex flex-col ${isDisabled ? 'opacity-40' : ''}`}>
      {/* Game header */}
      <div className="text-center mb-2">
        <span className={`text-xs font-bold uppercase tracking-wider ${
          isDisabled ? 'text-gray-400' : 'text-lottery-blue/60'
        }`}>
          Game {gameNumber}
        </span>
      </div>

      {/* Numbers section */}
      <div className={`rounded-xl p-3 border-2 space-y-3 ${
        isDisabled
          ? 'bg-gray-100/50 border-gray-300/30'
          : 'bg-white/50 border-lottery-blue/20'
      }`}>
        {/* Main numbers label */}
        <div className={`flex items-center gap-1 text-[10px] font-semibold uppercase ${
          isDisabled ? 'text-gray-400' : 'text-lottery-blue/50'
        }`}>
          <span>5 Numbers</span>
        </div>

        {/* Main numbers grid */}
        <NumberGrid
          selectedNumbers={game?.mainNumbers ?? []}
          isAnimating={isAnimating}
          isDisabled={isDisabled}
        />

        {/* Divider */}
        <div className={`border-t my-2 ${isDisabled ? 'border-gray-300/30' : 'border-lottery-blue/10'}`} />

        {/* Stars label */}
        <div className={`flex items-center gap-1 text-[10px] font-semibold uppercase ${
          isDisabled ? 'text-gray-400' : 'text-lottery-gold/70'
        }`}>
          <span>2 Stars</span>
        </div>

        {/* Stars grid */}
        <StarGrid
          selectedStars={game?.stars ?? []}
          isAnimating={isAnimating}
          isDisabled={isDisabled}
        />
      </div>
    </div>
  );
}
