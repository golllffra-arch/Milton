"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { motion, useInView, useAnimation } from "framer-motion"
import {
  GraduationCap, BookOpen, Users, Globe, Trophy,
  Shield, MapPin, ChevronRight, Star, ArrowRight,
  Calendar, Newspaper, Quote, Play, Award, Briefcase,
  Building2, ChevronLeft, Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const COUNTDOWN_DATA = [
  { value: 2010, label: "Founded", suffix: "", prefix: "" },
  { value: 4, label: "Programs", suffix: "+", prefix: "" },
  { value: 500, label: "Students", suffix: "+", prefix: "" },
  { value: 50, label: "Faculty", suffix: "+", prefix: "" },
]

const WHY_MILTON = [
  {
    icon: Award,
    title: "Academic Excellence",
    description:
      "TU-affiliated curriculum with experienced faculty dedicated to nurturing critical thinking, innovation, and academic rigor across all programs.",
    color: "from-blue-600 to-blue-800",
    lightBg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: Globe,
    title: "Global Exposure",
    description:
      "International study tours, exchange programs, and global partnerships that prepare students for a borderless professional world.",
    color: "from-red-500 to-red-700",
    lightBg: "bg-red-50 dark:bg-red-950/30",
  },
  {
    icon: Building2,
    title: "Modern Campus",
    description:
      "State-of-the-art infrastructure with smart classrooms, modern computer labs, library, and vibrant student spaces in New Baneshwor.",
    color: "from-amber-500 to-amber-700",
    lightBg: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    icon: Briefcase,
    title: "Career Support",
    description:
      "Dedicated career counseling, internship placements, resume workshops, and industry connections to launch your professional journey.",
    color: "from-green-500 to-green-700",
    lightBg: "bg-green-50 dark:bg-green-950/30",
  },
]

const PROGRAMS = [
  {
    icon: GraduationCap,
    title: "BCA",
    fullName: "Bachelor of Computer Applications",
    description:
      "Four-year program blending software development, data science, and IT management for tomorrow's tech leaders.",
    href: "/programs/bca",
    badge: "Tech",
    gradient: "from-[#1c3557] to-[#2c3e7a]",
  },
  {
    icon: BookOpen,
    title: "BBM",
    fullName: "Bachelor of Business Management",
    description:
      "Comprehensive management education covering finance, marketing, HR, and entrepreneurship for dynamic careers.",
    href: "/programs/bbm",
    badge: "Business",
    gradient: "from-[#e31c23] to-[#a51419]",
  },
  {
    icon: Shield,
    title: "BBS",
    fullName: "Bachelor of Business Studies",
    description:
      "Foundational business degree with a strong focus on accounting, economics, and organizational management.",
    href: "/programs/bbs",
    badge: "Commerce",
    gradient: "from-[#1c3557] to-[#0e1d31]",
  },
  {
    icon: Users,
    title: "BASW",
    fullName: "Bachelor of Arts in Social Work",
    description:
      "Empowering students to drive social change through community engagement, research, and development practice.",
    href: "/programs/basw",
    badge: "Social",
    gradient: "from-[#c9a84c] to-[#a8882e]",
  },
]

const TESTIMONIALS = [
  {
    name: "Anisha Sharma",
    program: "BCA Graduate",
    quote:
      "Milton shaped my entire career. The faculty mentorship and practical projects gave me the confidence to excel in the tech industry. I landed my dream job before graduation.",
    rating: 5,
    initials: "AS",
  },
  {
    name: "Rohan Thapa",
    program: "BBM Graduate",
    quote:
      "The international business tour to Singapore was a game-changer. Milton doesn't just teach theory — it gives you real-world exposure that sets you apart.",
    rating: 5,
    initials: "RT",
  },
  {
    name: "Priya Koirala",
    program: "BASW Graduate",
    quote:
      "The social work program at Milton gave me hands-on experience in community development. The faculty genuinely care about making a difference through education.",
    rating: 5,
    initials: "PK",
  },
]

const NEWS_EVENTS = [
  {
    title: "Inter-College Tech Fest 2026",
    date: "Aug 15, 2026",
    category: "Event",
    excerpt: "Milton is hosting the annual inter-college technology festival with coding competitions, workshops, and guest speakers from leading tech firms.",
    icon: Calendar,
  },
  {
    title: "Admissions Open for 2026/27",
    date: "Jul 20, 2026",
    category: "Notice",
    excerpt: "Applications are now being accepted for BCA, BBM, BBS, and BASW programs. Early bird scholarships available for meritorious students.",
    icon: Newspaper,
  },
  {
    title: "International Study Tour 2026",
    date: "Sep 5, 2026",
    category: "Event",
    excerpt: "Students will visit Thailand and Malaysia for academic exposure, industry visits, and cultural exchange as part of our global learning initiative.",
    icon: Globe,
  },
  {
    title: "Merit Scholarship Announcement",
    date: "Jun 30, 2026",
    category: "Notice",
    excerpt: "Milton International College announces merit-based scholarships for outstanding students across all programs. Apply by August 15.",
    icon: Trophy,
  },
]

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  label,
}: {
  value: number
  suffix?: string
  prefix?: string
  label: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold font-display text-white">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-sm md:text-base text-white/70 mt-1 font-medium tracking-wide uppercase">
        {label}
      </div>
    </div>
  )
}

function ServiceCard({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
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

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [showApply, setShowApply] = useState(false)
  const [newsIndex, setNewsIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 20)
      setShowApply(scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % NEWS_EVENTS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="overflow-hidden">
      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c3557] via-[#1c3557]/95 to-[#0e1d31] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(227,28,35,0.15),transparent_60%)] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,168,76,0.08),transparent_50%)] z-0" />
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c3557] via-transparent to-transparent z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 text-sm border-white/20 text-white/80 bg-white/5 backdrop-blur-sm"
            >
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#e31c23]" />
              New Baneshwor, Kathmandu &middot; TU Affiliated &middot; Est. 2010
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[1.1] tracking-tight"
          >
            Shape Your Future
            <br />
            <span className="bg-gradient-to-r from-[#e31c23] via-[#f55959] to-[#c9a84c] bg-clip-text text-transparent">
              at Milton
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Where academic rigor meets global perspective. Affiliated with Tribhuvan University,
            we empower the next generation of leaders, innovators, and changemakers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/admissions">
              <Button
                variant="navy"
                size="xl"
                className="bg-[#e31c23] hover:bg-[#c4181e] text-white shadow-xl shadow-[#e31c23]/25 group"
              >
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/programs">
              <Button
                variant="outline"
                size="xl"
                className="border-white/20 text-white hover:bg-white/10 hover:text-white"
              >
                <Play className="mr-2 w-4 h-4" />
                Explore Programs
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {COUNTDOWN_DATA.map((stat) => (
              <AnimatedCounter key={stat.label} {...stat} />
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronRight className="w-6 h-6 text-white/40 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── WHY MILTON ─── */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <Badge variant="info" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1c3557] dark:text-white">
              The Milton Advantage
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Four pillars that define the Milton experience and set our students up for lifelong success.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_MILTON.map((item, index) => {
              const Icon = item.icon
              return (
                <FadeInSection key={item.title}>
                  <motion.div
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="group relative"
                  >
                    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
                      <div className={`h-1.5 w-full bg-gradient-to-r ${item.color}`} />
                      <CardContent className="p-8">
                        <div
                          className={`w-14 h-14 rounded-xl ${item.lightBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="w-7 h-7 text-[#1c3557] dark:text-white" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-[#1c3557] dark:text-white mb-3">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── PROGRAMS ─── */}
      <section className="py-24 bg-[#f8f6f0] dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <Badge variant="warning" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
              Our Programs
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1c3557] dark:text-white">
              Academic Pathways
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Four distinct undergraduate programs designed to match your passion and career ambitions.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {PROGRAMS.map((program, index) => {
              const Icon = program.icon
              return (
                <FadeInSection key={program.title}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="group"
                  >
                    <Link href={program.href}>
                      <Card className="h-full border-0 shadow-md hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div
                            className={`bg-gradient-to-br ${program.gradient} p-8 sm:w-52 flex flex-col items-center justify-center text-white relative overflow-hidden`}
                          >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
                            <Icon className="w-16 h-16 mb-3 relative z-10" />
                            <h3 className="text-4xl font-display font-bold relative z-10">{program.title}</h3>
                            <Badge
                              variant="outline"
                              className="mt-3 border-white/30 text-white/80 text-xs relative z-10"
                            >
                              {program.badge}
                            </Badge>
                          </div>
                          <CardContent className="flex-1 p-8">
                            <h4 className="text-lg font-display font-semibold text-[#1c3557] dark:text-white mb-3">
                              {program.fullName}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                              {program.description}
                            </p>
                            <span className="inline-flex items-center text-sm font-semibold text-[#e31c23] group-hover:gap-2 transition-all">
                              Learn More
                              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </CardContent>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c3557] via-[#1c3557] to-[#0e1d31]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(227,28,35,0.12),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {COUNTDOWN_DATA.map((stat) => (
              <AnimatedCounter key={`bar-${stat.label}`} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWS & EVENTS CAROUSEL ─── */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <Badge variant="info" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
                Stay Updated
              </Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1c3557] dark:text-white">
                News & Events
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Latest happenings at Milton International College</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setNewsIndex((prev) => (prev - 1 + NEWS_EVENTS.length) % NEWS_EVENTS.length)}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setNewsIndex((prev) => (prev + 1) % NEWS_EVENTS.length)}
                className="rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </FadeInSection>

          <div className="relative overflow-hidden">
            <motion.div
              key={newsIndex}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Card className="border-0 shadow-lg bg-[#f8f6f0] dark:bg-gray-800 rounded-2xl overflow-hidden">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#1c3557] dark:bg-[#1c3557]/80 flex items-center justify-center shrink-0">
                      {(() => {
                        const Icon = NEWS_EVENTS[newsIndex].icon
                        return <Icon className="w-8 h-8 text-white" />
                      })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <Badge variant="warning" className="text-xs">
                          {NEWS_EVENTS[newsIndex].category}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {NEWS_EVENTS[newsIndex].date}
                        </span>
                      </div>
                      <h3 className="text-2xl font-display font-bold text-[#1c3557] dark:text-white mb-2">
                        {NEWS_EVENTS[newsIndex].title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {NEWS_EVENTS[newsIndex].excerpt}
                      </p>
                    </div>
                    <Link
                      href="/news"
                      className="shrink-0 text-[#e31c23] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap"
                    >
                      View All
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {NEWS_EVENTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setNewsIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === newsIndex ? "bg-[#e31c23] w-8" : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 bg-[#f8f6f0] dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <Badge variant="success" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
              Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1c3557] dark:text-white">
              Voices of Milton
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear from our alumni about how Milton shaped their careers and lives.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <FadeInSection key={testimonial.name}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="h-full"
                >
                  <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#e31c23]/10 to-transparent rounded-bl-full" />
                    <CardContent className="p-8">
                      <Quote className="w-10 h-10 text-[#e31c23]/20 mb-4" />
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#c9a84c] text-[#c9a84c]" />
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1c3557] to-[#e31c23] flex items-center justify-center text-white text-sm font-bold">
                          {testimonial.initials}
                        </div>
                        <div>
                          <div className="font-semibold text-[#1c3557] dark:text-white text-sm">
                            {testimonial.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{testimonial.program}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c3557] via-[#1c3557] to-[#0e1d31]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(227,28,35,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(201,168,76,0.08),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-12 h-12 text-[#c9a84c] mx-auto mb-6" />
            </motion.div>
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 text-sm border-white/20 text-white/80 bg-white/5 backdrop-blur-sm"
            >
              Admissions Open for 2026/27
            </Badge>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
              Begin Your Journey
              <br />
              <span className="bg-gradient-to-r from-[#e31c23] to-[#c9a84c] bg-clip-text text-transparent">
                at Milton Today
              </span>
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
              Take the first step toward a world-class education. Apply now for the 2026/27 academic year
              and unlock scholarships, mentorship, and a vibrant campus life.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/admissions">
                <Button
                  size="xl"
                  className="bg-[#e31c23] hover:bg-[#c4181e] text-white shadow-xl shadow-[#e31c23]/25 group"
                >
                  Apply Online
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                >
                  Contact Admissions
                </Button>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─── FLOATING APPLY BUTTON ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={
          showApply
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.8, y: 20 }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Link href="/admissions">
          <Button
            size="xl"
            className="bg-[#e31c23] hover:bg-[#c4181e] text-white shadow-2xl shadow-[#e31c23]/40 rounded-full px-8 group"
          >
            <GraduationCap className="w-5 h-5 mr-2" />
            Apply Now
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowRight className="ml-2 w-4 h-4" />
            </motion.span>
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
