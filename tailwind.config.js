/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0A0E17',
          surface: '#111827',
          border: '#1E293B',
          hover: '#1A2332',
          zebra: '#0F1520',
        },
        idf: {
          green: '#00E5A0',
          red: '#FF4D6A',
          orange: '#FFB547',
          blue: '#38BDF8',
          purple: '#A78BFA',
        },
        text: {
          primary: '#E2E8F0',
          secondary: '#94A3B8',
          dim: '#64748B',
        },
      },
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
