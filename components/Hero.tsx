"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const images = ["/hero/hero1.jpg", "/hero/hero2.jpg", "/hero/hero3.jpg"];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-12"
    >
      {/* Background Circles */}
      {/* <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-30"
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      /> */}

      {/* <motion.div
        className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-200 rounded-full blur-3xl opacity-30"
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      /> */}

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Premium Packaging & Printing
          </h1>

          <p className="text-gray-300 text-base sm:text-lg lg:text-xl mb-6">
            High-quality packaging solutions that make your brand stand out.
            From creative designs to precise printing, we deliver excellence.
          </p>

          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl">
            Explore Designs
          </button>
        </motion.div>

        {/* IMAGE SLIDER */}
        <div className="relative w-full flex justify-center md:justify-end">
          <div className="relative w-full max-w-md lg:max-w-lg aspect-square">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 rounded-3xl shadow-2xl overflow-hidden"
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={images[current]}
                    alt="Premium Packaging"
                    fill
                    priority
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
