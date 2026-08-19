/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        transit: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#0B3D91', // Institutional Deep Navy Primary
          600: '#093278',
          700: '#07275f',
          800: '#051c46',
          900: '#03112d',
          950: '#020919',
        },
        navy: {
          700: '#2A374F',
          750: '#1E293B',
          800: '#162032',
          850: '#111A2C',
          900: '#0E1626',
          950: '#090E17',
        },
        govt: {
          navy: '#0B3D91',
          gold: '#C59B27',
          border: '#CBD5E1',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          text: '#0F172A',
          muted: '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '6px',
        'lg': '8px',
        'xl': '10px',
        '2xl': '12px',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        'panel': '0 1px 3px 0 rgba(15, 23, 42, 0.08)',
      }
    },
  },
  plugins: [],
}
