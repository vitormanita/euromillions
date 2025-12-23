/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lottery: {
          blue: '#1a4b8c',
          'blue-dark': '#0f2d54',
          pink: '#e91e8c',
          'pink-light': '#f472b6',
          gold: '#fbbf24',
          'gold-dark': '#d97706',
          paper: '#fefce8',
          'paper-dark': '#fef9c3',
        }
      },
      fontFamily: {
        lottery: ['Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pop': 'pop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'shuffle': 'shuffle 0.15s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'confetti': 'confetti 1s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shuffle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-2px)' },
          '75%': { transform: 'translateY(2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-100px) rotate(720deg)', opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'ticket': '0 4px 20px rgba(26, 75, 140, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)',
        'number': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'number-selected': '0 4px 12px rgba(233, 30, 140, 0.4)',
        'star-selected': '0 4px 12px rgba(251, 191, 36, 0.5)',
      },
    },
  },
  plugins: [],
}
