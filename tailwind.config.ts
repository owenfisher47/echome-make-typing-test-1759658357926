import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#646669',
        secondary: '#2c2e31',
        accent: '#e2b714',
        correct: '#d1f2a5',
        incorrect: '#f1a5a8',
        background: '#323437',
        surface: '#2c2e31',
      },
    },
  },
  plugins: [],
}
export default config