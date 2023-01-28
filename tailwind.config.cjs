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
  daisyui: {
    themes: [{
      mytheme: {

        "primary": "#4b5563",

        "secondary": "#374151",

        "accent": "#57534e",

        "neutral": "#1c1917",

        "base-100": "#f3f4f6",

        "info": "#6ee7b7",

        "success": "#d9f99d",

        "warning": "#fef08a",

        "error": "#fecaca",
      }
    }, "luxury"]
  }
}
