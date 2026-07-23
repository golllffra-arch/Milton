import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const isHomepage = searchParams.get("isHomepage");

    if (slug) {
      const page = await prisma.page.findUnique({
        where: { slug },
        include: {
          blocks: { where: { isVisible: true }, orderBy: { displayOrder: "asc" } },
        },
      });
      if (!page || (!page.isPublished && !searchParams.get("preview"))) {
        // Return homepage as fallback
        const home = await prisma.page.findFirst({
          where: { isHomepage: true, isPublished: true },
          include: {
            blocks: { where: { isVisible: true }, orderBy: { displayOrder: "asc" } },
          },
        });
        return NextResponse.json(home || page);
      }
      return NextResponse.json(page);
    }

    if (isHomepage === "true") {
      const home = await prisma.page.findFirst({
        where: { isHomepage: true },
        include: {
          blocks: { orderBy: { displayOrder: "asc" } },
        },
      });
      return NextResponse.json(home);
    }

    const pages = await prisma.page.findMany({
      include: { _count: { select: { blocks: true } } },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json(pages);
  } catch (error) {
    console.error("[PAGES_GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const page = await prisma.page.create({ data: body });
    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    console.error("[PAGES_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
