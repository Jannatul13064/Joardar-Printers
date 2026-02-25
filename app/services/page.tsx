"use client";
import { motion } from "framer-motion";
import { FaBoxOpen, FaPrint, FaTags, FaGift, FaPalette } from "react-icons/fa";

export default function Services() {
  const services = [
    { title: "Custom Packaging", icon: <FaBoxOpen /> },
    { title: "Offset Printing", icon: <FaPrint /> },
    { title: "Product Label Design", icon: <FaTags /> },
    { title: "Box Packaging", icon: <FaGift /> },
    { title: "Brand Identity Printing", icon: <FaPalette /> },
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-12">
      {/* Section Title */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center mb-16 font-extrabold text-white ">
        Our Services
      </h2>

      {/* Services Grid */}
      <motion.div
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {services.map((service, i) => (
          <motion.div
            key={i}
            className="p-8 rounded-2xl bg-white shadow-2xl flex flex-col items-center text-center cursor-pointer group"
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              scale: 1.06,
              y: -5,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
          >
            {/* Icon */}
            <motion.div
              className="text-red-600 text-5xl mb-6"
              whileHover={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.3, 1.2, 1],
                transition: { duration: 0.6, repeat: 1, ease: "easeInOut" },
              }}
            >
              {service.icon}
            </motion.div>

            {/* Title */}
            <motion.h3
              className="text-xl sm:text-2xl font-semibold mb-2 text-black"
              whileHover={{ x: 2, y: -2, transition: { duration: 0.3 } }}
            >
              {service.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              className="text-gray-800 text-sm sm:text-base leading-relaxed"
              whileHover={{ x: 1, y: -1, transition: { duration: 0.3 } }}
            >
              We deliver high-quality {service.title.toLowerCase()} with
              precision and creativity to make your brand stand out.
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
