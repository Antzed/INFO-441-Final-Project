/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-orange': '#f7bc76',
        'dark-text': '#070452',
        'small-text-01': '#636366'
      }
    },
  },
  plugins: [],
}
