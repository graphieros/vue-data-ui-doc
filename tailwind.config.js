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
        "inter": ["Inter"],
        "inter-bold": ["InterBold"],
        "inter-medium": ["InterMedium"],
        "jetbrains": ["JetBrainsMono"]
      },
      colors: {
        "black": "#1a1a1a",
        "black-100" : "#242424",
        "app-green": "#42d392",
        "app-green-dark": "#1d915d",
        "app-green-darker": "#0b4d2f",
        "app-green-light": "#87e6bb",
        "app-green-light-extra": "#d5eee3",
        "app-blue-dark": "#314063",
        "app-blue-dark-mid": "#3456a3",
        "app-blue": "#5f8aee",
        "app-blue-mid": "#83a4f2",
        "app-blue-light": "#abc2f6",
        "app-warning": "#ff8c00",
        "app-warning-light": "#ffb152",
        "app-warning-dark": "#593100",
        "app-orange": "#ff6600",
        "app-orange-light": "#faa770",
        "app-red": "#ff3700",
        "app-red-dark": "#a32300",
        "app-yellow": "#c8c832",
        "app-gold" : "#fdd663",
        "primary-dark": "#105585",
        "primary-dark-grey": "#1d3e54",
        "primary": "#1f77b4",
        "primary-grey": "#376687",
        "primary-light": "#579ecf",
        "primary-light-grey": "#5c7e96",
        "gray-150": "#ececee",
        "vue-blue": "#213547"
      },
    },
  },
  plugins: [],
}