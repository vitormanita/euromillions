import { GameCard } from './GameCard';
import type { GeneratedGame } from '../../types';
import { GAMES_COUNT } from '../../utils/constants';

interface BulletinProps {
  games: GeneratedGame[];
  isAnimating?: boolean;
}

export function Bulletin({ games, isAnimating = false }: BulletinProps) {
  const gameSlots = Array.from({ length: GAMES_COUNT }, (_, i) => i);

  return (
    <div className="bg-gradient-to-br from-lottery-paper to-lottery-paper-dark rounded-3xl p-6 shadow-ticket border-4 border-lottery-blue paper-texture">
      {/* Bulletin header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-lottery-blue flex items-center justify-center gap-2">
          <span className="text-3xl">🎫</span>
          Your Euromillions Ticket
        </h2>
        <p className="text-sm text-lottery-blue/60 mt-1">
          5 games • 5 numbers + 2 stars each
        </p>
      </div>

      {/* Games grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {gameSlots.map((index) => (
          <GameCard
            key={index}
            game={games[index] ?? null}
            gameNumber={index + 1}
            isAnimating={isAnimating && games.length > 0}
          />
        ))}
      </div>

      {/* Empty state */}
      {games.length === 0 && (
        <div className="text-center py-8 text-lottery-blue/40">
          <p className="text-lg">Press the button below to generate your lucky numbers!</p>
        </div>
      )}
    </div>
  );
}
