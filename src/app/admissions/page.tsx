"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  GraduationCap, ArrowRight, MapPin, CheckCircle,
  ClipboardCheck, CalendarCheck,
  Award, Clock, DollarSign,
  Upload, Send, Mail, Phone,
  School, BookOpen, Users, Shield,
  Download, Wallet, Building, HelpCircle,
  ChevronDown, MessageCircle,
  AlertCircle, Notebook,
  HeartHandshake, CheckSquare, Landmark,
  Globe, Target, Star, Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

/* =========================================================================
   DATA
   ========================================================================= */

const Smartphone = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12" y2="18" />
  </svg>
)

const HERO = {
  badge: "Admissions 2026/27",
  title: "Admissions Process",
  subtitle:
    "Begin your academic journey in just a few simple steps. Follow our admission process to become a part of our university community.",
  ctaPrimary: { label: "Apply Online Now", href: "#apply" },
  ctaSecondary: { label: "Download Application Form", href: "#" },
  ctaTertiary: { label: "Contact Admissions", href: "/contact" },
}

const STEPS_DATA = [
  {
    number: 1, key: "eligibility",
    icon: GraduationCap,
    title: "Check Eligibility",
    subtitle: "Academic Requirements",
    description:
      "Before applying, applicants must ensure they meet the minimum academic requirements for their chosen undergraduate program.",
    details: [
      "SEE / SLC",
      "+2 / NEB / PCL or equivalent",
    ],
    criteria: [
      "Minimum D+ Grade in all subjects",
      "OR minimum 45% aggregate",
      "OR equivalent GPA as approved by the university",
    ],
    note: "Meeting the minimum eligibility does not automatically guarantee admission.",
    programs: [
      {
        code: "BCA", icon: GraduationCap,
        reqs: ["+2 in any stream", "Mathematics preferred (if applicable)", "TU BCA Entrance Examination required"],
      },
      {
        code: "BBM", icon: BookOpen,
        reqs: ["+2 in any stream", "CMAT Entrance required"],
      },
      {
        code: "BBS", icon: Shield,
        reqs: ["+2 from any recognized board", "No stream restriction", "University eligibility applies"],
      },
      {
        code: "BASW", icon: Users,
        reqs: ["+2 in any stream", "Social Science preferred", "As per TU regulations"],
      },
    ],
  },
  {
    number: 2, key: "apply",
    icon: ClipboardCheck,
    title: "Submit Application",
    subtitle: "Application Methods",
    description:
      "Students can apply through multiple convenient methods.",
    methods: [
      {
        title: "Apply Online",
        icon: Globe,
        steps: [
          "Click the Apply Now button",
          "Fill out the online admission form",
          "Upload required documents",
          "Submit your application digitally",
        ],
        cta: { label: "Apply Online", href: "#apply-form" },
      },
      {
        title: "Apply at Campus",
        icon: Building,
        steps: [
          "Visit the admissions office",
          "Receive assistance from counselors",
          "Complete the physical application",
          "Submit required documents",
        ],
        cta: { label: "Visit Campus", href: "/contact" },
      },
    ],
    deadlines: [
      { label: "Admission Open", date: "July 15, 2026" },
      { label: "Last Date to Apply", date: "September 30, 2026" },
      { label: "Entrance Exam Date", date: "October 15, 2026" },
      { label: "Orientation Date", date: "November 15, 2026" },
    ],
  },
  {
    number: 3, key: "documents",
    icon: Upload,
    title: "Upload Your Documents",
    subtitle: "Required Documents",
    description:
      "Applicants must upload clear scanned copies of all required documents.",
    checklist: [
      "SEE / SLC Marksheet",
      "SEE Character Certificate",
      "+2 Transcript",
      "+2 Marksheet",
      "Provisional Certificate",
      "Character Certificate",
      "Migration Certificate (if applicable)",
      "Citizenship Certificate",
      "National ID (if applicable)",
      "Birth Certificate (optional)",
      "Recent Passport Size Photograph",
      "Signature Image",
    ],
    guidelines: [
      "JPG, PNG or PDF",
      "Maximum file size: 2MB",
      "High-resolution scans only",
      "Documents must be clearly readable",
    ],
  },
  {
    number: 4, key: "fee",
    icon: Wallet,
    title: "Pay Application Fee",
    subtitle: "Payment",
    description:
      "Complete your application by paying the non-refundable application fee.",
    feeAmount: "NPR 1,500",
    feeNote: "Non-refundable",
    paymentMethods: [
      { name: "eSewa", icon: Smartphone },
      { name: "Khalti", icon: Smartphone },
      { name: "ConnectIPS", icon: Globe },
      { name: "FonePay", icon: Smartphone },
      { name: "Bank Transfer", icon: Landmark },
      { name: "Cash at Finance Office", icon: Building },
    ],
    bankDetails: {
      bank: "Nepal Investment Bank Ltd.",
      accountName: "Milton International College",
      accountNumber: "XXXX XXXX XXXX XXXX",
      branch: "New Baneshwor, Kathmandu",
      swift: "NIBLNPKTXXX",
    },
    confirmationNote:
      "Students should upload: Payment Screenshot, Transaction ID, Payment Receipt",
  },
  {
    number: 5, key: "exam",
    icon: Notebook,
    title: "Entrance Examination",
    subtitle: "Examination Details",
    description:
      "Eligible applicants must successfully complete the required entrance examination before admission.",
    examPrograms: [
      {
        program: "BBM", exam: "Tribhuvan University CMAT",
        icon: BookOpen,
      },
      {
        program: "BCA", exam: "TU BCA Entrance Examination",
        icon: GraduationCap,
      },
      {
        program: "BASW", exam: "University Entrance",
        icon: Users,
      },
      {
        program: "Other Programs", exam: "As per TU regulations",
        icon: Shield,
      },
    ],
    examInfo: {
      duration: "2 Hours",
      totalMarks: 100,
      passingCriteria: "40%",
    },
    admitCardNote:
      "Students can download admit card online, receive Email Notification, and SMS Notification.",
    examCenter: "College Campus / Designated TU Centers",
    instructions: [
      "Admit Card",
      "Original Citizenship",
      "Required Stationery",
    ],
  },
  {
    number: 6, key: "enrollment",
    icon: HeartHandshake,
    title: "Complete Enrollment",
    subtitle: "Final Step",
    description:
      "Congratulations! After passing the entrance examination and completing verification, students can officially enroll.",
    verificationDocs: [
      "SEE Documents",
      "+2 Documents",
      "Citizenship",
      "Passport Photos",
      "Payment Receipts",
    ],
    fees: [
      "Admission Fee",
      "Semester Fee",
      "University Registration Fee",
      "Library Fee",
      "Other applicable charges",
    ],
    confirmationItems: [
      "Admission Confirmation Letter",
      "Student ID",
      "Library Card",
      "Orientation Schedule",
      "Academic Calendar",
      "Class Routine",
    ],
  },
]

const FAQS = [
  { q: "Who can apply?", a: "Any student who has completed +2 or equivalent from a recognized board is eligible to apply for undergraduate programs at Milton International College." },
  { q: "What is the minimum GPA?", a: "Applicants must have a minimum D+ grade in all subjects or at least 45% aggregate in their +2 or equivalent examination." },
  { q: "Can I apply online?", a: "Yes, you can apply online through our website by filling out the admission form and uploading the required documents." },
  { q: "Is the application fee refundable?", a: "No, the application fee is non-refundable under any circumstances." },
  { q: "What documents are required?", a: "You will need your SEE and +2 marksheets, transcripts, character certificate, citizenship, passport photos, and other relevant documents." },
  { q: "Is an entrance exam mandatory?", a: "Yes, all applicants must appear for the TU entrance examination or CMAT as applicable to their chosen program." },
  { q: "How do I receive my admit card?", a: "Admit cards can be downloaded from our website. You will also receive notifications via email and SMS." },
  { q: "When do classes begin?", a: "Classes for the 2026/27 academic session begin on December 1, 2026." },
]

const HELPLINE = {
  hotline: "01-4791974",
  whatsapp: "9802379051",
  email: "admissions@miltoncollege.edu.np",
  address: "New Baneshwor, Kathmandu, Nepal",
  hours: "Sun–Fri, 10:00 AM – 5:00 PM",
}

/* =========================================================================
   REUSABLE COMPONENTS
   ========================================================================= */

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionBadge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <Badge
      variant="outline"
      className={`mb-5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] border-white/10 bg-white/5 backdrop-blur-sm ${className}`}
      style={{ color: "var(--nav-accent, #c9a84c)" }}
    >
      {children}
    </Badge>
  )
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-16">
      <SectionBadge>{subtitle}</SectionBadge>
      <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight" style={{ color: "var(--page-text, #1e3a5f)" }}>
        {title}
      </h2>
    </div>
  )
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border shadow-xl backdrop-blur-xl ${className}`}
      style={{
        backgroundColor: "color-mix(in srgb, var(--page-surface, #ffffff) 70%, transparent)",
        borderColor: "color-mix(in srgb, var(--page-border, #e5e7eb) 50%, transparent)",
      }}
    >
      {children}
    </div>
  )
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 20 }).map((_: unknown, i: number) => (
        <div
          key={i}
          className="atmosphere-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? "var(--page-primary, #7c3aed)" : i % 3 === 1 ? "var(--page-secondary, #ec4899)" : "var(--page-accent, #fbbf24)",
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        />
      ))}
      <div
        className="atmosphere-blob"
        style={{
          background: "var(--page-primary, #1e40af)",
          width: "300px",
          height: "300px",
          top: "-10%",
          left: "-5%",
          animationDelay: "0s",
        }}
      />
      <div
        className="atmosphere-blob"
        style={{
          background: "var(--page-secondary, #3b82f6)",
          width: "250px",
          height: "250px",
          bottom: "-10%",
          right: "-5%",
          animationDelay: "-3s",
        }}
      />
      <div
        className="atmosphere-blob"
        style={{
          background: "var(--page-accent, #c9a84c)",
          width: "200px",
          height: "200px",
          top: "30%",
          left: "50%",
          animationDelay: "-6s",
          opacity: 0.15,
        }}
      />
    </div>
  )
}

/* =========================================================================
   SECTION COMPONENTS
   ========================================================================= */

function HeroSection() {
  return (
    <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg, var(--page-hero-from, #1e40af), var(--page-hero-to, #3b82f6))" }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(227,28,35,0.15),transparent_60%)] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,168,76,0.08),transparent_50%)] z-0" />
      <FloatingParticles />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <SectionBadge>
            <GraduationCap className="w-3.5 h-3.5 inline mr-1.5" />
            {HERO.badge}
          </SectionBadge>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight"
        >
          {HERO.title.split(" ").map((word, i) =>
            word === "Process" ? (
              <span key={i} className="bg-gradient-to-r from-[#e31c23] via-[#f55959] to-[#c9a84c] bg-clip-text text-transparent">{word} </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
        >
          {HERO.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href={HERO.ctaPrimary.href}>
            <Button size="xl" className="text-white shadow-xl shadow-black/20 text-base px-8 py-6 rounded-full" style={{ background: "var(--page-accent, #c9a84c)" }}>
              {HERO.ctaPrimary.label}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href={HERO.ctaSecondary.href}>
            <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10 hover:text-white text-base px-8 py-6 rounded-full">
              <Download className="mr-2 w-5 h-5" />
              {HERO.ctaSecondary.label}
            </Button>
          </Link>
          <Link href={HERO.ctaTertiary.href}>
            <Button variant="ghost" size="xl" className="text-white/70 hover:text-white hover:bg-white/10 text-base px-8 py-6 rounded-full">
              {HERO.ctaTertiary.label}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function TimelineBar() {
  const items = ["Check Eligibility", "Submit Application", "Upload Documents", "Pay Fee", "Entrance Exam", "Enrollment"]

  return (
    <section className="py-16 relative z-10" style={{ background: "var(--page-bg, #f8fafc)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="hidden lg:flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2" style={{ background: "color-mix(in srgb, var(--page-primary, #1e40af) 20%, transparent)" }} />
            {items.map((label, i) => (
              <div key={label} className="relative z-10 flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg mb-2"
                  style={{ background: "var(--page-primary, #1e40af)" }}
                >
                  {i + 1}
                </div>
                <span className="text-xs font-medium text-center max-w-[100px]" style={{ color: "var(--page-muted, #6b7280)" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="flex lg:hidden flex-wrap justify-center gap-3">
            {items.map((label, i) => (
              <Badge key={label} variant="outline" className="px-3 py-1.5 text-xs font-medium border-primary/20" style={{ borderColor: "var(--page-primary, #1e40af)", color: "var(--page-primary, #1e40af)" }}>
                {i + 1}. {label}
              </Badge>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

/* ─── Step 1: Eligibility ─── */
function EligibilitySection() {
  const s = STEPS_DATA[0] as any
  const Icon = s.icon

  return (
    <section className="py-20" style={{ background: "var(--page-bg, #f8fafc)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={s.title} subtitle={s.subtitle} />

        <FadeInSection>
          <GlassCard className="p-8 md:p-10 mb-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg" style={{ background: "var(--page-primary, #1e40af)" }}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold" style={{ color: "var(--page-text, #1e3a5f)" }}>Academic Requirements</h3>
                <p className="mt-3 leading-relaxed" style={{ color: "var(--page-muted, #6b7280)" }}>{s.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--page-text, #1e3a5f)" }}>
                  <School className="w-4 h-4" style={{ color: "var(--page-secondary, #3b82f6)" }} />
                  Completed Education
                </h4>
                <ul className="space-y-2">
                  {s.details.map((d: string) => (
                    <li key={d} className="flex items-center gap-2 text-sm" style={{ color: "var(--page-muted, #6b7280)" }}>
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--page-secondary, #3b82f6)" }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--page-text, #1e3a5f)" }}>
                  <Star className="w-4 h-4" style={{ color: "var(--page-accent, #c9a84c)" }} />
                  Minimum Criteria
                </h4>
                <ul className="space-y-2">
                  {s.criteria.map((c: string) => (
                    <li key={c} className="flex items-center gap-2 text-sm" style={{ color: "var(--page-muted, #6b7280)" }}>
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--page-accent, #c9a84c)" }} />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="mt-6 rounded-xl border px-5 py-4 flex items-start gap-3 text-sm"
              style={{
                backgroundColor: "color-mix(in srgb, var(--page-accent, #c9a84c) 10%, transparent)",
                borderColor: "color-mix(in srgb, var(--page-accent, #c9a84c) 25%, transparent)",
                color: "var(--page-text, #1e3a5f)",
              }}
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--page-accent, #c9a84c)" }} />
              {s.note}
            </div>
          </GlassCard>
        </FadeInSection>

        {/* Program-specific eligibility */}
        <FadeInSection>
          <h3 className="text-2xl font-display font-bold text-center mb-8" style={{ color: "var(--page-text, #1e3a5f)" }}>
            Program-Specific Eligibility
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {s.programs.map((p: any) => {
              const PIcon = p.icon
              return (
                <motion.div
                  key={p.code}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all rounded-2xl overflow-hidden" style={{ background: "var(--page-surface, #ffffff)" }}>
                    <div className="h-2" style={{ background: "var(--page-secondary, #3b82f6)" }} />
                    <CardContent className="p-6">
                      <PIcon className="w-10 h-10 mb-4" style={{ color: "var(--page-secondary, #3b82f6)" }} />
                      <h4 className="text-2xl font-display font-bold mb-4" style={{ color: "var(--page-text, #1e3a5f)" }}>{p.code}</h4>
                      <ul className="space-y-2">
                        {p.reqs.map((r: string) => (
                          <li key={r} className="flex items-start gap-2 text-sm" style={{ color: "var(--page-muted, #6b7280)" }}>
                            <CheckSquare className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "var(--page-secondary, #3b82f6)" }} />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

/* ─── Step 2: Submit Application ─── */
function ApplySection() {
  const s = STEPS_DATA[1] as any
  const Icon = s.icon

  return (
    <section id="apply" className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={s.title} subtitle={s.subtitle} />

        <FadeInSection>
          <GlassCard className="p-8 md:p-10 mb-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg" style={{ background: "var(--page-primary, #1e40af)" }}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <p className="leading-relaxed pt-3" style={{ color: "var(--page-muted, #6b7280)" }}>{s.description}</p>
            </div>
          </GlassCard>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {s.methods.map((m: any) => {
            const MIcon = m.icon
            return (
              <FadeInSection key={m.title}>
                <motion.div whileHover={{ y: -4 }} className="h-full">
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all rounded-2xl overflow-hidden" style={{ background: "var(--page-surface, #ffffff)" }}>
                    <CardContent className="p-8">
                      <MIcon className="w-10 h-10 mb-4" style={{ color: "var(--page-secondary, #3b82f6)" }} />
                      <h3 className="text-xl font-display font-bold mb-4" style={{ color: "var(--page-text, #1e3a5f)" }}>{m.title}</h3>
                      <ul className="space-y-3 mb-6">
                        {m.steps.map((step: string) => (
                          <li key={step} className="flex items-start gap-3 text-sm" style={{ color: "var(--page-muted, #6b7280)" }}>
                            <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5" style={{ background: "var(--page-secondary, #3b82f6)" }}>
                              {m.steps.indexOf(step) + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ul>
                      <Link href={m.cta.href}>
                        <Button className="w-full text-white rounded-full" style={{ background: "var(--page-primary, #1e40af)" }}>
                          {m.cta.label}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </FadeInSection>
            )
          })}
        </div>

        {/* Deadlines */}
        <FadeInSection>
          <GlassCard className="p-8 md:p-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-bold flex items-center gap-2" style={{ color: "var(--page-text, #1e3a5f)" }}>
                <CalendarCheck className="w-5 h-5" style={{ color: "var(--page-accent, #c9a84c)" }} />
                Important Deadlines
              </h3>
              <Badge className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider" style={{ background: "var(--page-accent, #c9a84c)", color: "#1e3a5f" }}>
                Admissions Open
              </Badge>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {s.deadlines.map((d: any) => (
                <div
                  key={d.label}
                  className="rounded-xl border p-5 text-center transition-all hover:shadow-md"
                  style={{
                    borderColor: "color-mix(in srgb, var(--page-border, #e5e7eb) 60%, transparent)",
                    background: "color-mix(in srgb, var(--page-surface, #ffffff) 50%, transparent)",
                  }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--page-muted, #6b7280)" }}>{d.label}</p>
                  <p className="text-lg font-bold font-display" style={{ color: "var(--page-primary, #1e40af)" }}>{d.date}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeInSection>
      </div>
    </section>
  )
}

/* ─── Step 3: Upload Documents ─── */
function DocumentsSection() {
  const s = STEPS_DATA[2] as any
  const Icon = s.icon

  return (
    <section className="py-20" style={{ background: "var(--page-bg, #f8fafc)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={s.title} subtitle={s.subtitle} />

        <div className="grid lg:grid-cols-5 gap-8">
          <FadeInSection className="lg:col-span-3">
            <GlassCard className="p-8 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg" style={{ background: "var(--page-primary, #1e40af)" }}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="leading-relaxed pt-3" style={{ color: "var(--page-muted, #6b7280)" }}>{s.description}</p>
              </div>

              <h4 className="font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--page-text, #1e3a5f)" }}>
                <CheckSquare className="w-4 h-4" style={{ color: "var(--page-secondary, #3b82f6)" }} />
                Required Documents Checklist
              </h4>
              <div className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
                {s.checklist.map((item: string) => (
                  <div key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--page-muted, #6b7280)" }}>
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--page-secondary, #3b82f6)" }} />
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeInSection>

          <FadeInSection className="lg:col-span-2">
            <GlassCard className="p-8 md:p-10 h-full">
              <h4 className="font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--page-text, #1e3a5f)" }}>
                <Upload className="w-4 h-4" style={{ color: "var(--page-accent, #c9a84c)" }} />
                Upload Guidelines
              </h4>
              <ul className="space-y-3 mb-8">
                {s.guidelines.map((g: string) => (
                  <li key={g} className="flex items-start gap-2 text-sm" style={{ color: "var(--page-muted, #6b7280)" }}>
                    <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "var(--page-accent, #c9a84c)" }} />
                    {g}
                  </li>
                ))}
              </ul>

              <div className="rounded-xl border-2 border-dashed p-8 text-center transition-colors hover:border-primary/50" style={{ borderColor: "color-mix(in srgb, var(--page-border, #e5e7eb) 60%, transparent)" }}>
                <Upload className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--page-muted, #6b7280)" }} />
                <p className="text-sm font-medium mb-1" style={{ color: "var(--page-text, #1e3a5f)" }}>Drag & drop your files here</p>
                <p className="text-xs mb-4" style={{ color: "var(--page-muted, #6b7280)" }}>or click to browse</p>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Browse Files
                </Button>
              </div>
            </GlassCard>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}

/* ─── Step 4: Pay Application Fee ─── */
function FeeSection() {
  const s = STEPS_DATA[3] as any
  const Icon = s.icon

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={s.title} subtitle={s.subtitle} />

        <div className="grid lg:grid-cols-5 gap-8">
          <FadeInSection className="lg:col-span-2">
            <GlassCard className="p-8 text-center">
              <Icon className="w-14 h-14 mx-auto mb-4" style={{ color: "var(--page-secondary, #3b82f6)" }} />
              <p className="text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--page-muted, #6b7280)" }}>Application Fee</p>
              <p className="text-5xl font-display font-bold mb-2" style={{ color: "var(--page-primary, #1e40af)" }}>{s.feeAmount}</p>
              <Badge variant="destructive" className="mt-2 px-3 py-1 text-xs">{s.feeNote}</Badge>
            </GlassCard>
          </FadeInSection>

          <FadeInSection className="lg:col-span-3">
            <GlassCard className="p-8 md:p-10 h-full">
              <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: "var(--page-text, #1e3a5f)" }}>
                <Wallet className="w-4 h-4" style={{ color: "var(--page-secondary, #3b82f6)" }} />
                Payment Methods
              </h4>
              <p className="text-sm mb-4" style={{ color: "var(--page-muted, #6b7280)" }}>Choose a convenient payment method:</p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
                {s.paymentMethods.map((pm: any) => (
                  <div
                    key={pm.name}
                    className="rounded-xl border p-3 text-center transition-all hover:shadow-md hover:-translate-y-1 cursor-default"
                    style={{
                      borderColor: "color-mix(in srgb, var(--page-border, #e5e7eb) 60%, transparent)",
                      background: "color-mix(in srgb, var(--page-surface, #ffffff) 50%, transparent)",
                    }}
                  >
                    <pm.icon className="w-6 h-6 mx-auto mb-1" style={{ color: "var(--page-secondary, #3b82f6)" }} />
                    <p className="text-[10px] font-medium leading-tight" style={{ color: "var(--page-text, #1e3a5f)" }}>{pm.name}</p>
                  </div>
                ))}
              </div>

              <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--page-text, #1e3a5f)" }}>
                <Landmark className="w-4 h-4" style={{ color: "var(--page-accent, #c9a84c)" }} />
                Bank Details
              </h4>
              <div className="rounded-xl border p-5 space-y-2 text-sm mb-6" style={{
                borderColor: "color-mix(in srgb, var(--page-border, #e5e7eb) 60%, transparent)",
                background: "color-mix(in srgb, var(--page-surface, #ffffff) 30%, transparent)",
              }}>
                {Object.entries(s.bankDetails).map(([k, v]: [string, unknown]) => (
                  <div key={k} className="flex justify-between">
                    <span className="font-medium capitalize" style={{ color: "var(--page-text, #1e3a5f)" }}>
                      {k.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span style={{ color: "var(--page-muted, #6b7280)" }}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-5 text-sm flex items-start gap-3" style={{
                background: "color-mix(in srgb, var(--page-secondary, #3b82f6) 8%, transparent)",
                color: "var(--page-text, #1e3a5f)",
              }}>
                <Send className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--page-secondary, #3b82f6)" }} />
                {s.confirmationNote}
              </div>
            </GlassCard>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}

/* ─── Step 5: Entrance Examination ─── */
function ExamSection() {
  const s = STEPS_DATA[4] as any
  const Icon = s.icon

  return (
    <section className="py-20" style={{ background: "var(--page-bg, #f8fafc)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={s.title} subtitle={s.subtitle} />

        <div className="grid lg:grid-cols-5 gap-8">
          <FadeInSection className="lg:col-span-3">
            <GlassCard className="p-8 md:p-10 h-full">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg" style={{ background: "var(--page-primary, #1e40af)" }}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="leading-relaxed pt-3" style={{ color: "var(--page-muted, #6b7280)" }}>{s.description}</p>
              </div>

              <h4 className="font-semibold mb-4" style={{ color: "var(--page-text, #1e3a5f)" }}>Examination Requirements</h4>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {s.examPrograms.map((ep: any) => (
                  <div
                    key={ep.program}
                    className="rounded-xl border p-5 transition-all hover:shadow-md"
                    style={{
                      borderColor: "color-mix(in srgb, var(--page-border, #e5e7eb) 60%, transparent)",
                      background: "color-mix(in srgb, var(--page-surface, #ffffff) 50%, transparent)",
                    }}
                  >
                    <ep.icon className="w-6 h-6 mb-2" style={{ color: "var(--page-secondary, #3b82f6)" }} />
                    <p className="font-bold text-sm" style={{ color: "var(--page-text, #1e3a5f)" }}>{ep.program}</p>
                    <p className="text-xs mt-1" style={{ color: "var(--page-muted, #6b7280)" }}>{ep.exam}</p>
                  </div>
                ))}
              </div>

              <h4 className="font-semibold mb-3" style={{ color: "var(--page-text, #1e3a5f)" }}>Examination Information</h4>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {Object.entries(s.examInfo).map(([k, v]: [string, unknown]) => (
                  <div key={k} className="text-center rounded-xl border p-4" style={{
                    borderColor: "color-mix(in srgb, var(--page-border, #e5e7eb) 60%, transparent)",
                  }}>
                    <p className="text-lg font-bold font-display" style={{ color: "var(--page-primary, #1e40af)" }}>{v}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider mt-1" style={{ color: "var(--page-muted, #6b7280)" }}>
                      {k.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeInSection>

          <FadeInSection className="lg:col-span-2">
            <GlassCard className="p-8 md:p-10 h-full">
              <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--page-text, #1e3a5f)" }}>
                <Download className="w-4 h-4" style={{ color: "var(--page-accent, #c9a84c)" }} />
                Admit Card
              </h4>
              <p className="text-sm mb-4" style={{ color: "var(--page-muted, #6b7280)" }}>{s.admitCardNote}</p>
              <Button variant="outline" className="w-full rounded-full mb-6">
                <Download className="w-4 h-4 mr-2" />
                Download Admit Card
              </Button>

              <h4 className="font-semibold mb-2" style={{ color: "var(--page-text, #1e3a5f)" }}>Examination Center</h4>
              <p className="text-sm mb-4" style={{ color: "var(--page-muted, #6b7280)" }}>{s.examCenter}</p>

              <h4 className="font-semibold mb-2" style={{ color: "var(--page-text, #1e3a5f)" }}>Items to Carry</h4>
              <ul className="space-y-2">
                {s.instructions.map((inst: string) => (
                  <li key={inst} className="flex items-center gap-2 text-sm" style={{ color: "var(--page-muted, #6b7280)" }}>
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--page-accent, #c9a84c)" }} />
                    {inst}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}

/* ─── Step 6: Final Enrollment ─── */
function EnrollmentSection() {
  const s = STEPS_DATA[5] as any
  const Icon = s.icon

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={s.title} subtitle={s.subtitle} />

        <FadeInSection>
          <GlassCard className="p-8 md:p-10 mb-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "var(--page-secondary, #3b82f6)" }}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            <Icon className="w-14 h-14 mx-auto mb-4" style={{ color: "var(--page-secondary, #3b82f6)" }} />
            <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--page-muted, #6b7280)" }}>{s.description}</p>
          </GlassCard>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-8">
          <FadeInSection>
            <GlassCard className="p-8 h-full">
              <h4 className="font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--page-text, #1e3a5f)" }}>
                <CheckCircle className="w-4 h-4" style={{ color: "var(--page-secondary, #3b82f6)" }} />
                Verification Process
              </h4>
              <p className="text-sm font-medium mb-3" style={{ color: "var(--page-text, #1e3a5f)" }}>Bring original copies of:</p>
              <ul className="space-y-2">
                {s.verificationDocs.map((doc: string) => (
                  <li key={doc} className="flex items-start gap-2 text-sm" style={{ color: "var(--page-muted, #6b7280)" }}>
                    <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "var(--page-secondary, #3b82f6)" }} />
                    {doc}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </FadeInSection>

          <FadeInSection>
            <GlassCard className="p-8 h-full">
              <h4 className="font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--page-text, #1e3a5f)" }}>
                <DollarSign className="w-4 h-4" style={{ color: "var(--page-accent, #c9a84c)" }} />
                Fee Submission
              </h4>
              <p className="text-sm font-medium mb-3" style={{ color: "var(--page-text, #1e3a5f)" }}>Students must pay:</p>
              <ul className="space-y-2">
                {s.fees.map((fee: string) => (
                  <li key={fee} className="flex items-start gap-2 text-sm" style={{ color: "var(--page-muted, #6b7280)" }}>
                    <DollarSign className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "var(--page-accent, #c9a84c)" }} />
                    {fee}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </FadeInSection>

          <FadeInSection>
            <GlassCard className="p-8 h-full">
              <h4 className="font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--page-text, #1e3a5f)" }}>
                <Award className="w-4 h-4" style={{ color: "var(--page-secondary, #3b82f6)" }} />
                Admission Confirmation
              </h4>
              <p className="text-sm font-medium mb-3" style={{ color: "var(--page-text, #1e3a5f)" }}>You will receive:</p>
              <ul className="space-y-2">
                {s.confirmationItems.map((item: string) => (
                  <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--page-muted, #6b7280)" }}>
                    <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "var(--page-secondary, #3b82f6)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </FadeInSection>
        </div>

        <FadeInSection>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-10 rounded-2xl border p-10 text-center"
            style={{
              background: "linear-gradient(135deg, var(--page-primary, #1e40af), var(--page-secondary, #3b82f6))",
              borderColor: "transparent",
            }}
          >
            <Sparkles className="w-12 h-12 text-white mx-auto mb-4" />
            <h3 className="text-3xl font-display font-bold text-white">Welcome to the University Community!</h3>
            <p className="text-white/70 mt-3 max-w-xl mx-auto">
              We look forward to seeing you on campus. Your journey to success begins here.
            </p>
          </motion.div>
        </FadeInSection>
      </div>
    </section>
  )
}

/* ─── FAQ ─── */
function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="py-20" style={{ background: "var(--page-bg, #f8fafc)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionBadge>
            <HelpCircle className="w-3.5 h-3.5 inline mr-1.5" />
            FAQ
          </SectionBadge>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12" style={{ color: "var(--page-text, #1e3a5f)" }}>
            Frequently Asked Questions
          </h2>
        </FadeInSection>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FadeInSection key={i}>
              <div
                className="rounded-xl border overflow-hidden transition-all"
                style={{
                  borderColor: openIdx === i ? "var(--page-primary, #1e40af)" : "color-mix(in srgb, var(--page-border, #e5e7eb) 60%, transparent)",
                  background: "var(--page-surface, #ffffff)",
                }}
              >
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium pr-4" style={{ color: "var(--page-text, #1e3a5f)" }}>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openIdx === i ? "rotate-180" : ""}`}
                    style={{ color: "var(--page-primary, #1e40af)" }}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIdx === i ? "auto" : 0,
                    opacity: openIdx === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--page-muted, #6b7280)" }}>
                    {faq.a}
                  </div>
                </motion.div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Helpline ─── */
function HelplineSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionBadge>
            <Phone className="w-3.5 h-3.5 inline mr-1.5" />
            Helpline
          </SectionBadge>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12" style={{ color: "var(--page-text, #1e3a5f)" }}>
            Admissions Helpline
          </h2>
        </FadeInSection>

        <FadeInSection>
          <GlassCard className="p-8 md:p-10 max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Phone className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--page-secondary, #3b82f6)" }} />
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--page-muted, #6b7280)" }}>Hotline</p>
                <p className="font-bold mt-1" style={{ color: "var(--page-text, #1e3a5f)" }}>{HELPLINE.hotline}</p>
              </div>
              <div className="text-center">
                <MessageCircle className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--page-accent, #c9a84c)" }} />
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--page-muted, #6b7280)" }}>WhatsApp</p>
                <p className="font-bold mt-1" style={{ color: "var(--page-text, #1e3a5f)" }}>{HELPLINE.whatsapp}</p>
              </div>
              <div className="text-center">
                <Mail className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--page-secondary, #3b82f6)" }} />
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--page-muted, #6b7280)" }}>Email</p>
                <p className="font-bold mt-1 text-sm" style={{ color: "var(--page-text, #1e3a5f)" }}>{HELPLINE.email}</p>
              </div>
              <div className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--page-accent, #c9a84c)" }} />
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--page-muted, #6b7280)" }}>Address</p>
                <p className="font-bold mt-1" style={{ color: "var(--page-text, #1e3a5f)" }}>{HELPLINE.address}</p>
              </div>
            </div>

            <div className="text-center mb-6">
              <Badge variant="outline" className="px-4 py-1.5 text-xs font-medium" style={{ borderColor: "var(--page-primary, #1e40af)", color: "var(--page-primary, #1e40af)" }}>
                <Clock className="w-3 h-3 inline mr-1" />
                {HELPLINE.hours}
              </Badge>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button className="rounded-full text-white" style={{ background: "var(--page-primary, #1e40af)" }}>
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              <Button variant="outline" className="rounded-full" style={{ borderColor: "var(--page-accent, #c9a84c)", color: "var(--page-accent, #c9a84c)" }}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </Button>
              <Button variant="outline" className="rounded-full">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button variant="ghost" className="rounded-full">
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </div>
          </GlassCard>
        </FadeInSection>
      </div>
    </section>
  )
}

/* ─── Footer CTA ─── */
function FooterCTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--page-hero-from, #1e40af), var(--page-hero-to, #3b82f6))" }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(227,28,35,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(201,168,76,0.08),transparent_50%)]" />
      <FloatingParticles />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeInSection>
          <Target className="w-14 h-14 mx-auto mb-6" style={{ color: "var(--page-accent, #c9a84c)" }} />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
            Ready to Shape Your Future?
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students who have started their academic journey with us. Apply today and take the first step toward a successful career.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#apply-form">
              <Button size="xl" className="text-white shadow-xl shadow-black/20 text-base px-8 py-6 rounded-full" style={{ background: "var(--page-accent, #c9a84c)" }}>
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10 hover:text-white text-base px-8 py-6 rounded-full">
                <Mail className="mr-2 w-5 h-5" />
                Request Information
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="xl" className="text-white/70 hover:text-white hover:bg-white/10 text-base px-8 py-6 rounded-full">
                <MapPin className="mr-2 w-5 h-5" />
                Schedule a Campus Visit
              </Button>
            </Link>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

/* =========================================================================
   PAGE
   ========================================================================= */

export default function AdmissionsPage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <TimelineBar />

      {/* Sticky Apply Now */}
      <div className="sticky top-20 z-40 flex justify-center px-4 py-2 pointer-events-none">
        <Link href="#apply" className="pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="rounded-full shadow-2xl px-6 py-3 flex items-center gap-2 text-sm font-medium backdrop-blur-xl border"
            style={{
              background: "color-mix(in srgb, var(--page-accent, #c9a84c) 90%, transparent)",
              borderColor: "var(--page-accent, #c9a84c)",
              color: "#1e3a5f",
            }}
          >
            <GraduationCap className="w-4 h-4" />
            Apply Now
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </Link>
      </div>

      <EligibilitySection />
      <ApplySection />
      <DocumentsSection />
      <FeeSection />
      <ExamSection />
      <EnrollmentSection />
      <FAQSection />
      <HelplineSection />
      <FooterCTA />
    </div>
  )
}
