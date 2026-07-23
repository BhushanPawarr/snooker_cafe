import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-felt/90 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-wide text-gold-light">
          Snooker Den
        </Link>
        <nav className="hidden gap-8 text-sm font-medium text-white/80 sm:flex">
          <Link href="/#tables" className="hover:text-gold-light">
            Tables
          </Link>
          <Link href="/#hours" className="hover:text-gold-light">
            Hours
          </Link>
          <Link href="/#contact" className="hover:text-gold-light">
            Location
          </Link>
        </nav>
        <Link
          href="/book"
          className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-felt-dark transition hover:scale-105 hover:bg-gold-light"
        >
          Book a Table
        </Link>
      </div>
    </header>
  );
}
