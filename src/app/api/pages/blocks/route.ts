import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { pageId, blockType, content, displayOrder, isVisible, styleSettings } = body;

    // Get max order for this page
    const maxOrder = await prisma.pageBlock.findFirst({
      where: { pageId },
      orderBy: { displayOrder: "desc" },
      select: { displayOrder: true },
    });

    const block = await prisma.pageBlock.create({
      data: {
        pageId,
        blockType,
        content: content || {},
        displayOrder: displayOrder ?? (maxOrder?.displayOrder ?? -1) + 1,
        isVisible: isVisible ?? true,
        styleSettings: styleSettings || {},
      },
    });
    return NextResponse.json(block, { status: 201 });
  } catch (error) {
    console.error("[BLOCKS_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { id, ...data } = body;

    const block = await prisma.pageBlock.update({
      where: { id },
      data,
    });
    return NextResponse.json(block);
  } catch (error) {
    console.error("[BLOCKS_PATCH]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await req.json();
    await prisma.pageBlock.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[BLOCKS_DELETE]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Bulk update: reorder blocks
    const { blocks } = await req.json();
    if (!Array.isArray(blocks)) {
      return NextResponse.json({ error: "blocks array required" }, { status: 400 });
    }

    const updates = blocks.map((block: { id: string; displayOrder: number }, index: number) =>
      prisma.pageBlock.update({
        where: { id: block.id },
        data: { displayOrder: block.displayOrder ?? index },
      })
    );

    await prisma.$transaction(updates);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[BLOCKS_REORDER]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
