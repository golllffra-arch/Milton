"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  MapPin, Phone, Mail, Clock, Send,
  ArrowRight, GraduationCap, MessageSquare,
  Facebook, Twitter, Linkedin, Instagram, Youtube,
  User, FileText, CheckCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "Our Address",
    lines: ["Milton International College", "New Baneshwor, Kathmandu", "Nepal"],
    bg: "from-[#1c3557] to-[#0e1d31]",
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+977-1-4XXXXXX", "+977-98XXXXXXXX"],
    bg: "from-[#e31c23] to-[#a51419]",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@milton.edu.com", "admissions@milton.edu.com"],
    bg: "from-[#1c3557] to-[#0e1d31]",
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Sunday - Friday: 6:00 AM - 2:00 PM", "Saturday: Closed"],
    bg: "from-[#c9a84c] to-[#a8882e]",
  },
]

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-600" },
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-500" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-700" },
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-600" },
  { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-600" },
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

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c3557] via-[#1c3557]/95 to-[#0e1d31] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(227,28,35,0.15),transparent_60%)] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,168,76,0.08),transparent_50%)] z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-white/20 text-white/80 bg-white/5 backdrop-blur-sm">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#e31c23]" />
              Get in Touch
            </Badge>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight"
          >
            Contact{" "}
            <span className="bg-gradient-to-r from-[#e31c23] via-[#f55959] to-[#c9a84c] bg-clip-text text-transparent">Us</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            We&apos;d love to hear from you. Reach out to us for inquiries, admissions, or any assistance.
          </motion.p>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONTACT_INFO.map((info) => {
              const Icon = info.icon
              return (
                <FadeInSection key={info.title}>
                  <motion.div whileHover={{ y: -6 }}>
                    <Card className={`bg-gradient-to-br ${info.bg} text-white border-0 shadow-xl rounded-xl overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <CardContent className="p-6 relative">
                        <Icon className="w-10 h-10 mb-4 opacity-80" />
                        <h3 className="text-lg font-display font-bold mb-2">{info.title}</h3>
                        <div className="space-y-1">
                          {info.lines.map((line) => (
                            <p key={line} className="text-white/70 text-sm">{line}</p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* FORM & MAP */}
      <section className="py-20 bg-[#f8f6f0] dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeInSection>
              <Badge variant="info" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Send a Message</Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1c3557] dark:text-white mb-6">Drop Us a Line</h2>
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-800 rounded-xl">
                <CardContent className="p-6 md:p-8">
                  {submitted ? (
                    <div className="text-center py-10">
                      <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-2xl font-display font-bold text-[#1c3557] dark:text-white mb-2">Message Sent!</h3>
                      <p className="text-gray-600 dark:text-gray-400">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                      <Button variant="outline" className="mt-6" onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }) }}>
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#1c3557] dark:text-white"><User className="w-4 h-4 inline mr-1.5" />Your Name</Label>
                        <Input id="name" placeholder="John Doe" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required className="bg-gray-50 dark:bg-gray-900" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#1c3557] dark:text-white"><Mail className="w-4 h-4 inline mr-1.5" />Your Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} required className="bg-gray-50 dark:bg-gray-900" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-[#1c3557] dark:text-white"><FileText className="w-4 h-4 inline mr-1.5" />Subject</Label>
                        <Input id="subject" placeholder="How can we help you?" value={formData.subject} onChange={(e) => handleChange("subject", e.target.value)} required className="bg-gray-50 dark:bg-gray-900" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-[#1c3557] dark:text-white"><MessageSquare className="w-4 h-4 inline mr-1.5" />Message</Label>
                        <textarea
                          id="message"
                          rows={5}
                          placeholder="Write your message here..."
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          required
                          className="flex w-full rounded-md border border-input bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full bg-[#e31c23] hover:bg-[#c4181e] text-white shadow-lg shadow-[#e31c23]/25">
                        <Send className="w-4 h-4 mr-2" />Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </FadeInSection>

            {/* Map & Social */}
            <div className="space-y-8">
              <FadeInSection>
                <Badge variant="warning" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Find Us</Badge>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1c3557] dark:text-white mb-6">Our Location</h2>
                <div className="rounded-xl overflow-hidden shadow-lg h-[300px] bg-[#1c3557] flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1c3557] to-[#0e1d31] opacity-90" />
                  <div className="relative z-10 text-center p-8">
                    <MapPin className="w-12 h-12 text-[#c9a84c] mx-auto mb-4" />
                    <p className="text-white text-lg font-display font-bold">Milton International College</p>
                    <p className="text-white/60 text-sm mt-2">New Baneshwor, Kathmandu, Nepal</p>
                    <p className="text-white/40 text-xs mt-4">Google Maps Integration</p>
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection>
                <Card className="border-0 shadow-lg bg-white dark:bg-gray-800 rounded-xl">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-xl font-display font-bold text-[#1c3557] dark:text-white mb-4">Connect With Us</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">Follow us on social media for the latest updates, events, and college news.</p>
                    <div className="flex flex-wrap gap-4">
                      {SOCIAL_LINKS.map((social) => {
                        const Icon = social.icon
                        return (
                          <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                            className={`w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 ${social.color} transition-all hover:scale-110 hover:shadow-lg`}
                            aria-label={social.label}
                          >
                            <Icon className="w-5 h-5" />
                          </a>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c3557] via-[#1c3557] to-[#0e1d31]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(227,28,35,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(201,168,76,0.08),transparent_50%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <GraduationCap className="w-12 h-12 text-[#c9a84c] mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
              Ready to Join{" "}
              <span className="bg-gradient-to-r from-[#e31c23] to-[#c9a84c] bg-clip-text text-transparent">Milton?</span>
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Visit our campus, talk to our counselors, and take the first step toward your future.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/admissions">
                <Button size="xl" className="bg-[#e31c23] hover:bg-[#c4181e] text-white shadow-xl shadow-[#e31c23]/25 group">
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                  Learn More
                </Button>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}