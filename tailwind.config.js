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
        "app-green": "#42d392",
        "app-blue": "#5f8aee",
        "app-orange": "#ff6600",
        "app-yellow": "#c8c832",
        "app-gold" : "#fdd663"
      }
    },
  },
  plugins: [],
}

