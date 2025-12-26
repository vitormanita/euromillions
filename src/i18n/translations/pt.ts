import type { Translations } from './en';

export const pt: Translations = {
  header: {
    title: 'Gerador Euromilhões',
    subtitle: 'Geração inteligente com probabilidades ponderadas',
    jackpotMax: 'Jackpot Máximo!',
    currentJackpot: 'Jackpot Atual',
    statisticsUpdated: 'Estatísticas atualizadas:',
  },
  controls: {
    presets: {
      balanced: 'Equilibrado',
      hot: 'Quentes',
      overdue: 'Atrasados',
      random: 'Aleatório',
    },
    customWeights: 'Pesos personalizados',
    sliders: {
      overdue: 'Atrasados',
      frequency: 'Frequência',
      random: 'Aleatório',
    },
    games: 'Jogos',
    generateButton: 'Gerar Números',
    generating: 'A gerar...',
  },
  bulletin: {
    title: 'O Seu Boletim Euromilhões',
    gameLabel: 'Jogo',
    gamesInfo: '{count} {count, plural, one {jogo} other {jogos}} • 5 números + 2 estrelas cada',
    numbers: '5 Números',
    stars: '2 Estrelas',
    emptyState: 'Carregue no botão para gerar os seus números da sorte!',
  },
  tooltip: {
    timesDrawn: 'Vezes sorteado',
    absences: 'Sorteios desde último',
  },
  status: {
    hot: 'QUENTE',
    cold: 'FRIO',
    overdue: 'ATRASADO',
    neutral: 'NORMAL',
  },
  footer: {
    dataSource: 'Fonte dos dados:',
    disclaimer: 'Este gerador usa estatísticas históricas para ponderar a seleção de números.',
    reminder: 'Lembre-se: os resultados da lotaria são aleatórios. Jogue com responsabilidade.',
    goodLuck: 'Boa sorte!',
  },
  loading: {
    text: 'A carregar estatísticas...',
  },
  error: {
    title: 'Ups! Algo correu mal.',
  },
};
