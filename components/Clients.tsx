"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ClientSlider() {
  const logos = [
    "/clients/client1.png",
    "/clients/client2.png",
    "/clients/client3.png",
    "/clients/client4.png",
    "/clients/client5.png",
    "/clients/client6.jpg",
  ];

  return (
    <section className="py-16 overflow-hidden">
      <div className="text-center mb-10">
        <h2 className=" text-white text-3xl font-bold">
          Trusted by Leading Companies
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-12"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-[200px]"
            >
              <Image
                src={logo}
                alt="client logo"
                width={140}
                height={80}
                className="object-contain grayscale-0 hover:grayscale transition"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
