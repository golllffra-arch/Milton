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
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const skip = (page - 1) * limit;

    const where: Record<string, any> = {};
    if (status) where.status = status;

    const [applications, total] = await Promise.all([
      prisma.applicant.findMany({
        where,
        skip,
        take: limit,
        include: { program: { select: { id: true, code: true, name: true } } },
        orderBy: { createdAt: "desc" },
      }),
      prisma.applicant.count({ where }),
    ]);

    return NextResponse.json({ applications, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("[APPLICATIONS_GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName, lastName, email, phone, programId,
      address, dob, gender, nationality, previousSchool, previousGrade,
    } = body;

    if (!firstName || !lastName || !email || !phone || !programId || !dob) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await prisma.applicant.findFirst({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "An application with this email already exists" }, { status: 409 });
    }

    const application = await prisma.applicant.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        programId,
        address,
        dob: new Date(dob),
        gender,
        nationality: nationality || "Nepali",
        previousSchool,
        previousGrade,
      },
      include: { program: { select: { id: true, code: true, name: true } } },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("[APPLICATIONS_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
