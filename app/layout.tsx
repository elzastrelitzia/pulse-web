import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pulse - Music streaming for everyone",
  description:
    "Pulse is a lightweight Android music player for YouTube Music. Play almost any song, keep lyrics, cache tracks for offline listening, and sync playlists.",
  keywords: [
    "Pulse",
    "YouTube Music",
    "Android music player",
    "offline music",
    "lyrics",
  ],
  openGraph: {
    type: "website",
    siteName: "Pulse",
    title: "Pulse - Music streaming for everyone",
    description:
      "A lightweight Android music player for YouTube Music. Lyrics, offline cache, Material You themes, Android Auto.",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "Pulse app icon" }],
  },
  twitter: {
    card: "summary",
    title: "Pulse - Music streaming for everyone",
    description: "A lightweight Android music player for YouTube Music.",
    images: ["/icon.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
