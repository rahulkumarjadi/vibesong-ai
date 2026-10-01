/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0E0D13',
        surface: '#17151F',
        surface2: '#1F1C29',
        ink: '#F5F3EE',
        muted: '#948C9B',
        amber: {
          DEFAULT: '#F2A65A',
          soft: '#F7C58C',
        },
        teal: {
          DEFAULT: '#4FD8C4',
          soft: '#8FEADD',
        },
        violet: {
          DEFAULT: '#8B7FC7',
          soft: '#B4ABDE',
        },
        line: 'rgba(245,243,238,0.09)',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'vibe-gradient': 'linear-gradient(90deg, #F2A65A 0%, #F2A65A 20%, #8B7FC7 50%, #4FD8C4 80%, #4FD8C4 100%)',
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        scan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 0%' },
        },
        floatUp: {
          '0%': { opacity: 0, transform: 'translateY(14px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        wave: 'wave 1.1s ease-in-out infinite',
        scan: 'scan 2.4s linear infinite',
        floatUp: 'floatUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
}
