"use client";

import { useRef, useEffect } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  /* -----------------------------
     VIDEO CONTROL
  ----------------------------- */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  /* -----------------------------
     TEXT ZOOM (ONLY CONTENT)
  ----------------------------- */
  useEffect(() => {
    let current = 0;
    let target = 0;
    const ease = 0.08;

    const animate = () => {
      target = window.scrollY;
      current += (target - current) * ease;

      const content = contentRef.current;
      if (content) {
        // subtle zoom + slight upward movement
        const scale = 1 + current / 2500;
        const translateY = current * 0.15;

        content.style.transform = `scale(${scale}) translateY(-${translateY}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  /* -----------------------------
     SCROLL TO NEXT SECTION
  ----------------------------- */
  const scrollToNext = () => {
    document.getElementById("next-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* 🎥 VIDEO (STATIC — NO ZOOM) */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/video-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero.webm" type="video/webm" />
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* 🌑 OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-10" />

      {/* ✨ LIGHT */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_60%)]" />

      {/* 🧠 TEXT CONTENT (ZOOM ONLY HERE) */}
      <div
        ref={contentRef}
        className="relative z-30 text-center max-w-5xl px-6 will-change-transform"
      >
        {/* 🧊 GLASS CARD */}
        <div className="inline-block px-6 py-4 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl">
          <h1 className="font-extrabold leading-none tracking-tight">
            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white">
              Premium
            </span>

            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl mt-2">
              <span className="bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                Packaging
              </span>
            </span>

            <span className="block text-3xl sm:text-5xl md:text-6xl text-white/60 mt-4">
              Reimagined
            </span>
          </h1>
        </div>

        {/* ✨ SUBTEXT */}
        <p className="mt-8 text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Crafted for modern brands that demand excellence.
          <br />
          Minimal design. Maximum impact.
        </p>

        {/* CTA */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={scrollToNext}
            className="px-8 py-3 rounded-full bg-white text-black font-medium
            hover:scale-105 active:scale-95 transition-transform duration-300 shadow-lg"
          >
            Explore Designs
          </button>

          <button
            className="px-8 py-3 rounded-full border border-white/20 text-white/80
            hover:bg-white/10 transition"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
