import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const program = await prisma.program.findUnique({
      where: { id: params.id },
      include: { subjects: { orderBy: { semester: "asc" } }, students: { include: { user: true } } },
    });

    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    return NextResponse.json(program);
  } catch (error) {
    console.error("[PROGRAM_GET]", error);
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
    const { code, name, fullName, duration, description, careerOpportunities, eligibility } = body;

    const existing = await prisma.program.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    const updateData: Record<string, any> = {};
    if (code !== undefined) updateData.code = code;
    if (name !== undefined) updateData.name = name;
    if (fullName !== undefined) updateData.fullName = fullName;
    if (duration !== undefined) updateData.duration = duration;
    if (description !== undefined) updateData.description = description;
    if (careerOpportunities !== undefined) updateData.careerOpportunities = careerOpportunities;
    if (eligibility !== undefined) updateData.eligibility = eligibility;

    const program = await prisma.program.update({
      where: { id: params.id },
      data: updateData,
      include: { subjects: true },
    });

    return NextResponse.json(program);
  } catch (error) {
    console.error("[PROGRAM_PATCH]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.program.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    await prisma.program.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error("[PROGRAM_DELETE]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
