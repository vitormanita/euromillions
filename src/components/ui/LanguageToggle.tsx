import { useLanguage, type Language } from '../../i18n/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const handleToggle = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gray-200">
      <button
        onClick={() => handleToggle('pt')}
        className={`
          px-3 py-1 rounded-full text-sm font-medium transition-all duration-200
          ${language === 'pt'
            ? 'bg-lottery-blue text-white shadow-sm'
            : 'text-gray-500 hover:text-lottery-blue'
          }
        `}
        aria-label="Português"
      >
        PT
      </button>
      <button
        onClick={() => handleToggle('en')}
        className={`
          px-3 py-1 rounded-full text-sm font-medium transition-all duration-200
          ${language === 'en'
            ? 'bg-lottery-blue text-white shadow-sm'
            : 'text-gray-500 hover:text-lottery-blue'
          }
        `}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
