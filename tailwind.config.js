/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,tsx}', './site/**/*.{js,ts,tsx}', './payload/**/*.{js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070707',
          900: '#0b0b0b',
          800: '#111111',
          700: '#171717',
          600: '#1d1d1d',
        },
        ember: {
          300: '#ffb089',
          400: '#ff7a3c',
          500: '#ff4d00',
          600: '#e03d00',
        },
      },
      fontFamily: {
        sans: ['Paperlogy', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Paperlogy', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Paperlogy', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        ember: '0 0 0 1px rgba(255, 77, 0, 0.35), 0 18px 80px rgba(255, 77, 0, 0.18)',
      },
    },
  },
  plugins: [],
};
