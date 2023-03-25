/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.js",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/*.{js,ts,jsx,tsx}",
    "./routes/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "y-bg": "#FFF9C4",
      },
      fontFamily: {
        "raleway": ["Raleway", "sans-serif"],
      },
      height:{
        "h-60": "250px",
        "h-25": "300px"
      },
      width:{
        "w-60": "300px",
      },
    },
    plugins: [],
  },
};
