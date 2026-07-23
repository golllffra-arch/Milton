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

    const faculty = await prisma.faculty.findUnique({
      where: { id: params.id },
      include: { user: { select: { id: true, name: true, email: true, image: true, role: true } } },
    });

    if (!faculty) {
      return NextResponse.json({ error: "Faculty not found" }, { status: 404 });
    }

    return NextResponse.json(faculty);
  } catch (error) {
    console.error("[FACULTY_GET]", error);
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
      firstName, lastName, phone, specialization,
      qualifications, subjects, bio, photoUrl,
    } = body;

    const existing = await prisma.faculty.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Faculty not found" }, { status: 404 });
    }

    const updateData: Record<string, any> = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (phone !== undefined) updateData.phone = phone;
    if (specialization !== undefined) updateData.specialization = specialization;
    if (qualifications !== undefined) updateData.qualifications = qualifications;
    if (subjects !== undefined) updateData.subjects = subjects;
    if (bio !== undefined) updateData.bio = bio;
    if (photoUrl !== undefined) updateData.photoUrl = photoUrl;

    const faculty = await prisma.faculty.update({
      where: { id: params.id },
      data: updateData,
      include: { user: true },
    });

    if (firstName || lastName) {
      const newName = `${updateData.firstName || existing.firstName} ${updateData.lastName || existing.lastName}`;
      await prisma.user.update({
        where: { id: existing.userId },
        data: { name: newName },
      });
    }

    return NextResponse.json(faculty);
  } catch (error) {
    console.error("[FACULTY_PATCH]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.faculty.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Faculty not found" }, { status: 404 });
    }

    await prisma.faculty.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "Faculty deleted successfully" });
  } catch (error) {
    console.error("[FACULTY_DELETE]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
