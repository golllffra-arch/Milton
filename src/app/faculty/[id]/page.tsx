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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import { FACULTY } from "@/lib/data/faculty"

export default function FacultyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const member = FACULTY.find((f) => f.id === id)

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-[#1c3557] dark:text-white mb-2">Faculty Not Found</h1>
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
      <div className="border-b border-gray-100 dark:border-gray-800 bg-[#f8f6f0] dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/faculty" className="inline-flex items-center text-sm text-gray-500 hover:text-[#e31c23] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1.5" />Back to Faculty
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-[#1c3557] via-[#1c3557]/95 to-[#0e1d31]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-white/20 shadow-xl">
                <AvatarFallback className="bg-[#c9a84c] text-white text-4xl font-bold">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-center md:text-left flex-1">
              <Badge variant="outline" className="mb-3 border-white/20 text-white/80 bg-white/5">{member.department}</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">{member.name}</h1>
              <p className="text-lg text-[#c9a84c] mt-2">{member.qualifications}</p>
              <p className="text-white/60 mt-3 max-w-2xl">{member.bio || member.specialization}</p>
              <div className="flex flex-wrap items-center gap-4 mt-6 justify-center md:justify-start">
                <a href={`mailto:${member.email}`}>
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
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
                    <h2 className="text-xl font-display font-bold text-[#1c3557] dark:text-white flex items-center gap-2 mb-4">
                      <Briefcase className="w-5 h-5 text-[#e31c23]" />Experience
                    </h2>
                    <div className="space-y-4">
                      {member.experience.map((exp, i) => (
                        <div key={i} className="flex gap-4 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                          <div className="w-10 h-10 rounded-lg bg-[#1c3557]/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                            <Briefcase className="w-5 h-5 text-[#1c3557] dark:text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#1c3557] dark:text-white">{exp.role}</h3>
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
                    <h2 className="text-xl font-display font-bold text-[#1c3557] dark:text-white flex items-center gap-2 mb-4">
                      <GraduationCap className="w-5 h-5 text-[#e31c23]" />Education
                    </h2>
                    <ul className="space-y-3">
                      {member.education.map((edu, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#e31c23] mt-2 shrink-0" />
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
                    <h2 className="text-xl font-display font-bold text-[#1c3557] dark:text-white flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-[#e31c23]" />Achievements
                    </h2>
                    <ul className="space-y-3">
                      {member.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Award className="w-4 h-4 text-[#c9a84c] mt-0.5 shrink-0" />
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
                  <h3 className="font-display font-bold text-[#1c3557] dark:text-white mb-4">Quick Info</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Specialization</p>
                      <p className="text-sm font-medium text-[#1c3557] dark:text-white">{member.specialization}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Department</p>
                      <Badge variant="info">{member.department}</Badge>
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
                      <a href={`mailto:${member.email}`} className="text-sm text-[#e31c23] hover:underline">{member.email}</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection>
              <Card className="border-0 shadow-md bg-gradient-to-br from-[#1c3557] to-[#0e1d31] text-white">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="w-10 h-10 text-[#c9a84c] mx-auto mb-3" />
                  <h3 className="font-display font-bold text-lg mb-2">Learn from the Best</h3>
                  <p className="text-white/60 text-sm mb-4">Join Milton and study under experienced faculty dedicated to your success.</p>
                  <Link href="/admissions">
                    <Button size="sm" className="bg-[#e31c23] hover:bg-[#c4181e] text-white w-full">Apply Now</Button>
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
