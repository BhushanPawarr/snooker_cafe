import BookingsClient from "./BookingsClient";

export default function AdminBookingsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Bookings</h1>
      <div className="mt-6">
        <BookingsClient />
      </div>
    </div>
  );
}
