"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full shadow-md z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-bold text-blue-600">
          <Link href="/">Joardar Printers</Link>
        </h1>

        {/* Desktop Menu */}
        <div className="text-white hidden md:flex gap-8 font-medium">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link href="/services" className="hover:text-blue-600">
            Services
          </Link>
          <Link href="/portfolio" className="hover:text-blue-600">
            Portfolio
          </Link>
          <Link href="/contact" className="hover:text-blue-600">
            Contact
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu (STATIC) */}
      {open && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col items-center gap-4 py-6 font-medium">
            <Link
              href="/"
              className="text-black hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-black hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              About
            </Link>

            <Link
              href="/services"
              className="text-black hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              Services
            </Link>

            <Link
              href="/portfolio"
              className="text-black hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              Portfolio
            </Link>

            <Link
              href="/contact"
              className="text-black hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
