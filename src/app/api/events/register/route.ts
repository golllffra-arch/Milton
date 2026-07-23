import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { eventId, studentId } = body;

    if (!eventId || !studentId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (event.maxParticipants) {
      const count = await prisma.eventRegistration.count({
        where: { eventId, status: { not: "CANCELLED" } },
      });
      if (count >= event.maxParticipants) {
        return NextResponse.json({ error: "Event is full" }, { status: 400 });
      }
    }

    const existing = await prisma.eventRegistration.findUnique({
      where: { eventId_studentId: { eventId, studentId } },
    });

    if (existing) {
      return NextResponse.json({ error: "Already registered" }, { status: 409 });
    }

    const registration = await prisma.eventRegistration.create({
      data: { eventId, studentId },
    });

    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    console.error("[EVENT_REGISTER_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    const studentId = searchParams.get("studentId");

    if (!eventId || !studentId) {
      return NextResponse.json({ error: "Missing required query params: eventId, studentId" }, { status: 400 });
    }

    const existing = await prisma.eventRegistration.findUnique({
      where: { eventId_studentId: { eventId, studentId } },
    });

    if (!existing) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    await prisma.eventRegistration.update({
      where: { eventId_studentId: { eventId, studentId } },
      data: { status: "CANCELLED" },
    });

    return NextResponse.json({ message: "Registration cancelled" });
  } catch (error) {
    console.error("[EVENT_REGISTER_DELETE]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
