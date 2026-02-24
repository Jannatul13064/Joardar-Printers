"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaSearchPlus } from "react-icons/fa";

const portfolioItems = [
  { id: 1, src: "/pack/design1.jpg", title: "Luxury Box" },
  { id: 2, src: "/pack/design2.jpg", title: "Eco Packaging" },
  { id: 3, src: "/pack/design1.jpg", title: "Creative Labels" },
  { id: 4, src: "/pack/design1.jpg", title: "Custom Printing" },
  { id: 5, src: "/pack/design1.jpg", title: "Gift Packaging" },
  { id: 6, src: "/pack/design1.jpg", title: "Branded Boxes" },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-6 md:px-12">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center mb-16 font-extrabold text-white">
        Our Packaging Designs
      </h2>

      <motion.div
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {portfolioItems.map((item) => (
          <motion.div
            key={item.id}
            className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
            variants={{
              hidden: { opacity: 0, y: 60, scale: 0.9, rotate: -2 },
              visible: { opacity: 1, y: 0, scale: 1, rotate: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, 0], // playful tilt animation
              y: [0, -10, 5, 0], // slight bounce
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
          >
            {/* Image */}
            <Image
              src={item.src}
              width={500}
              height={400}
              alt={item.title}
              className="w-full h-auto object-cover rounded-3xl"
            />

            {/* Cartoon hover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-center gap-2"
            >
              <motion.div
                whileHover={{ scale: 1.3, rotate: [0, 15, -15, 0] }}
                className="flex flex-col items-center gap-2"
              >
                <FaSearchPlus className="text-white text-3xl sm:text-4xl" />
                <p className="text-white text-lg sm:text-xl font-bold text-center">
                  {item.title}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
