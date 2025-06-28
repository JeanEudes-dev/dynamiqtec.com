/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            fontFamily: "var(--font-sans)",
            h1: { fontFamily: "var(--font-serif)" },
            h2: { fontFamily: "var(--font-serif)" },
            h3: { fontFamily: "var(--font-serif)" },
            code: { fontFamily: "var(--font-mono)", fontWeight: "500" },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
