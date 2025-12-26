import { GameCard } from './GameCard';
import { useLanguage } from '../../i18n/LanguageContext';
import type { GeneratedGame } from '../../types';

interface BulletinProps {
  games: GeneratedGame[];
  gameCount: number;
  isAnimating?: boolean;
}

export function Bulletin({ games, gameCount, isAnimating = false }: BulletinProps) {
  const { t, language } = useLanguage();
  // Always show 5 slots
  const gameSlots = Array.from({ length: 5 }, (_, i) => i);
  const hasGenerated = games.length > 0;

  const gamesInfoText = language === 'pt'
    ? `${gameCount} ${gameCount === 1 ? 'jogo' : 'jogos'} • 5 números + 2 estrelas cada`
    : `${gameCount} ${gameCount === 1 ? 'game' : 'games'} • 5 numbers + 2 stars each`;

  return (
    <div className="bg-gradient-to-br from-lottery-paper to-lottery-paper-dark rounded-2xl p-4 shadow-ticket border-4 border-lottery-blue paper-texture">
      {/* Bulletin header */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-lottery-blue flex items-center justify-center gap-2">
          <span className="text-2xl">🎫</span>
          {t.bulletin.title}
        </h2>
        <p className="text-xs text-lottery-blue/60 mt-1">
          {gamesInfoText}
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
          <p className="text-base">{t.bulletin.emptyState}</p>
        </div>
      )}
    </div>
  );
}
