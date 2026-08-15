"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <ScrollReveal direction="up">
        <h2 className="font-display text-3xl font-bold">See It in Motion</h2>
        <p className="mt-2 text-foreground/70">
          The table, the lights, the break &mdash; live from the felt.
        </p>
      </ScrollReveal>
      <ScrollReveal direction="up" delay={0.1}>
        <motion.div
          whileHover={{ scale: 1.005 }}
          transition={{ duration: 0.4 }}
          className="relative mt-10 aspect-video overflow-hidden rounded-3xl border border-gold/20 shadow-2xl"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover grayscale-[65%] contrast-125 brightness-75"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gold mix-blend-color opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause video" : "Play video"}
            className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
          >
            {playing ? (
              <span className="flex gap-1">
                <span className="h-3 w-1 bg-white" />
                <span className="h-3 w-1 bg-white" />
              </span>
            ) : (
              <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-white" />
            )}
          </button>
        </motion.div>
      </ScrollReveal>
    </section>
  );
}
