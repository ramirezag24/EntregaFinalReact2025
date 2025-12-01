/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"], // tipografía moderna
      },
      colors: {
        primary: "#2563eb",
        primaryDark: "#1e3a8a",
        secondary: "#f97316",
        background: "#f1f5f9",
        light: "#ffffff",
        dark: "#0f172a",
      },
    },
  },
  plugins: [],
};
