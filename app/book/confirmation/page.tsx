import Link from "next/link";

export default async function ConfirmationPage(
  props: PageProps<"/book/confirmation">
) {
  const params = await props.searchParams;
  const table = typeof params.table === "string" ? params.table : null;
  const date = typeof params.date === "string" ? params.date : null;
  const start = typeof params.start === "string" ? params.start : null;
  const end = typeof params.end === "string" ? params.end : null;
  const rate = typeof params.rate === "string" ? params.rate : null;
  const name = typeof params.name === "string" ? params.name : null;

  if (!table || !date || !start || !end) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">
          No booking found
        </h1>
        <p className="mt-2 text-foreground/70">
          Head back to the booking page to reserve a table.
        </p>
        <Link
          href="/book"
          className="mt-6 inline-block rounded-full bg-gold px-6 py-3 font-semibold text-felt-dark hover:bg-gold-light"
        >
          Book a Table
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <span className="text-4xl">🎱</span>
      <h1 className="font-display mt-4 text-3xl font-bold">
        Booking Reserved{name ? `, ${name}` : ""}!
      </h1>
      <p className="mt-2 text-foreground/70">
        Your table is reserved. Please pay at the counter when you arrive.
      </p>

      <div className="mt-8 rounded-2xl border border-black/10 p-6 text-left dark:border-white/10">
        <dl className="grid grid-cols-2 gap-y-3 text-sm">
          <dt className="text-foreground/60">Table</dt>
          <dd className="font-medium">{table}</dd>
          <dt className="text-foreground/60">Date</dt>
          <dd className="font-medium">{date}</dd>
          <dt className="text-foreground/60">Time</dt>
          <dd className="font-medium">
            {start} &ndash; {end}
          </dd>
          {rate && (
            <>
              <dt className="text-foreground/60">Rate</dt>
              <dd className="font-medium">₹{rate}/hr</dd>
            </>
          )}
        </dl>
      </div>

      <Link
        href="/"
        className="mt-8 inline-block rounded-full border border-black/15 px-6 py-3 font-semibold hover:border-black/30 dark:border-white/20 dark:hover:border-white/40"
      >
        Back to Home
      </Link>
    </div>
  );
}
