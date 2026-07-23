"use client";

import { motion } from "framer-motion";

type Direction = "left" | "right" | "up";

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  left: { x: -60, y: 0 },
  right: { x: 60, y: 0 },
  up: { x: 0, y: 40 },
};

export default function ScrollReveal({
  children,
  direction = "left",
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  const offset = OFFSETS[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
