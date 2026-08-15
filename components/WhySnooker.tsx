import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export default function WhySnooker() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="glow-orb -left-24 top-10 h-72 w-72 bg-gold/40" />
      <div className="glow-orb -right-24 bottom-0 h-72 w-72 bg-gold-light/20" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2">
        <ScrollReveal direction="left">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/gallery/why-snooker.jpg"
              alt="Snooker Den table set up, with a graphic listing the mental benefits of playing snooker: concentration, decision-making, problem solving, memory, and hand-eye coordination"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <span className="rounded-full border border-gold/30 px-4 py-1 text-xs font-medium uppercase tracking-widest text-gold">
            More Than a Game
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold">
            Playing Snooker Sharpens the Mind
          </h2>
          <p className="mt-4 max-w-md text-foreground/70">
            It&apos;s not just an hour off the clock &mdash; every frame
            works your focus, patience, and precision.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Concentration",
              "Decision-making",
              "Problem solving",
              "Memory",
              "Hand-eye coordination",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
