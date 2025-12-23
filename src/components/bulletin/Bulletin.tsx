import { GameCard } from './GameCard';
import type { GeneratedGame } from '../../types';

interface BulletinProps {
  games: GeneratedGame[];
  gameCount: number;
  isAnimating?: boolean;
}

export function Bulletin({ games, gameCount, isAnimating = false }: BulletinProps) {
  // Always show 5 slots
  const gameSlots = Array.from({ length: 5 }, (_, i) => i);
  const hasGenerated = games.length > 0;

  return (
    <div className="bg-gradient-to-br from-lottery-paper to-lottery-paper-dark rounded-2xl p-4 shadow-ticket border-4 border-lottery-blue paper-texture">
      {/* Bulletin header */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-lottery-blue flex items-center justify-center gap-2">
          <span className="text-2xl">🎫</span>
          Your Euromillions Ticket
        </h2>
        <p className="text-xs text-lottery-blue/60 mt-1">
          {gameCount} {gameCount === 1 ? 'game' : 'games'} • 5 numbers + 2 stars each
        </p>
      </div>

      {/* Games grid - always 5 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {gameSlots.map((index) => {
          const isActive = index < gameCount;
          const game = isActive ? games[index] : null;

          return (
            <GameCard
              key={index}
              game={game ?? null}
              gameNumber={index + 1}
              isAnimating={isAnimating && hasGenerated && isActive}
              isDisabled={!isActive}
            />
          );
        })}
      </div>

      {/* Empty state */}
      {!hasGenerated && (
        <div className="text-center py-6 text-lottery-blue/40">
          <p className="text-base">Press the button to generate your lucky numbers!</p>
        </div>
      )}
    </div>
  );
}
