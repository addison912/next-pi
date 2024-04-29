import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

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
        <body className={`min-w-360 overflow-scroll`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
