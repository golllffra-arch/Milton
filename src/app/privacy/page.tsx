"use client"

import { motion } from "framer-motion"
import { Shield, GraduationCap } from "lucide-react"

const sections = [
  {
    title: "Information We Collect",
    content: "We collect personal information you provide when filling out admission forms, contacting us, or using our website. This includes your name, email address, phone number, academic records, and other details necessary for the admission process.",
  },
  {
    title: "How We Use Your Information",
    content: "Your information is used solely for admission processing, academic communication, and college-related notifications. We do not share your personal data with third parties without your explicit consent.",
  },
  {
    title: "Data Protection",
    content: "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.",
  },
  {
    title: "Cookies",
    content: "Our website uses minimal cookies for essential functionality. We do not use tracking cookies for marketing purposes.",
  },
  {
    title: "Third-Party Services",
    content: "We may use trusted third-party services for website analytics and hosting. These providers are contractually obligated to protect your data.",
  },
  {
    title: "Your Rights",
    content: "You have the right to request access to, correction of, or deletion of your personal data held by the college. Contact us at admissions@miltoncollege.edu.np for such requests.",
  },
  {
    title: "Changes to This Policy",
    content: "We may update this policy periodically. Changes will be posted on this page with the updated date.",
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--page-bg, #f8fafc)" }}>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--page-hero-from, #1e40af), var(--page-hero-to, #3b82f6))" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Shield className="w-14 h-14 mx-auto mb-4" style={{ color: "var(--page-accent, #c9a84c)" }} />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">Privacy Policy</h1>
            <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
              How Milton International College handles your personal information.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm mb-12" style={{ color: "var(--page-muted, #6b7280)" }}>
            Last updated: July 2026
          </p>
          <div className="space-y-10">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl font-display font-semibold mb-3" style={{ color: "var(--page-text, #1e3a5f)" }}>{s.title}</h2>
                <p className="leading-relaxed" style={{ color: "var(--page-muted, #6b7280)" }}>{s.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
