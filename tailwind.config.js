// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: {
          fontSize: theme("fontSize.4xl"),
          fontWeight: "bold",
          padding: "20px 20px 20px 0",
        },
        h2: {
          fontSize: theme("fontSize.2xl"),
          fontWeight: "bold",
          padding: "12px 12px 12px 0",
        },
        h3: {
          fontSize: theme("fontSize.xl"),
          fontWeight: "bold",
          padding: "8px 8px 8px 0",
        },
      });
    }),
  ],
};
