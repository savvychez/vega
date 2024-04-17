/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "var(--foreground)",
        contrast_foreground: "var(--background)",
        btn: {
          background: "var(--btn-background)",
          "background-hover": "var(--btn-background-hover)",
        },
      },
    },
  },
  plugins: [],
};
