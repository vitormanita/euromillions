export const en = {
  header: {
    title: 'Euromillions Generator',
    subtitle: 'Smart number generation with weighted probabilities',
    jackpotMax: 'Jackpot Max!',
    currentJackpot: 'Current Jackpot',
    statisticsUpdated: 'Statistics updated:',
  },
  controls: {
    presets: {
      balanced: 'Balanced',
      hot: 'Hot',
      overdue: 'Overdue',
      random: 'Random',
    },
    customWeights: 'Custom weights',
    sliders: {
      overdue: 'Overdue',
      frequency: 'Frequency',
      random: 'Random',
    },
    games: 'Games',
    generateButton: 'Generate Numbers',
    generating: 'Generating...',
  },
  bulletin: {
    title: 'Your Euromillions Ticket',
    gameLabel: 'Game',
    gamesInfo: '{count} {count, plural, one {game} other {games}} • 5 numbers + 2 stars each',
    numbers: '5 Numbers',
    stars: '2 Stars',
    emptyState: 'Press the button to generate your lucky numbers!',
  },
  tooltip: {
    timesDrawn: 'Times drawn',
    absences: 'Draws since last',
  },
  status: {
    hot: 'HOT',
    cold: 'COLD',
    overdue: 'OVERDUE',
    neutral: 'NORMAL',
  },
  footer: {
    dataSource: 'Data source:',
    disclaimer: 'This generator uses historical statistics to weight number selection.',
    reminder: 'Remember: lottery results are random. Play responsibly.',
    goodLuck: 'Good luck!',
  },
  loading: {
    text: 'Loading statistics...',
  },
  error: {
    title: 'Oops! Something went wrong.',
  },
};

export type Translations = typeof en;
