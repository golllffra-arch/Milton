"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Download, FileText, ArrowRight, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const DOWNLOADS = [
  { title: "BCA Syllabus", href: "#", size: "PDF · 2.4 MB" },
  { title: "BBM Syllabus", href: "#", size: "PDF · 2.1 MB" },
  { title: "BBS Syllabus", href: "#", size: "PDF · 1.8 MB" },
  { title: "BASW Syllabus", href: "#", size: "PDF · 1.9 MB" },
  { title: "Admission Form 2026/27", href: "#", size: "PDF · 0.8 MB" },
  { title: "Brochure 2026/27", href: "#", size: "PDF · 3.2 MB" },
  { title: "Fee Structure 2026/27", href: "#", size: "PDF · 1.1 MB" },
  { title: "Scholarship Application", href: "#", size: "PDF · 0.6 MB" },
  { title: "Student Handbook", href: "#", size: "PDF · 4.5 MB" },
  { title: "College Calendar 2026/27", href: "#", size: "PDF · 1.3 MB" },
]

export default function DownloadsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--page-bg, #ffffff)" }}>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--page-hero-from, #1b3f63), var(--page-hero-to, #1b3f63))" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <GraduationCap className="w-14 h-14 mx-auto mb-4" style={{ color: "var(--page-accent, #fe0000)" }} />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">Downloads</h1>
            <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
              Access important documents, forms, and resources.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-4">
            {DOWNLOADS.map((item) => (
              <Card key={item.title} className="border-0 shadow-md hover:shadow-lg transition-all rounded-xl bg-white dark:bg-gray-800">
                <CardContent className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 shrink-0" style={{ color: "var(--page-secondary, #1b3f63)" }} />
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "var(--page-text, #000000)" }}>{item.title}</p>
                      <p className="text-xs" style={{ color: "var(--page-muted, #6b7280)" }}>{item.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={item.href} download>
                      <Download className="w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
