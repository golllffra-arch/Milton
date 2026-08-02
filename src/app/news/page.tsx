"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  Newspaper, Calendar, Trophy, Globe, ArrowRight, MapPin,
  Megaphone, Award, BookOpen, Users, ChevronRight, Star,
  GraduationCap, Sparkles, Heart, Landmark
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { formatDate, truncate } from "@/lib/utils"

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "notices", label: "Notices" },
  { value: "events", label: "Events" },
  { value: "achievements", label: "Achievements" },
]

const NEWS_ITEMS = [
  {
    id: 1,
    title: "Admissions Open for 2026/27 Academic Year",
    date: new Date("2026-07-20"),
    category: "notices",
    type: "Notice",
    excerpt: "Applications are now being accepted for BCA, BBM, BBS, and BASW programs. Early bird scholarships available for meritorious students. Apply before September 15.",
    featured: true,
    icon: GraduationCap,
    color: "from-[#d93a2b] to-[#d93a2b]",
  },
  {
    id: 2,
    title: "Milton Wins Inter-College Tech Championship",
    date: new Date("2026-07-15"),
    category: "achievements",
    type: "Achievement",
    excerpt: "Our students secured first place at the National Inter-College Technology Championship 2026, beating 25 teams from across Nepal in coding and project categories.",
    featured: false,
    icon: Trophy,
    color: "from-[#d93a2b] to-[#b82e21]",
  },
  {
    id: 3,
    title: "International Study Tour 2026: Singapore & Malaysia",
    date: new Date("2026-09-05"),
    category: "events",
    type: "Event",
    excerpt: "Students will visit Singapore and Malaysia for academic exposure, industry visits to tech hubs, and cultural exchange as part of our global learning initiative.",
    featured: false,
    icon: Globe,
    color: "from-sky-500 to-blue-700",
  },
  {
    id: 4,
    title: "Merit Scholarship Announcement 2026",
    date: new Date("2026-06-30"),
    category: "notices",
    type: "Notice",
    excerpt: "Milton International College announces merit-based scholarships for outstanding students across all programs. Scholarships cover up to 50% of tuition fees.",
    featured: false,
    icon: Award,
    color: "from-[#1b3a5c] to-[#12283f]",
  },
  {
    id: 5,
    title: "Annual College Fest 'Milton Mela' 2026",
    date: new Date("2026-10-12"),
    category: "events",
    type: "Event",
    excerpt: "The biggest cultural event of the year featuring music performances, dance competitions, food stalls, art exhibitions, and guest appearances from renowned artists.",
    featured: false,
    icon: Star,
    color: "from-[#1b3a5c] to-[#12283f]",
  },
  {
    id: 6,
    title: "BCA Students Develop Campus Management App",
    date: new Date("2026-08-22"),
    category: "achievements",
    type: "Achievement",
    excerpt: "A team of BCA final-year students built a comprehensive campus management application that digitizes attendance, notices, and grade tracking for the college.",
    featured: false,
    icon: BookOpen,
    color: "from-[#1b3a5c] to-[#12283f]",
  },
  {
    id: 7,
    title: "Community Service: Visit to Bishnumati Care Home",
    date: new Date("2026-09-20"),
    category: "events",
    type: "Event",
    excerpt: "BASW and BBM students organized a day of community service at Bishnumati Care Home, engaging with residents and contributing essential supplies.",
    featured: false,
    icon: Heart,
    color: "from-[#d93a2b] to-[#b82e21]",
  },
  {
    id: 8,
    title: "Exam Schedule Notice: Semester End 2026",
    date: new Date("2026-11-01"),
    category: "notices",
    type: "Notice",
    excerpt: "The end-semester examination schedule for all programs has been published. Students are requested to check the notice board and download the timetable.",
    featured: false,
    icon: Megaphone,
    color: "from-[#d93a2b] to-[#b82e21]",
  },
  {
    id: 9,
    title: "Alumni Achievement: Milton Graduate Joins Google",
    date: new Date("2026-08-10"),
    category: "achievements",
    type: "Achievement",
    excerpt: "BCA graduate Arjun Khadka (Class of 2022) has been hired by Google as a Software Engineer, making Milton proud with his remarkable achievement.",
    featured: false,
    icon: Trophy,
    color: "from-[#1b3a5c] to-[#12283f]",
  },
  {
    id: 10,
    title: "Guest Lecture Series: Industry Experts 2026",
    date: new Date("2026-10-05"),
    category: "events",
    type: "Event",
    excerpt: "A series of guest lectures by industry leaders from banking, IT, and social sectors to bridge the gap between academic learning and professional practice.",
    featured: false,
    icon: Users,
    color: "from-[#1b3a5c] to-[#12283f]",
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
            background: i % 3 === 0 ? "var(--page-primary, #1b3a5c)" : i % 3 === 1 ? "var(--page-secondary, #d93a2b)" : "var(--page-accent, #d93a2b)",
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
          background: "var(--page-primary, #1b3a5c)",
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
          background: "var(--page-secondary, #d93a2b)",
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
          background: "var(--page-accent, #d93a2b)",
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

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filtered = activeTab === "all"
    ? NEWS_ITEMS
    : NEWS_ITEMS.filter((item) => item.category === activeTab)

  const featured = filtered.find((item) => item.featured)
  const rest = filtered.filter((item) => !item.featured)

  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg, var(--page-hero-from, #d93a2b), var(--page-hero-to, #d93a2b))" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(227,28,35,0.15),transparent_60%)] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,168,76,0.08),transparent_50%)] z-0" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNFYzNEg2ek02IDRWMEg0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] z-0 opacity-30" />
        <FloatingParticles />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-white/20 text-white/80 bg-white/5 backdrop-blur-sm">
              <Newspaper className="w-3.5 h-3.5 mr-1.5" style={{ color: "var(--page-secondary, #d93a2b)" }} />
              Stay Informed
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight"
          >
            News & Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Stay updated with the latest announcements, events, achievements, and happenings at Milton.
          </motion.p>
        </div>
      </section>

      {/* ─── FILTERS ─── */}
      <section className="py-8 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" style={{ background: "var(--page-bg, #ffffff)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center">
              <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm">
                {CATEGORIES.map((cat) => (
                  <TabsTrigger
                    key={cat.value}
                    value={cat.value}
                    className="px-6 py-2 rounded-lg text-sm font-medium data-[state=active]:text-white"
                    style={activeTab === cat.value ? { background: "var(--page-primary, #d93a2b)" } : undefined}
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </div>
      </section>

      {/* ─── NEWS GRID ─── */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold dark:text-white mb-2" style={{ color: "var(--page-text, #1a1a1a)" }}>No items found</h3>
              <p className="text-gray-500">No news items in this category yet.</p>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <FadeInSection className="mb-10">
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-[#f8f6f0] to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col lg:flex-row">
                        <div className={`lg:w-96 bg-gradient-to-br ${featured.color} p-10 flex items-center justify-center relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
                          {(() => {
                            const Icon = featured.icon
                            return <Icon className="w-20 h-20 text-white/30 relative z-10" />
                          })()}
                        </div>
                        <div className="flex-1 p-8 lg:p-10">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <Badge variant="warning" className="text-xs uppercase tracking-wider">{featured.type}</Badge>
                            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(featured.date)}
                            </span>
                          </div>
                          <h2 className="text-2xl lg:text-3xl font-display font-bold dark:text-white mb-4" style={{ color: "var(--page-text, #1a1a1a)" }}>
                            {featured.title}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                            {featured.excerpt}
                          </p>
                          <Button variant="navy" asChild className="group">
                            <Link href={`#news-${featured.id}`}>
                              Read Full Article
                              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeInSection>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <FadeInSection key={item.id}>
                      <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="group h-full"
                      >
                        <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                          <div className={`bg-gradient-to-br ${item.color} p-6 relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
                            <Icon className="w-10 h-10 text-white/40 relative z-10" />
                            <Badge
                              variant="outline"
                              className="absolute top-4 right-4 border-white/20 text-white/80 text-[10px] uppercase tracking-wider z-10"
                            >
                              {item.type}
                            </Badge>
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(item.date)}
                            </div>
                            <h3 className="text-lg font-display font-bold dark:text-white mb-2 leading-snug" style={{ color: "var(--page-text, #1a1a1a)" }}>
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                              {truncate(item.excerpt, 120)}
                            </p>
                            <span className="inline-flex items-center text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: "var(--page-secondary, #d93a2b)" }}>
                              Read More
                              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </FadeInSection>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--page-hero-from, #d93a2b), var(--page-hero-to, #d93a2b))" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(227,28,35,0.15),transparent_50%)]" />
        <FloatingParticles />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <Sparkles className="w-12 h-12 mx-auto mb-6" style={{ color: "var(--page-accent, #d93a2b)" }} />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
              Want to Share Your{" "}
              <span style={{ color: "var(--page-secondary, #d93a2b)" }}>Story?</span>
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              If you have news, achievements, or events to share with the Milton community, we would love to hear from you.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" asChild className="text-white shadow-xl" style={{ background: "var(--page-secondary, #d93a2b)" }}>
                <Link href="/contact">
                  Submit News
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}
