import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        valor: {
          bg: '#0D0B1E',
          surface: '#1A1535',
          violet: '#8B5CF6',
          fuchsia: '#C026D3',
          pink: '#EC4899',
          text: '#F6F2FD',
          muted: '#A78BFA',
          border: 'rgba(139, 92, 246, 0.2)',
        },
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'valor-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #C026D3 50%, #EC4899 100%)',
        'valor-gradient-soft': 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(192,38,211,0.1) 100%)',
        'card-glass': 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(192,38,211,0.05) 100%)',
      },
      boxShadow: {
        'valor': '0 4px 24px rgba(139, 92, 246, 0.2)',
        'valor-lg': '0 8px 40px rgba(139, 92, 246, 0.3)',
        'glow': '0 0 20px rgba(139, 92, 246, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} satisfies Config
