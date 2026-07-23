import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const [programs, total] = await Promise.all([
      prisma.program.findMany({
        skip,
        take: limit,
        include: { subjects: { orderBy: { semester: "asc" } } },
        orderBy: { createdAt: "desc" },
      }),
      prisma.program.count(),
    ]);

    return NextResponse.json({ programs, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("[PROGRAMS_GET]", error);
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
    const { code, name, fullName, duration, description, careerOpportunities, eligibility } = body;

    if (!code || !name || !fullName || !duration || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await prisma.program.findUnique({ where: { code } });
    if (existing) {
      return NextResponse.json({ error: "Program with this code already exists" }, { status: 409 });
    }

    const program = await prisma.program.create({
      data: { code, name, fullName, duration, description, careerOpportunities: careerOpportunities || [], eligibility },
    });

    return NextResponse.json(program, { status: 201 });
  } catch (error) {
    console.error("[PROGRAMS_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
