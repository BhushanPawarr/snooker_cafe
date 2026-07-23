import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const tables = await prisma.table.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json({ tables });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, hourlyRate } = body ?? {};

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof hourlyRate !== "number" ||
    hourlyRate <= 0
  ) {
    return NextResponse.json(
      { error: "Missing or invalid table fields." },
      { status: 400 }
    );
  }

  const table = await prisma.table.create({
    data: { name: name.trim(), hourlyRate },
  });

  return NextResponse.json({ table }, { status: 201 });
}
