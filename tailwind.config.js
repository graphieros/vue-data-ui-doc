/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        "satoshi": ["Satoshi"],
        "satoshi-bold": ["SatoshiBold"],
      },
      colors: {
        "black": "rgb(26,26,26)",
        "black-100" : "rgb(36,36,36)",
        "app-green": "rgb(66,211,146)",
        "app-blue": "rgb(95,139,238)",
        "app-orange": "rgb(255,100,0)",
        "app-yellow": "rgb(200,200,50)"
      }
    },
  },
  plugins: [],
}

