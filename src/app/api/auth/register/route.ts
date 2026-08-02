import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { DEFAULT_STUDENT_PASSWORD, studentIdPrefix } from "@/lib/student-id";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    const prefix = studentIdPrefix(name);
    const samePrefixCount = await prisma.user.count({
      where: { studentId: { startsWith: prefix } },
    });

    const studentId = `${prefix}${(samePrefixCount + 1).toString().padStart(3, "0")}`;

    const hashedPassword = await bcrypt.hash(DEFAULT_STUDENT_PASSWORD, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "STUDENT",
        studentId,
      },
    });

    return NextResponse.json(
      { id: user.id, name: user.name, email: user.email, studentId: user.studentId },
      { status: 201 }
    );
  } catch (error) {
    console.error("[REGISTER_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
