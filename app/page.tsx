import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { OPEN_HOUR, CLOSE_HOUR } from "@/lib/slots";

export const dynamic = "force-dynamic";

export default async function Home() {
  const tables = await prisma.table.findMany({
    where: { isActive: true },
    orderBy: { id: "asc" },
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-felt text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24">
          <span className="rounded-full border border-gold/40 px-4 py-1 text-xs font-medium uppercase tracking-widest text-gold-light">
            Snooker &middot; Coffee &middot; Good Company
          </span>
          <h1 className="font-display max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            Where every break is a good one.
          </h1>
          <p className="max-w-xl text-lg text-white/80">
            Snooker Den brings together premium tournament-grade snooker
            tables and a proper cafe menu, in one relaxed space. Book your
            table in under a minute.
          </p>
          <div className="flex gap-4">
            <Link
              href="/book"
              className="rounded-full bg-gold px-6 py-3 font-semibold text-felt-dark transition hover:bg-gold-light"
            >
              Book a Table
            </Link>
            <a
              href="#tables"
              className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-white/60"
            >
              See Pricing
            </a>
          </div>
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
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-foreground/70">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tables & Pricing */}
      <section id="tables" className="bg-black/[.03] py-20 dark:bg-white/[.03]">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold">Tables &amp; Pricing</h2>
          <p className="mt-2 text-foreground/70">
            All rates are per hour. Reserve online, pay at the counter.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tables.map((table) => (
              <div
                key={table.id}
                className="rounded-2xl border border-black/10 bg-background p-6 shadow-sm dark:border-white/10"
              >
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
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl font-bold">Inside the Cafe</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-gradient-to-br from-felt to-felt-dark"
            />
          ))}
        </div>
        <p className="mt-4 text-sm text-foreground/50">
          Photo gallery placeholder — swap in real photos of the cafe and tables.
        </p>
      </section>

      {/* Hours */}
      <section id="hours" className="bg-black/[.03] py-20 dark:bg-white/[.03]">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold">Hours</h2>
          <p className="mt-4 text-lg">
            Open daily,{" "}
            <span className="font-semibold">
              {OPEN_HOUR}:00 &ndash; {CLOSE_HOUR}:00
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
