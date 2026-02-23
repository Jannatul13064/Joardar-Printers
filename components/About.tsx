"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaBoxOpen, FaPrint, FaTags, FaAward } from "react-icons/fa";

export default function About() {
  const stats = [
    { icon: <FaBoxOpen />, label: "Custom Boxes", value: "500+" },
    { icon: <FaPrint />, label: "Print Projects", value: "1200+" },
    { icon: <FaTags />, label: "Labels Printed", value: "3000+" },
    { icon: <FaAward />, label: "Years Experience", value: "10+" },
  ];

  const services = [
    { name: "Custom Packaging", detail: "Premium custom boxes for all brands" },
    { name: "Offset Printing", detail: "High-quality large-scale printing" },
    { name: "Label Design", detail: "Creative and durable product labels" },
    {
      name: "Brand Identity",
      detail: "Complete branding & printing solutions",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden px-6 md:px-12"
    >
      {/* Decorative Background Blurs */}
      <motion.div
        className="absolute top-0 left-0 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className="rounded-xl shadow-2xl overflow-hidden"
        >
          <Image
            src="/printing.jpg"
            width={600}
            height={400}
            alt="Printing Machine"
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-white">
            About Joardar Printers
          </h2>

          <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
            Joardar Printers is a leading packaging and printing company
            delivering premium-quality solutions. We combine modern printing
            technology with creative design to help brands stand out with
            beautiful and professional packaging.
          </p>

          {/* Stats with Icons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-red-600 text-3xl">{stat.icon}</div>
                <div>
                  <p className="text-lg font-semibold">{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
