import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
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
    },
  },
  plugins: [],
} satisfies Config;
