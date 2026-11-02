import "~/styles/globals.css";

import { Space_Mono } from "next/font/google";
import type { Metadata } from "next";

const space = Space_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: {
    default: "soon.games",
    template: "%s | soon.games",
  },
  description: "soon.games - what's dropping today?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={space.variable}>
      <body>{children}</body>
    </html>
  );
}
