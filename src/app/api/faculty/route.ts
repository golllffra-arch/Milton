import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
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
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { firstName: { contains: search, mode: "insensitive" as const } },
            { lastName: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
            { specialization: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [faculty, total] = await Promise.all([
      prisma.faculty.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: { select: { id: true, name: true, email: true, image: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.faculty.count({ where }),
    ]);

    return NextResponse.json({ faculty, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("[FACULTY_GET]", error);
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
    const {
      firstName, lastName, email, password,
      phone, specialization, qualifications, subjects, bio,
    } = body;

    if (!firstName || !lastName || !email || !password || !specialization) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
        role: "FACULTY",
        faculty: {
          create: {
            firstName,
            lastName,
            email,
            phone,
            specialization,
            qualifications: qualifications || [],
            subjects: subjects || [],
            bio,
          },
        },
      },
      include: { faculty: { include: { user: true } } },
    });

    return NextResponse.json(result.faculty, { status: 201 });
  } catch (error) {
    console.error("[FACULTY_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
