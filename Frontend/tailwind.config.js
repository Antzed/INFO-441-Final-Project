/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "accent-orange": "#f7bc76",
        "dark-text": "#0B1142",
        "dark-grey": "#3A3A3C",
      },
    },
  },
  plugins: [],
};
