"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  GraduationCap, Clock, Briefcase, CheckCircle,
  Download, ArrowRight, BookOpen, Code,
  Database, Server, Shield, Users, BarChart3
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const SEMESTERS = [
  {
    sem: 1,
    subjects: ["English I", "Mathematics I", "Digital Logic", "C Programming", "Computer Fundamentals & Applications"],
  },
  {
    sem: 2,
    subjects: ["English II", "Mathematics II", "Object-Oriented Programming (C++)", "Microprocessor & Computer Architecture", "Discrete Structure"],
  },
  {
    sem: 3,
    subjects: ["Data Structures & Algorithms", "Database Management System", "Java Programming", "Statistics I", "Web Technology"],
  },
  {
    sem: 4,
    subjects: ["Operating Systems", "Numerical Methods", "Software Engineering", "Computer Networks", "Scripting Language (Python)"],
  },
  {
    sem: 5,
    subjects: ["Design & Analysis of Algorithms", "Artificial Intelligence", "Multimedia Computing", "Network Security", "Elective I"],
  },
  {
    sem: 6,
    subjects: ["Compiler Design & Construction", "Data Mining & Warehousing", "E-Governance", "Computer Graphics & Animation", "Elective II"],
  },
  {
    sem: 7,
    subjects: ["Machine Learning", "Big Data Analytics", "Cloud Computing", "Project I", "Elective III"],
  },
  {
    sem: 8,
    subjects: ["Internship", "Project II", "Research Methodology", "Professional Ethics", "Elective IV"],
  },
]

const CAREERS = [
  { icon: Code, title: "Software Developer", description: "Design and build applications for web, mobile, and enterprise platforms." },
  { icon: Database, title: "Data Analyst / Scientist", description: "Analyze complex data sets to drive business decisions and strategy." },
  { icon: Server, title: "IT Manager", description: "Oversee IT infrastructure, security, and technology strategy in organizations." },
  { icon: Shield, title: "Cybersecurity Analyst", description: "Protect systems and networks from digital threats and vulnerabilities." },
  { icon: Users, title: "System Analyst", description: "Bridge business needs with technology solutions for optimal efficiency." },
  { icon: BarChart3, title: "Database Administrator", description: "Manage and maintain database systems for performance and security." },
]

const RELATED_PROGRAMS = [
  { code: "bbm", title: "BBM", fullName: "Bachelor of Business Management", icon: BookOpen, gradient: "from-[#e31c23] to-[#a51419]" },
  { code: "bbs", title: "BBS", fullName: "Bachelor of Business Studies", icon: Shield, gradient: "from-[#1c3557] to-[#0e1d31]" },
  { code: "basw", title: "BASW", fullName: "Bachelor of Arts in Social Work", icon: Users, gradient: "from-[#c9a84c] to-[#a8882e]" },
]

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

export default function BCAPage() {
  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c3557] via-[#1c3557]/95 to-[#0e1d31] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(227,28,35,0.15),transparent_60%)] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,168,76,0.08),transparent_50%)] z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1c3557] to-[#2c3e7a] flex items-center justify-center shrink-0 shadow-xl"
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
                  TU Affiliated &middot; 4 Years
                </Badge>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight"
              >
                BCA{" "}
                <span className="bg-gradient-to-r from-[#e31c23] to-[#c9a84c] bg-clip-text text-transparent">
                  Program
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="mt-4 text-lg text-white/70 max-w-2xl"
              >
                Bachelor of Computer Applications
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
              <h2 className="text-3xl font-display font-bold text-[#1c3557] dark:text-white mb-6">Program Overview</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  The Bachelor of Computer Applications (BCA) is a four-year, eight-semester
                  undergraduate program designed to produce skilled IT professionals capable of
                  meeting the growing demands of the global technology industry. Affiliated with
                  Tribhuvan University, this program blends theoretical foundations with practical
                  applications in computing.
                </p>
                <p>
                  Students gain expertise in programming languages, database management, networking,
                  web technologies, artificial intelligence, and data science. The curriculum is
                  regularly updated to reflect industry trends and emerging technologies.
                </p>
                <p>
                  Through hands-on projects, internships, and research work, BCA graduates at Milton
                  emerge as well-rounded professionals ready for careers in software development,
                  IT consulting, data analytics, and beyond.
                </p>
              </div>
            </FadeInSection>

            {/* Curriculum */}
            <FadeInSection>
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-[#e31c23]" />
                <h2 className="text-3xl font-display font-bold text-[#1c3557] dark:text-white">Curriculum Structure</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                The BCA program spans 8 semesters over 4 years with a total of 126 credit hours.
                Below is a semester-wise breakdown of key subjects.
              </p>
              <div className="space-y-4">
                {SEMESTERS.map((sem) => (
                  <Card key={sem.sem} className="border border-gray-200 dark:border-gray-700 shadow-sm">
                    <CardContent className="p-4">
                      <h3 className="font-display font-bold text-[#1c3557] dark:text-white mb-3 text-lg">
                        Semester {sem.sem}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {sem.subjects.map((subj) => (
                          <Badge key={subj} variant="secondary" className="text-xs px-3 py-1">
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
                <Briefcase className="w-6 h-6 text-[#e31c23]" />
                <h2 className="text-3xl font-display font-bold text-[#1c3557] dark:text-white">Career Opportunities</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                BCA graduates are in high demand across industries. Here are some career paths you
                can pursue after graduation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CAREERS.map((career) => {
                  const Icon = career.icon
                  return (
                    <Card key={career.title} className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-5 flex gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#1c3557]/10 dark:bg-[#1c3557]/30 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-[#e31c23]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#1c3557] dark:text-white text-sm">{career.title}</h3>
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
                <CheckCircle className="w-6 h-6 text-[#e31c23]" />
                <h2 className="text-3xl font-display font-bold text-[#1c3557] dark:text-white">Eligibility Criteria</h2>
              </div>
              <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {[
                      "Minimum D+ grade in all subjects in Grade 12 or equivalent from a recognized board",
                      "Minimum C grade in English, Mathematics, and Computer Science or related subject in Grade 12",
                      "Applicants from non-Computer background may be required to take bridge courses",
                      "Must have passed the entrance examination conducted by Tribhuvan University",
                      "Good moral character and commitment to academic integrity",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-[#e31c23] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeInSection>

            {/* Download */}
            <FadeInSection>
              <Card className="bg-gradient-to-r from-[#1c3557] to-[#0e1d31] text-white border-0 shadow-xl">
                <CardContent className="p-8 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#c9a84c]/20 flex items-center justify-center shrink-0">
                    <Download className="w-8 h-8 text-[#c9a84c]" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-display font-bold mb-2">Download Syllabus</h3>
                    <p className="text-white/70 text-sm">
                      Get the complete BCA curriculum syllabus including detailed course content and credit hours.
                    </p>
                  </div>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white shrink-0">
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
                  <h3 className="font-display font-bold text-[#1c3557] dark:text-white mb-4">
                    Program at a Glance
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "Duration", value: "4 Years (8 Semesters)" },
                      { label: "Credit Hours", value: "126" },
                      { label: "Affiliation", value: "Tribhuvan University" },
                      { label: "Level", value: "Bachelor" },
                      { label: "Shift", value: "Morning & Day" },
                      { label: "Seats", value: "48" },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                        <span className="font-medium text-[#1c3557] dark:text-white text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection>
              <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-display font-bold text-[#1c3557] dark:text-white mb-4">
                    Other Programs
                  </h3>
                  <div className="space-y-3">
                    {RELATED_PROGRAMS.map((p) => {
                      const Icon = p.icon
                      return (
                        <Link key={p.code} href={`/programs/${p.code}`}>
                          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${p.gradient} flex items-center justify-center shrink-0`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-[#1c3557] dark:text-white text-sm">{p.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{p.fullName}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#e31c23] group-hover:translate-x-1 transition-all shrink-0" />
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection>
              <Card className="bg-gradient-to-br from-[#e31c23] to-[#a51419] text-white border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="w-10 h-10 mx-auto mb-4 opacity-80" />
                  <h3 className="font-display font-bold text-lg mb-2">Apply for BCA</h3>
                  <p className="text-white/70 text-sm mb-6">
                    Admissions open for 2026/27. Secure your seat today.
                  </p>
                  <Link href="/admissions">
                    <Button className="w-full bg-white text-[#e31c23] hover:bg-white/90">
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
