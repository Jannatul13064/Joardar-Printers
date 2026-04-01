"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaBoxOpen, FaPrint, FaTags, FaAward } from "react-icons/fa";

/* ---------------- TYPES ---------------- */

type Stat = {
  icon: React.ReactNode;
  label: string;
  value: number;
};

type StatCardProps = {
  stat: Stat;
  delay: number;
};

/* ---------------- MAIN ---------------- */

export default function About() {
  const stats: Stat[] = [
    { icon: <FaBoxOpen />, label: "Custom Boxes", value: 500 },
    { icon: <FaPrint />, label: "Print Projects", value: 1200 },
    { icon: <FaTags />, label: "Labels Printed", value: 3000 },
    { icon: <FaAward />, label: "Years Experience", value: 10 },
  ];

  return (
    <section className="relative py-28 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* IMAGE */}
        <InteractiveImage />

        {/* CONTENT */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-4xl md:text-5xl font-extrabold leading-tight text-white"
          >
            We Don’t Just Print — <br />
            We Build Perception
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-gray-300 mt-6 text-lg leading-relaxed"
          >
            At Joardar Printers, every package is engineered with precision. We
            blend advanced printing technology with thoughtful design to create
            packaging that captures attention and elevates brands.
          </motion.p>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-6 mt-10">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} delay={index * 0.15} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- INTERACTIVE IMAGE ---------------- */

function InteractiveImage() {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), {
    stiffness: 120,
    damping: 15,
  });

  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), {
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
      whileHover={{ scale: 1.04 }}
      className="relative group"
    >
      {/* Image */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <Image
          src="/printing.jpg"
          width={700}
          height={500}
          alt="Printing Machine"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Shine */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div className="absolute top-0 left-[-150%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[150%] transition-all duration-1000" />
      </div>
    </motion.div>
  );
}

/* ---------------- STAT CARD ---------------- */

function StatCard({ stat, delay }: StatCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });

  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = stat.value;

    const duration = 1200;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;

      if (start >= end) {
        start = end;
        clearInterval(counter);
      }

      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(counter);
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.05 }}
      viewport={{ once: true }}
      className="relative p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg group overflow-hidden"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl" />

      <div className="relative flex items-center gap-4">
        <div className="text-blue-400 text-3xl transition-transform group-hover:scale-110">
          {stat.icon}
        </div>

        <div>
          <p className="text-2xl font-bold text-white">{count}+</p>
          <p className="text-gray-400 text-sm">{stat.label}</p>
        </div>
      </div>

      <div className="mt-4 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
    </motion.div>
  );
}
