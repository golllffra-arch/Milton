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
    const subjectId = searchParams.get("subjectId");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const where: Record<string, any> = {};
    if (studentId) where.studentId = studentId;
    if (subjectId) where.subjectId = subjectId;

    if (from || to) {
      where.date = {};
      if (from) where.date.gte = new Date(from);
      if (to) where.date.lte = new Date(to);
    }

    const records = await prisma.attendance.findMany({
      where,
      include: {
        student: { select: { id: true, firstName: true, lastName: true, enrollmentNumber: true } },
        subject: true,
      },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(records);
  } catch (error) {
    console.error("[ATTENDANCE_GET]", error);
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
    const records = Array.isArray(body) ? body : [body];

    const created = [];

    for (const record of records) {
      const { studentId, subjectId, date, status } = record;

      if (!studentId || !subjectId || !date) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      const attendance = await prisma.attendance.upsert({
        where: {
          studentId_subjectId_date: {
            studentId,
            subjectId,
            date: new Date(date),
          },
        },
        update: { status: status || "PRESENT", markedBy: (session.user as any).id },
        create: {
          studentId,
          subjectId,
          date: new Date(date),
          status: status || "PRESENT",
          markedBy: (session.user as any).id,
        },
      });

      created.push(attendance);
    }

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("[ATTENDANCE_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
