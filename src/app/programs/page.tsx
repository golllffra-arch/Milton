"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  GraduationCap, BookOpen, Shield, Users,
  ArrowRight, MapPin, Sparkles, Clock,
  CheckCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const PROGRAMS = [
  {
    code: "bca",
    title: "BCA",
    fullName: "Bachelor of Computer Applications",
    duration: "4 Years (8 Semesters)",
    description:
      "A comprehensive program designed to equip students with strong foundations in computer science, software development, data science, and information technology. Graduates emerge as skilled IT professionals ready for the global tech industry.",
    highlights: [
      "Full-stack development & programming",
      "Data science & AI fundamentals",
      "Database management systems",
      "Networking & cybersecurity",
      "Industry internship & projects",
    ],
    careerPaths: "Software Developer, Data Analyst, IT Manager, Web Developer, System Analyst",
    gradient: "from-[#1c3557] to-[#2c3e7a]",
    icon: GraduationCap,
    badge: "Tech",
  },
  {
    code: "bbm",
    title: "BBM",
    fullName: "Bachelor of Business Management",
    duration: "4 Years (8 Semesters)",
    description:
      "A dynamic program that develops future business leaders through comprehensive study of management principles, finance, marketing, human resources, and entrepreneurship.",
    highlights: [
      "Strategic management & leadership",
      "Financial accounting & analysis",
      "Marketing & digital commerce",
      "Human resource management",
      "Entrepreneurship development",
    ],
    careerPaths: "Business Manager, Marketing Executive, Financial Analyst, HR Manager, Entrepreneur",
    gradient: "from-[#e31c23] to-[#a51419]",
    icon: BookOpen,
    badge: "Business",
  },
  {
    code: "bbs",
    title: "BBS",
    fullName: "Bachelor of Business Studies",
    duration: "3 Years (6 Semesters)",
    description:
      "A foundational business degree focused on accounting, economics, business law, and organizational management. Ideal for students seeking careers in accounting, finance, and public administration.",
    highlights: [
      "Financial & cost accounting",
      "Micro & macro economics",
      "Business law & taxation",
      "Organizational behavior",
      "Auditing & assurance",
    ],
    careerPaths: "Accountant, Auditor, Bank Officer, Business Analyst, Public Administrator",
    gradient: "from-[#1c3557] to-[#0e1d31]",
    icon: Shield,
    badge: "Commerce",
  },
  {
    code: "basw",
    title: "BASW",
    fullName: "Bachelor of Arts in Social Work",
    duration: "4 Years (8 Semesters)",
    description:
      "A program dedicated to social justice and community development. Students gain theoretical knowledge and practical skills to address social issues and drive positive change in communities.",
    highlights: [
      "Social welfare policy & administration",
      "Community development practice",
      "Counseling & case management",
      "Research methods in social work",
      "Field work & community engagement",
    ],
    careerPaths: "Social Worker, NGO Manager, Community Developer, Counselor, Policy Analyst",
    gradient: "from-[#c9a84c] to-[#a8882e]",
    icon: Users,
    badge: "Social",
  },
]

const WHY_CHOOSE = [
  {
    icon: Sparkles,
    title: "TU Affiliated Curriculum",
    description: "All programs follow Tribhuvan University curriculum ensuring national standards and recognition.",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Morning and day shifts available to accommodate working students and diverse schedules.",
  },
  {
    icon: CheckCircle,
    title: "Experienced Faculty",
    description: "Learn from qualified professors and industry professionals with years of experience.",
  },
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

export default function ProgramsPage() {
  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c3557] via-[#1c3557]/95 to-[#0e1d31] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(227,28,35,0.15),transparent_60%)] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,168,76,0.08),transparent_50%)] z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-white/20 text-white/80 bg-white/5 backdrop-blur-sm">
              <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-[#e31c23]" />
              Academic Programs
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-[#e31c23] via-[#f55959] to-[#c9a84c] bg-clip-text text-transparent">
              Programs
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Choose from four undergraduate programs designed to match your passion,
            career goals, and academic interests — all affiliated with Tribhuvan University.
          </motion.p>
        </div>
      </section>

      {/* ─── PROGRAM CARDS ─── */}
      <section className="py-20 bg-[#f8f6f0] dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {PROGRAMS.map((program) => {
              const Icon = program.icon
              return (
                <FadeInSection key={program.code}>
                  <motion.div whileHover={{ y: -6 }} className="group h-full">
                    <Link href={`/programs/${program.code}`}>
                      <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
                        <div className={`bg-gradient-to-br ${program.gradient} p-6 text-white relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
                          <div className="flex items-center gap-4 relative z-10">
                            <Icon className="w-12 h-12" />
                            <div>
                              <h3 className="text-3xl font-display font-bold">{program.title}</h3>
                              <p className="text-white/70 text-sm">{program.fullName}</p>
                            </div>
                            <Badge variant="outline" className="ml-auto border-white/30 text-white/80 text-xs">
                              {program.badge}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <Clock className="w-4 h-4" />
                            <span>{program.duration}</span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                            {program.description}
                          </p>
                          <div className="space-y-2 mb-6">
                            {program.highlights.map((h) => (
                              <div key={h} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#e31c23] shrink-0" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                              Careers: {program.careerPaths}
                            </span>
                            <span className="inline-flex items-center text-sm font-semibold text-[#e31c23] group-hover:gap-2 transition-all whitespace-nowrap">
                              View Details
                              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <Badge variant="info" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
              Why Our Programs
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1c3557] dark:text-white">
              Designed for Your Success
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Every program at Milton is thoughtfully structured to provide a balance of theory,
              practice, and professional development.
            </p>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY_CHOOSE.map((item) => {
              const Icon = item.icon
              return (
                <FadeInSection key={item.title}>
                  <Card className="h-full border-0 shadow-md bg-[#f8f6f0] dark:bg-gray-800 rounded-xl">
                    <CardContent className="p-8 text-center">
                      <div className="w-14 h-14 rounded-xl bg-[#1c3557] flex items-center justify-center mx-auto mb-5">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-display font-bold text-[#1c3557] dark:text-white mb-3">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c3557] via-[#1c3557] to-[#0e1d31]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(227,28,35,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(201,168,76,0.08),transparent_50%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <GraduationCap className="w-12 h-12 text-[#c9a84c] mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
              Ready to Start Your<br />
              <span className="bg-gradient-to-r from-[#e31c23] to-[#c9a84c] bg-clip-text text-transparent">
                Academic Journey?
              </span>
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Admissions are open for the 2026/27 academic year. Apply now and take the first
              step toward a successful career.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/admissions">
                <Button size="xl" className="bg-[#e31c23] hover:bg-[#c4181e] text-white shadow-xl shadow-[#e31c23]/25 group">
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                  Talk to Counselor
                </Button>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}
