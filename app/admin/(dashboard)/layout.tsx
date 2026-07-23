import Link from "next/link";
import { logout } from "@/lib/actions";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="border-b border-black/10 bg-black/[.02] dark:border-white/10 dark:bg-white/[.02]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/admin" className="hover:text-felt">
              Dashboard
            </Link>
            <Link href="/admin/bookings" className="hover:text-felt">
              Bookings
            </Link>
            <Link href="/admin/tables" className="hover:text-felt">
              Tables
            </Link>
          </nav>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm font-medium text-foreground/60 hover:text-foreground"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
    </div>
  );
}
