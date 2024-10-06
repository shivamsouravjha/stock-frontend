/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2f36f7",
        primaryLight: "#caccfc",
        secondary: "#252526",
        secondaryLight: "#aaaaad",
      },
    },
  },
  plugins: [],
};
