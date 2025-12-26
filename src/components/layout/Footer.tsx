import { useLanguage } from '../../i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="text-center py-8 text-sm text-gray-500">
      <p className="mb-2">
        {t.footer.dataSource}{' '}
        <a
          href="https://www.jogossantacasa.pt/web/SCEstatisticas/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lottery-blue hover:underline"
        >
          Jogos Santa Casa
        </a>
      </p>
      <p className="text-xs text-gray-400">
        {t.footer.disclaimer}
        <br />
        {t.footer.reminder}
      </p>
      <p className="mt-4 text-gray-400">
        {t.footer.goodLuck} 🍀🇵🇹
      </p>
    </footer>
  );
}
