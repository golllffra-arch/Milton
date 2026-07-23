import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getGradeFromMarks } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");
    const semester = searchParams.get("semester");

    const where: Record<string, any> = {};
    if (studentId) where.studentId = studentId;
    if (semester) where.semester = parseInt(semester);

    const grades = await prisma.grade.findMany({
      where,
      include: { subject: true, student: { select: { id: true, firstName: true, lastName: true } } },
      orderBy: [{ semester: "asc" }, { subject: { name: "asc" } }],
    });

    return NextResponse.json(grades);
  } catch (error) {
    console.error("[GRADES_GET]", error);
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
    const { studentId, subjectId, semester, internalMarks, finalMarks, academicYear } = body;

    if (!studentId || !subjectId || semester === undefined || internalMarks === undefined || finalMarks === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const totalMarks = internalMarks + finalMarks;
    const { grade, gradePoint } = getGradeFromMarks(totalMarks);

    const gradeRecord = await prisma.grade.upsert({
      where: {
        studentId_subjectId_semester_academicYear: {
          studentId,
          subjectId,
          semester,
          academicYear: academicYear || new Date().getFullYear().toString(),
        },
      },
      update: { internalMarks, finalMarks, totalMarks, grade, gradePoint },
      create: {
        studentId,
        subjectId,
        semester,
        internalMarks,
        finalMarks,
        totalMarks,
        grade,
        gradePoint,
        academicYear: academicYear || new Date().getFullYear().toString(),
      },
      include: { subject: true },
    });

    return NextResponse.json(gradeRecord, { status: 201 });
  } catch (error) {
    console.error("[GRADES_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
