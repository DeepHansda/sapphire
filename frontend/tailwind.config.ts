import { nextui } from "@nextui-org/react";
// import { config } from "process";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme"
const mainColor = "#a7c957"
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily:{
        'poppins':['Poppins',...defaultTheme.fontFamily.sans]
      },
      colors:{ 'hunter_green': { DEFAULT: '#386641', 100: '#0b140d', 200: '#16291a', 300: '#223d27', 400: '#2d5234', 500: '#386641', 600: '#51935e', 700: '#77b483', 800: '#a4cdac', 900: '#d2e6d6' }, 'asparagus': { DEFAULT: '#6a994e', 100: '#151e10', 200: '#2a3d1f', 300: '#3f5b2f', 400: '#54793e', 500: '#6a994e', 600: '#85b36b', 700: '#a4c690', 800: '#c2d9b5', 900: '#e1ecda' }, 'yellow_green': { DEFAULT: '#a7c957', 100: '#222b0e', 200: '#45561c', 300: '#67812a', 400: '#8aad38', 500: '#a7c957', 600: '#b8d377', 700: '#c9de99', 800: '#dbe9bb', 900: '#edf4dd' }, 'parchment': { DEFAULT: '#f2e8cf', 100: '#463813', 200: '#8d7027', 300: '#cba442', 400: '#dfc688', 500: '#f2e8cf', 600: '#f4edd9', 700: '#f7f1e2', 800: '#faf6ec', 900: '#fcfaf5' }, 'bittersweet_shimmer': { DEFAULT: '#bc4749', 100: '#260e0e', 200: '#4c1c1c', 300: '#73292b', 400: '#993739', 500: '#bc4749', 600: '#ca6c6e', 700: '#d79192', 800: '#e5b6b6', 900: '#f2dadb' } }

    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "dark", // default theme from the themes object
      defaultExtendTheme: "dark", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {}, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
           primary: {
            DEFAULT:mainColor
           }
          }


        },
        // ... custom themes
      },
    }),
  ],
};
export default config;
