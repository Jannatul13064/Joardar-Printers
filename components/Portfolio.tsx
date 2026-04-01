"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

/* TYPE */
type PortfolioItem = {
  id: number;
  src: string;
  title: string;
};

const portfolioItems: PortfolioItem[] = [
  { id: 1, src: "/pack/design1.jpg", title: "Luxury Box" },
  { id: 2, src: "/pack/design2.jpg", title: "Eco Packaging" },
  { id: 3, src: "/pack/design1.jpg", title: "Creative Labels" },
  { id: 4, src: "/pack/design1.jpg", title: "Custom Printing" },
  { id: 5, src: "/pack/design1.jpg", title: "Gift Packaging" },
  { id: 6, src: "/pack/design1.jpg", title: "Branded Boxes" },
];

/* 🎬 APPLE-STYLE VARIANTS */
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1], // ✨ Apple-like easing
    },
  },
};

export default function Portfolio() {
  return (
    <section className="py-24 px-6 md:px-12 bg-black text-white">
      {/* TITLE */}
      <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-20">
        Packageing Design
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: index * 0.08,
            }}
            className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-2xl"
          >
            {/* IMAGE */}
            <Image
              src={item.src}
              alt={item.title}
              width={800}
              height={600}
              className="w-full h-[320px] md:h-[380px] object-cover 
              transition duration-700 group-hover:scale-110"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
              <h3 className="text-lg md:text-2xl font-bold">{item.title}</h3>
            </div>

            {/* GLOW */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-blue-500/10 blur-2xl" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
