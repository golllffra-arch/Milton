import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const student = await prisma.student.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { id: true, name: true, email: true, image: true, role: true } },
        program: true,
        attendance: { include: { subject: true }, orderBy: { date: "desc" } },
        fees: { orderBy: { createdAt: "desc" } },
        grades: { include: { subject: true }, orderBy: { semester: "asc" } },
      },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error("[STUDENT_GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      firstName, lastName, dateOfBirth, gender, phone, address,
      programId, semester, batch, status, photoUrl,
    } = body;

    const existing = await prisma.student.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const updateData: Record<string, any> = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (dateOfBirth !== undefined) updateData.dateOfBirth = new Date(dateOfBirth);
    if (gender !== undefined) updateData.gender = gender;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (programId !== undefined) updateData.programId = programId;
    if (semester !== undefined) updateData.semester = semester;
    if (batch !== undefined) updateData.batch = batch;
    if (status !== undefined) updateData.status = status;
    if (photoUrl !== undefined) updateData.photoUrl = photoUrl;

    const student = await prisma.student.update({
      where: { id: params.id },
      data: updateData,
      include: { user: true, program: true },
    });

    if (firstName || lastName) {
      const newName = `${updateData.firstName || existing.firstName} ${updateData.lastName || existing.lastName}`;
      await prisma.user.update({
        where: { id: existing.userId },
        data: { name: newName },
      });
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error("[STUDENT_PATCH]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.student.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    await prisma.student.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("[STUDENT_DELETE]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
