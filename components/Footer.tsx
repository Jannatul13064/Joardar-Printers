"use client";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="text-white pt-16 pb-8 px-6 md:px-12">
      {/* Top Section: Company + Newsletter */}
      <motion.div
        className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Company Info */}
        <div className="text-center lg:text-left max-w-sm">
          <h2 className="text-2xl font-bold mb-3">Joardar Printers</h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Premium packaging and printing solutions designed to elevate your
            brand identity.
          </p>
        </div>

        {/* Quick Links + Social Icons */}
        <div className="flex flex-col sm:flex-row gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-center sm:text-left">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base text-center sm:text-left">
              {["Home", "About", "Services", "Portfolio", "Contact"].map(
                (link, i) => (
                  <li key={i}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="hover:text-blue-500 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-center sm:text-left">
              Follow Us
            </h3>
            <div className="flex justify-center sm:justify-start gap-4 text-2xl">
              {[FaFacebook, FaInstagram, FaLinkedin].map((Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="cursor-pointer text-gray-400 hover:text-blue-500 transition duration-200"
                >
                  <Icon />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-start gap-4">
          <h3 className="text-xl font-semibold mb-2 text-start">Subscribe</h3>
          <div className="flex gap-2 w-full max-w-xs">
            <div className="relative flex-1">
              <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-white" />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-full py-2.5 pl-10 pr-4 text-white placeholder-white border border-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 px-5 rounded-full text-sm sm:text-base transition duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </motion.div>

      {/* Bottom */}
      <motion.div
        className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400 text-sm sm:text-base"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        © {new Date().getFullYear()} Joardar Printers. All Rights Reserved. |
        Developed by JI Akash
      </motion.div>
    </footer>
  );
}
