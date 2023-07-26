/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "satoshi": ["Satoshi"],
        "satoshi-bold": ["SatoshiBold"],
      },
      colors: {
        "black": "rgb(26,26,26)",
        "app-green": "rgb(66,211,146)",
        "app-blue": "rgb(95,139,238)"
      }
    },
  },
  plugins: [],
}

