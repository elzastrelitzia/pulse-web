import type { ReactNode } from "react";
import "./globals.css";
import { ICON_URL } from "../lib/site";

export const metadata = {
  title: "libremusic",
  description:
    "libremusic — Music streaming for everyone. A maintained fork of ViMusic with better UI and UX.",
  icons: { icon: ICON_URL },
};

export const viewport = { themeColor: "#0a0a0a" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
