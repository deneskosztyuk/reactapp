/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        paper: "#ECEDEA",
        ink: "#1C1D1A",
        graphite: "#5E605B",
        rule: "#B9BBB5",
        red: "#C1272D",
        "red-pale": "#E9B3B5",
      },
      fontFamily: {
        sans: ["Schibsted Grotesk Variable", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
