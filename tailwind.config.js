/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: "#9CAF88",
          dark: "#7F9569",
          light: "#C9D6BC",
          pale: "#E4EBDC",
        },
        cream: {
          DEFAULT: "#F7F5EF",
          deep: "#ECE8DC",
        },
        ember: {
          DEFAULT: "#E8412C",
          deep: "#C93220",
        },
        ink: {
          DEFAULT: "#1D211B",
          soft: "#272C25",
          line: "#363C33",
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Figtree", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};