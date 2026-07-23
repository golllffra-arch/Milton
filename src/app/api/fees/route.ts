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
    const status = searchParams.get("status");

    const where: Record<string, any> = {};
    if (studentId) where.studentId = studentId;
    if (status) where.status = status;

    const fees = await prisma.fee.findMany({
      where,
      include: {
        student: { select: { id: true, firstName: true, lastName: true, enrollmentNumber: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(fees);
  } catch (error) {
    console.error("[FEES_GET]", error);
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
    const { studentId, amount, dueDate, type, description } = body;

    if (!studentId || !amount || !dueDate || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fee = await prisma.fee.create({
      data: {
        studentId,
        amount,
        dueDate: new Date(dueDate),
        type: type || "TUITION",
        description,
        status: "UNPAID",
      },
      include: {
        student: { select: { id: true, firstName: true, lastName: true, enrollmentNumber: true } },
      },
    });

    return NextResponse.json(fee, { status: 201 });
  } catch (error) {
    console.error("[FEES_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
