/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        myBlue: "#0A3283",
        myPink: "#BD365D",
      },
      backgroundImage: {
        pattern:
          "url(https://i.pinimg.com/564x/4e/77/d5/4e77d5f06a60cce0dd9691c5cc61f664.jpg)",
      },
    },
  },
  plugins: [],
};
