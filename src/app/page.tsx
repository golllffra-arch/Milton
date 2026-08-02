"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import TiltCard from "@/components/TiltCard"
import AnimatedCounter from "@/components/AnimatedCounter"
import Petals from "@/components/Petals"


/* ----------------------------------------------------------------------
   REAL DATA — replace/extend these objects with your actual values.
   Centralizing them here means every section (and the About page, if you
   reuse them) reads from one source instead of re-typing numbers.
------------------------------------------------------------------------*/
const STATS = [
  { value: 2010, label: "Established", prefix: "" },
  { value: 4, label: "Programs", suffix: "+" },
  { value: 500, label: "Students", suffix: "+" },
  { value: 50, label: "Faculty", suffix: "+" },
  { value: 95, label: "Pass Rate", suffix: "%" },
]


const CONTACT = {
  address: "New Baneshwor, Kathmandu",
  phone: "01-4791974",
  mobiles: ["9802379051", "9802379052"],
  courses: ["BCA", "BBM", "BBS", "BASW"],
}


const PROGRAMS = [
  {
    code: "BCA",
    name: "Bachelor of Computer Applications",
    track: "Tech",
    duration: "4 Years",
    blurb:
      "Software development, data science, and IT foundations for the global tech industry.",
    href: "/programs/bca",
  },
  {
    code: "BBM",
    name: "Bachelor of Business Management",
    track: "Business",
    duration: "4 Years",
    blurb:
      "Management, finance, marketing, and entrepreneurship for future business leaders.",
    href: "/programs/bbm",
  },
  {
    code: "BBS",
    name: "Bachelor of Business Studies",
    track: "Commerce",
    duration: "3 Years",
    blurb:
      "Accounting, economics, and business law for careers in finance and administration.",
    href: "/programs/bbs",
  },
  {
    code: "BASW",
    name: "Bachelor of Arts in Social Work",
    track: "Social",
    duration: "4 Years",
    blurb:
      "Social justice and community development, from policy to grassroots practice.",
    href: "/programs/basw",
  },
]


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}


const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}


export default function HomePage() {
  return (
    <main className="bg-[var(--sky)] text-[var(--ink)]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-[var(--indigo)] via-[var(--indigo)] to-[#12283f]">
        <Petals />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
          {/* Copy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="relative z-10 text-white"
          >
            <motion.span
              variants={fadeUp}
              className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] backdrop-blur"
            >
              TU-Affiliated · New Baneshwor, Kathmandu
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl"
            >
              Your story starts
              <br />
              on <span className="text-[var(--gold)]">this campus.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-md text-base leading-relaxed text-white/75 sm:text-lg"
            >
              Milton International College has shaped ambitious students
              since 2010 — BCA, BBM, BBS, and BASW programs built for
              real careers, taught by faculty who show up for you.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
              <a
                href="/admissions"
                className="rounded-full bg-[var(--gold)] px-7 py-3.5 font-semibold text-white shadow-[0_8px_30px_-8px_rgba(217,58,43,0.6)] transition-all hover:-translate-y-0.5 hover:bg-[#b82e21]"
              >
                Apply for 2026/27
              </a>
              <a
                href="/programs"
                className="rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Explore Programs →
              </a>
            </motion.div>
          </motion.div>


          {/* 3D illustration card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="group relative z-10"
          >
            <TiltCard className="mx-auto aspect-[4/5] w-full max-w-sm rounded-[28px] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur">
              <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-[var(--paper)]">
                <img
                  src="/images/liverpool.png"
                  alt="Anime-style illustration of Milton International College's campus"
                  className="h-full w-full object-cover"
                />
              </div>
            </TiltCard>


            {/* Floating stat chip */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 top-8 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-xl"
              style={{ transform: "translateZ(60px)" }}
            >
              <p className="font-display text-2xl font-semibold text-[var(--indigo)]">
                95%
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--ink)]/50">
                Pass rate
              </p>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -right-4 bottom-10 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-xl"
              style={{ transform: "translateZ(80px)" }}
            >
              <p className="font-display text-2xl font-semibold text-[var(--indigo)]">
                12+
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--ink)]/50">
                Years strong
              </p>
            </motion.div>
          </motion.div>
        </div>


        {/* Stat strip — real animated counters, replaces the "0 0 0 0" bug */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="relative z-10 border-t border-white/10 bg-[var(--indigo)]/60 backdrop-blur"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-10 text-white sm:grid-cols-5">
            {STATS.map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="[&_span]:text-white [&_span:last-child]:text-white/60">
                <AnimatedCounter value={s.value} suffix={s.suffix} prefix={s.prefix} label={s.label} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Wave divider: Hero → Programs ── */}
      <div className="relative -mt-px bg-[var(--sky)]">
        <svg className="block w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C240,70 480,70 720,35 C960,0 1200,50 1440,20 L1440,0 Z" fill="var(--indigo)" opacity="0.6" />
          <path d="M0,0 C320,50 640,60 960,25 C1120,10 1280,40 1440,30 L1440,0 Z" fill="var(--indigo)" opacity="0.3" />
        </svg>
      </div>

      {/* ================= PROGRAMS ================= */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-32">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mx-auto mb-14 max-w-xl text-center"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--sakura)]">
            Academic Programs
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Four paths, one standard of excellence
          </h2>
        </motion.div>


        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {PROGRAMS.map((p) => (
            <motion.div key={p.code} variants={fadeUp} className="group">
              <TiltCard maxTilt={6} className="h-full rounded-3xl">
                <a
                  href={p.href}
                  className="flex h-full flex-col rounded-3xl border border-black/5 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-display text-2xl font-semibold text-[var(--indigo)]">
                      {p.code}
                    </span>
                    <span className="rounded-full bg-[#e8eef7] px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-[#1b3a5c]">
                      {p.track} · {p.duration}
                    </span>
                  </div>
                  <h3 className="mb-2 font-semibold leading-snug">{p.name}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-[var(--ink)]/65">
                    {p.blurb}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[var(--sakura)]">
                    View Details <span aria-hidden>→</span>
                  </span>
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Wave divider: Programs → Why Milton ── */}
      <div className="relative">
        <svg className="block w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C360,10 720,50 1080,15 C1200,5 1320,25 1440,20 L1440,60 Z" fill="white" opacity="0.5" />
          <path d="M0,60 C480,20 960,45 1440,10 L1440,60 Z" fill="var(--indigo)" opacity="0.04" />
        </svg>
      </div>

      {/* ================= WHY MILTON (real campus photo + real copy) ================= */}
      <section className="mx-auto max-w-6xl px-6 pt-8 pb-32">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <TiltCard maxTilt={6} className="overflow-hidden rounded-3xl border border-black/5 shadow-xl">
              {/*
                REAL PHOTO SLOT — this is your actual building, not an
                illustration, so use a proper high-resolution photo here
                (the flyer version is too compressed for web use).
                Save it at /public/images/campus-building.jpg
              */}
              <div className="relative aspect-[4/3] w-full flex items-center justify-center bg-gradient-to-br from-[var(--indigo)] to-[#12283f] p-6">
                <div className="text-center">
                  <span className="text-white/60 font-display text-lg">Campus Building Photo</span>
                  <p className="text-white/40 text-sm mt-1">Placeholder — add your image</p>
                </div>
                <span className="absolute left-4 top-4 rounded-full bg-[var(--gold)] px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-white shadow">
                  Open for Visit
                </span>
              </div>
            </TiltCard>
          </motion.div>


          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--sakura)]">
              Why Milton
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Why Milton International College?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--ink)]/70">
              Because students deserve practical skills, career exposure
              &amp; a future beyond just a degree.
            </p>


            <div className="mt-8 flex flex-wrap gap-2">
              {CONTACT.courses.map((c) => (
                <Link
                  key={c}
                  href={`/programs/${c.toLowerCase()}`}
                  className="rounded-full border border-[var(--indigo)]/15 bg-white px-4 py-1.5 text-sm font-semibold text-[var(--indigo)] transition-colors hover:bg-[var(--indigo)] hover:text-white"
                >
                  {c}
                </Link>
              ))}
            </div>


            <div className="mt-8 space-y-2 border-t border-black/5 pt-6 text-sm text-[var(--ink)]/70">
              <p className="flex items-center gap-2">
                <span aria-hidden>📍</span> {CONTACT.address}
              </p>
              <p className="flex items-center gap-2">
                <span aria-hidden>📞</span>
                <a href={`tel:${CONTACT.phone}`} className="hover:text-[var(--sakura)]">
                  {CONTACT.phone}
                </a>
                {CONTACT.mobiles.map((m) => (
                  <span key={m}>
                    {" "}
                    ·{" "}
                    <a href={`tel:${m}`} className="hover:text-[var(--sakura)]">
                      {m}
                    </a>
                  </span>
                ))}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Wave divider: Why Milton → Leadership ── */}
      <div className="relative">
        <svg className="block w-full" viewBox="0 0 1440 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,50 C360,15 720,40 1080,10 L1440,30 L1440,50 Z" fill="white" opacity="0.7" />
        </svg>
      </div>

      {/* ================= LEADERSHIP ================= */}
      <section className="border-y border-black/5 bg-white pt-16 pb-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
          >
            <TiltCard maxTilt={8} className="mx-auto aspect-square w-full max-w-xs rounded-full border-4 border-[var(--sky)] shadow-lg">
              {/*
                IMAGE SLOT — anime-style portrait illustration for the
                Principal. Until a real portrait/name is provided, this
                stays a clearly-labelled placeholder (per your request).
              */}
              <div className="h-full w-full rounded-full flex items-center justify-center bg-gradient-to-br from-[var(--indigo)] to-[#12283f] p-8">
                <div className="text-center">
                  <span className="text-white/50 font-display text-base">Principal</span>
                  <p className="text-white/30 text-xs mt-1">Portrait placeholder</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--sakura)]">
              From the Principal&apos;s Desk
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              A message from our leadership
            </h2>
            <p className="mt-5 leading-relaxed text-[var(--ink)]/70">
              Welcome to Milton International College. Since 2010 we&apos;ve
              remained committed to education that goes beyond textbooks —
              academic rigor paired with character, community, and
              real-world exposure.
            </p>
            <p className="mt-4 font-semibold text-[var(--ink)]">
              Prof. Dr. [Name] <span className="font-normal text-[var(--ink)]/50">— Principal</span>
              <span className="ml-2 rounded-full bg-[#e2e5ea] px-2 py-0.5 text-[10px] font-normal uppercase tracking-wide text-[#4b5563]">
                Placeholder — update before launch
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Wave divider: Leadership → CTA ── */}
      <div className="relative bg-white">
        <svg className="block w-full" viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,70 C240,20 480,50 720,15 C960,45 1200,10 1440,40 L1440,70 Z" fill="var(--indigo)" />
          <path d="M0,70 C360,30 720,55 1080,20 L1440,50 L1440,70 Z" fill="var(--indigo)" opacity="0.7" />
        </svg>
      </div>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden bg-[var(--indigo)] py-28 text-white">
        <Petals />
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
          >
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Ready to join Milton?
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              Admissions are open for 2026/27. Applications close September
              30 — start yours today.
            </p>
            <a
              href="/admissions"
              className="mt-8 inline-block rounded-full bg-[var(--gold)] px-7 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#b82e21]"
            >
              Start Your Application
            </a>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
          >
            <TiltCard maxTilt={8} className="mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
              {/*
                IMAGE SLOT — anime-style graduation illustration.
                Suggested search: "anime graduation illustration",
                "anime students celebrating graduation".
              */}
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[var(--indigo)] to-[#12283f] p-8">
                <div className="text-center">
                  <span className="text-white/60 font-display text-lg">Graduation</span>
                  <p className="text-white/40 text-sm mt-1">Anime-style illustration</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
