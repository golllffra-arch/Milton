"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { Loader2, GraduationCap, BookOpen, Users, Globe, Trophy,
  Shield, MapPin, ChevronRight, Star, ArrowRight,
  Calendar, Newspaper, Quote, Play, Award, Briefcase,
  Building2, ChevronLeft,   Sparkles, Monitor, X, Send, User, Mail, Phone, School } from "lucide-react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlockRenderer } from "@/components/blocks/block-renderer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="atmosphere-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? "var(--page-primary, #7c3aed)" : i % 3 === 1 ? "var(--page-secondary, #ec4899)" : "var(--page-accent, #fbbf24)",
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
          background: "var(--page-primary, #7c3aed)",
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
          background: "var(--page-secondary, #ec4899)",
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
          background: "var(--page-accent, #fbbf24)",
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

export default function HomePage() {
  const [pageData, setPageData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/pages?isHomepage=true")
      .then((r) => r.json())
      .then((data) => {
        if (data?.blocks?.length) {
          setPageData(data)
        } else {
          setPageData(null)
        }
      })
      .catch(() => setPageData(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--page-bg, #faf5ff)" }}>
        <Loader2
          className="w-8 h-8 animate-spin"
          style={{ color: "var(--page-primary, #7c3aed)" }}
        />
      </div>
    )
  }

  if (pageData?.blocks?.length) {
    return (
      <div>
        {pageData.blocks.map((block: any, i: number) => (
          <BlockRenderer
            key={block.id}
            blockType={block.blockType}
            content={block.content}
            styleSettings={block.styleSettings}
            index={i}
          />
        ))}
      </div>
    )
  }

  return <HardcodedHomepage />
}

function FadeInSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  useEffect(() => { if (inView) controls.start("visible") }, [inView, controls])
  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.6 }} className={className}>
      {children}
    </motion.div>
  )
}

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

function HardcodedHomepage() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true })

  return (
    <>
      {/* HERO - Dreamy Fantasy */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(135deg, var(--page-hero-from, #7c3aed), var(--page-hero-to, #a855f7))",
          }}
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: "radial-gradient(ellipse at 20% 50%, rgba(236,72,153,0.25), transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(251,191,36,0.15), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-[0.08] z-[1]" />
        <FloatingParticles />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
              <Badge
                variant="outline"
                className="w-fit text-sm px-4 py-1.5 backdrop-blur-sm border-white/20 text-white/80"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <Play className="w-3.5 h-3.5 mr-1.5" /> Campus Tour Video
              </Badge>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Shape Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] via-[#f472b6] to-[#a78bfa]">Future</span>
                <br />at Milton
              </h1>
              <p className="text-xl text-white/70 max-w-xl leading-relaxed">
                Tribhuvan University affiliated college in New Baneshwor, Kathmandu.
                Offering BCA, BBM, BBS, and BASW programs since 2010.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/programs">
                  <Button
                    size="xl"
                    className="text-white border-0 shadow-lg group"
                    style={{ background: "linear-gradient(135deg, var(--page-secondary, #ec4899), var(--page-accent, #fbbf24))" }}
                  >
                    Explore Programs <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <ApplyDialog />
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin className="w-4 h-4" /> New Baneshwor, Kathmandu, Nepal
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 2010, label: "Founded", suffix: "" },
                  { value: 4, label: "Programs", suffix: "+" },
                  { value: 500, label: "Students", suffix: "+" },
                  { value: 50, label: "Faculty", suffix: "+" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="glass-card rounded-2xl p-6 text-center"
                  >
                    <div className="text-4xl md:text-5xl font-bold font-display text-white mb-1">
                      {statsInView ? <AnimatedCounter end={stat.value} suffix={stat.suffix} /> : "0"}
                    </div>
                    <div className="text-white/50 text-sm uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          <div ref={statsRef} className="block lg:hidden grid grid-cols-2 gap-4 mt-12">
            {[
              { value: 2010, label: "Founded", suffix: "" },
              { value: 4, label: "Programs", suffix: "+" },
              { value: 500, label: "Students", suffix: "+" },
              { value: 50, label: "Faculty", suffix: "+" },
            ].map((stat, i) => (
              <div key={i} className="glass-card rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold font-display text-white mb-1">
                  {statsInView ? <AnimatedCounter end={stat.value} suffix={stat.suffix} /> : "0"}
                </div>
                <div className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MILTON */}
      <FadeInSection>
        <section className="py-24" style={{ background: "var(--page-bg, #faf5ff)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">Why Milton</Badge>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--page-text, #2e1065)" }}>
                Why Choose Milton International College?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide a holistic education experience that prepares students for global success.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Award className="w-8 h-8" />, title: "Academic Excellence", desc: "TU-affiliated curriculum with experienced faculty and modern teaching methods.", accent: "from-purple-500 to-pink-500", href: "/about" },
                { icon: <Globe className="w-8 h-8" />, title: "Global Exposure", desc: "International tours to Singapore, Dubai, and Malaysia for real-world learning.", accent: "from-pink-500 to-yellow-500", href: "/student-life" },
                { icon: <Building2 className="w-8 h-8" />, title: "Modern Campus", desc: "Well-equipped labs, library, sports facilities, and a vibrant learning environment.", accent: "from-yellow-500 to-purple-500", href: "/virtual-tour" },
                { icon: <Briefcase className="w-8 h-8" />, title: "Career Support", desc: "Dedicated career center with internships, placements, and counseling.", accent: "from-purple-500 to-pink-500", href: "/career-center" },
              ].map((item, i) => (
                <Link key={i} href={item.href}>
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group cursor-pointer">
                    <Card className="h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className={`h-2 bg-gradient-to-r ${item.accent}`} />
                      <CardContent className="p-8 space-y-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                          style={{ background: "var(--page-primary, #7c3aed)", color: "white" }}
                        >
                          {item.icon}
                        </div>
                        <h3 className="font-display text-xl font-semibold" style={{ color: "var(--page-text, #2e1065)" }}>{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* PROGRAMS */}
      <FadeInSection>
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">Our Programs</Badge>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--page-text, #2e1065)" }}>
                Programs We Offer
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Four specialized programs designed to meet the demands of the modern job market.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { code: "BCA", full: "Bachelor of Computer Application", duration: "4 Years", color: "from-purple-500 to-purple-400", bg: "bg-purple-50 dark:bg-purple-950/30", icon: <Monitor className="w-8 h-8" />, desc: "Comprehensive program covering programming, database, networking, and software development." },
                { code: "BBM", full: "Bachelor of Business Management", duration: "4 Years", color: "from-pink-500 to-pink-400", bg: "bg-pink-50 dark:bg-pink-950/30", icon: <Briefcase className="w-8 h-8" />, desc: "Business management, marketing, finance, entrepreneurship, and organizational leadership." },
                { code: "BBS", full: "Bachelor of Business Studies", duration: "3 Years", color: "from-yellow-500 to-amber-400", bg: "bg-amber-50 dark:bg-amber-950/30", icon: <Building2 className="w-8 h-8" />, desc: "Foundation in accounting, economics, business law, and management principles." },
                { code: "BASW", full: "Bachelor of Arts in Social Work", duration: "4 Years", color: "from-purple-500 to-pink-400", bg: "bg-purple-50 dark:bg-purple-950/30", icon: <Shield className="w-8 h-8" />, desc: "Community development, social justice, counseling, and human rights advocacy." },
              ].map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link href={`/programs/${p.code.toLowerCase()}`}>
                    <Card className={`group border-0 shadow-sm hover:shadow-xl transition-all duration-300 ${p.bg} overflow-hidden cursor-pointer`}>
                      <div className="flex">
                        <div className={`w-2 bg-gradient-to-b ${p.color} flex-shrink-0`} />
                        <CardContent className="p-6 flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div
                              className="w-14 h-14 rounded-xl flex items-center justify-center text-white"
                              style={{ background: `linear-gradient(135deg, ${p.color.split(" ")[0].replace("from-", "")}, ${p.color.split(" ")[1].replace("to-", "")})` }}
                            >
                              {p.icon}
                            </div>
                            <Badge variant="outline" className="text-xs">{p.duration}</Badge>
                          </div>
                          <h3 className="font-display text-2xl font-bold mb-1">{p.code}</h3>
                          <p className="text-sm font-medium text-muted-foreground mb-3">{p.full}</p>
                          <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                          <span
                            className="text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                            style={{ color: "var(--page-secondary, #ec4899)" }}
                          >
                            Learn More <ChevronRight className="w-4 h-4" />
                          </span>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* STATS BAR */}
      <section
        ref={statsRef}
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--page-hero-from, #7c3aed), var(--page-hero-to, #a855f7))" }}
      >
        <FloatingParticles />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: "calendar", value: 15, suffix: "+", label: "Years of Excellence" },
              { icon: "book", value: 4, suffix: "", label: "Programs" },
              { icon: "users", value: 500, suffix: "+", label: "Students" },
              { icon: "trophy", value: 50, suffix: "+", label: "Expert Faculty" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-4xl md:text-5xl font-bold font-display text-white mb-2">
                  {statsInView ? <AnimatedCounter end={stat.value} suffix={stat.suffix} /> : "0"}
                </div>
                <div className="text-white/60 text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <FadeInSection>
        <section className="py-24" style={{ background: "var(--page-bg, #faf5ff)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <Badge variant="secondary" className="mb-4">News & Updates</Badge>
                <h2 className="font-display text-4xl font-bold" style={{ color: "var(--page-text, #2e1065)" }}>Latest from Milton</h2>
              </div>
              <Link href="/news"><Button variant="outline" className="mt-4 md:mt-0">View All News <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Admissions Open for 2026", date: "Jan 15, 2026", type: "Notice", excerpt: "Applications are now open for all programs. Apply online before the deadline.", color: "from-purple-500 to-pink-400" },
                { title: "BCA Team Wins National Hackathon", date: "Dec 20, 2025", type: "Achievement", excerpt: "Our BCA students secured first place at the National Level Inter-College Hackathon.", color: "from-pink-500 to-yellow-400" },
                { title: "International Tour to Singapore", date: "Nov 5, 2025", type: "Event", excerpt: "Students explored Singapore's tech hub and cultural landmarks during the annual tour.", color: "from-yellow-500 to-purple-400" },
              ].map((news, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="group border-0 shadow-sm hover:shadow-lg transition-all h-full">
                    <div className={`h-2 bg-gradient-to-r ${news.color}`} />
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between"><Badge>{news.type}</Badge><span className="text-xs text-muted-foreground">{news.date}</span></div>
                      <h3 className="font-display text-lg font-semibold">{news.title}</h3>
                      <p className="text-sm text-muted-foreground">{news.excerpt}</p>
                      <Link href="/news" className="text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: "var(--page-secondary, #ec4899)" }}>Read More <ChevronRight className="w-3 h-3" /></Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* TESTIMONIALS */}
      <FadeInSection>
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">Testimonials</Badge>
              <h2 className="font-display text-4xl font-bold mb-4" style={{ color: "var(--page-text, #2e1065)" }}>What Our Students Say</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Aarav Sharma", role: "BCA Student", content: "Milton has given me the best education experience. The faculty is excellent and the campus environment is amazing.", rating: 5 },
                { name: "Sita Rijal", role: "BBM Graduate", content: "The practical exposure and international tours at Milton shaped my career. Highly recommend!", rating: 5 },
                { name: "Binod Thapa", role: "BBS Student", content: "From day one, Milton has been supportive. The teachers go above and beyond to help students succeed.", rating: 5 },
              ].map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="relative border-0 shadow-sm hover:shadow-lg transition-all h-full">
                    <Quote className="absolute top-4 left-4 w-8 h-8" style={{ color: "var(--page-secondary, #ec4899)", opacity: 0.15 }} />
                    <CardContent className="p-6 pt-12 space-y-4">
                      <p className="text-muted-foreground italic">"{t.content}"</p>
                      <div className="flex items-center gap-3 pt-4 border-t">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                          style={{ background: "var(--page-primary, #7c3aed)" }}
                        >
                          {t.name.split(" ").map(n=>n[0]).join("")}
                        </div>
                        <div><p className="font-semibold text-sm">{t.name}</p><p className="text-xs text-muted-foreground">{t.role}</p></div>
                      </div>
                      <div className="flex gap-0.5">{Array.from({length: t.rating}).map((_,j)=><Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CTA */}
      <FadeInSection>
        <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--page-hero-from, #7c3aed), var(--page-hero-to, #a855f7))" }}>
          <FloatingParticles />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ background: "var(--page-secondary, #ec4899)" }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Begin Your Journey at Milton</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">Take the first step towards a brighter future. Join Milton International College and unlock your full potential.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/admissions">
                <Button
                  size="xl"
                  className="text-white border-0 shadow-lg group"
                  style={{ background: "linear-gradient(135deg, var(--page-secondary, #ec4899), var(--page-accent, #fbbf24))" }}
                >
                  Apply Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  )
}

function ApplyDialog() {
  const [open, setOpen] = useState(false)
  const [topic, setTopic] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const topicFields: Record<string, { label: string; type: string; placeholder: string }[]> = {
    BCA: [
      { label: "Math Score (Grade 12)", type: "text", placeholder: "e.g. A, B+, 85%" },
      { label: "Programming Experience", type: "text", placeholder: "Any coding experience" },
    ],
    BBM: [
      { label: "English Score (Grade 12)", type: "text", placeholder: "e.g. A, B+, 85%" },
      { label: "Why Business?", type: "textarea", placeholder: "Tell us why you want to study business" },
    ],
    BBS: [
      { label: "Accountancy Score", type: "text", placeholder: "e.g. A, B+, 85%" },
      { label: "Previous Stream", type: "text", placeholder: "e.g. Management, Science" },
    ],
    BASW: [
      { label: "Social Work Interest", type: "textarea", placeholder: "Why are you interested in social work?" },
      { label: "Volunteer Experience", type: "text", placeholder: "Any prior volunteer work" },
    ],
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="xl"
          variant="outline"
          className="border-white/30 text-white hover:bg-white/10"
        >
          Apply Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-display font-bold mb-2" style={{ color: "var(--page-text, #2e1065)" }}>Application Submitted!</DialogTitle>
            <p className="text-gray-500">We have received your application. Our admissions team will contact you within 48 hours.</p>
            <Button variant="outline" className="mt-6" onClick={() => { setSubmitted(false); setTopic(""); setOpen(false) }}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-bold" style={{ color: "var(--page-text, #2e1065)" }}>Apply to Milton</DialogTitle>
              <p className="text-sm text-gray-500">Select your program and fill in the details below.</p>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input required placeholder="Your full name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input required type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input required placeholder="98XXXXXXXX" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Program</Label>
                <Select onValueChange={setTopic} required>
                  <SelectTrigger><SelectValue placeholder="Select a program" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BCA">BCA</SelectItem>
                    <SelectItem value="BBM">BBM</SelectItem>
                    <SelectItem value="BBS">BBS</SelectItem>
                    <SelectItem value="BASW">BASW</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {topic && topicFields[topic]?.map((field) => (
                <div key={field.label} className="space-y-2">
                  <Label>{field.label}</Label>
                  {field.type === "textarea" ? (
                    <Textarea required placeholder={field.placeholder} />
                  ) : (
                    <Input required placeholder={field.placeholder} />
                  )}
                </div>
              ))}
              <Button
                type="submit"
                className="w-full text-white border-0"
                style={{ background: "var(--page-secondary, #ec4899)" }}
              >
                <Send className="w-4 h-4 mr-2" />Submit Application
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
