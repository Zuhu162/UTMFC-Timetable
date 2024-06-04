/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: "#59031E",
        prime: "#F4DBDF",
        primeDark: "#932436",
        alpha: "#BC2C43",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "night"], // add your themes here
  },
};
