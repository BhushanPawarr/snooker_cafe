import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDaySlots, isValidDate, slotsOverlap } from "@/lib/slots";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  if (!date || !isValidDate(date)) {
    return NextResponse.json(
      { error: "A valid date (YYYY-MM-DD) query param is required." },
      { status: 400 }
    );
  }

  const tables = await prisma.table.findMany({
    where: { isActive: true },
    orderBy: { id: "asc" },
  });

  const bookings = await prisma.booking.findMany({
    where: { date, status: { not: "cancelled" } },
  });

  const slots = getDaySlots();

  const availability = tables.map((table) => {
    const tableBookings = bookings.filter((b) => b.tableId === table.id);
    const slotAvailability = slots.map((slot) => {
      const isBooked = tableBookings.some((b) =>
        slotsOverlap(slot.start, slot.end, b.startTime, b.endTime)
      );
      return { ...slot, isBooked };
    });
    return {
      tableId: table.id,
      name: table.name,
      hourlyRate: table.hourlyRate,
      slots: slotAvailability,
    };
  });

  return NextResponse.json({ date, tables: availability });
}
