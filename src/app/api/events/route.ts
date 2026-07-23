import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const filter = searchParams.get("filter"); // "upcoming" | "past"

    const where: Record<string, any> = {};

    if (type) where.type = type;

    if (filter === "upcoming") {
      where.startDate = { gte: new Date() };
    } else if (filter === "past") {
      where.endDate = { lt: new Date() };
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        registrations: {
          select: { id: true, studentId: true, status: true, paymentStatus: true },
        },
      },
      orderBy: { startDate: "asc" },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("[EVENTS_GET]", error);
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
    const { title, description, type, startDate, endDate, location, maxParticipants, fee, imageUrl } = body;

    if (!title || !description || !startDate || !endDate || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        type: type || "OTHER",
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location,
        maxParticipants,
        fee,
        imageUrl,
      },
      include: { registrations: true },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("[EVENTS_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
