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
        "lm-text": "#1a1a1a",
        "lm-bg": "#f8f8f8",
        "background-primary": "#1a1a1a",
      },
    },
  },
  plugins: [],
} satisfies Config;
