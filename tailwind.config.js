/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "skeleton-body": "shimmer 5s infinite linear",
      },
      keyframes: {
        shimmer: {
          "0%": {
            mask: "linear-gradient(-60deg,#000 30%,#0009,#000 70%) right/600% 100%",
          },
          "100%": {
            mask: "linear-gradient(-60deg,#000 30%,#0009,#000 70%) left/600% 100%",
          },
        },
      },
    },
  },
  plugins: [],
};
