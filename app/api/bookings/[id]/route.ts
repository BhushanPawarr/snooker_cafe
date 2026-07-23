import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const VALID_STATUSES = ["pending", "confirmed", "cancelled"];

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/bookings/[id]">
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const bookingId = Number(id);
  const body = await request.json();
  const { status } = body ?? {};

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  });

  return NextResponse.json({ booking });
}

export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/bookings/[id]">
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  await prisma.booking.delete({ where: { id: Number(id) } });

  return NextResponse.json({ ok: true });
}
