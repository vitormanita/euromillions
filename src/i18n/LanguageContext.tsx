import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { en, type Translations } from './translations/en';
import { pt } from './translations/pt';

export type Language = 'en' | 'pt';

const translations: Record<Language, Translations> = { en, pt };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'euromillions-language';

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'pt') return stored;

  // Detect browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('pt')) return 'pt';

  return 'en';
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  useEffect(() => {
    // Sync with localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'pt') {
      setLanguageState(stored);
    }
  }, []);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
