import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");

    const where: Record<string, any> = {};
    if (studentId) where.studentId = studentId;

    const borrows = await prisma.bookBorrow.findMany({
      where,
      include: { book: true },
      orderBy: { borrowedDate: "desc" },
    });

    return NextResponse.json(borrows);
  } catch (error) {
    console.error("[LIBRARY_BORROW_GET]", error);
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
    const { bookId, studentId, dueDate } = body;

    if (!bookId || !studentId || !dueDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const book = await prisma.libraryBook.findUnique({ where: { id: bookId } });
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    if (book.available <= 0) {
      return NextResponse.json({ error: "No copies available" }, { status: 400 });
    }

    const [borrow] = await prisma.$transaction([
      prisma.bookBorrow.create({
        data: { bookId, studentId, dueDate: new Date(dueDate) },
      }),
      prisma.libraryBook.update({
        where: { id: bookId },
        data: { available: { decrement: 1 } },
      }),
    ]);

    return NextResponse.json(borrow, { status: 201 });
  } catch (error) {
    console.error("[LIBRARY_BORROW_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { borrowId, fine } = body;

    if (!borrowId) {
      return NextResponse.json({ error: "borrowId is required" }, { status: 400 });
    }

    const borrow = await prisma.bookBorrow.findUnique({
      where: { id: borrowId },
      include: { book: true },
    });

    if (!borrow) {
      return NextResponse.json({ error: "Borrow record not found" }, { status: 404 });
    }

    if (borrow.status === "RETURNED") {
      return NextResponse.json({ error: "Book already returned" }, { status: 400 });
    }

    const [updatedBorrow] = await prisma.$transaction([
      prisma.bookBorrow.update({
        where: { id: borrowId },
        data: {
          status: "RETURNED",
          returnedDate: new Date(),
          fine: fine || null,
        },
      }),
      prisma.libraryBook.update({
        where: { id: borrow.bookId },
        data: { available: { increment: 1 } },
      }),
    ]);

    return NextResponse.json(updatedBorrow);
  } catch (error) {
    console.error("[LIBRARY_BORROW_PATCH]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
