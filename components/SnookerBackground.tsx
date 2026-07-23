"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BALLS = [
  { color: "#c0392b", size: 220, top: "8%", left: "6%", duration: 22 },
  { color: "#e5c100", size: 140, top: "55%", left: "82%", duration: 26 },
  { color: "#1e8449", size: 180, top: "68%", left: "12%", duration: 30 },
  { color: "#7d5a3c", size: 120, top: "18%", left: "78%", duration: 20 },
  { color: "#2471a3", size: 160, top: "40%", left: "48%", duration: 24 },
  { color: "#c0398f", size: 110, top: "82%", left: "60%", duration: 28 },
  { color: "#111111", size: 90, top: "28%", left: "34%", duration: 18 },
  { color: "#f4f4f2", size: 70, top: "62%", left: "30%", duration: 32 },
];

export default function SnookerBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* felt cloth base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#12563a_0%,_#0d3b26_45%,_#08281a_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 6px)",
        }}
      />

      <motion.div style={{ y: parallaxY, opacity: fade }} className="absolute inset-0">
        {BALLS.map((ball, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              width: ball.size,
              height: ball.size,
              top: ball.top,
              left: ball.left,
              background: `radial-gradient(circle at 35% 30%, ${ball.color}cc, ${ball.color}55 60%, transparent 75%)`,
            }}
            animate={{
              x: [0, 24, -18, 0],
              y: [0, -20, 16, 0],
            }}
            transition={{
              duration: ball.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-felt-dark/90 via-transparent to-felt-dark/30" />
    </div>
  );
}
