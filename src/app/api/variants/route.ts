import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { VARIANT_SECTIONS, getDefaultVariant } from "@/lib/variants/registry";
import type { VariantSection } from "@/lib/variants/types";

export async function GET() {
  try {
    // Return all built-in variants organized by section
    const sections = Object.entries(VARIANT_SECTIONS).map(([key, section]) => ({
      section: key,
      label: section.label,
      variants: Object.entries(section.variants).map(([slug, v]) => ({
        slug,
        name: v.name,
        description: v.description,
        config: v.config,
      })),
    }));
    return NextResponse.json({ sections });
  } catch (error) {
    console.error("[VARIANTS_GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { section, slug } = await req.json();
    const variantMap = VARIANT_SECTIONS[section as VariantSection];
    if (!variantMap || !variantMap.variants[slug]) {
      return NextResponse.json({ error: "Invalid variant" }, { status: 400 });
    }

    // Map section to the correct field in SiteSettings
    const fieldMap: Record<string, string> = {
      navbar: "navbarVariantId",
      footer: "footerVariantId",
      hero: "heroVariantId",
      dashboard: "dashboardVariantId",
      events: "eventsVariantId",
      news: "newsVariantId",
      notice: "noticeVariantId",
      gallery: "galleryVariantId",
      faculty: "facultyVariantId",
      programs: "programsVariantId",
    };

    const field = fieldMap[section];
    if (!field) return NextResponse.json({ error: "Invalid section" }, { status: 400 });

    await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: { [field]: slug },
      create: { id: "singleton", [field]: slug },
    });

    return NextResponse.json({ success: true, section, slug });
  } catch (error) {
    console.error("[VARIANTS_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
