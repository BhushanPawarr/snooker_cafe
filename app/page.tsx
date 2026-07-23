import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { OPEN_HOUR, CLOSE_HOUR } from "@/lib/slots";
import HeroBackground from "@/components/HeroBackground";
import ScrollReveal from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";

export default async function Home() {
  const tables = await prisma.table.findMany({
    where: { isActive: true },
    orderBy: { id: "asc" },
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-felt text-white">
        <HeroBackground />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-28 sm:py-36">
          <ScrollReveal direction="up">
            <span className="rounded-full border border-gold/40 px-4 py-1 text-xs font-medium uppercase tracking-widest text-gold-light">
              Snooker &middot; Coffee &middot; Good Company
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="font-display max-w-2xl text-4xl font-bold leading-tight sm:text-6xl">
              Where every break is a good one.
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="max-w-xl text-lg text-white/80">
              Snooker Den brings together premium tournament-grade snooker
              tables and a proper cafe menu, in one relaxed space. Book your
              table in under a minute.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex gap-4">
              <Link
                href="/book"
                className="rounded-full bg-gold px-6 py-3 font-semibold text-felt-dark shadow-lg shadow-black/30 transition hover:scale-105 hover:bg-gold-light"
              >
                Book a Table
              </Link>
              <a
                href="#tables"
                className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-white/60 hover:bg-white/5"
              >
                See Pricing
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 sm:grid-cols-3">
          {[
            {
              title: "Tournament-grade tables",
              body: "Precision-levelled tables, quality cloth, and full-size cues so every shot feels right.",
            },
            {
              title: "Real cafe menu",
              body: "Coffee, snacks, and light meals — play a frame, then stay for a bite.",
            },
            {
              title: "Easy online booking",
              body: "Pick a date, pick a free slot, and you're set. Pay at the counter when you arrive.",
            },
          ].map((item, i) => (
            <ScrollReveal key={item.title} direction="left" delay={i * 0.12}>
              <h3 className="font-display text-xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-foreground/70">{item.body}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Tables & Pricing */}
      <section id="tables" className="bg-black/[.03] py-20 dark:bg-white/[.03]">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal direction="up">
            <h2 className="font-display text-3xl font-bold">Tables &amp; Pricing</h2>
            <p className="mt-2 text-foreground/70">
              All rates are per hour. Reserve online, pay at the counter.
            </p>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tables.map((table, i) => (
              <ScrollReveal key={table.id} direction="left" delay={i * 0.08}>
                <div className="rounded-2xl border border-black/10 bg-background p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold">
                      {table.name}
                    </h3>
                    <span className="rounded-full bg-felt px-3 py-1 text-sm font-semibold text-gold-light">
                      ₹{table.hourlyRate}/hr
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-foreground/60">
                    Tournament-size table, full cue and ball set included.
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <ScrollReveal direction="up">
          <h2 className="font-display text-3xl font-bold">Inside the Cafe</h2>
          <p className="mt-2 text-foreground/70">
            A peek at the space.
          </p>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <ScrollReveal direction="left" className="sm:col-span-2">
            <div className="group relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/gallery/photo-1.jpg"
                alt="Snooker tables set up and ready to play at Snooker Den"
                fill
                sizes="(min-width: 640px) 1152px, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.1}>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/gallery/photo-2.jpg"
                alt="Players enjoying a game at Snooker Den"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.2}>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/gallery/photo-3.jpg"
                alt="Snooker Den table close-up with balls racked"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Hours */}
      <section id="hours" className="bg-black/[.03] py-20 dark:bg-white/[.03]">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal direction="up">
            <h2 className="font-display text-3xl font-bold">Hours</h2>
            <p className="mt-4 text-lg">
              Open daily,{" "}
              <span className="font-semibold">
                {OPEN_HOUR}:00 &ndash; {CLOSE_HOUR}:00
              </span>
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
