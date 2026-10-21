import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tj: {
          bg: "#080808",
          surface: "#141414",
          light: "#F4F4F4",
          textDark: "#F5F5F5",
          textLight: "#151515",
          secondary: "#A8A8A8",
          silver: "#BDBDBD",
        },
      },
      fontFamily: {
        serif: ['"Jost"', "sans-serif"],
        sans: ['"Jost"', "sans-serif"],
        display: ["var(--font-display)", '"Jost"', "Impact", "sans-serif"],
        spirit: ['"Jost"', "sans-serif"],
        cinzel: ['"Jost"', "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.22em",
        wideLabel: "0.14em",
      },
    },
  },
  plugins: [],
};

export default config;
