/** @type {import('tailwindcss').Config} */

// tailwind.config.js
const { nextui } = require("@nextui-org/react");

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {},
  darkMode: "class",
  plugins: [nextui()],
};
