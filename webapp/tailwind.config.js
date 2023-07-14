/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": { transform: "translateY(100%)" },
          "30%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(5%)" },
          "70%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
      animation: {
        slide: "slide 3s infinite",
      },
    },
  },
  plugins: [],
};
