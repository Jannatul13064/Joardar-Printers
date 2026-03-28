"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import Lenis from "lenis";

/* -----------------------------
   LENIS SMOOTH SCROLL
----------------------------- */
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      lerp: 0.08,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
}

/* -----------------------------
   3D BOX
----------------------------- */
function Box({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
      ref.current.rotation.x += 0.0015;
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

/* -----------------------------
   CAMERA
----------------------------- */
function CameraRig({ scroll }: { scroll: any }) {
  const { camera } = useThree();

  const x = useTransform(scroll, [0, 1], [-2, 2]);
  const y = useTransform(scroll, [0, 1], [0, 1]);
  const z = useTransform(scroll, [0, 1], [5, 3]);

  useFrame(() => {
    camera.position.x = x.get();
    camera.position.y = y.get();
    camera.position.z = z.get();
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* -----------------------------
   MAIN COMPONENT
----------------------------- */
export default function BoxCustomizer3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLenis();

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div ref={containerRef} className="bg-black text-white">
      {/* Scroll area */}
      <div className="h-[400vh]">
        <motion.div
          className="sticky top-0 h-screen w-[400vw] flex"
          style={{ x }}
        >
          <Section
            name="01"
            title="Custom Box"
            subtitle="Design your perfect box"
            color="#6366f1"
          />

          <Section
            name="02"
            title="Gift Box"
            subtitle="Make moments memorable"
            color="#ec4899"
          />

          <Section
            name="03"
            title="Premium Box"
            subtitle="Luxury at its finest"
            color="#10b981"
          />

          <Section
            name="04"
            title="Build Your Own"
            subtitle="Endless customization"
            color="#f59e0b"
          />
        </motion.div>
      </div>
    </div>
  );
}

/* -----------------------------
   RESPONSIVE SECTION
----------------------------- */
function Section({
  name,
  title,
  subtitle,
  color,
}: {
  name: string;
  title: string;
  subtitle: string;
  color: string;
}) {
  return (
    <div className="w-screen h-screen flex items-center justify-center px-6 md:px-20 shrink-0">
      {/* Responsive container */}
      <div className="w-full max-w-7xl flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* TEXT */}
        <div className="space-y-4 text-center md:text-left">
          {/* SECTION LABEL */}
          <p className="text-xs md:text-sm tracking-[0.4em] text-white/40 uppercase">
            Section {name}
          </p>

          {/* TITLE */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
            {title}
          </h1>

          {/* SUBTITLE */}
          <p className="text-base md:text-lg text-gray-400 max-w-md mx-auto md:mx-0">
            {subtitle}
          </p>
        </div>

        {/* 3D BOX */}
        <div className="w-full h-[280px] sm:h-[350px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
          <Canvas dpr={[1, 1.5]}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 3, 3]} intensity={1.2} />
            <CameraRig scroll={useScroll().scrollYProgress} />
            <Box color={color} />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
