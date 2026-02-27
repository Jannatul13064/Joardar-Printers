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
