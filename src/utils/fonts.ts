import { Roboto_Flex } from "next/font/google";

export const roboto_flex_init = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-flex",
  weight: ["100", "300", "500", "700"],
});

export const roboto_flex = roboto_flex_init.variable;
