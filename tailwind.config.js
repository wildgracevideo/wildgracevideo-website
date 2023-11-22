/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        "website-yellow": "rgb(var(--color-website-yellow) / <alpha-value>)",
        "website-green": "rgb(var(--color-website-green) / <alpha-value>)",
        "website-blue": "rgb(var(--color-website-blue) / <alpha-value>)",
        "website-off-white":
          "rgb(var(--color-website-off-white) / <alpha-value>)",
      },
    },
    transitionProperty: {
      top: "top",
    },
  },
  plugins: [],
};
