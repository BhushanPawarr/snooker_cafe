import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/tables/[id]">
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const body = await request.json();
  const { name, hourlyRate, isActive } = body ?? {};

  const data: { name?: string; hourlyRate?: number; isActive?: boolean } = {};
  if (typeof name === "string" && name.trim()) data.name = name.trim();
  if (typeof hourlyRate === "number" && hourlyRate > 0)
    data.hourlyRate = hourlyRate;
  if (typeof isActive === "boolean") data.isActive = isActive;

  const table = await prisma.table.update({
    where: { id: Number(id) },
    data,
  });

  return NextResponse.json({ table });
}

export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/tables/[id]">
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  await prisma.table.delete({ where: { id: Number(id) } });

  return NextResponse.json({ ok: true });
}
