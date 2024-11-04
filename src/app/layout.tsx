import "~/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Space_Mono } from "next/font/google";
import { Suspense } from "react";

const space = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
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
      <body className={`${space.className}`}>
        <Suspense>{children}</Suspense>
        <SpeedInsights />
      </body>
    </html>
  );
}
