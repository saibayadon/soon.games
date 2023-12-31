import "~/styles/globals.css";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Space_Mono } from "next/font/google";

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
        {children}
        <SpeedInsights />
      </body>
      <Script strategy="lazyOnload">
        {`
          // De-register old SW.
          navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (let registration of registrations) {
              registration.unregister();
            }
          });
        `}
      </Script>
    </html>
  );
}
