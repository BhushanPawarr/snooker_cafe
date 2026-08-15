"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const FAQS = [
  {
    q: "Do I need to book in advance?",
    a: "Walk-ins are welcome if a table is free, but booking online guarantees your slot, especially on weekends and evenings.",
  },
  {
    q: "Do you charge for cues, chalk, or balls?",
    a: "No — every table booking includes a full cue and ball set at no extra cost.",
  },
  {
    q: "Can I book for a group or a tournament?",
    a: "Yes, message us or call ahead for group bookings covering multiple tables at once.",
  },
  {
    q: "Is food available while I play?",
    a: "Yes — order from the cafe menu at your table, no need to leave your game.",
  },
  {
    q: "How does payment work?",
    a: "Reserve your slot online for free, then pay at the counter when you arrive.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <ScrollReveal direction="up">
        <h2 className="font-display text-3xl font-bold">Frequently Asked</h2>
        <p className="mt-2 text-foreground/70">
          Everything you need to know before you book.
        </p>
      </ScrollReveal>
      <div className="mt-10 divide-y divide-black/10 dark:divide-white/10">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="py-4">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-display text-lg font-semibold">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-2xl leading-none text-gold"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-3 text-sm text-foreground/70">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
