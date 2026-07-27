"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  Briefcase, Building2, Users, FileText, Star, ArrowRight,
  MapPin, GraduationCap, Mail, Phone, CheckCircle, Quote,
  BookOpen, Target, Sparkles, ChevronRight, Award, Search,
  Handshake, Pen, ListChecks
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const JOB_LISTINGS = [
  {
    company: "F1Soft International",
    role: "Junior Software Developer",
    type: "Full-time",
    location: "Kathmandu",
    deadline: "Aug 30, 2026",
    logo: "F1",
    color: "from-blue-600 to-indigo-700",
  },
  {
    company: "Nepal Investment Bank",
    role: "Management Trainee",
    type: "Full-time",
    location: "Kathmandu",
    deadline: "Sep 15, 2026",
    logo: "NIB",
    color: "from-green-600 to-emerald-700",
  },
  {
    company: "World Vision International",
    role: "Social Work Intern",
    type: "Internship",
    location: "Lalitpur",
    deadline: "Aug 20, 2026",
    logo: "WV",
    color: "from-orange-600 to-red-700",
  },
  {
    company: "CloudFactory Nepal",
    role: "Data Analyst Intern",
    type: "Internship",
    location: "Kathmandu",
    deadline: "Sep 5, 2026",
    logo: "CF",
    color: "from-purple-600 to-violet-700",
  },
  {
    company: "Sajilo Software",
    role: "Frontend Developer",
    type: "Full-time",
    location: "Patan",
    deadline: "Oct 1, 2026",
    logo: "SS",
    color: "from-cyan-600 to-teal-700",
  },
  {
    company: "Hotel Yak & Yeti",
    role: "Management Intern",
    type: "Internship",
    location: "Kathmandu",
    deadline: "Sep 10, 2026",
    logo: "HY",
    color: "from-amber-600 to-yellow-700",
  },
]

const ALUMNI = [
  {
    name: "Arjun Khadka",
    program: "BCA (Class of 2022)",
    role: "Software Engineer at Google",
    story: "Arjun's passion for coding was nurtured at Milton through the IT Club and hackathons. Today, he works at Google's Hyderabad office, building scalable solutions for millions of users.",
    initials: "AK",
    color: "from-blue-600 to-blue-800",
  },
  {
    name: "Pooja Shrestha",
    program: "BBM (Class of 2021)",
    role: "Marketing Manager at Kantipur Media",
    story: "Pooja credits Milton's industry exposure and internship program for her rapid career growth. She now leads marketing campaigns for Nepal's largest media house.",
    initials: "PS",
    color: "from-red-600 to-rose-800",
  },
  {
    name: "Sagar Bhattarai",
    program: "BBS (Class of 2020)",
    role: "Financial Analyst at Himalayan Bank",
    story: "The strong foundation in accounting and finance at Milton helped Sagar clear bank exams and secure a position in one of Nepal's leading commercial banks.",
    initials: "SB",
    color: "from-green-600 to-emerald-800",
  },
  {
    name: "Anita Tamang",
    program: "BASW (Class of 2023)",
    role: "Program Coordinator at Save the Children",
    story: "Anita's field experiences and research projects during her BASW program at Milton prepared her for impactful work in the development sector.",
    initials: "AT",
    color: "from-amber-600 to-orange-800",
  },
]

const SERVICES = [
  { icon: Search, title: "Job Placement Assistance", description: "We connect students with top employers through campus placements, job fairs, and direct referrals." },
  { icon: FileText, title: "Resume & Portfolio Building", description: "Expert guidance on crafting professional resumes, cover letters, and digital portfolios that stand out." },
  { icon: Users, title: "Interview Preparation", description: "Mock interviews, personality development sessions, and communication skills workshops to boost confidence." },
  { icon: Target, title: "Career Counseling", description: "One-on-one counseling sessions to help students identify career paths aligned with their strengths and interests." },
]

const PARTNERS = [
  { name: "F1Soft International", logo: "F1", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
  { name: "CloudFactory", logo: "CF", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" },
  { name: "Nepal Investment Bank", logo: "NIB", color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" },
  { name: "Kantipur Media", logo: "KM", color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300" },
  { name: "World Vision Nepal", logo: "WV", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300" },
  { name: "Sajilo Software", logo: "SS", color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300" },
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

export default function CareerCenterPage() {
  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg, var(--page-hero-from, #1d4ed8), var(--page-hero-to, #2563eb))" }} />
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
              <Briefcase className="w-3.5 h-3.5 mr-1.5" style={{ color: "var(--page-secondary, #2563eb)" }} />
              Your Future Starts Here
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight"
          >
            Career Center
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Your gateway to professional success — job placements, internships, career counseling,
            and connections with top employers.
          </motion.p>
        </div>
      </section>

      {/* ─── CAREER SERVICES ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-14">
            <Badge variant="info" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">What We Offer</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white" style={{ color: "var(--page-text, #1e3a5f)" }}>
              Career Services
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive support to help you transition from classroom to career with confidence.
            </p>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, index) => {
              const Icon = service.icon
              return (
                <FadeInSection key={service.title}>
                  <motion.div whileHover={{ y: -6 }} className="group h-full">
                    <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 rounded-xl">
                      <CardContent className="p-6 text-center">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform" style={{ background: "var(--page-primary, #1d4ed8)" }}>
                          <Icon className="w-7 h-7" style={{ color: "var(--page-secondary, #2563eb)" }} />
                        </div>
                        <h3 className="text-lg font-display font-bold dark:text-white mb-2" style={{ color: "var(--page-text, #1e3a5f)" }}>{service.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{service.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── JOB / INTERNSHIP LISTINGS ─── */}
      <section className="py-20 dark:bg-gray-900" style={{ background: "var(--page-bg, #eff6ff)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <Badge variant="warning" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Open Positions</Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white" style={{ color: "var(--page-text, #1e3a5f)" }}>
                Jobs & Internships
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Current opportunities from our partner organizations</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0 border-[#1c3557]/20" style={{ color: "var(--page-text, #1e3a5f)" }}>
              View All Openings
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {JOB_LISTINGS.map((job, index) => (
              <FadeInSection key={`${job.company}-${job.role}`}>
                <motion.div whileHover={{ y: -4 }} className="group h-full">
                  <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center shrink-0 text-white text-sm font-bold`}>
                          {job.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-bold dark:text-white" style={{ color: "var(--page-text, #1e3a5f)" }}>{job.role}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 mb-4">
                        <Badge variant={job.type === "Full-time" ? "success" : "info"} className="text-[10px]">
                          {job.type}
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <span className="text-xs text-gray-400">Deadline: {job.deadline}</span>
                        <Button variant="ghost" size="sm" className="p-0 h-auto font-semibold text-sm" style={{ color: "var(--page-secondary, #2563eb)" }}>
                          Apply Now
                          <ArrowRight className="ml-1 w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESUME TIPS ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <Badge variant="info" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Build Your Brand</Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white leading-tight" style={{ color: "var(--page-text, #1e3a5f)" }}>
                Resume Building<br />
                <span style={{ color: "var(--page-secondary, #2563eb)" }}>Tips & Resources</span>
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                A strong resume is your first impression. Our career counselors provide templates,
                guidelines, and one-on-one feedback to help you create a compelling resume.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  { icon: Pen, text: "Use a clean, professional format with clear section headers" },
                  { icon: Target, text: "Tailor your resume for each role — highlight relevant skills" },
                  { icon: Award, text: "Showcase achievements with quantifiable results" },
                  { icon: BookOpen, text: "Include projects, internships, and extracurricular activities" },
                  { icon: ListChecks, text: "Proofread carefully — errors create a poor impression" },
                ].map((tip) => (
                  <li key={tip.text} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "var(--page-primary, #1d4ed8)" }}>
                      <tip.icon className="w-4 h-4" style={{ color: "var(--page-secondary, #2563eb)" }} />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{tip.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex gap-3">
                <Button variant="navy" className="group">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
                <Button variant="outline" className="border-[#1c3557]/20" style={{ color: "var(--page-text, #1e3a5f)" }}>
                  Book Appointment
                </Button>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="relative">
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#c9a84c]/20 rounded-2xl" />
                <div className="relative rounded-2xl p-8 md:p-10 shadow-xl overflow-hidden" style={{ background: "linear-gradient(135deg, var(--page-hero-from, #1d4ed8), var(--page-hero-to, #2563eb))" }}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,28,35,0.1),transparent_60%)]" />
                  <FileText className="w-16 h-16 mb-6 relative z-10" style={{ color: "var(--page-accent, #059669)" }} />
                  <h3 className="text-2xl font-display font-bold text-white relative z-10">Pro Tip</h3>
                  <p className="text-white/70 mt-3 leading-relaxed relative z-10">
                    Keep your resume to one page if you have less than 5 years of experience.
                    Use action verbs like &ldquo;developed,&rdquo; &ldquo;managed,&rdquo; and
                    &ldquo;achieved&rdquo; to make your experience stand out.
                  </p>
                  <div className="mt-6 relative z-10">
                    <Badge variant="outline" className="border-white/20 text-white/80">Career Center Resource</Badge>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── ALUMNI SUCCESS STORIES ─── */}
      <section className="py-20 dark:bg-gray-900" style={{ background: "var(--page-bg, #eff6ff)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-14">
            <Badge variant="warning" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Inspiring Journeys</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white" style={{ color: "var(--page-text, #1e3a5f)" }}>
              Alumni Success Stories
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our alumni have gone on to achieve remarkable success in diverse fields. Here are some of their stories.
            </p>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ALUMNI.map((alumnus, index) => (
              <FadeInSection key={alumnus.name}>
                <motion.div whileHover={{ y: -4 }} className="group h-full">
                  <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${alumnus.color} flex items-center justify-center shrink-0 text-white text-lg font-bold`}>
                          {alumnus.initials}
                        </div>
                        <div>
                          <h3 className="font-display font-bold dark:text-white" style={{ color: "var(--page-text, #1e3a5f)" }}>{alumnus.name}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{alumnus.program}</p>
                          <Badge variant="success" className="mt-1 text-[10px]">{alumnus.role}</Badge>
                        </div>
                      </div>
                      <div className="relative pl-6 border-l-2 border-[#c9a84c]/30">
                        <Quote className="w-4 h-4 absolute -left-2 -top-1" style={{ color: "var(--page-accent, #059669)" }} />
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic">{alumnus.story}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNER COMPANIES ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-14">
            <Badge variant="info" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Our Network</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white" style={{ color: "var(--page-text, #1e3a5f)" }}>
              Partner Companies
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We work with leading organizations across Nepal and beyond to create opportunities for our students.
            </p>
          </FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PARTNERS.map((partner) => (
              <FadeInSection key={partner.name}>
                <motion.div whileHover={{ y: -4, scale: 1.02 }}>
                  <Card className="border-0 shadow-sm hover:shadow-md transition-all bg-white dark:bg-gray-800 rounded-xl">
                    <CardContent className="p-6 text-center">
                      <div className={`w-14 h-14 rounded-xl ${partner.color} flex items-center justify-center mx-auto mb-3 text-lg font-bold`}>
                        {partner.logo}
                      </div>
                      <p className="text-xs font-medium dark:text-white leading-tight" style={{ color: "var(--page-text, #1e3a5f)" }}>{partner.name}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--page-hero-from, #1d4ed8), var(--page-hero-to, #2563eb))" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(227,28,35,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(201,168,76,0.08),transparent_50%)]" />
        <FloatingParticles />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <Handshake className="w-12 h-12 mx-auto mb-6" style={{ color: "var(--page-accent, #059669)" }} />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
              Ready to Launch Your{" "}
              <span style={{ color: "var(--page-secondary, #2563eb)" }}>Career?</span>
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Visit the Career Center in person or book an online counseling session. We are here to help you succeed.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="xl" className="text-white shadow-xl" style={{ background: "var(--page-secondary, #2563eb)" }}>
                <Mail className="mr-2 w-5 h-5" />
                career@milton.edu.com
              </Button>
              <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                <Phone className="mr-2 w-5 h-5" />
                01-4XXXXXX
              </Button>
            </div>
            <p className="mt-6 text-white/50 text-sm">
              Career Counseling Hours: Mon–Fri, 9:00 AM – 4:00 PM &middot; Room 201, Admin Block
            </p>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}
