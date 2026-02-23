"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full shadow-md z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-bold text-red-600">
          Joardar Printers
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 font-medium">
          <a href="#home" className="hover:text-red-600">
            Home
          </a>
          <a href="#about" className="hover:text-red-600">
            About
          </a>
          <a href="#services" className="hover:text-red-600">
            Services
          </a>
          <a href="#portfolio" className="hover:text-red-600">
            Portfolio
          </a>
          <a href="#contact" className="hover:text-red-600">
            Contact
          </a>
        </div>

        {/* Mobile Button */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
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
              <a href="#home" onClick={() => setOpen(false)}>
                Home
              </a>
              <a href="#about" onClick={() => setOpen(false)}>
                About
              </a>
              <a href="#services" onClick={() => setOpen(false)}>
                Services
              </a>
              <a href="#portfolio" onClick={() => setOpen(false)}>
                Portfolio
              </a>
              <a href="#contact" onClick={() => setOpen(false)}>
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
