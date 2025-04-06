/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  safelist: [
    "animate-wave"  
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(15deg)" }, 
          "50%": { transform: "rotate(-10deg)" }, 
          "75%": { transform: "rotate(15deg)" }
        },
      },
      animation: {
        wave: "wave 1.5s ease-in-out infinite", 
      },
    },
  },
  plugins: [],
};
