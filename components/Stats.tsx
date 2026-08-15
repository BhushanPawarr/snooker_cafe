"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

function Counter({
  target,
  suffix = "",
  decimals = 0,
  duration = 1.6,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const STATS = [
  { target: 6, suffix: "", label: "Tournament tables" },
  { target: 500, suffix: "+", label: "Games played every month" },
  { target: 4.8, suffix: "★", decimals: 1, label: "Average player rating" },
  { target: 7, suffix: "", label: "Days open a week" },
];

export default function Stats() {
  return (
    <section className="bg-felt py-16 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
        {STATS.map((stat, i) => (
          <ScrollReveal key={stat.label} direction="up" delay={i * 0.08}>
            <div className="text-center">
              <p className="font-display text-4xl font-bold text-gold-light sm:text-5xl">
                <Counter
                  target={stat.target}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                />
              </p>
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
