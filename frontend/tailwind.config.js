export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          950: '#020617',
          900: '#071122',
          800: '#0f172a'
        },
        accent: {
          cyan: '#22d3ee',
          lime: '#84cc16',
          amber: '#f59e0b',
          red: '#ef4444'
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(34,211,238,0.15), 0 0 28px rgba(34,211,238,0.08)'
      }
    }
  },
  plugins: []
};
