import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json(banners);
  } catch (error) {
    console.error("[BANNERS_GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const banner = await prisma.banner.create({ data: body });
    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    console.error("[BANNERS_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
