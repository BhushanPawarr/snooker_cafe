import ScrollReveal from "@/components/ScrollReveal";

const MENU = [
  { name: "Filter Coffee", price: "₹60", tag: "House special" },
  { name: "Masala Chai", price: "₹40", tag: "" },
  { name: "Club Sandwich", price: "₹180", tag: "" },
  { name: "Loaded Fries", price: "₹150", tag: "Popular" },
  { name: "Cold Brew", price: "₹120", tag: "" },
  { name: "Grilled Cheese", price: "₹140", tag: "" },
];

export default function MenuPreview() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <ScrollReveal direction="up">
        <h2 className="font-display text-3xl font-bold">From the Cafe</h2>
        <p className="mt-2 text-foreground/70">
          A taste of what&apos;s on the menu.
        </p>
      </ScrollReveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MENU.map((item, i) => (
          <ScrollReveal key={item.name} direction="up" delay={i * 0.05}>
            <div className="flex items-center justify-between rounded-xl border border-black/10 bg-background px-5 py-4 dark:border-white/10">
              <div>
                <p className="font-medium">{item.name}</p>
                {item.tag && (
                  <p className="text-xs text-gold">{item.tag}</p>
                )}
              </div>
              <span className="font-display font-semibold text-foreground/80">
                {item.price}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
