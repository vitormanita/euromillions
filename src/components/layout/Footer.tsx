export function Footer() {
  return (
    <footer className="text-center py-8 text-sm text-gray-500">
      <p className="mb-2">
        Data source:{' '}
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
        This generator uses historical statistics to weight number selection.
        <br />
        Remember: lottery results are random. Play responsibly.
      </p>
      <p className="mt-4 text-gray-400">
        Boa sorte! 🍀🇵🇹
      </p>
    </footer>
  );
}
