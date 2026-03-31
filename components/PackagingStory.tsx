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

  /* ---------------- PATH ---------------- */
  useEffect(() => {
    if (!stepRefs.current.length) return;

    const containerRect = containerRef.current?.getBoundingClientRect();

    if (!containerRect) return;

    const points = stepRefs.current
      .map((el) => {
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top + window.scrollY,
        };
      })
      .filter(Boolean) as { x: number; y: number }[];

    if (points.length < 2) return;

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];

      const cx = (prev.x + curr.x) / 2;
      const cy = (prev.y + curr.y) / 2;

      d += ` Q ${prev.x} ${prev.y} ${cx} ${cy}`;
    }

    setPathD(d);
  }, []);

  /* ---------------- PATH LENGTH ---------------- */
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathD]);

  /* ---------------- DOT MOVEMENT ---------------- */
  useEffect(() => {
    return pathProgress.on("change", (v) => {
      if (!pathRef.current || !dotRef.current) return;

      const point = pathRef.current.getPointAtLength(v * pathLength);

      dotRef.current.style.transform = `translate(${point.x}px, ${point.y}px)`;
    });
  }, [pathLength, pathProgress]);

  /* ---------------- ACTIVE STEP ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();

        if (rect.top < window.innerHeight / 2) {
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

      {/* STEPS */}
      <div className="relative max-w-6xl mx-auto px-4 md:px-12 pb-24">
        <div className="flex flex-col gap-20 md:gap-32">
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;

            return (
              <div
                key={i}
                ref={(el) => (stepRefs.current[i] = el)}
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
                      active === i ? "shadow-purple-500/40 scale-[1.02]" : ""
                    }`}
                  >
                    {/* GLOW */}
                    {active === i && (
                      <motion.div
                        layoutId="glow"
                        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-3xl opacity-30"
                      />
                    )}

                    <div className="relative z-10 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-400 text-xs md:text-sm">
                          Step {String(i + 1).padStart(2, "0")}
                        </span>

                        <span className="text-[10px] md:text-xs bg-white/10 px-2 md:px-3 py-1 rounded-full">
                          {i === 0 && "Planning"}
                          {i === 1 && "Design"}
                          {i === 2 && "Review"}
                          {i === 3 && "Production"}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-semibold">
                        {step.title}
                      </h3>

                      <p className="text-gray-300 text-xs md:text-sm">
                        {step.desc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-gray-300">
                        <div>
                          <p className="text-white font-medium mb-1">
                            Key Focus
                          </p>
                          <p>
                            {i === 0 && "Material quality & durability"}
                            {i === 1 && "Structure & branding"}
                            {i === 2 && "Accuracy & approval"}
                            {i === 3 && "Mass production efficiency"}
                          </p>
                        </div>

                        <div>
                          <p className="text-white font-medium mb-1">Outcome</p>
                          <p>
                            {i === 0 && "Strong packaging base"}
                            {i === 1 && "Professional design output"}
                            {i === 2 && "Error-free mockup"}
                            {i === 3 && "Final production ready"}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 text-xs text-gray-300">
                        <p className="text-white font-medium mb-1">
                          Highlights
                        </p>

                        <ul className="space-y-1">
                          {i === 0 && (
                            <>
                              <li>• Paper & coating selection</li>
                              <li>• Strength testing</li>
                            </>
                          )}
                          {i === 1 && (
                            <>
                              <li>• 3D box structure</li>
                              <li>• Branding alignment</li>
                            </>
                          )}
                          {i === 2 && (
                            <>
                              <li>• Digital preview</li>
                              <li>• Client feedback loop</li>
                            </>
                          )}
                          {i === 3 && (
                            <>
                              <li>• Large-scale printing</li>
                              <li>• Quality control checks</li>
                            </>
                          )}
                        </ul>
                      </div>
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
