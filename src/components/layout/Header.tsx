import { PRIZE_AMOUNT } from '../../utils/constants';

interface HeaderProps {
  lastUpdated?: string;
}

function formatPrize(amount: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function Header({ lastUpdated }: HeaderProps) {
  return (
    <header className="text-center py-8">
      {/* Logo / Title */}
      <div className="mb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-lottery-blue via-lottery-pink to-lottery-gold bg-clip-text text-transparent animate-float">
          Euromillions Generator
        </h1>
        <p className="text-lottery-blue/60 mt-2 text-lg">
          Smart number generation with weighted probabilities
        </p>
      </div>

      {/* Prize display */}
      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-lottery-gold/20 to-lottery-gold/10 px-6 py-3 rounded-full border-2 border-lottery-gold/30">
        <span className="text-3xl animate-pulse-slow">💰</span>
        <div className="text-left">
          <p className="text-xs text-lottery-gold/70 uppercase tracking-wider font-semibold">
            Current Jackpot
          </p>
          <p className="text-2xl font-bold text-lottery-gold">
            {formatPrize(PRIZE_AMOUNT)}
          </p>
        </div>
      </div>

      {/* Data freshness indicator */}
      {lastUpdated && (
        <p className="text-xs text-gray-400 mt-4">
          Statistics updated: {lastUpdated}
        </p>
      )}
    </header>
  );
}
