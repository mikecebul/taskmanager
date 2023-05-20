/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: "#39baaa",
        "darker-teal": "#00ab99",
        yellow: "#ffc700",
        blue: "#46bcff",
        "darker-blue": "#2c99d7",
        red: "#ff6464",
        "dark-red": "#c82323",
        black: "#000000",
        "near-black": "#2c2c2c",
        "darker-gray": "#3f4044",
        "medium-gray": "#b1b1b1",
        "lighter-gray": "#ebebeb",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
