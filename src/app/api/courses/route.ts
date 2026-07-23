import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const programId = searchParams.get("programId");
    const semester = searchParams.get("semester");

    const where: Record<string, any> = {};
    if (programId) where.programId = programId;
    if (semester) where.semester = parseInt(semester);

    const subjects = await prisma.subject.findMany({
      where,
      include: { program: { select: { id: true, code: true, name: true } } },
      orderBy: [{ semester: "asc" }, { code: "asc" }],
    });

    return NextResponse.json(subjects);
  } catch (error) {
    console.error("[COURSES_GET]", error);
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
    const { code, name, credits, semester, programId } = body;

    if (!code || !name || !programId || semester === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const subject = await prisma.subject.create({
      data: { code, name, credits: credits || 3, semester, programId },
      include: { program: { select: { id: true, code: true, name: true } } },
    });

    return NextResponse.json(subject, { status: 201 });
  } catch (error) {
    console.error("[COURSES_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
