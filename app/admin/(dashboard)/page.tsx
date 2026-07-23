import { prisma } from "@/lib/prisma";
import { todayLocalISODate } from "@/lib/date";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const today = todayLocalISODate();

  const [todaysBookings, tableCount, pendingCount] = await Promise.all([
    prisma.booking.findMany({
      where: { date: today, status: { not: "cancelled" } },
      include: { table: true },
      orderBy: { startTime: "asc" },
    }),
    prisma.table.count({ where: { isActive: true } }),
    prisma.booking.count({ where: { status: "pending" } }),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Dashboard</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-black/10 p-5 dark:border-white/10">
          <p className="text-sm text-foreground/60">Today&apos;s bookings</p>
          <p className="mt-1 text-3xl font-bold">{todaysBookings.length}</p>
        </div>
        <div className="rounded-xl border border-black/10 p-5 dark:border-white/10">
          <p className="text-sm text-foreground/60">Active tables</p>
          <p className="mt-1 text-3xl font-bold">{tableCount}</p>
        </div>
        <div className="rounded-xl border border-black/10 p-5 dark:border-white/10">
          <p className="text-sm text-foreground/60">Pending bookings</p>
          <p className="mt-1 text-3xl font-bold">{pendingCount}</p>
        </div>
      </div>

      <h2 className="mt-10 font-display text-lg font-semibold">
        Today &middot; {today}
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-foreground/60">
            <tr>
              <th className="pb-2">Time</th>
              <th className="pb-2">Table</th>
              <th className="pb-2">Customer</th>
              <th className="pb-2">Phone</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {todaysBookings.map((b) => (
              <tr key={b.id} className="border-t border-black/5 dark:border-white/5">
                <td className="py-2">
                  {b.startTime}&ndash;{b.endTime}
                </td>
                <td className="py-2">{b.table.name}</td>
                <td className="py-2">{b.customerName}</td>
                <td className="py-2">{b.customerPhone}</td>
                <td className="py-2 capitalize">{b.status}</td>
              </tr>
            ))}
            {todaysBookings.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-foreground/50">
                  No bookings for today yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
