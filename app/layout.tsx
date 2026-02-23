import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Fonts
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased scroll-smooth bg-gray-50 transition-colors duration-500`}
      >
        {/* Header */}
        <Navbar />

        {/* Main Content */}
        <main className="pt-24">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
