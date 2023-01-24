/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{vue,js,html,css}"],
  theme: {
    extend: {
      width: {
        "104": "90vw"
      }
    },
    height: {
      "104": "90vh"
    }
  },
  plugins: [require("daisyui")],
}
