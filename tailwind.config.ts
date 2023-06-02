import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";

module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/atoms/**/*.tsx",
    "../../packages/ui/molecules/**/*.tsx",
    "../../packages/ui/organisms/**/*.tsx",
    "../../packages/libs/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-dm-sans)", ...defaultTheme.fontFamily.sans],
      techigh: ["var(--font-techigh)", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      fontWeight: {
        semibold: "500", // DM Sans doesn't have semibold (600) variant
      },
      boxShadow: {
        "smooth-lg": "rgba(99, 99, 99, 0.1) 0px 2px 8px 0px",
      },

      height: {
        body: "calc(100vh - 64px)",
        /* @ts-expect-error */
        screen: ["100vh", "100dvh"],
      },

      minHeight: {
        /* @ts-expect-error */
        screen: ["100vh", "100dvh"],
      },

      maxHeight: {
        /* @ts-expect-error */
        screen: ["100vh", "100dvh"],
      },
    },
    colors: {
      white: "#fff",
      black: "#000",
      transparent: "transparent",
      current: "currentColor",

      "hon-gray": "#F6F2F3",
      "light-gray": "#89898F",

      primary: "var(--lightPrimary)",
      secondary: "var(--lightSecondary)",
      contrast: "var(--lightContrast)",
      "d-primary": "var(--darkPrimary)",
      "d-secondary": "var(--darkSecondary)",
      "d-contrast": "var(--darkContrast)",
      neutral: {
        50: "#F7F7F7",
        100: "#E9E9E9",
        200: "#DEDEDE",
        300: "#CBCBCB",
        400: "#D2D2D2",
        500: "#A3A3A3",
        600: "#808080",
        700: "#666666",
        800: "#4D4D4D",
        900: "#414141",
      },
      "d-neutral": {
        50: "#CBCBCC",
        100: "#949598",
        200: "#606266",
        300: "#46484D",
        400: "#313339",
        500: "#282A2F",
        600: "#232429",
        700: "#1F2025",
        800: "#191A1E",
        900: "#090A0B",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@headlessui/tailwindcss"),
    require("tailwind-gradient-mask-image"),
    plugin(({ addVariant }) => {
      addVariant("scroll-lock", '[data-scroll-lock="true"] &');
    }),
  ],
} satisfies Config;
