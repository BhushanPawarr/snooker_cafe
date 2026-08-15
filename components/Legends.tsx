import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const LEGENDS = [
  {
    name: "Judd Trump",
    achievement: "2019 World Champion",
    image: "/players/judd-trump.jpg",
    credit: "Martin Rulsch, Wikimedia Commons, CC BY-SA 4.0",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Judd_Trump_at_Snooker_German_Masters_(Martin_Rulsch)_2014-02-01_05.jpg",
  },
  {
    name: "Mark Selby",
    achievement: "World Champion",
    image: "/players/mark-selby.jpg",
    credit: "Andrej146, Wikimedia Commons, CC0",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Mark_Selby_2025_(2).jpg",
  },
  {
    name: "John Higgins",
    achievement: "World Champion",
    image: "/players/john-higgins.jpg",
    credit: "Rolandmuncie2, Wikimedia Commons, CC BY-SA 4.0",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:John_Higgins,_Crucible,_Sheffield_3._May_2019.jpg",
  },
  {
    name: "Neil Robertson",
    achievement: "2010 World Champion",
    image: "/players/neil-robertson.jpg",
    credit: "DerHexer, Wikimedia Commons, CC BY-SA 4.0",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Neil_Robertson_at_Snooker_German_Masters_(DerHexer)_2013-01-30_07.jpg",
  },
];

export default function Legends() {
  return (
    <section className="bg-black/[.03] py-20 dark:bg-white/[.03]">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal direction="up">
          <h2 className="font-display animate-gradient-text text-3xl font-bold">
            Legends Who Inspire Us
          </h2>
          <p className="mt-2 max-w-2xl text-foreground/70">
            Snooker Den isn&apos;t affiliated with these players &mdash; we
            just think the game&apos;s greats deserve a nod on our wall.
          </p>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {LEGENDS.map((p, i) => (
            <ScrollReveal key={p.name} direction="up" delay={i * 0.08}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={p.image}
                  alt={`${p.name}, ${p.achievement}`}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-felt-dark/90 via-felt-dark/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="font-display text-lg font-semibold">
                    {p.name}
                  </p>
                  <p className="text-xs text-white/70">{p.achievement}</p>
                </div>
              </div>
              <a
                href={p.creditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-center text-[11px] text-foreground/50 hover:text-foreground/80"
              >
                Photo: {p.credit}
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
