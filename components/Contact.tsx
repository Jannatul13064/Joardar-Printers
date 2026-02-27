"use client";

import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaComment } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 px-6 md:px-12">
      {/* Preload video */}
      <link rel="preload" href="/contact.mp4" as="video" type="video/mp4" />

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto" // preloads video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/contact.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>

      {/* Content */}
      <div className="relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl text-center mb-16 font-extrabold text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Contact Us
        </motion.h2>

        <motion.form
          className="max-w-xl mx-auto flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Name Field */}
          <div className="relative">
            <FaUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg p-4 pl-12 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all duration-300 placeholder-white"
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg p-4 pl-12 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all duration-300 placeholder-white"
            />
          </div>

          {/* Message Field */}
          <div className="relative">
            <FaComment className="absolute top-4 left-4 text-gray-400" />
            <textarea
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-lg p-4 pt-6 pl-12 h-32 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all duration-300 resize-none placeholder-white"
            />
          </div>

          {/* Submit Button */}
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-2xl">
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}
