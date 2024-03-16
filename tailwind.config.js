/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1565c0",
        secondary: "#1976d2",
        darkText: "#262626",
        lightText: "#ffffff",
      },
    },
  },
  plugins: [],
};
