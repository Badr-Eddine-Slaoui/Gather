/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "grand-line": "#1F3B73",
        "sky-blue": "#4DA6FF",
        "luffy-red": "#C0392B",
        "straw-gold": "#D4A017",
        "deck-wood": "#ba703e",
        "pirate-gray": "#3A3A3A",
        "mist-white": "#F5F5F5",
      },
      backgroundImage: {
        plan: "url('../images/plan.png')",
      },
      screens: {
        "2xs": "375px",
        xs: "425px",
      },
      gridTemplateColumns: {
        45: "repeat(45, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        18: "repeat(18, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};

