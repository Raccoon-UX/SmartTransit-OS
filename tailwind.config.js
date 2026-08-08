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
        warm: {
          50: '#F7F5F0',
          100: '#F3F0E9',
          200: '#ECE8DF',
          border: '#E5E0D8',
          text: '#172033',
          muted: '#596273',
        },
        transit: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#36a5f7',
          500: '#1769D1', // Primary municipal brand blue
          600: '#1252A5',
          700: '#0E3E7E',
          800: '#092A56',
          900: '#051833',
          950: '#030E1F',
        },
        civic: {
          teal: '#0E8F82',
          orange: '#D97732',
          green: '#218A63',
          amber: '#C8891A',
          red: '#C94A45',
        },
        navy: {
          800: '#0f172a',
          850: '#0b1120',
          900: '#080d1a',
          950: '#040711',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(23, 32, 51, 0.05)',
        'panel': '0 2px 6px rgba(23, 32, 51, 0.06)',
      }
    },
  },
  plugins: [],
}
