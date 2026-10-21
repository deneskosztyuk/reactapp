/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        board: "#181A1B",
        silk: "#E6E6DF",
        dim: "#9A9C95",
        trace: "#3A3D3F",
        gold: "#C9A44A",
        led: "#E5484D",
      },
      fontFamily: {
        sans: ["Schibsted Grotesk Variable", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
