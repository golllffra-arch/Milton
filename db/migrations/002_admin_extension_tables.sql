-- =============================================================================
-- 002_admin_extension_tables.sql
-- New tables for the admin-panel extension (Admissions, Career, Student Life,
-- Downloads, Virtual Tour, Media Library, Student Portal extras, Analytics).
-- Run AFTER 001_cms_theme_tables.sql. Runnable in Neon or Supabase SQL editor.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- AdmissionsSettings (singleton): deadlines, fee structure, open/closed toggle
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "AdmissionsSettings" (
  "id"                TEXT PRIMARY KEY DEFAULT 'singleton',
  "applicationsOpen"  BOOLEAN NOT NULL DEFAULT FALSE,
  "applicationDeadline" TIMESTAMPTZ,
  "intakeYear"        TEXT,
  "noticeText"        TEXT,
  "requirements"      TEXT[] NOT NULL DEFAULT '{}',
  "feeStructure"      JSONB NOT NULL DEFAULT '[]',  -- [{program, amount, note}]
  "createdAt"         TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"         TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO "AdmissionsSettings" ("id") VALUES ('singleton') ON CONFLICT ("id") DO NOTHING;

-- -----------------------------------------------------------------------------
-- ApplicationField (configures the admission form fields shown to applicants)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "ApplicationField" (
  "id"           TEXT PRIMARY KEY,
  "label"        TEXT NOT NULL,
  "fieldKey"     TEXT NOT NULL,
  "fieldType"    TEXT NOT NULL DEFAULT 'text',  -- text | email | phone | select | textarea | file
  "options"      JSONB NOT NULL DEFAULT '[]',
  "required"     BOOLEAN NOT NULL DEFAULT FALSE,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "isActive"     BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt"    TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- HomepageContent (singleton): hero, Why Milton, Principal's message, campus
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "HomepageContent" (
  "id"             TEXT PRIMARY KEY DEFAULT 'singleton',
  "heroHeading"    TEXT NOT NULL DEFAULT 'Shape Your Future at Milton International College',
  "heroSubtext"    TEXT NOT NULL DEFAULT 'TU-affiliated programs in BCA, BBM, BBS and BASW.',
  "heroImage"      TEXT,
  "heroCtaText"    TEXT DEFAULT 'Apply Now',
  "heroCtaLink"    TEXT DEFAULT '/admissions',
  "whyTitle"       TEXT DEFAULT 'Why Milton?',
  "whyText"        TEXT NOT NULL DEFAULT '',
  "whyImage"       TEXT,
  "principalName"  TEXT DEFAULT 'Principal',
  "principalTitle" TEXT DEFAULT 'Principal, Milton International College',
  "principalPhoto" TEXT,
  "principalMessage" TEXT NOT NULL DEFAULT '',
  "campusPhoto"    TEXT,
  "statsMode"      TEXT NOT NULL DEFAULT 'auto',  -- 'auto' = live DB counts, 'manual' = StatCounter rows
  "createdAt"      TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"      TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO "HomepageContent" ("id") VALUES ('singleton') ON CONFLICT ("id") DO NOTHING;

-- -----------------------------------------------------------------------------
-- ClassRoutine (feeds /dashboard/student routine tab)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "ClassRoutine" (
  "id"          TEXT PRIMARY KEY,
  "programId"   TEXT NOT NULL,
  "semester"    INTEGER NOT NULL,
  "dayOfWeek"   INTEGER NOT NULL,       -- 0 = Sunday ... 6 = Saturday
  "period"      INTEGER NOT NULL,
  "subjectName" TEXT NOT NULL,
  "facultyName" TEXT,
  "room"        TEXT,
  "startTime"   TEXT NOT NULL,
  "endTime"     TEXT NOT NULL,
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "ClassRoutine_programId_fkey" FOREIGN KEY ("programId")
    REFERENCES "Program"("id") ON DELETE CASCADE,
  CONSTRAINT "ClassRoutine_unique" UNIQUE ("programId", "semester", "dayOfWeek", "period")
);

CREATE INDEX IF NOT EXISTS "ClassRoutine_program_semester_idx" ON "ClassRoutine" ("programId", "semester");

-- -----------------------------------------------------------------------------
-- Notification (per-student or broadcast; feeds the portal bell + list)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Notification" (
  "id"        TEXT PRIMARY KEY,
  "studentId" TEXT,
  "title"     TEXT NOT NULL,
  "body"      TEXT NOT NULL,
  "type"      TEXT NOT NULL DEFAULT 'info',   -- info | fee | exam | event | result
  "link"      TEXT,
  "isRead"    BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "Notification_studentId_fkey" FOREIGN KEY ("studentId")
    REFERENCES "Student"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "Notification_studentId_idx" ON "Notification" ("studentId");

-- -----------------------------------------------------------------------------
-- JobPosting / JobApplication (Career Center)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "JobPosting" (
  "id"            TEXT PRIMARY KEY,
  "title"         TEXT NOT NULL,
  "type"          TEXT NOT NULL DEFAULT 'job',       -- job | internship
  "department"    TEXT,
  "location"      TEXT,
  "employmentType" TEXT DEFAULT 'Full-time',
  "compensation"  TEXT,
  "description"   TEXT NOT NULL,
  "requirements"  TEXT NOT NULL DEFAULT '',
  "applicationUrl" TEXT,
  "deadline"      TIMESTAMPTZ,
  "isActive"      BOOLEAN NOT NULL DEFAULT TRUE,
  "displayOrder"  INTEGER NOT NULL DEFAULT 0,
  "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "JobPosting_isActive_idx" ON "JobPosting" ("isActive", "displayOrder");

CREATE TABLE IF NOT EXISTS "JobApplication" (
  "id"           TEXT PRIMARY KEY,
  "jobId"        TEXT NOT NULL,
  "applicantName" TEXT NOT NULL,
  "email"        TEXT NOT NULL,
  "phone"        TEXT,
  "resumeUrl"    TEXT,
  "coverLetter"  TEXT,
  "status"       TEXT NOT NULL DEFAULT 'NEW',  -- NEW | REVIEWING | SHORTLISTED | REJECTED | HIRED
  "createdAt"    TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "JobApplication_jobId_fkey" FOREIGN KEY ("jobId")
    REFERENCES "JobPosting"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "JobApplication_jobId_idx" ON "JobApplication" ("jobId");

-- -----------------------------------------------------------------------------
-- Club / ClubActivity (Student Life)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Club" (
  "id"           TEXT PRIMARY KEY,
  "name"         TEXT NOT NULL,
  "description"  TEXT NOT NULL DEFAULT '',
  "category"     TEXT,
  "president"    TEXT,
  "advisor"      TEXT,
  "photoUrl"     TEXT,
  "isActive"     BOOLEAN NOT NULL DEFAULT TRUE,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt"    TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "ClubActivity" (
  "id"          TEXT PRIMARY KEY,
  "clubId"      TEXT NOT NULL,
  "title"       TEXT NOT NULL,
  "description" TEXT NOT NULL DEFAULT '',
  "date"        TIMESTAMPTZ,
  "location"    TEXT,
  "photoUrl"    TEXT,
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "ClubActivity_clubId_fkey" FOREIGN KEY ("clubId")
    REFERENCES "Club"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "ClubActivity_clubId_idx" ON "ClubActivity" ("clubId");

-- -----------------------------------------------------------------------------
-- DownloadFile (Downloads page: forms, brochures, syllabi)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "DownloadFile" (
  "id"           TEXT PRIMARY KEY,
  "title"        TEXT NOT NULL,
  "category"     TEXT NOT NULL DEFAULT 'forms',  -- forms | brochures | syllabi | other
  "description"  TEXT,
  "fileUrl"      TEXT NOT NULL,
  "fileSize"     INTEGER,
  "fileType"     TEXT,
  "isPublic"     BOOLEAN NOT NULL DEFAULT TRUE,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt"    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "DownloadFile_category_idx" ON "DownloadFile" ("category", "displayOrder");

-- -----------------------------------------------------------------------------
-- TourMedia (Virtual Tour: images, videos, 360 embeds)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "TourMedia" (
  "id"           TEXT PRIMARY KEY,
  "title"        TEXT NOT NULL,
  "type"         TEXT NOT NULL DEFAULT 'image',  -- image | video | panorama
  "url"          TEXT NOT NULL,
  "caption"      TEXT,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "isActive"     BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt"    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- MediaAsset (central media library; file binary lives in Vercel Blob /
-- Supabase Storage, this row keeps metadata + URL)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "MediaAsset" (
  "id"         TEXT PRIMARY KEY,
  "name"       TEXT NOT NULL,
  "fileUrl"    TEXT NOT NULL,
  "mimeType"   TEXT,
  "size"       INTEGER,
  "altText"    TEXT,
  "category"   TEXT NOT NULL DEFAULT 'general',
  "uploadedBy" TEXT,
  "createdAt"  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "MediaAsset_category_idx" ON "MediaAsset" ("category");

-- -----------------------------------------------------------------------------
-- PageViewCounter (lightweight analytics: per-path view counts)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "PageViewCounter" (
  "path"        TEXT PRIMARY KEY,
  "views"       BIGINT NOT NULL DEFAULT 0,
  "lastViewedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- Column additions to existing core tables
-- -----------------------------------------------------------------------------
ALTER TABLE "Faculty" ADD COLUMN IF NOT EXISTS "department" TEXT;
ALTER TABLE "Faculty" ADD COLUMN IF NOT EXISTS "displayOrder" INTEGER NOT NULL DEFAULT 0;

-- Program "slug" mirrors public route /programs/<code> (e.g. bca); add only if absent.
ALTER TABLE "Program" ADD COLUMN IF NOT EXISTS "slug" TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS "Program_slug_key" ON "Program" ("slug") WHERE "slug" IS NOT NULL;
