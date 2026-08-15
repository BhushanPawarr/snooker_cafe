"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { OPEN_HOUR, CLOSE_HOUR } from "@/lib/slots";

const NAV_LINKS = [
  { href: "/#tables", label: "Tables" },
  { href: "/#hours", label: "Hours" },
  { href: "/#contact", label: "Location" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-felt/95 text-white backdrop-blur-md">
      <div className="hidden border-b border-white/10 sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-1.5 text-xs text-white/60">
          <span>
            Open daily &middot; {OPEN_HOUR}:00 &ndash; {CLOSE_HOUR}:00
          </span>
          <span>Near Shah Petrol Pump, Pandhurna, MP &middot; +91 92320 66129</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-wide text-gold-light"
        >
          Snooker Den
        </Link>

        <nav className="hidden gap-8 text-sm font-medium text-white/80 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 transition hover:text-gold-light [&:hover>span]:scale-x-100"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold-light transition-transform duration-300" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-felt-dark transition hover:scale-105 hover:bg-gold-light"
          >
            Book a Table
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 sm:hidden"
          >
            <div className="flex h-3 w-4 flex-col justify-between">
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5 : 0 }}
                className="h-px w-full bg-white"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                className="h-px w-full bg-white"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5 : 0 }}
                className="h-px w-full bg-white"
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 sm:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-2 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-gold-light"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
