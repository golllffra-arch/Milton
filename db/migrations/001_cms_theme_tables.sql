-- =============================================================================
-- 001_cms_theme_tables.sql
-- CMS / Theme tables already defined in prisma/schema.prisma ("CMS / Theme
-- System Models") but possibly not yet present in the database.
-- Idempotent: safe to run even if the tables already exist.
-- Runnable in: Neon SQL Editor, Supabase SQL Editor, or any Postgres client.
-- Column names use camelCase to match Prisma models exactly (db push parity).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Enum: BlockType (used by PageBlock)
-- -----------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE "BlockType" AS ENUM (
    'hero', 'text', 'image', 'gallery', 'video', 'stats',
    'cardGrid', 'testimonial', 'cta', 'form', 'faq', 'map',
    'customHtml', 'divider'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- -----------------------------------------------------------------------------
-- SiteSettings (singleton — one row, id = 'singleton')
-- College identity, contact info, social links, SEO defaults, theme, toggles
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "SiteSettings" (
  "id"              TEXT PRIMARY KEY DEFAULT 'singleton',
  "collegeName"     TEXT NOT NULL DEFAULT 'Milton International College',
  "tagline"         TEXT NOT NULL DEFAULT 'Shape Your Future',
  "mission"         TEXT NOT NULL DEFAULT '',
  "vision"          TEXT NOT NULL DEFAULT '',
  "establishedYear" TEXT NOT NULL DEFAULT '2010',
  "affiliation"     TEXT NOT NULL DEFAULT 'Tribhuvan University',
  "address"         TEXT NOT NULL DEFAULT 'New Baneshwor, Kathmandu, Nepal',
  "phone"           TEXT NOT NULL DEFAULT '+977-1-4XXXXXX',
  "email"           TEXT NOT NULL DEFAULT 'info@miltoncollege.edu.np',
  "workingHours"    TEXT NOT NULL DEFAULT 'Sun - Fri: 6:00 AM - 2:00 PM',
  "logoUrl"         TEXT DEFAULT '/images/logo.png',
  "logoWhiteUrl"    TEXT DEFAULT '/images/logo-white.png',
  "faviconUrl"      TEXT DEFAULT '/images/favicon.ico',
  "metaTitle"       TEXT NOT NULL DEFAULT 'Milton International College | TU Affiliated | New Baneshwor, Kathmandu',
  "metaDescription" TEXT NOT NULL DEFAULT 'Milton International College, affiliated with Tribhuvan University, offers BCA, BBM, BBS, and BASW programs in New Baneshwor, Kathmandu.',
  "metaKeywords"    TEXT NOT NULL DEFAULT 'Milton International College, TU affiliated, BCA, BBM, BBS, BASW, New Baneshwor, Kathmandu',
  "primaryColor"    TEXT NOT NULL DEFAULT '#1c3557',
  "secondaryColor"  TEXT NOT NULL DEFAULT '#e31c23',
  "accentColor"     TEXT NOT NULL DEFAULT '#c9a84c',
  "backgroundColor" TEXT NOT NULL DEFAULT '#ffffff',
  "textColor"       TEXT NOT NULL DEFAULT '#1a1a2e',
  "fontHeading"     TEXT NOT NULL DEFAULT 'Playfair Display',
  "fontBody"        TEXT NOT NULL DEFAULT 'Inter',
  "navbarVariantId"   TEXT NOT NULL DEFAULT 'navbar-default',
  "footerVariantId"   TEXT NOT NULL DEFAULT 'footer-default',
  "heroVariantId"     TEXT NOT NULL DEFAULT 'hero-default',
  "dashboardVariantId" TEXT NOT NULL DEFAULT 'dashboard-default',
  "eventsVariantId"    TEXT NOT NULL DEFAULT 'events-default',
  "newsVariantId"      TEXT NOT NULL DEFAULT 'news-default',
  "noticeVariantId"    TEXT NOT NULL DEFAULT 'notice-default',
  "galleryVariantId"   TEXT NOT NULL DEFAULT 'gallery-default',
  "facultyVariantId"   TEXT NOT NULL DEFAULT 'faculty-default',
  "programsVariantId"  TEXT NOT NULL DEFAULT 'programs-default',
  "showStats"        BOOLEAN NOT NULL DEFAULT TRUE,
  "showTestimonials" BOOLEAN NOT NULL DEFAULT TRUE,
  "showNews"         BOOLEAN NOT NULL DEFAULT TRUE,
  "showEvents"       BOOLEAN NOT NULL DEFAULT TRUE,
  "darkModeEnabled"  BOOLEAN NOT NULL DEFAULT TRUE,
  "enablePwa"        BOOLEAN NOT NULL DEFAULT TRUE,
  "googleAnalyticsId" TEXT,
  "facebookPixelId"   TEXT,
  "facebookUrl"  TEXT DEFAULT 'https://facebook.com/miltoncollege',
  "instagramUrl" TEXT DEFAULT 'https://instagram.com/miltoncollege',
  "youtubeUrl"   TEXT DEFAULT 'https://youtube.com/@miltoncollege',
  "linkedinUrl"  TEXT DEFAULT 'https://linkedin.com/school/miltoncollege',
  "twitterUrl"   TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO "SiteSettings" ("id") VALUES ('singleton') ON CONFLICT ("id") DO NOTHING;

-- -----------------------------------------------------------------------------
-- Banner (homepage / campaign banners)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Banner" (
  "id"            TEXT PRIMARY KEY,
  "imageUrl"      TEXT NOT NULL,
  "headline"      TEXT NOT NULL,
  "subtext"       TEXT,
  "buttonText"    TEXT DEFAULT 'Learn More',
  "buttonLink"    TEXT DEFAULT '/admissions',
  "displayOrder"  INTEGER NOT NULL DEFAULT 0,
  "isActive"      BOOLEAN NOT NULL DEFAULT TRUE,
  "scheduleStart" TIMESTAMPTZ,
  "scheduleEnd"   TIMESTAMPTZ,
  "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- NavMenuItem (navbar links; self-referencing parent/child for dropdowns)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "NavMenuItem" (
  "id"           TEXT PRIMARY KEY,
  "label"        TEXT NOT NULL,
  "link"         TEXT NOT NULL DEFAULT '#',
  "parentId"     TEXT,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible"    BOOLEAN NOT NULL DEFAULT TRUE,
  "icon"         TEXT,
  "target"       TEXT DEFAULT '_self',
  "createdAt"    TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"    TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "NavMenuItem_parentId_fkey" FOREIGN KEY ("parentId")
    REFERENCES "NavMenuItem"("id") ON DELETE SET NULL
);

-- -----------------------------------------------------------------------------
-- FooterSection (footer link columns; links stored as JSON array of {label, href})
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "FooterSection" (
  "id"           TEXT PRIMARY KEY,
  "columnTitle"  TEXT NOT NULL,
  "links"        TEXT NOT NULL DEFAULT '[]',
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible"    BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt"    TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- ThemeVariant / ThemeHistory (design presets + publish snapshots)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "ThemeVariant" (
  "id"        TEXT PRIMARY KEY,
  "section"   TEXT NOT NULL,
  "name"      TEXT NOT NULL,
  "slug"      TEXT NOT NULL,
  "config"    JSONB NOT NULL,
  "thumbnail" TEXT,
  "isBuiltIn" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "ThemeVariant_section_slug_key" UNIQUE ("section", "slug")
);

CREATE TABLE IF NOT EXISTS "ThemeHistory" (
  "id"        TEXT PRIMARY KEY,
  "config"    JSONB NOT NULL,
  "action"    TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- Testimonial / StatCounter / Partner (homepage + about reusable widgets)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Testimonial" (
  "id"           TEXT PRIMARY KEY,
  "name"         TEXT NOT NULL,
  "role"         TEXT NOT NULL,
  "content"      TEXT NOT NULL,
  "rating"       INTEGER NOT NULL DEFAULT 5,
  "photoUrl"     TEXT,
  "isVisible"    BOOLEAN NOT NULL DEFAULT TRUE,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt"    TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "StatCounter" (
  "id"           TEXT PRIMARY KEY,
  "label"        TEXT NOT NULL,
  "value"        INTEGER NOT NULL,
  "suffix"       TEXT,
  "icon"         TEXT,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible"    BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt"    TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Partner" (
  "id"           TEXT PRIMARY KEY,
  "name"         TEXT NOT NULL,
  "logoUrl"      TEXT,
  "website"      TEXT,
  "category"     TEXT,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible"    BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt"    TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- Page / PageBlock (section-builder for About, Privacy Policy, any future page)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Page" (
  "id"              TEXT PRIMARY KEY,
  "slug"            TEXT UNIQUE NOT NULL,
  "title"           TEXT NOT NULL,
  "metaTitle"       TEXT,
  "metaDescription" TEXT,
  "metaKeywords"    TEXT,
  "socialImageUrl"  TEXT,
  "isPublished"     BOOLEAN NOT NULL DEFAULT FALSE,
  "isHomepage"      BOOLEAN NOT NULL DEFAULT FALSE,
  "language"        TEXT NOT NULL DEFAULT 'en',
  "createdAt"       TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "PageBlock" (
  "id"            TEXT PRIMARY KEY,
  "pageId"        TEXT NOT NULL,
  "blockType"     "BlockType" NOT NULL,
  "content"       JSONB NOT NULL,
  "displayOrder"  INTEGER NOT NULL DEFAULT 0,
  "isVisible"     BOOLEAN NOT NULL DEFAULT TRUE,
  "styleSettings" JSONB NOT NULL DEFAULT '{}',
  "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"     TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "PageBlock_pageId_fkey" FOREIGN KEY ("pageId")
    REFERENCES "Page"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "PageBlock_pageId_displayOrder_idx"
  ON "PageBlock" ("pageId", "displayOrder");

-- -----------------------------------------------------------------------------
-- Seed: singleton content rows so the app never crashes on empty lookups
-- -----------------------------------------------------------------------------
INSERT INTO "Page" ("id", "slug", "title", "isPublished") VALUES
  ('page-about',       'about',       'About Milton',       TRUE),
  ('page-privacy',     'privacy-policy', 'Privacy Policy',  TRUE)
ON CONFLICT ("id") DO NOTHING;
