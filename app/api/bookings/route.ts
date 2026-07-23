import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidDate, isValidSlot, slotsOverlap } from "@/lib/slots";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const date = request.nextUrl.searchParams.get("date");

  const bookings = await prisma.booking.findMany({
    where: date ? { date } : undefined,
    include: { table: true },
    orderBy: [{ date: "desc" }, { startTime: "asc" }],
  });

  return NextResponse.json({ bookings });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { tableId, date, startTime, endTime, customerName, customerPhone } =
    body ?? {};

  if (
    typeof tableId !== "number" ||
    typeof date !== "string" ||
    typeof startTime !== "string" ||
    typeof endTime !== "string" ||
    typeof customerName !== "string" ||
    typeof customerPhone !== "string" ||
    !customerName.trim() ||
    !customerPhone.trim()
  ) {
    return NextResponse.json(
      { error: "Missing or invalid booking fields." },
      { status: 400 }
    );
  }

  if (!isValidDate(date) || !isValidSlot(startTime, endTime)) {
    return NextResponse.json(
      { error: "Invalid date or time slot." },
      { status: 400 }
    );
  }

  const table = await prisma.table.findUnique({ where: { id: tableId } });
  if (!table || !table.isActive) {
    return NextResponse.json({ error: "Table not found." }, { status: 404 });
  }

  const existing = await prisma.booking.findMany({
    where: { tableId, date, status: { not: "cancelled" } },
  });
  const conflict = existing.some((b) =>
    slotsOverlap(startTime, endTime, b.startTime, b.endTime)
  );
  if (conflict) {
    return NextResponse.json(
      { error: "That slot was just booked. Please pick another." },
      { status: 409 }
    );
  }

  const booking = await prisma.booking.create({
    data: {
      tableId,
      date,
      startTime,
      endTime,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      status: "pending",
    },
  });

  return NextResponse.json({ booking }, { status: 201 });
}
