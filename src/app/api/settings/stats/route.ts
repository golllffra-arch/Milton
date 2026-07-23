import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const stats = await prisma.statCounter.findMany({
      where: { isVisible: true },
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json(stats);
  } catch (error) {
    console.error("[STATS_GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
