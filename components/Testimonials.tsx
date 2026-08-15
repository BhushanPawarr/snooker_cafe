import ScrollReveal from "@/components/ScrollReveal";

const TESTIMONIALS = [
  {
    name: "Aarav Mehta",
    role: "Weekend regular",
    quote:
      "Best tables in the city, hands down. The cloth is always tight and the lighting is spot on.",
  },
  {
    name: "Priya Nair",
    role: "League player",
    quote:
      "We moved our whole Thursday league here. Great tables, great coffee, zero complaints.",
  },
  {
    name: "Rohan Kapoor",
    role: "First-time visitor",
    quote:
      "Walked in for one frame, stayed for three and a plate of fries. Will be back.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <ScrollReveal direction="up">
        <h2 className="font-display text-3xl font-bold">What Players Say</h2>
        <p className="mt-2 text-foreground/70">Real feedback from the felt.</p>
      </ScrollReveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <ScrollReveal key={t.name} direction="up" delay={i * 0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-black/10 bg-background p-6 shadow-sm dark:border-white/10">
              <p className="flex-1 text-sm leading-relaxed text-foreground/80">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-felt text-sm font-semibold text-gold-light">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-foreground/60">{t.role}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
