import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const news = await prisma.news.findUnique({
      where: { id: params.id },
      include: { author: { select: { id: true, name: true, image: true } } },
    });

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json(news);
  } catch (error) {
    console.error("[NEWS_GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const existing = await prisma.news.findUnique({ where: { id: params.id } });

    if (!existing) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    const updateData: Record<string, any> = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.type !== undefined) updateData.type = body.type;
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl;
    if (body.published !== undefined) updateData.published = body.published;
    if (body.tags !== undefined) updateData.tags = body.tags;

    if (body.title && body.title !== existing.title) {
      updateData.slug = body.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")
        + "-" + Date.now().toString(36);
    }

    const news = await prisma.news.update({
      where: { id: params.id },
      data: updateData,
      include: { author: { select: { id: true, name: true, image: true } } },
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error("[NEWS_PATCH]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.news.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    await prisma.news.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "News deleted successfully" });
  } catch (error) {
    console.error("[NEWS_DELETE]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
