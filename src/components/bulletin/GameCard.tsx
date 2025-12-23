import { NumberGrid } from './NumberGrid';
import { StarGrid } from './StarGrid';
import type { GeneratedGame } from '../../types';

interface GameCardProps {
  game: GeneratedGame | null;
  gameNumber: number;
  isAnimating?: boolean;
}

export function GameCard({ game, gameNumber, isAnimating = false }: GameCardProps) {
  return (
    <div className="flex flex-col">
      {/* Game header */}
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-lottery-blue/60 uppercase tracking-wider">
          Game {gameNumber}
        </span>
      </div>

      {/* Numbers section */}
      <div className="bg-white/50 rounded-xl p-3 border-2 border-lottery-blue/20 space-y-3">
        {/* Main numbers label */}
        <div className="flex items-center gap-1 text-[10px] font-semibold text-lottery-blue/50 uppercase">
          <span>5 Numbers</span>
        </div>

        {/* Main numbers grid */}
        <NumberGrid
          selectedNumbers={game?.mainNumbers ?? []}
          isAnimating={isAnimating}
        />

        {/* Divider */}
        <div className="border-t border-lottery-blue/10 my-2" />

        {/* Stars label */}
        <div className="flex items-center gap-1 text-[10px] font-semibold text-lottery-gold/70 uppercase">
          <span>2 Stars</span>
        </div>

        {/* Stars grid */}
        <StarGrid
          selectedStars={game?.stars ?? []}
          isAnimating={isAnimating}
        />
      </div>
    </div>
  );
}
