import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");

    const where: Record<string, any> = {};

    if (category) where.category = category;

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" as const } },
        { author: { contains: search, mode: "insensitive" as const } },
        { isbn: { contains: search, mode: "insensitive" as const } },
      ];
    }

    const books = await prisma.libraryBook.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error("[LIBRARY_BOOKS_GET]", error);
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
    const { title, author, isbn, publisher, category, quantity, shelfLocation, coverUrl } = body;

    if (!title || !author || !isbn || !publisher || !category || !shelfLocation) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await prisma.libraryBook.findUnique({ where: { isbn } });
    if (existing) {
      return NextResponse.json({ error: "Book with this ISBN already exists" }, { status: 409 });
    }

    const book = await prisma.libraryBook.create({
      data: {
        title,
        author,
        isbn,
        publisher,
        category,
        quantity: quantity || 1,
        available: quantity || 1,
        shelfLocation,
        coverUrl,
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error("[LIBRARY_BOOKS_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
