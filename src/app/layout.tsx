import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Inter, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

// Decorative heading font (temple / cosmic feel)
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", weight: ["400", "500", "600", "700"] });
// Elegant serif used for mantras and hero accents
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", weight: ["400", "500", "600", "700"] });
// Clean body font
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Readable Hindi / Sanskrit font
const notoDeva = Noto_Serif_Devanagari({ subsets: ["devanagari"], variable: "--font-noto-deva", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Aradhana — Your Daily Spiritual Companion",
  description:
    "Start a personalized devotional habit with aarti, jaap, Sankalp paths, and safe Guruji guidance.",
};

export const viewport: Viewport = {
  themeColor: "#18122b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} ${notoDeva.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
