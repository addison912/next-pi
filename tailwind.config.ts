import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-roboto_flex)"],
      },
      backgroundImage: {
        "gradient-307": "linear-gradient(307deg, var(--tw-gradient-stops))",
      },
      colors: {
        "dm-text": "#f8f8f8",
        "dm-bg": "var(gray-900)",
        "background-primary": "#1a1a1a",
      },
      boxShadow: {
        md: "4px 4px 7px 0px rgb(0, 0, 0, .3)",
      },
      screens: {
        xs: "475px",
      },
      keyframes: {
        "open-menu": {
          "0%": { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },
        "close-menu": {
          "0%": { transform: "scaleY(1)" },
          "100%": { transform: "scaleY(0)" },
        },
      },
      animation: {
        "open-menu": "open-menu 0.1s ease-in-out",
        "close-menu": "close-menu 0.2s ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
