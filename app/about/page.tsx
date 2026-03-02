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

  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1 }}
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
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-white">
            About Joardar Printers
          </h2>

          <p className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">
            Joardar Printers is a leading packaging and printing company
            delivering premium-quality solutions. We combine modern printing
            technology with creative design to help brands stand out with
            beautiful and professional packaging.
          </p>

          {/* Stats */}
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
                <div className="text-blue-600 text-3xl">{stat.icon}</div>
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
