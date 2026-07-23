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

    if (!studentId) {
      return NextResponse.json({ error: "studentId is required" }, { status: 400 });
    }

    const records = await prisma.attendance.findMany({
      where: { studentId },
      include: { subject: true },
    });

    const totalClasses = records.length;
    const present = records.filter((r) => r.status === "PRESENT").length;
    const absent = records.filter((r) => r.status === "ABSENT").length;
    const late = records.filter((r) => r.status === "LATE").length;
    const holiday = records.filter((r) => r.status === "HOLIDAY").length;

    const percentage = totalClasses > 0
      ? Math.round(((present + late) / (totalClasses - holiday)) * 100 * 100) / 100
      : 0;

    const bySubject = records.reduce<Record<string, { present: number; absent: number; late: number; total: number }>>(
      (acc, r) => {
        const key = r.subject.name;
        if (!acc[key]) acc[key] = { present: 0, absent: 0, late: 0, total: 0 };
        acc[key].total++;
        if (r.status === "PRESENT") acc[key].present++;
        else if (r.status === "ABSENT") acc[key].absent++;
        else if (r.status === "LATE") acc[key].late++;
        return acc;
      },
      {}
    );

    const subjectPercentages = Object.entries(bySubject).map(([subject, data]) => ({
      subject,
      present: data.present,
      absent: data.absent,
      late: data.late,
      total: data.total,
      percentage: data.total > 0 ? Math.round((data.present / data.total) * 100 * 100) / 100 : 0,
    }));

    return NextResponse.json({
      studentId,
      totalClasses,
      present,
      absent,
      late,
      holiday,
      percentage,
      bySubject: subjectPercentages,
    });
  } catch (error) {
    console.error("[ATTENDANCE_SUMMARY_GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
