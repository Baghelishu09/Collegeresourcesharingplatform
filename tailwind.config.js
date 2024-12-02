/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js}",
            "./server.js"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Lato', 'sans-serif'],
      }
    },
  },
  plugins: [],
  darkMode: "class",
}

