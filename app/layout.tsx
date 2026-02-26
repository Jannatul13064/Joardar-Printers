// app/layout.tsx
import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Joardar Printers",
  description: "Premium Packaging & Printing Solutions",
  openGraph: {
    title: "Joardar Printers",
    description: "Premium Packaging & Printing Solutions",
    url: "https://joardar-printers.vercel.app/", // replace with your site
    siteName: "Joardar Printers",
    images: [
      {
        url: "https://joardar-printers.vercel.app/thumbnail.png", // your thumbnail
        width: 300,
        height: 300,
        alt: "Joardar Printers Thumbnail",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joardar Printers",
    description: "Premium Packaging & Printing Solutions",
    images: ["https://joardar-printers.vercel.app/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased scroll-smooth bg-black text-white relative overflow-x-hidden`}
      >
        {/* GLOBAL BACKGROUND EFFECT */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          {/* Gradient Base */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

          {/* RED GLOW */}
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-red-500/30 blur-[180px] animate-pulse" />

          {/* YELLOW GLOW */}
          <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-yellow-400/30 blur-[180px] animate-pulse" />

          {/* CENTER LIGHT SPOT */}
          <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 bg-white/5 blur-[220px]" />

          {/* RADIAL SPOTLIGHT */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />

          {/* GRID PATTERN */}
          <div
            className="absolute inset-0 opacity-[0.04]
            bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),
            linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)]
            bg-[size:40px_40px]"
          />
        </div>

        {/* HEADER */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="pt-24 relative z-10">{children}</main>

        {/* FOOTER */}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
