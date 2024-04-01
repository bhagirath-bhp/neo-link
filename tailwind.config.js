const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-1": "#AEAEAE",
        "color-2": "#AEAEAE",
        "color-3": "#AEAEAE",
      },
      fontFamily: {
        Monserrat: ['Monserrat'],

  
      },
    },
  },
  plugins: [],
});