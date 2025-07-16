import "~/styles/globals.css";

import { Space_Mono } from "next/font/google";
import { Suspense } from "react";
import { Metadata } from "next";

const space = Space_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "soon.games",
  description: "soon.games - what's dropping today?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${space.className}`}>{children} </body>
    </html>
  );
}
