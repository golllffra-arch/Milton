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

    const fee = await prisma.fee.findUnique({
      where: { id: params.id },
      include: {
        student: { select: { id: true, firstName: true, lastName: true, enrollmentNumber: true, program: true } },
      },
    });

    if (!fee) {
      return NextResponse.json({ error: "Fee record not found" }, { status: 404 });
    }

    return NextResponse.json(fee);
  } catch (error) {
    console.error("[FEE_GET]", error);
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
    const existing = await prisma.fee.findUnique({ where: { id: params.id } });

    if (!existing) {
      return NextResponse.json({ error: "Fee record not found" }, { status: 404 });
    }

    const updateData: Record<string, any> = {};

    if (body.paidAmount !== undefined) {
      updateData.paidAmount = body.paidAmount;
      if (body.paidAmount >= existing.amount) {
        updateData.status = "PAID";
        updateData.paidDate = new Date();
      } else if (body.paidAmount > 0) {
        updateData.status = "PARTIAL";
      }
    }

    if (body.status !== undefined) updateData.status = body.status;
    if (body.transactionId !== undefined) updateData.transactionId = body.transactionId;
    if (body.amount !== undefined) updateData.amount = body.amount;
    if (body.dueDate !== undefined) updateData.dueDate = new Date(body.dueDate);
    if (body.type !== undefined) updateData.type = body.type;
    if (body.description !== undefined) updateData.description = body.description;

    const fee = await prisma.fee.update({
      where: { id: params.id },
      data: updateData,
      include: {
        student: { select: { id: true, firstName: true, lastName: true, enrollmentNumber: true } },
      },
    });

    return NextResponse.json(fee);
  } catch (error) {
    console.error("[FEE_PATCH]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
