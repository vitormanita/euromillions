import { MAX_JACKPOT } from '../../utils/constants';
import { useLanguage } from '../../i18n/LanguageContext';

interface HeaderProps {
  lastUpdated?: string;
  jackpot: number;
}

function formatPrize(amount: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const SEGMENT_COUNT = 5;

function JackpotMeter({ current, max }: { current: number; max: number }) {
  const filledSegments = Math.min(Math.ceil((current / max) * SEGMENT_COUNT), SEGMENT_COUNT);

  return (
    <div className="flex gap-1 mt-1">
      {Array.from({ length: SEGMENT_COUNT }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 w-4 rounded-sm transition-all duration-300 ${
            i < filledSegments
              ? 'bg-lottery-gold'
              : 'bg-lottery-gold/20'
          }`}
        />
      ))}
    </div>
  );
}

export function Header({ lastUpdated, jackpot }: HeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="text-center py-8">
      {/* Logo / Title */}
      <div className="mb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-lottery-blue via-lottery-pink to-lottery-gold bg-clip-text text-transparent animate-float">
          {t.header.title}
        </h1>
        <p className="text-lottery-blue/60 mt-2 text-lg">
          {t.header.subtitle}
        </p>
      </div>

      {/* Prize display */}
      {jackpot >= MAX_JACKPOT ? (
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-lottery-gold via-yellow-400 to-lottery-gold px-6 py-3 rounded-full border-2 border-yellow-300 shadow-lg shadow-lottery-gold/30">
          <span className="text-3xl animate-pulse-slow">🏆</span>
          <div className="text-left">
            <p className="text-xs text-yellow-900 uppercase tracking-wider font-bold">
              {t.header.jackpotMax}
            </p>
            <p className="text-2xl font-bold text-yellow-900">
              {formatPrize(jackpot)}
            </p>
            <JackpotMeter current={jackpot} max={MAX_JACKPOT} />
          </div>
        </div>
      ) : (
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-lottery-gold/20 to-lottery-gold/10 px-6 py-3 rounded-full border-2 border-lottery-gold/30">
          <span className="text-3xl animate-pulse-slow">💰</span>
          <div className="text-left">
            <p className="text-xs text-lottery-gold/70 uppercase tracking-wider font-semibold">
              {t.header.currentJackpot}
            </p>
            <p className="text-2xl font-bold text-lottery-gold">
              {formatPrize(jackpot)}
            </p>
            <JackpotMeter current={jackpot} max={MAX_JACKPOT} />
          </div>
        </div>
      )}

      {/* Data freshness indicator */}
      {lastUpdated && (
        <p className="text-xs text-gray-400 mt-4">
          {t.header.statisticsUpdated} {lastUpdated}
        </p>
      )}
    </header>
  );
}
