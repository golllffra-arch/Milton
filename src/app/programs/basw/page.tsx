"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  GraduationCap, Clock, Briefcase, CheckCircle,
  Download, ArrowRight, BookOpen, Users,
  Heart, Globe, Handshake, Shield,
  Home, Speech
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const SEMESTERS = [
  {
    sem: 1,
    subjects: ["English I", "Introduction to Social Work", "Sociology I", "Psychology I", "Political Science I", "Social Welfare"],
  },
  {
    sem: 2,
    subjects: ["English II", "Social Work Practice I", "Sociology II", "Psychology II", "Political Science II", "Research Methods I"],
  },
  {
    sem: 3,
    subjects: ["Social Work Practice II", "Community Development", "Social Welfare Administration", "Research Methods II", "Nepali Society & Culture", "Elective I"],
  },
  {
    sem: 4,
    subjects: ["Social Work Practice III", "Counseling Skills", "Gender & Development", "Human Rights & Social Justice", "NGO Management", "Elective II"],
  },
  {
    sem: 5,
    subjects: ["Social Work Practice IV", "Psychiatric Social Work", "Project Planning & Management", "Social Policy & Planning", "Disaster Management", "Elective III"],
  },
  {
    sem: 6,
    subjects: ["Social Work Practice V", "Family & Child Welfare", "Health & Social Work", "Field Work I", "Elective IV", "Research Project"],
  },
  {
    sem: 7,
    subjects: ["Social Work Practice VI", "Urban & Rural Development", "Corporate Social Responsibility", "Field Work II", "Elective V", "Thesis Proposal"],
  },
  {
    sem: 8,
    subjects: ["Internship", "Social Work Supervision", "Advanced Social Work Practice", "Thesis Work", "Elective VI", "Professional Ethics"],
  },
]

const CAREERS = [
  { icon: Heart, title: "Social Worker", description: "Support individuals and communities in need through counseling and resources." },
  { icon: Globe, title: "NGO Manager", description: "Lead nonprofit organizations in program development and community impact." },
  { icon: Handshake, title: "Community Developer", description: "Facilitate community-led initiatives for sustainable development." },
  { icon: Shield, title: "Policy Analyst", description: "Analyze and develop social policies to address societal challenges." },
  { icon: Home, title: "Child Welfare Officer", description: "Protect and advocate for the rights and well-being of children." },
  { icon: Speech, title: "Counselor", description: "Provide guidance and mental health support to individuals and groups." },
]

const RELATED_PROGRAMS = [
  { code: "bca", title: "BCA", fullName: "Bachelor of Computer Applications", icon: BookOpen, gradient: "from-[#1b3a5c] to-[#12283f]" },
  { code: "bbm", title: "BBM", fullName: "Bachelor of Business Management", icon: BookOpen, gradient: "from-[#d93a2b] to-[#b82e21]" },
  { code: "bbs", title: "BBS", fullName: "Bachelor of Business Studies", icon: Users, gradient: "from-[#1b3a5c] to-[#12283f]" },
]

const programGradients: Record<string, React.CSSProperties> = {
  bca: { background: "linear-gradient(135deg, var(--page-primary, #1b3a5c), #12283f)" },
  bbm: { background: "linear-gradient(135deg, var(--page-secondary, #d93a2b), #b82e21)" },
  bbs: { background: "linear-gradient(135deg, var(--page-primary, #1b3a5c), #12283f)" },
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

export default function BASWPage() {
  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg, var(--page-hero-from), var(--page-hero-to))" }} />
        <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at top right, color-mix(in srgb, var(--page-primary, #1b3a5c) 15%, transparent), transparent 60%)" }} />
        <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at bottom left, color-mix(in srgb, var(--page-secondary, #d93a2b) 8%, transparent), transparent 50%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-24 h-24 rounded-2xl flex items-center justify-center shrink-0 shadow-xl"
              style={{ background: "linear-gradient(135deg, var(--page-primary, #1b3a5c), #12283f)" }}
            >
              <Users className="w-12 h-12 text-white" />
            </motion.div>
            <div className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Badge variant="outline" className="mb-4 px-3 py-1.5 text-xs border-white/20 text-white/80 bg-white/5">
                  TU Affiliated &middot; 4 Years
                </Badge>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight"
              >
                BASW{" "}
                <span style={{ color: "var(--page-text, #1a1a1a)" }}>Program</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="mt-4 text-lg text-white/70 max-w-2xl"
              >
                Bachelor of Arts in Social Work
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
                  The Bachelor of Arts in Social Work (BASW) is a four-year, eight-semester
                  undergraduate program affiliated with Tribhuvan University. It is designed
                  to produce skilled social work professionals who can address social issues,
                  empower communities, and promote social justice.
                </p>
                <p>
                  The BASW curriculum integrates theoretical foundations with practical field
                  work experiences. Students study social welfare, community development,
                  counseling, human rights, research methods, and social policy while gaining
                  hands-on experience through supervised field placements.
                </p>
                <p>
                  Graduates of the BASW program emerge as compassionate, skilled professionals
                  ready to work in NGOs, government agencies, international organizations,
                  healthcare settings, and community development initiatives.
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
                The BASW program spans 8 semesters over 4 years. Below is a semester-wise
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
                BASW graduates are in demand across social development sectors. Here are some
                career paths you can pursue.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CAREERS.map((career) => {
                  const Icon = career.icon
                  return (
                    <Card key={career.title} className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-5 flex gap-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "color-mix(in srgb, var(--page-accent, #1b3a5c) 20%, transparent)" }}>
                          <Icon className="w-5 h-5" style={{ color: "var(--page-accent, #1b3a5c)" }} />
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
                      "Minimum C grade in English in Grade 12",
                      "Must have passed the entrance examination conducted by Tribhuvan University",
                      "Interest in social service and community development preferred",
                      "Good moral character and commitment to social justice",
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
              <Card className="text-white border-0 shadow-xl" style={{ background: "linear-gradient(135deg, var(--page-primary, #1b3a5c), #12283f)" }}>
                <CardContent className="p-8 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-display font-bold mb-2">Download Syllabus</h3>
                    <p className="text-white/70 text-sm">
                      Get the complete BASW curriculum syllabus including detailed course content and credit hours.
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
                      { label: "Duration", value: "4 Years (8 Semesters)" },
                      { label: "Credit Hours", value: "120" },
                      { label: "Affiliation", value: "Tribhuvan University" },
                      { label: "Level", value: "Bachelor" },
                      { label: "Shift", value: "Morning & Day" },
                      { label: "Seats", value: "48" },
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
                  <h3 className="font-display font-bold text-lg mb-2">Apply for BASW</h3>
                  <p className="text-white/70 text-sm mb-6">
                    Admissions open for 2026/27. Secure your seat today.
                  </p>
                  <Link href="/admissions">
                    <Button className="w-full text-white" style={{ background: "var(--page-accent, #1b3a5c)" }}>
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
