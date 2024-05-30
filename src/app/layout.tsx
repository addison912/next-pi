import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { roboto_flex } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "Predictit Insights",
  description:
    "An app to help track negative risk arbitrage opportunities on Predictit.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`min-w-360 overflow-scroll ${roboto_flex}`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
