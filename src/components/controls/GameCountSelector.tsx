import { useLanguage } from '../../i18n/LanguageContext';

interface GameCountSelectorProps {
  count: number;
  onChange: (count: number) => void;
}

export function GameCountSelector({ count, onChange }: GameCountSelectorProps) {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-lottery-blue flex items-center gap-1.5 whitespace-nowrap">
        <span>🎮</span>
        {t.controls.games}
      </span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => onChange(num)}
            className={`
              w-8 h-8 rounded-lg font-bold text-sm transition-all
              ${count === num
                ? 'bg-lottery-blue text-white shadow-md'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }
            `}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
