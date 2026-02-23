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
      <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center mb-16 font-extrabold text-white">
        Our Services
      </h2>

      <motion.div
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {services.map((service, i) => (
          <motion.div
            key={i}
            className="p-8 rounded-2xl shadow-xl bg-white flex flex-col items-center text-center cursor-pointer group"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Icon */}
            <div className="text-red-600 text-5xl mb-6 transition-transform duration-300 group-hover:scale-110">
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900">
              {service.title}
            </h3>

            {/* Optional description */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We deliver high-quality {service.title.toLowerCase()} with
              precision and creativity to make your brand stand out.
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
