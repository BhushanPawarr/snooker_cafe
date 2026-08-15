"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SnookerBackground from "@/components/SnookerBackground";

const VIDEO_SRC = "/videos/hero-bg.mp4";

export default function HeroBackground() {
  const [videoFailed, setVideoFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Progress goes 0 -> 1 as the hero section scrolls from fully in view
  // to fully scrolled past the top of the viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const dimOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.6]);

  if (videoFailed) {
    return <SnookerBackground />;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Oversized wrapper gives room for the parallax shift without exposing edges */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-x-0 -top-[15%] h-[130%] w-full"
      >
        <video
          className="h-full w-full object-cover grayscale-[65%] contrast-125 brightness-75"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setVideoFailed(true)}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </motion.div>
      {/* Duotone grade: recolors the felt's green toward gold/black instead of desaturating flat */}
      <div className="absolute inset-0 bg-gold mix-blend-color opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-felt-dark/85 via-felt-dark/65 to-felt-dark/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-felt-dark/90 via-transparent to-felt-dark/20" />
      {/* Scroll-linked dim layer: darkens progressively as the hero scrolls away */}
      <motion.div
        style={{ opacity: dimOpacity }}
        className="absolute inset-0 bg-felt-dark"
      />
    </div>
  );
}
