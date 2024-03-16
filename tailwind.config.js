/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#22b379",
        secondary: "#2a966b",
        darkText: "#262626",
        lightText: "#ffffff",
      },
    },
  },
  plugins: [],
};
