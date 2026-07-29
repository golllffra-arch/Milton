import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [
      totalStudents,
      totalFaculty,
      totalPrograms,
      activeStudents,
      feeAggregation,
      attendanceRecords,
      recentStudents,
      programDistribution,
      recentFees,
    ] = await Promise.all([
      prisma.student.count(),
      prisma.faculty.count(),
      prisma.program.count(),
      prisma.student.count({ where: { status: "ACTIVE" } }),
      prisma.fee.aggregate({ _sum: { paidAmount: true } }),
      prisma.attendance.findMany({ select: { status: true } }),
      prisma.student.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, email: true, image: true } } },
      }),
      prisma.student.groupBy({
        by: ["programId"],
        _count: { id: true },
      }),
      prisma.fee.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { student: { select: { firstName: true, lastName: true, enrollmentNumber: true } } },
      }),
    ]);

    const programIds = programDistribution.map((p) => p.programId);
    const programs = await prisma.program.findMany({
      where: { id: { in: programIds } },
      select: { id: true, name: true },
    });
    const programMap = new Map(programs.map((p) => [p.id, p.name]));

    const totalAttendance = attendanceRecords.length;
    const presentCount = attendanceRecords.filter((r) => r.status === "PRESENT" || r.status === "LATE").length;
    const averageAttendance = totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100 * 100) / 100 : 0;

    const totalRevenue = feeAggregation._sum.paidAmount || 0;

    const stats = {
      totalStudents,
      totalFaculty,
      totalPrograms,
      activeStudents,
      totalRevenue,
      averageAttendance,
      recentlyJoined: recentStudents.map((s) => ({
        id: s.id,
        name: `${s.firstName} ${s.lastName}`,
        enrollmentNumber: s.enrollmentNumber,
        photoUrl: s.photoUrl,
        createdAt: s.createdAt,
      })),
      programDistribution: programDistribution.map((p) => ({
        programId: p.programId,
        programName: programMap.get(p.programId) || "Unknown",
        count: p._count.id,
      })),
      recentFees: recentFees.map((f) => ({
        id: f.id,
        studentName: `${f.student.firstName} ${f.student.lastName}`,
        enrollmentNumber: f.student.enrollmentNumber,
        amount: f.amount,
        paidAmount: f.paidAmount,
        status: f.status,
        dueDate: f.dueDate,
      })),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("[DASHBOARD_STATS_GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
