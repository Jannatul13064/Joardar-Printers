"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaBoxOpen, FaPrint, FaTags, FaGift, FaPalette } from "react-icons/fa";

/* ---------------- TYPES ---------------- */

type Service = {
  title: string;
  icon: React.ReactNode;
};

/* ---------------- MAIN ---------------- */

export default function Services() {
  const services: Service[] = [
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

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {services.map((service, i) => (
          <InteractiveCard key={i} service={service} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- INTERACTIVE CARD ---------------- */

function InteractiveCard({ service }: { service: Service }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), {
    stiffness: 120,
    damping: 15,
  });

  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), {
    stiffness: 120,
    damping: 15,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const posX = e.clientX - rect.left - rect.width / 2;
    const posY = e.clientY - rect.top - rect.height / 2;

    x.set(posX);
    y.set(posY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative group cursor-pointer"
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* Card */}
      <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
        {/* Shine Effect */}
        <div className="absolute top-0 left-[-150%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[150%] transition-all duration-1000" />

        {/* Icon */}
        <motion.div
          className="text-blue-400 text-5xl mb-6"
          whileHover={{
            scale: 1.2,
            rotate: 8,
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {service.icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-white group-hover:text-blue-300 transition">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          We deliver high-quality {service.title.toLowerCase()} with precision
          and creativity to make your brand stand out.
        </p>

        {/* Bottom Line Animation */}
        <div className="mt-6 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
      </div>
    </motion.div>
  );
}
