/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#439AFF',
        'score-high': '#12B76A',
        'score-mid': '#F79009',
        'score-low': '#F04438',
        surface: '#F8F8F8',
        card: '#FFFFFF',
        border: '#E0E0E0',
        'text-primary': '#121212',
        'text-secondary': '#6B7280',
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
