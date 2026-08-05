"use client"

import { useRef } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  ArrowLeft, Mail, GraduationCap, BookOpen, Award, Briefcase,
  Calendar, ChevronRight, Users, MapPin
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials, DEPARTMENT_BADGE_STYLES } from "@/lib/utils"
import { FACULTY } from "@/lib/data/faculty"

export default function FacultyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const member = FACULTY.find((f) => f.id === id)

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold mb-2" style={{ color: "var(--page-text, #000000)" }}>Faculty Not Found</h1>
          <p className="text-gray-500 mb-6">The faculty member you are looking for does not exist.</p>
          <Link href="/faculty"><Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" />Back to Faculty</Button></Link>
        </div>
      </div>
    )
  }

  return <FacultyProfile member={member} />
}

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className={className}>
      {children}
    </motion.div>
  )
}

function FacultyProfile({ member }: { member: typeof FACULTY[0] }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      {/* Back bar */}
      <div className="border-b border-gray-100 dark:border-gray-800 dark:bg-gray-900" style={{ background: "var(--page-bg, #ffffff)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/faculty" className="inline-flex items-center text-sm text-gray-500 transition-colors"
            style={{ color: "var(--page-secondary, #fe0000)" }}>
            <ArrowLeft className="w-4 h-4 mr-1.5" />Back to Faculty
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16" style={{ background: "linear-gradient(135deg, var(--page-hero-from), var(--page-hero-to))" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-[var(--page-accent,#fe0000)]/40 shadow-xl">
                <AvatarImage src={member.photo} alt={member.name} />
                <AvatarFallback className="text-white text-4xl font-bold" style={{ background: "var(--page-primary, #1b3f63)" }}>
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-center md:text-left flex-1">
              <Badge variant="outline" className="mb-3 border-white/20 text-white/80 bg-white/5">{member.department}</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">{member.name}</h1>
              <p className="text-lg mt-2" style={{ color: "var(--page-secondary, #fe0000)" }}>{member.qualifications}</p>
              <p className="text-white/60 mt-3 max-w-2xl">{member.bio || member.specialization}</p>
              <div className="flex flex-wrap items-center gap-4 mt-6 justify-center md:justify-start">
                <a href={`mailto:${member.email}`}>
                  <Button size="sm" variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
                    <Mail className="w-4 h-4 mr-2" />{member.email}
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {member.experience && (
              <FadeInSection>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-display font-bold dark:text-white flex items-center gap-2 mb-4" style={{ color: "var(--page-text, #000000)" }}>
                      <Briefcase className="w-5 h-5" style={{ color: "var(--page-secondary, #fe0000)" }} />Experience
                    </h2>
                    <div className="space-y-4">
                      {member.experience.map((exp, i) => (
                        <div key={i} className="flex gap-4 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                          <div className="w-10 h-10 rounded-lg dark:bg-white/5 flex items-center justify-center shrink-0" style={{ background: "var(--page-primary, #1b3f63)" }}>
                            <Briefcase className="w-5 h-5 dark:text-white" style={{ color: "var(--page-text, #000000)" }} />
                          </div>
                          <div>
                            <h3 className="font-semibold dark:text-white" style={{ color: "var(--page-text, #000000)" }}>{exp.role}</h3>
                            <p className="text-sm text-gray-500">{exp.institution}</p>
                            <p className="text-xs text-gray-400 mt-1">{exp.years}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            )}

            {member.education && (
              <FadeInSection>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-display font-bold dark:text-white flex items-center gap-2 mb-4" style={{ color: "var(--page-text, #000000)" }}>
                      <GraduationCap className="w-5 h-5" style={{ color: "var(--page-secondary, #fe0000)" }} />Education
                    </h2>
                    <ul className="space-y-3">
                      {member.education.map((edu, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: "var(--page-secondary, #fe0000)" }} />
                          <span className="text-gray-700 dark:text-gray-300">{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeInSection>
            )}

            {member.achievements && (
              <FadeInSection>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-display font-bold dark:text-white flex items-center gap-2 mb-4" style={{ color: "var(--page-text, #000000)" }}>
                      <Award className="w-5 h-5" style={{ color: "var(--page-secondary, #fe0000)" }} />Achievements
                    </h2>
                    <ul className="space-y-3">
                      {member.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Award className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--page-accent, #fe0000)" }} />
                          <span className="text-gray-700 dark:text-gray-300">{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeInSection>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <FadeInSection>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-display font-bold dark:text-white mb-4" style={{ color: "var(--page-text, #000000)" }}>Quick Info</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Specialization</p>
                      <p className="text-sm font-medium dark:text-white" style={{ color: "var(--page-text, #000000)" }}>{member.specialization}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Department</p>
                      <Badge
                        variant="outline"
                        className="border-transparent"
                        style={DEPARTMENT_BADGE_STYLES[member.department] ?? { background: "#F1F2F4", color: "#4B5563" }}
                      >
                        {member.department}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Subjects</p>
                      <div className="flex flex-wrap gap-1.5">
                        {member.subjects.map((s) => (
                          <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Contact</p>
                      <a href={`mailto:${member.email}`} className="text-sm hover:underline" style={{ color: "var(--page-secondary, #fe0000)" }}>{member.email}</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection>
              <Card className="border-0 shadow-md text-white" style={{ background: "linear-gradient(135deg, var(--page-hero-from), var(--page-hero-to))" }}>
                <CardContent className="p-6 text-center">
                  <GraduationCap className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--page-accent, #fe0000)" }} />
                  <h3 className="font-display font-bold text-lg mb-2">Learn from the Best</h3>
                  <p className="text-white/60 text-sm mb-4">Join Milton and study under experienced faculty dedicated to your success.</p>
                  <Link href="/admissions">
                    <Button size="sm" className="w-full" style={{ background: "var(--page-secondary, #fe0000)", color: "#ffffff" }}>Apply Now</Button>
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
