"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { todayLocalISODate } from "@/lib/date";

type SlotAvailability = {
  start: string;
  end: string;
  isBooked: boolean;
};

type TableAvailability = {
  tableId: number;
  name: string;
  hourlyRate: number;
  slots: SlotAvailability[];
};

export default function BookingClient() {
  const router = useRouter();
  const [date, setDate] = useState(todayLocalISODate());
  const [tables, setTables] = useState<TableAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [selection, setSelection] = useState<{
    tableId: number;
    tableName: string;
    hourlyRate: number;
    start: string;
    end: string;
  } | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const minDate = useMemo(() => todayLocalISODate(), []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setSelection(null);
    setError(null);
    fetch(`/api/availability?date=${date}`)
      .then((res) => res.json())
      .then((data) => setTables(data.tables ?? []))
      .finally(() => setLoading(false));
  }, [date]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selection) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableId: selection.tableId,
          date,
          startTime: selection.start,
          endTime: selection.end,
          customerName,
          customerPhone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      const params = new URLSearchParams({
        table: selection.tableName,
        date,
        start: selection.start,
        end: selection.end,
        rate: String(selection.hourlyRate),
        name: customerName,
      });
      router.push(`/book/confirmation?${params.toString()}`);
    } catch {
      setError("Could not reach the server. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-3xl font-bold">Book a Table</h1>
      <p className="mt-2 text-foreground/70">
        Pick a date, choose a free slot, and confirm with your name and phone
        number. Payment is at the counter.
      </p>

      <div className="mt-8">
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          value={date}
          min={minDate}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 rounded-lg border border-black/15 bg-background px-3 py-2 dark:border-white/15"
        />
      </div>

      <div className="mt-8">
        {loading ? (
          <p className="text-foreground/60">Loading availability&hellip;</p>
        ) : (
          <div className="space-y-8">
            {tables.map((table) => (
              <div key={table.tableId}>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold">
                    {table.name}
                  </h3>
                  <span className="text-sm text-foreground/60">
                    ₹{table.hourlyRate}/hr
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {table.slots.map((slot) => {
                    const isSelected =
                      selection?.tableId === table.tableId &&
                      selection?.start === slot.start;
                    return (
                      <button
                        key={slot.start}
                        type="button"
                        disabled={slot.isBooked}
                        onClick={() =>
                          setSelection({
                            tableId: table.tableId,
                            tableName: table.name,
                            hourlyRate: table.hourlyRate,
                            start: slot.start,
                            end: slot.end,
                          })
                        }
                        className={`rounded-lg px-2 py-2 text-sm font-medium transition ${
                          slot.isBooked
                            ? "cursor-not-allowed bg-black/5 text-foreground/30 dark:bg-white/5"
                            : isSelected
                              ? "bg-felt text-white"
                              : "bg-black/[.04] hover:bg-felt/10 dark:bg-white/[.06]"
                        }`}
                      >
                        {slot.start}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selection && (
        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-2xl border border-black/10 p-6 dark:border-white/10"
        >
          <h3 className="font-display text-lg font-semibold">
            Confirm your booking
          </h3>
          <p className="mt-1 text-sm text-foreground/70">
            {selection.tableName} &middot; {date} &middot; {selection.start}
            &ndash;{selection.end}
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Your name</label>
              <input
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-black/15 bg-background px-3 py-2 dark:border-white/15"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Phone number
              </label>
              <input
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="mt-1 w-full rounded-lg border border-black/15 bg-background px-3 py-2 dark:border-white/15"
              />
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 rounded-full bg-gold px-6 py-3 font-semibold text-felt-dark transition hover:bg-gold-light disabled:opacity-60"
          >
            {submitting ? "Booking…" : "Confirm Booking"}
          </button>
        </form>
      )}
    </div>
  );
}
