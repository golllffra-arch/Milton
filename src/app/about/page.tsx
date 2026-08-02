"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  BookOpen, Target, Shield, Award, MapPin,
  GraduationCap, Calendar, Users, Quote, ArrowRight,
  CheckCircle, ScrollText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const MILESTONES = [
  { year: 2010, title: "Founded", description: "Milton International College established in New Baneshwor, Kathmandu" },
  { year: 2012, title: "TU Affiliation", description: "Received affiliation from Tribhuvan University for BBS program" },
  { year: 2014, title: "BCA Program Launch", description: "Introduced Bachelor of Computer Applications program" },
  { year: 2016, title: "BBM & BASW Added", description: "Expanded programs to include BBM and BASW" },
  { year: 2018, title: "First Graduation", description: "First batch of students graduated with outstanding results" },
  { year: 2020, title: "Digital Transformation", description: "Implemented smart classrooms and online learning systems" },
  { year: 2024, title: "Research Center", description: "Established research and innovation center for students" },
  { year: 2026, title: "Growing Strong", description: "500+ students, 50+ faculty, and expanding horizons" },
]

const VALUES = [
  {
    icon: BookOpen,
    title: "Academic Excellence",
    description: "Rigorous curriculum designed to foster critical thinking, creativity, and intellectual growth.",
  },
  {
    icon: Target,
    title: "Holistic Development",
    description: "Balancing academics with sports, culture, and community service for well-rounded growth.",
  },
  {
    icon: Shield,
    title: "Integrity & Ethics",
    description: "Instilling strong moral values and ethical principles in every student.",
  },
  {
    icon: Award,
    title: "Innovation & Research",
    description: "Encouraging innovative thinking and research-oriented approach to problem-solving.",
  },
]

const STATS = [
  { value: 2010, label: "Established", suffix: "" },
  { value: 4, label: "Programs", suffix: "+" },
  { value: 500, label: "Students", suffix: "+" },
  { value: 50, label: "Faculty", suffix: "+" },
  { value: 95, label: "Pass Rate", suffix: "%" },
  { value: 12, label: "Years Legacy", suffix: "+" },
]

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
            background: i % 3 === 0 ? "var(--page-primary, #d93a2b)" : i % 3 === 1 ? "var(--page-secondary, #d93a2b)" : "var(--page-accent, #d93a2b)",
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
          background: "var(--page-primary, #d93a2b)",
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

function StatItem({ value, label, suffix }: { value: number; label: string; suffix: string }) {
  return (
    <div className="text-center p-4">
      <div className="text-3xl md:text-4xl font-bold font-display" style={{ color: "var(--page-secondary, #d93a2b)" }}>
        {value}{suffix}
      </div>
      <div className="text-sm font-medium mt-1 uppercase tracking-wider opacity-70" style={{ color: "var(--page-text, #1a1a1a)" }}>{label}</div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(135deg, var(--page-hero-from), var(--page-hero-to))",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(194,65,12,0.15),transparent_60%)] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(217,119,6,0.08),transparent_50%)] z-0" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNFYzNEg2ek02IDRWMEg0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] z-0 opacity-30" />
        <FloatingParticles />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-white/20 text-white/80 bg-white/5 backdrop-blur-sm">
              <MapPin className="w-3.5 h-3.5 mr-1.5" style={{ color: "var(--page-secondary, #d93a2b)" }} />
              New Baneshwor, Kathmandu
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight"
          >
            About Milton
            <br />
            <span className="bg-gradient-to-r from-[#d93a2b] via-[#f55959] to-[#d93a2b] bg-clip-text text-transparent">
              International College
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Discover our legacy of academic excellence, our commitment to holistic education,
            and our vision for shaping the leaders of tomorrow.
          </motion.p>
        </div>
      </section>

      {/* ─── HISTORY ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <Badge variant="info" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
                Our History
              </Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white leading-tight" style={{ color: "var(--page-text, #1a1a1a)" }}>
                Inspired by{" "}
                <span style={{ color: "var(--page-secondary, #d93a2b)" }}>John Milton</span>
              </h2>
              <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Milton International College draws its name and inspiration from{" "}
                  <strong className="dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>John Milton</strong>
                  (1608–1674), the renowned English poet and intellectual who championed
                  free thought, education reform, and the pursuit of knowledge. His famous
                  words —{" "}
                  <em className="dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>
                    &ldquo;The mind is its own place, and in itself can make a heaven of hell,
                    a hell of heaven&rdquo;
                  </em>{" "}
                  — reflect our belief in the transformative power of education.
                </p>
                <p>
                  Established in <strong className="dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>2010</strong>,
                  Milton International College was founded with a vision to provide
                  world-class, affordable higher education in Nepal. Located in the heart of
                  New Baneshwor, Kathmandu, the college began with a single program and a
                  small cohort of passionate students.
                </p>
                <p>
                  Over the years, we have grown into a multi-program institution affiliated with
                  Tribhuvan University, offering BCA, BBM, BBS, and BASW programs. Our journey
                  from a modest beginning to a respected college is a testament to our unwavering
                  commitment to quality education and student success.
                </p>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl" style={{ background: "color-mix(in srgb, var(--page-accent, #d93a2b) 20%, transparent)" }} />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl" style={{ background: "color-mix(in srgb, var(--page-secondary, #d93a2b) 10%, transparent)" }} />
                <div className="relative rounded-2xl p-8 shadow-xl" style={{ background: "var(--page-bg, #ffffff)" }}>
                  <h3 className="text-2xl font-display font-bold dark:text-white mb-6" style={{ color: "var(--page-text, #1a1a1a)" }}>
                    Our Journey
                  </h3>
                  <div className="space-y-6">
                    {MILESTONES.slice(0, 4).map((m, i) => (
                      <div key={m.year} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: i === 0 ? "var(--page-secondary, #d93a2b)" : "var(--page-primary, #d93a2b)" }}>
                            {m.year.toString().slice(2)}
                          </div>
                          {i < 3 && <div className="w-0.5 h-8 bg-gray-300 dark:bg-gray-600" />}
                        </div>
                        <div className="pb-2">
                          <h4 className="font-semibold dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>{m.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{m.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── MILESTONES TIMELINE ─── */}
      <section className="py-20 dark:bg-gray-900" style={{ background: "var(--page-bg, #ffffff)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <Badge variant="warning" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
              Milestones
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>
              Our Story So Far
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Key milestones that have shaped Milton International College over the years.
            </p>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MILESTONES.slice(4).map((m, i) => (
              <FadeInSection key={m.year}>
                <Card className="h-full border-0 shadow-md bg-white dark:bg-gray-800 rounded-xl">
                  <CardContent className="p-6">
                    <div className="text-3xl font-display font-bold mb-2" style={{ color: "var(--page-secondary, #d93a2b)" }}>{m.year}</div>
                    <h3 className="text-lg font-semibold dark:text-white mb-2" style={{ color: "var(--page-text, #1a1a1a)" }}>{m.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{m.description}</p>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MISSION & VISION ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <Badge variant="info" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
              Mission & Vision
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>
              Our Purpose & Direction
            </h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeInSection>
              <Card className="h-full border-0 shadow-lg text-white rounded-2xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, var(--page-hero-from), var(--page-hero-to))" }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2" style={{ background: "color-mix(in srgb, var(--page-secondary, #d93a2b) 10%, transparent)" }} />
                <CardContent className="p-8 md:p-10 relative">
                  <Target className="w-12 h-12 mb-6" style={{ color: "var(--page-accent, #d93a2b)" }} />
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">Our Mission</h3>
                  <p className="text-white/80 leading-relaxed">
                    To provide accessible, quality higher education that empowers students with
                    knowledge, skills, and ethical values necessary to excel in their chosen fields
                    and contribute meaningfully to society. We are committed to fostering an
                    inclusive learning environment that encourages critical thinking, innovation,
                    and lifelong learning.
                  </p>
                </CardContent>
              </Card>
            </FadeInSection>
            <FadeInSection>
              <Card className="h-full border-0 shadow-lg text-white rounded-2xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, var(--page-secondary), var(--page-accent))" }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2" style={{ background: "color-mix(in srgb, var(--page-accent, #d93a2b) 10%, transparent)" }} />
                <CardContent className="p-8 md:p-10 relative">
                  <Award className="w-12 h-12 mb-6" style={{ color: "var(--page-accent, #d93a2b)" }} />
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">Our Vision</h3>
                  <p className="text-white/80 leading-relaxed">
                    To be a leading higher education institution in Nepal recognized for academic
                    excellence, research innovation, and social impact. We aspire to produce
                    graduates who are not only professionally competent but also socially
                    responsible global citizens capable of addressing the challenges of a rapidly
                    changing world.
                  </p>
                </CardContent>
              </Card>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-20 dark:bg-gray-900" style={{ background: "var(--page-bg, #ffffff)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <Badge variant="success" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
              Core Values
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>
              What We Stand For
            </h2>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon
              return (
                <FadeInSection key={v.title}>
                  <motion.div whileHover={{ y: -6 }} className="group h-full">
                    <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 rounded-xl">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{ background: "color-mix(in srgb, var(--page-primary, #d93a2b) 10%, transparent)" }}>
                          <Icon className="w-8 h-8" style={{ color: "var(--page-secondary, #d93a2b)" }} />
                        </div>
                        <h3 className="text-xl font-display font-bold dark:text-white mb-3" style={{ color: "var(--page-text, #1a1a1a)" }}>{v.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{v.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── ACCREDITATION ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl" style={{ background: "color-mix(in srgb, var(--page-primary, #d93a2b) 5%, transparent)" }} />
                <div className="relative rounded-2xl p-8 md:p-10 shadow-lg" style={{ background: "var(--page-bg, #ffffff)" }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "var(--page-primary, #d93a2b)" }}>
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>
                        Tribhuvan University
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Affiliated College</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    Milton International College is proudly affiliated with{" "}
                    <strong className="dark:text-white" style={{ color: "var(--page-text, #1a1a1a)" }}>Tribhuvan University (TU)</strong>,
                    the oldest and largest university in Nepal. Our affiliation ensures that our
                    curriculum meets national standards and our degrees are recognized worldwide.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "TU-approved curriculum across all programs",
                      "Regular quality audits by TU monitoring bodies",
                      "Eligible for TU scholarships and research grants",
                      "Degrees awarded by Tribhuvan University",
                      "Access to TU central library and resources",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--page-secondary, #d93a2b)" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <Badge variant="info" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
                Accreditation
              </Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white leading-tight" style={{ color: "var(--page-text, #1a1a1a)" }}>
                TU Affiliated &<br />
                <span style={{ color: "var(--page-accent, #d93a2b)" }}>Nationally Recognized</span>
              </h2>
              <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                Our affiliation with Tribhuvan University guarantees that every degree awarded
                at Milton International College meets the rigorous academic standards set by
                Nepal&apos;s premier university. We undergo regular evaluation and monitoring to
                ensure continuous improvement in our teaching, infrastructure, and student outcomes.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                In addition to TU affiliation, we are registered with the relevant government
                bodies and follow all educational regulations mandated by the Government of Nepal.
                Our programs are designed to be globally competitive while remaining locally relevant.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["TU Affiliated", "Government Registered", "Quality Assured", "Globally Recognized"].map((tag) => (
                  <Badge key={tag} variant="info" className="px-3 py-1.5 text-xs">{tag}</Badge>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── LEADERSHIP MESSAGE ─── */}
      <section className="py-20 dark:bg-gray-900" style={{ background: "var(--page-bg, #ffffff)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <FadeInSection className="lg:col-span-2">
              <div className="relative">
                <div className="w-full aspect-[4/5] rounded-2xl flex items-center justify-center shadow-xl" style={{ background: "linear-gradient(135deg, var(--page-hero-from), var(--page-hero-to))" }}>
                  <div className="text-center p-8">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "color-mix(in srgb, var(--page-accent, #d93a2b) 20%, transparent)" }}>
                      <Quote className="w-10 h-10" style={{ color: "var(--page-accent, #d93a2b)" }} />
                    </div>
                    <p className="text-white/60 text-sm">Photo Coming Soon</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 rounded-2xl px-6 py-3 shadow-lg" style={{ background: "var(--page-secondary, #d93a2b)" }}>
                  <p className="text-white font-semibold text-sm">Principal&apos;s Office</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection className="lg:col-span-3">
              <Badge variant="warning" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
                From the Principal&apos;s Desk
              </Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white leading-tight" style={{ color: "var(--page-text, #1a1a1a)" }}>
                A Message from<br />
                <span style={{ color: "var(--page-secondary, #d93a2b)" }}>Our Leadership</span>
              </h2>
              <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Welcome to Milton International College! It is my privilege to lead an institution
                  that is deeply committed to nurturing young minds and shaping future leaders. Since
                  our establishment in 2010, we have remained steadfast in our mission to provide
                  quality, affordable education that transforms lives.
                </p>
                <p>
                  At Milton, we believe that education extends beyond textbooks. Our holistic approach
                  combines academic rigor with extracurricular excellence, character development, and
                  real-world exposure. We are proud of our dedicated faculty, state-of-the-art facilities,
                  and a vibrant campus culture that encourages students to dream big and work hard.
                </p>
                <p>
                  As we look to the future, we are excited to expand our horizons, deepen our industry
                  connections, and continue providing an environment where every student can thrive.
                  I invite you to explore our programs, visit our campus, and become part of the
                  Milton family.
                </p>
              </div>
              <div className="mt-8">
                <p className="font-display font-bold dark:text-white text-lg" style={{ color: "var(--page-text, #1a1a1a)" }}>Prof. Dr. [Name]</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Principal, Milton International College</p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── COLLEGE AT A GLANCE ─── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--page-hero-from), var(--page-hero-to))" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(194,65,12,0.12),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              College at a Glance
            </h2>
            <p className="mt-2 text-white/60">Celebrating over a decade of educational excellence</p>
          </FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {STATS.map((stat) => (
              <FadeInSection key={stat.label}>
                <StatItem {...stat} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--page-hero-from), var(--page-hero-to))" }}>
        <FloatingParticles />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeInSection>
            <ScrollText className="w-12 h-12 mx-auto mb-6" style={{ color: "var(--page-accent, #d93a2b)" }} />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
              Ready to Join{" "}
              <span style={{ color: "var(--page-secondary, #d93a2b)" }}>Milton?</span>
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Take the first step toward a rewarding academic journey. Admissions are open for
              the 2026/27 academic year.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/admissions">
                <Button size="xl" className="text-white shadow-xl shadow-[var(--page-glow)] group" style={{ background: "var(--page-secondary, #d93a2b)" }}>
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/programs">
                <Button variant="outline" size="xl" className="hover:[background:var(--page-primary)] hover:text-white" style={{ borderColor: "var(--page-border, #e2e5ea)", color: "var(--page-text, #1a1a1a)" }}>
                  Explore Programs
                </Button>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}
