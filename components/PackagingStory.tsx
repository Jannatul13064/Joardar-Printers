"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

type Step = {
  title: string;
  desc: string;
};

const steps: Step[] = [
  {
    title: "Material Selection",
    desc: "Choosing the right paper, thickness, and coating for durability.",
  },
  {
    title: "Box Design",
    desc: "Creating structural and branding design with precision.",
  },
  {
    title: "Mockup Preview",
    desc: "Visualizing final packaging before production approval.",
  },
  {
    title: "Production",
    desc: "Mass production with high quality control.",
  },
];

export default function PackagingJourney() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [pathD, setPathD] = useState("");
  const [pathLength, setPathLength] = useState(0);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
  });

  const pathProgress = useTransform(smoothProgress, [0, 1], [0, 1]);

  /* ---------------- PATH GENERATION ---------------- */
  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      const points = stepRefs.current
        .map((el) => {
          if (!el) return null;

          const rect = el.getBoundingClientRect();

          return {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top,
          };
        })
        .filter(Boolean) as { x: number; y: number }[];

      if (points.length < 2) {
        setPathD(""); // prevent invalid path
        return;
      }

      let d = `M ${points[0].x} ${points[0].y}`;

      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];

        const midY = (prev.y + curr.y) / 2;

        // Smooth cubic curve
        d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
      }

      setPathD(d);
    };

    const raf = requestAnimationFrame(updatePath);

    window.addEventListener("resize", updatePath);
    window.addEventListener("scroll", updatePath);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updatePath);
      window.removeEventListener("scroll", updatePath);
    };
  }, []);

  /* ---------------- PATH LENGTH ---------------- */
  useEffect(() => {
    if (!pathRef.current || !pathD) return;

    try {
      const length = pathRef.current.getTotalLength();

      if (!length || isNaN(length)) return;

      setPathLength(length);
    } catch {
      setPathLength(0);
    }
  }, [pathD]);

  /* ---------------- DOT MOVEMENT ---------------- */
  useEffect(() => {
    if (!pathRef.current || pathLength <= 0 || !pathD) return;

    return pathProgress.on("change", (v) => {
      if (!pathRef.current || !dotRef.current) return;

      try {
        const point = pathRef.current.getPointAtLength(v * pathLength);

        dotRef.current.style.transform = `translate(${point.x}px, ${point.y}px)`;
      } catch {
        // prevent crash
      }
    });
  }, [pathLength, pathProgress, pathD]);

  /* ---------------- ACTIVE STEP ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      stepRefs.current.forEach((el, i) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.6) {
          setActive(i);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-black text-white overflow-hidden"
    >
      {/* TITLE */}
      <div className="text-center py-16 md:py-24 px-4">
        <h2 className="text-3xl md:text-6xl font-bold">Packaging Journey</h2>
      </div>

      {/* SVG PATH */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {pathD && (
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="rgba(168,85,247,0.4)"
            strokeWidth="2"
            strokeDasharray="6 10"
          />
        )}
      </svg>

      {/* DOT */}
      {pathD && (
        <div
          ref={dotRef}
          className="absolute z-10 w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.9)]"
        />
      )}

      {/* STEPS */}
      <div className="relative max-w-6xl mx-auto px-4 md:px-12 pb-24">
        <div className="flex flex-col gap-20 md:gap-32">
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;

            return (
              <div
                key={i}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className={`flex w-full ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                } justify-center`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="w-full sm:w-[90%] md:w-[420px]"
                >
                  <div
                    className={`relative bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl transition-all ${
                      active === i ? "shadow-purple-500/40 scale-[1.03]" : ""
                    }`}
                  >
                    {/* Glow */}
                    {active === i && (
                      <motion.div
                        layoutId="glow"
                        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-3xl opacity-30"
                      />
                    )}

                    <div className="relative z-10 space-y-4">
                      <span className="text-purple-400 text-xs">
                        Step {String(i + 1).padStart(2, "0")}
                      </span>

                      <h3 className="text-xl md:text-2xl font-semibold">
                        {step.title}
                      </h3>

                      <p className="text-gray-300 text-sm">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
