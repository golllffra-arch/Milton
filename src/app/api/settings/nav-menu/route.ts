import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const items = await prisma.navMenuItem.findMany({
      where: { isVisible: true },
      orderBy: { displayOrder: "asc" },
      include: { children: { where: { isVisible: true }, orderBy: { displayOrder: "asc" } } },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("[NAV_MENU_GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    if (Array.isArray(body)) {
      // Bulk update: replace all nav items
      await prisma.navMenuItem.deleteMany();
      const items = await prisma.navMenuItem.createMany({ data: body });
      return NextResponse.json({ count: items.count });
    }

    const item = await prisma.navMenuItem.create({ data: body });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("[NAV_MENU_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, ...data } = await req.json();
    const item = await prisma.navMenuItem.update({ where: { id }, data });
    return NextResponse.json(item);
  } catch (error) {
    console.error("[NAV_MENU_PATCH]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
