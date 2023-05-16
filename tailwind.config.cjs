/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: { "square-light": "#ccb7ae", "square-dark": "#706677" },
    extend: {},
  },
  plugins: [],
  safelist: [
    { pattern: /(bg|text|border)-(square-dark|square-light)/ },
    "translate-x-[100%]",
    "translate-x-[200%]",
    "translate-x-[300%]",
    "translate-x-[400%]",
    "translate-x-[500%]",
    "translate-x-[600%]",
    "translate-x-[700%]",
    "translate-x-[800%]",
    "translate-x-[900%]",
    "translate-y-[100%]",
    "translate-y-[200%]",
    "translate-y-[300%]",
    "translate-y-[400%]",
    "translate-y-[500%]",
    "translate-y-[600%]",
    "translate-y-[700%]",
    "translate-y-[800%]",
    "translate-y-[900%]",
  ],
};
