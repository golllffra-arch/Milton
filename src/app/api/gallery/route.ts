import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const where: Record<string, any> = {};
    if (category) where.category = category;

    const items = await prisma.gallery.findMany({
      where,
      include: { uploader: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("[GALLERY_GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, imageUrl, category, tags } = body;

    if (!title || !imageUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const item = await prisma.gallery.create({
      data: {
        title,
        description,
        imageUrl,
        category: category || "General",
        tags: tags || [],
        uploadedBy: (session.user as any).id,
      },
      include: { uploader: { select: { id: true, name: true } } },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("[GALLERY_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
