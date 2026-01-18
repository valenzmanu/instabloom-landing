/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f9f2ee",
        espresso: "#2a1e1c",
        paper: "#ffffff",
        rose: "#f2d3d9",
        blush: "#ff97ad",
        champagne: "#c9a47a",
      },
      fontFamily: {
        serif: ["Nunito Sans", "system-ui", "sans-serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
