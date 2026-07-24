"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  Search, MapPin, GraduationCap, BookOpen, Users, ArrowRight,
  Mail, ChevronDown, Filter, ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import { FACULTY } from "@/lib/data/faculty"

const DEPARTMENTS = ["All Departments", "BCA", "BBM", "BBS", "BASW", "Administration"]

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

export default function FacultyPage() {
  const [search, setSearch] = useState("")
  const [department, setDepartment] = useState("All Departments")

  const filtered = FACULTY.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.specialization.toLowerCase().includes(search.toLowerCase()) ||
      f.subjects.some((s) => s.toLowerCase().includes(search.toLowerCase()))
    const matchesDept = department === "All Departments" || f.department === department
    return matchesSearch && matchesDept
  })

  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c3557] via-[#1c3557]/95 to-[#0e1d31] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(227,28,35,0.15),transparent_60%)] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,168,76,0.08),transparent_50%)] z-0" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNFYzNEg2ek02IDRWMEg0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] z-0 opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-white/20 text-white/80 bg-white/5 backdrop-blur-sm">
              <Users className="w-3.5 h-3.5 mr-1.5 text-[#e31c23]" />
              Our Team
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight"
          >
            Our Faculty
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Meet our dedicated team of experienced educators and industry professionals
            committed to shaping the next generation of leaders.
          </motion.p>
        </div>
      </section>

      {/* ─── SEARCH & FILTER ─── */}
      <section className="py-8 bg-[#f8f6f0] dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by name, specialization, or subject..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="w-full sm:w-56">
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FACULTY GRID ─── */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-[#1c3557] dark:text-white mb-2">No faculty found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((faculty, index) => (
                <FadeInSection key={faculty.name}>
                  <Link href={`/faculty/${faculty.id}`}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="group h-full"
                    >
                      <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer">
                        <div className="bg-gradient-to-r from-[#1c3557] to-[#0e1d31] p-6 text-center relative">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,28,35,0.15),transparent_70%)]" />
                          <Avatar className="w-20 h-20 mx-auto border-4 border-white/20 relative z-10">
                            <AvatarFallback className="bg-[#c9a84c] text-white text-xl font-bold">
                              {getInitials(faculty.name)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-display font-bold text-[#1c3557] dark:text-white text-center group-hover:text-[#e31c23] transition-colors inline-flex items-center gap-1">
                            {faculty.name}
                            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                          <p className="text-xs text-[#e31c23] font-medium text-center mt-1">
                            {faculty.qualifications}
                          </p>
                          <div className="mt-4 flex items-start gap-2">
                            <GraduationCap className="w-4 h-4 text-[#c9a84c] mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-semibold text-[#1c3557] dark:text-white">Specialization</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{faculty.specialization}</p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-start gap-2">
                            <BookOpen className="w-4 h-4 text-[#c9a84c] mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-semibold text-[#1c3557] dark:text-white">Subjects</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {faculty.subjects.map((s) => (
                                  <Badge key={s} variant="secondary" className="text-[10px] px-1.5 py-0">
                                    {s}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <Badge variant={faculty.department === "Administration" ? "warning" : "info"} className="text-[10px]">
                              {faculty.department}
                            </Badge>
                            <a
                              href={`mailto:${faculty.email}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-[#e31c23] hover:text-[#c4181e] transition-colors"
                            >
                              <Mail className="w-4 h-4" />
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                </FadeInSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c3557] via-[#1c3557] to-[#0e1d31]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(227,28,35,0.12),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50+", label: "Faculty Members" },
              { value: "80%", label: "Hold Master's or Ph.D." },
              { value: "12+", label: "Years Avg. Experience" },
              { value: "5:1", label: "Student-Faculty Ratio" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold font-display text-white">{s.value}</div>
                <div className="text-sm text-white/70 mt-1 font-medium uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-[#f8f6f0] dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <GraduationCap className="w-12 h-12 text-[#c9a84c] mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1c3557] dark:text-white leading-tight">
              Learn from the{" "}
              <span className="text-[#e31c23]">Best</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our faculty bring a wealth of academic knowledge and industry experience to the classroom.
              Join Milton and learn from experts who genuinely care about your success.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" className="bg-[#e31c23] hover:bg-[#c4181e] text-white shadow-xl shadow-[#e31c23]/25">
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="xl" className="border-[#1c3557]/20 text-[#1c3557] hover:bg-[#1c3557] hover:text-white">
                Schedule a Visit
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}
