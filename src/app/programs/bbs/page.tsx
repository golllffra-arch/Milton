"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  GraduationCap, Clock, Briefcase, CheckCircle,
  Download, ArrowRight, BookOpen, Users,
  Calculator, Landmark, FileText, PieChart,
  Scale, TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const SEMESTERS = [
  {
    sem: 1,
    subjects: ["English I", "Principles of Management", "Financial Accounting I", "Business Mathematics I", "Microeconomics"],
  },
  {
    sem: 2,
    subjects: ["English II", "Organizational Behavior", "Financial Accounting II", "Business Mathematics II", "Macroeconomics"],
  },
  {
    sem: 3,
    subjects: ["Cost Accounting", "Business Statistics", "Business Law", "Corporate Finance", "Taxation"],
  },
  {
    sem: 4,
    subjects: ["Fundamentals of Marketing", "Human Resource Management", "Auditing", "Computer Applications", "Entrepreneurship"],
  },
  {
    sem: 5,
    subjects: ["Financial Management", "Accounting for Business", "Business Research Methods", "International Business", "Elective I"],
  },
  {
    sem: 6,
    subjects: ["Strategic Management", "Corporate Governance", "Project Work", "Elective II", "Professional Ethics"],
  },
]

const CAREERS = [
  { icon: Calculator, title: "Accountant", description: "Manage financial records, prepare statements, and ensure compliance." },
  { icon: Landmark, title: "Bank Officer", description: "Work in banking operations, credit analysis, and financial services." },
  { icon: FileText, title: "Auditor", description: "Examine financial records for accuracy and regulatory compliance." },
  { icon: PieChart, title: "Financial Analyst", description: "Evaluate investment opportunities and prepare financial reports." },
  { icon: TrendingUp, title: "Business Analyst", description: "Analyze business processes and recommend improvements." },
  { icon: Scale, title: "Tax Consultant", description: "Advise clients on tax planning, filing, and regulatory matters." },
]

const RELATED_PROGRAMS = [
  { code: "bca", title: "BCA", fullName: "Bachelor of Computer Applications", icon: BookOpen, gradient: "from-[#1b3a5c] to-[#12283f]" },
  { code: "bbm", title: "BBM", fullName: "Bachelor of Business Management", icon: BookOpen, gradient: "from-[#d93a2b] to-[#b82e21]" },
  { code: "basw", title: "BASW", fullName: "Bachelor of Arts in Social Work", icon: Users, gradient: "from-[#d93a2b] to-[#b82e21]" },
]

const programGradients: Record<string, React.CSSProperties> = {
  bca: { background: "linear-gradient(135deg, var(--page-primary, #1b3a5c), #12283f)" },
  bbm: { background: "linear-gradient(135deg, var(--page-secondary, #d93a2b), #b82e21)" },
  basw: { background: "linear-gradient(135deg, var(--page-primary, #1b3a5c), #12283f)" },
}

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function BBSPage() {
  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg, var(--page-hero-from), var(--page-hero-to))" }} />
        <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at top right, color-mix(in srgb, var(--page-secondary, #d93a2b) 15%, transparent), transparent 60%)" }} />
        <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at bottom left, color-mix(in srgb, var(--page-accent, #1b3a5c) 8%, transparent), transparent 50%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-24 h-24 rounded-2xl flex items-center justify-center shrink-0 shadow-xl"
              style={{ background: "linear-gradient(135deg, var(--page-hero-from), var(--page-hero-to))" }}
            >
              <GraduationCap className="w-12 h-12 text-white" />
            </motion.div>
            <div className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Badge variant="outline" className="mb-4 px-3 py-1.5 text-xs border-white/20 text-white/80 bg-white/5">
                  TU Affiliated &middot; 3 Years
                </Badge>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight"
              >
                BBS{" "}
                <span className="bg-clip-text text-transparent" style={{ background: "linear-gradient(to right, var(--page-secondary, #d93a2b), var(--page-accent, #1b3a5c))" }}>
                  Program
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="mt-4 text-lg text-white/70 max-w-2xl"
              >
                Bachelor of Business Studies
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─── MAIN CONTENT ─── */}
          <div className="lg:col-span-2 space-y-16">
            {/* Overview */}
            <FadeInSection>
              <h2 className="text-3xl font-display font-bold mb-6 dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>Program Overview</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  The Bachelor of Business Studies (BBS) is a three-year, six-semester
                  undergraduate program affiliated with Tribhuvan University. It offers a solid
                  foundation in business, accounting, finance, and economics, preparing students
                  for careers in commerce, banking, and public administration.
                </p>
                <p>
                  The BBS curriculum emphasizes practical knowledge in financial accounting,
                  cost management, taxation, auditing, and business law. Students develop strong
                  analytical, numerical, and problem-solving skills essential for the business world.
                </p>
                <p>
                  This program is ideal for students seeking a career in accounting, banking,
                  auditing, or pursuing professional certifications like ACCA, CPA, or CA.
                  Milton&apos;s experienced faculty and supportive learning environment ensure
                  students build a strong academic and professional foundation.
                </p>
              </div>
            </FadeInSection>

            {/* Curriculum */}
            <FadeInSection>
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6" style={{ color: "var(--page-secondary, #d93a2b)" }} />
                <h2 className="text-3xl font-display font-bold dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>Curriculum Structure</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                The BBS program spans 6 semesters over 3 years. Below is a semester-wise
                breakdown of key subjects.
              </p>
              <div className="space-y-4">
                {SEMESTERS.map((sem) => (
                  <Card key={sem.sem} className="border border-gray-200 dark:border-gray-700 shadow-sm">
                    <CardContent className="p-4">
                      <h3 className="font-display font-bold mb-3 text-lg dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>
                        Semester {sem.sem}
                      </h3>
                      <div className="space-y-2">
                        {sem.subjects.map((subj) => (
                          <Badge key={subj} variant="secondary" className="text-xs px-3 py-1.5 w-full justify-start text-left">
                            {subj}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeInSection>

            {/* Career Opportunities */}
            <FadeInSection>
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6" style={{ color: "var(--page-secondary, #d93a2b)" }} />
                <h2 className="text-3xl font-display font-bold dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>Career Opportunities</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                BBS graduates have excellent career prospects in finance, banking, and commerce.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CAREERS.map((career) => {
                  const Icon = career.icon
                  return (
                    <Card key={career.title} className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-5 flex gap-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "color-mix(in srgb, var(--page-primary, #1b3a5c) 10%, transparent)" }}>
                          <Icon className="w-5 h-5" style={{ color: "var(--page-secondary, #d93a2b)" }} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>{career.title}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{career.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </FadeInSection>

            {/* Eligibility */}
            <FadeInSection>
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-6 h-6" style={{ color: "var(--page-secondary, #d93a2b)" }} />
                <h2 className="text-3xl font-display font-bold dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>Eligibility Criteria</h2>
              </div>
              <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {[
                      "Minimum D+ grade in all subjects in Grade 12 or equivalent from a recognized board",
                      "Minimum C grade in English and Mathematics or Accountancy in Grade 12",
                      "Must have passed the entrance examination conducted by Tribhuvan University",
                      "Open to students from all streams (Science, Management, Humanities)",
                      "Good moral character and commitment to academic integrity",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--page-secondary, #d93a2b)" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeInSection>

            {/* Download */}
            <FadeInSection>
              <Card className="text-white border-0 shadow-xl" style={{ background: "linear-gradient(135deg, var(--page-hero-from), var(--page-hero-to))" }}>
                <CardContent className="p-8 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "color-mix(in srgb, var(--page-accent, #1b3a5c) 20%, transparent)" }}>
                    <Download className="w-8 h-8" style={{ color: "var(--page-accent, #1b3a5c)" }} />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-display font-bold mb-2">Download Syllabus</h3>
                    <p className="text-white/70 text-sm">
                      Get the complete BBS curriculum syllabus including detailed course content and credit hours.
                    </p>
                  </div>
                  <Button variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 shrink-0">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            </FadeInSection>
          </div>

          {/* ─── SIDEBAR ─── */}
          <div className="space-y-8">
            <FadeInSection>
              <Card className="border border-gray-200 dark:border-gray-700 shadow-sm sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-display font-bold mb-4 dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>
                    Program at a Glance
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "Duration", value: "3 Years (6 Semesters)" },
                      { label: "Credit Hours", value: "90" },
                      { label: "Affiliation", value: "Tribhuvan University" },
                      { label: "Level", value: "Bachelor" },
                      { label: "Shift", value: "Morning & Day" },
                      { label: "Seats", value: "60" },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                        <span className="font-medium text-right dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection>
              <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-display font-bold mb-4 dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>
                    Other Programs
                  </h3>
                  <div className="space-y-3">
                    {RELATED_PROGRAMS.map((p) => {
                      const Icon = p.icon
                      return (
                        <Link key={p.code} href={`/programs/${p.code}`}>
                          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={programGradients[p.code]}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>{p.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{p.fullName}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[var(--page-secondary)] group-hover:translate-x-1 transition-all shrink-0" />
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection>
              <Card className="text-white border-0 shadow-lg" style={{ background: "linear-gradient(135deg, var(--page-primary, #1b3a5c), #12283f)" }}>
                <CardContent className="p-6 text-center">
                  <GraduationCap className="w-10 h-10 mx-auto mb-4 opacity-80" />
                  <h3 className="font-display font-bold text-lg mb-2">Apply for BBS</h3>
                  <p className="text-white/70 text-sm mb-6">
                    Admissions open for 2026/27. Secure your seat today.
                  </p>
                  <Link href="/admissions">
                    <Button className="w-full bg-white hover:bg-white/90" style={{ color: "var(--page-accent, #1b3a5c)" }}>
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </FadeInSection>
          </div>
        </div>
      </div>
    </div>
  )
}
