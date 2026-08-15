"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

type GalleryImage = {
  src: string;
  alt: string;
  aspect: string;
};

const IMAGES: GalleryImage[] = [
  {
    src: "/gallery/cafe-1.jpg",
    alt: "Snooker Den's tables and branded wall art, players mid-game",
    aspect: "aspect-[9/16]",
  },
  {
    src: "/gallery/photo-1.jpg",
    alt: "Snooker tables set up and ready to play at Snooker Den",
    aspect: "aspect-[16/9]",
  },
  {
    src: "/gallery/cafe-3.jpg",
    alt: "Cues crossed on the felt, corner pocket in view",
    aspect: "aspect-[6/5]",
  },
  {
    src: "/gallery/cafe-4.jpg",
    alt: "A player lining up a shot at Snooker Den",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/gallery/photo-2.jpg",
    alt: "Players enjoying a game at Snooker Den",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/gallery/cafe-5.jpg",
    alt: "Two tables in action beneath the Snooker Den player wall",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/gallery/table-banner.jpg",
    alt: "Reds racked and ready on a Snooker Den table",
    aspect: "aspect-[21/9]",
  },
  {
    src: "/gallery/photo-3.jpg",
    alt: "Snooker Den table close-up with balls racked",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/gallery/cafe-6.jpg",
    alt: "A frame in progress at Snooker Den",
    aspect: "aspect-[3/4]",
  },
];

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <ScrollReveal direction="up">
        <h2 className="font-display text-3xl font-bold">Inside the Cafe</h2>
        <p className="mt-2 text-foreground/70">A peek at the space.</p>
      </ScrollReveal>

      <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {IMAGES.map((img, i) => (
          <ScrollReveal
            key={img.src}
            direction="up"
            delay={(i % 3) * 0.08}
            className="mb-5 block break-inside-avoid"
          >
            <motion.button
              type="button"
              onClick={() => setOpenIndex(i)}
              layoutId={`gallery-${img.src}`}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative block w-full overflow-hidden rounded-2xl shadow-lg ${img.aspect}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 transition duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 right-4 text-xs font-medium text-white opacity-0 transition duration-300 group-hover:opacity-100">
                View
              </span>
            </motion.button>
          </ScrollReveal>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
          >
            <motion.div
              layoutId={`gallery-${IMAGES[openIndex].src}`}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[80vh] w-full max-w-4xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={IMAGES[openIndex].src}
                alt={IMAGES[openIndex].alt}
                fill
                sizes="100vw"
                className="object-contain bg-black"
              />
            </motion.div>
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-xl text-white transition hover:bg-white/10"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
