/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'plan': "url('../images/plan.jpg')",
      },
      screens: {
        "2xs": "375px",
        "xs": "425px",
      }
    },
  },
  plugins: [],
}

