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
    const semester = searchParams.get("semester");

    if (!studentId) {
      return NextResponse.json({ error: "studentId is required" }, { status: 400 });
    }

    const where: Record<string, any> = { studentId };
    if (semester) where.semester = parseInt(semester);

    const grades = await prisma.grade.findMany({
      where,
      include: { subject: true },
      orderBy: { semester: "asc" },
    });

    if (grades.length === 0) {
      return NextResponse.json({ studentId, semester: semester ? parseInt(semester) : null, gpa: 0, totalCredits: 0, totalPoints: 0, grades: [] });
    }

    let totalPoints = 0;
    let totalCredits = 0;

    const gradeDetails = grades.map((g) => {
      const credits = g.subject.credits;
      totalPoints += g.gradePoint * credits;
      totalCredits += credits;
      return {
        subject: g.subject.name,
        subjectCode: g.subject.code,
        credits,
        grade: g.grade,
        gradePoint: g.gradePoint,
        totalMarks: g.totalMarks,
        semester: g.semester,
      };
    });

    const gpa = totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 100) / 100 : 0;

    return NextResponse.json({
      studentId,
      semester: semester ? parseInt(semester) : null,
      gpa,
      totalCredits,
      totalPoints: Math.round(totalPoints * 100) / 100,
      grades: gradeDetails,
    });
  } catch (error) {
    console.error("[GPA_GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
