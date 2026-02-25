"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full shadow-md z-50 bg-transparent backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-bold text-red-600">
          <Link href="/" className="hover:text-red-600">
            Joardar Printers
          </Link>
        </h1>

        {/* Desktop Menu */}
        <div className="text-white hidden md:flex gap-8 font-medium">
          <Link href="/" className="hover:text-red-600">
            Home
          </Link>
          <Link href="/about" className="hover:text-red-600">
            About
          </Link>
          <Link href="/services" className="hover:text-red-600">
            Services
          </Link>
          <Link href="/portfolio" className="hover:text-red-600">
            Portfolio
          </Link>
          <Link href="/contact" className="hover:text-red-600">
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-md"
          >
            <div className="flex flex-col items-center gap-4 py-6 font-medium">
              <Link
                href="/"
                className="text-black hover:text-red-600"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-black hover:text-red-600"
                onClick={() => setOpen(false)}
              >
                About
              </Link>
              <Link
                href="/services"
                className="text-black hover:text-red-600"
                onClick={() => setOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/portfolio"
                className="text-black hover:text-red-600"
                onClick={() => setOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href="/contact"
                className="text-black hover:text-red-600"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
