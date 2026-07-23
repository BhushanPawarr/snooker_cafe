"use client";

import { useEffect, useState } from "react";
import { todayLocalISODate } from "@/lib/date";

type Booking = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  customerName: string;
  customerPhone: string;
  status: string;
  table: { name: string };
};

export default function BookingsClient() {
  const [date, setDate] = useState(todayLocalISODate());
  const [showAll, setShowAll] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const query = showAll ? "" : `?date=${date}`;
    const res = await fetch(`/api/bookings${query}`);
    const data = await res.json();
    setBookings(data.bookings ?? []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, showAll]);

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  async function deleteBooking(id: number) {
    if (!confirm("Delete this booking?")) return;
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            value={date}
            disabled={showAll}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 rounded-lg border border-black/15 bg-background px-3 py-2 disabled:opacity-50 dark:border-white/15"
          />
        </div>
        <label className="mt-6 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showAll}
            onChange={(e) => setShowAll(e.target.checked)}
          />
          Show all dates
        </label>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-foreground/60">
            <tr>
              <th className="pb-2">Date</th>
              <th className="pb-2">Time</th>
              <th className="pb-2">Table</th>
              <th className="pb-2">Customer</th>
              <th className="pb-2">Phone</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t border-black/5 dark:border-white/5">
                <td className="py-2">{b.date}</td>
                <td className="py-2">
                  {b.startTime}&ndash;{b.endTime}
                </td>
                <td className="py-2">{b.table.name}</td>
                <td className="py-2">{b.customerName}</td>
                <td className="py-2">{b.customerPhone}</td>
                <td className="py-2 capitalize">{b.status}</td>
                <td className="py-2">
                  <div className="flex gap-2">
                    {b.status !== "confirmed" && (
                      <button
                        onClick={() => updateStatus(b.id, "confirmed")}
                        className="rounded-full bg-felt px-3 py-1 text-xs font-medium text-white"
                      >
                        Confirm
                      </button>
                    )}
                    {b.status !== "cancelled" && (
                      <button
                        onClick={() => updateStatus(b.id, "cancelled")}
                        className="rounded-full bg-black/10 px-3 py-1 text-xs font-medium dark:bg-white/10"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={() => deleteBooking(b.id)}
                      className="rounded-full bg-red-600/10 px-3 py-1 text-xs font-medium text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && bookings.length === 0 && (
              <tr>
                <td colSpan={7} className="py-6 text-center text-foreground/50">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
