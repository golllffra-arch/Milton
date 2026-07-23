import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const type = searchParams.get("type");
    const published = searchParams.get("published");
    const skip = (page - 1) * limit;

    const where: Record<string, any> = {};
    if (type) where.type = type;
    if (published !== null && published !== undefined) {
      where.published = published === "true";
    }

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        skip,
        take: limit,
        include: { author: { select: { id: true, name: true, image: true } } },
        orderBy: { createdAt: "desc" },
      }),
      prisma.news.count({ where }),
    ]);

    return NextResponse.json({ news, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("[NEWS_GET]", error);
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
    const { title, excerpt, content, type, imageUrl, published, tags } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      + "-" + Date.now().toString(36);

    const news = await prisma.news.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        type: type || "NEWS",
        imageUrl,
        published: published || false,
        authorId: (session.user as any).id,
        tags: tags || [],
      },
      include: { author: { select: { id: true, name: true, image: true } } },
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error("[NEWS_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
