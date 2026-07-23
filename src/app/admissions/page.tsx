"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  GraduationCap, ArrowRight, MapPin, CheckCircle,
  FileText, ClipboardCheck, CalendarCheck,
  CreditCard, Award, Clock, DollarSign,
  Upload, Send, User, Mail, Phone, MapPin as Pin,
  School, BookOpen, Users, Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const STEPS = [
  { number: 1, icon: ClipboardCheck, title: "Check Eligibility", description: "Review the eligibility criteria for your desired program and ensure you meet the requirements." },
  { number: 2, icon: FileText, title: "Submit Application", description: "Complete the online application form with your personal and academic details." },
  { number: 3, icon: Upload, title: "Upload Documents", description: "Upload scanned copies of your transcripts, certificates, and passport-size photos." },
  { number: 4, icon: CreditCard, title: "Pay Application Fee", description: "Pay the non-refundable application fee via bank deposit, e-banking, or at the college office." },
  { number: 5, icon: CalendarCheck, title: "Entrance Exam", description: "Appear for the TU entrance examination conducted at the college or designated center." },
  { number: 6, icon: CheckCircle, title: "Enrollment", description: "Upon selection, complete the enrollment process by paying the admission fee and submitting original documents." },
]

const ELIGIBILITY = [
  {
    program: "BCA",
    icon: GraduationCap,
    requirements: [
      "Minimum D+ in all Grade 12 subjects",
      "Minimum C in English, Mathematics & Computer",
      "TU entrance exam passed",
    ],
  },
  {
    program: "BBM",
    icon: BookOpen,
    requirements: [
      "Minimum D+ in all Grade 12 subjects",
      "Minimum C in English & Mathematics",
      "TU entrance exam passed",
    ],
  },
  {
    program: "BBS",
    icon: Shield,
    requirements: [
      "Minimum D+ in all Grade 12 subjects",
      "Minimum C in English & Mathematics/Accountancy",
      "TU entrance exam passed",
    ],
  },
  {
    program: "BASW",
    icon: Users,
    requirements: [
      "Minimum D+ in all Grade 12 subjects",
      "Minimum C in English",
      "TU entrance exam passed",
    ],
  },
]

const FEE_STRUCTURE = [
  { program: "BCA", tuition: "Rs. 85,000", admission: "Rs. 15,000", exam: "Rs. 5,000", total: "Rs. 1,05,000" },
  { program: "BBM", tuition: "Rs. 80,000", admission: "Rs. 15,000", exam: "Rs. 5,000", total: "Rs. 1,00,000" },
  { program: "BBS", tuition: "Rs. 60,000", admission: "Rs. 12,000", exam: "Rs. 4,000", total: "Rs. 76,000" },
  { program: "BASW", tuition: "Rs. 65,000", admission: "Rs. 12,000", exam: "Rs. 4,000", total: "Rs. 81,000" },
]

const SCHOLARSHIPS = [
  { title: "Merit Scholarship", description: "Top 5% of students based on Grade 12 scores receive up to 50% tuition fee waiver.", icon: Award },
  { title: "Need-Based Scholarship", description: "Financial assistance for economically disadvantaged students with good academic standing.", icon: DollarSign },
  { title: "Sports Scholarship", description: "Outstanding athletes representing at national level get up to 75% fee concession.", icon: Users },
  { title: "Sibling Discount", description: "10% discount on tuition fee for the second sibling enrolled at Milton.", icon: Users },
]

const IMPORTANT_DATES = [
  { event: "Application Opens", date: "July 15, 2026" },
  { event: "Application Deadline", date: "September 30, 2026" },
  { event: "Entrance Examination", date: "October 15, 2026" },
  { event: "Result Publication", date: "October 30, 2026" },
  { event: "Admission & Enrollment", date: "November 1 - 30, 2026" },
  { event: "Classes Begin", date: "December 1, 2026" },
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

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    address: "",
    previousSchool: "",
    previousGrade: "",
  })
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
              <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-[#e31c23]" />
              Admissions 2026/27
            </Badge>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight"
          >
            Admissions{" "}
            <span className="bg-gradient-to-r from-[#e31c23] via-[#f55959] to-[#c9a84c] bg-clip-text text-transparent">Open</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Ready to join Milton International College? Follow our simple admission process and take the first step toward a bright future.
          </motion.p>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <Badge variant="info" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Admission Process</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1c3557] dark:text-white">How to Apply</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Follow these simple steps to secure your place at Milton International College.</p>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STEPS.map((step) => {
              const Icon = step.icon
              return (
                <FadeInSection key={step.number}>
                  <motion.div whileHover={{ y: -4 }} className="group h-full">
                    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all bg-white dark:bg-gray-800 rounded-xl relative overflow-hidden">
                      <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#1c3557]/5 dark:bg-[#1c3557]/20 rounded-full" />
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-[#e31c23] flex items-center justify-center text-white font-display font-bold text-lg mb-4">{step.number}</div>
                        <Icon className="w-6 h-6 text-[#1c3557] dark:text-white mb-3" />
                        <h3 className="text-xl font-display font-bold text-[#1c3557] dark:text-white mb-2">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section className="py-20 bg-[#f8f6f0] dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <Badge variant="warning" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Eligibility</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1c3557] dark:text-white">Program Requirements</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Each program has specific eligibility criteria. Check the requirements for your desired program below.</p>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ELIGIBILITY.map((item) => {
              const Icon = item.icon
              return (
                <FadeInSection key={item.program}>
                  <Card className="h-full border-0 shadow-md bg-white dark:bg-gray-800 rounded-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="w-8 h-8 text-[#e31c23]" />
                        <h3 className="text-2xl font-display font-bold text-[#1c3557] dark:text-white">{item.program}</h3>
                      </div>
                      <ul className="space-y-2">
                        {item.requirements.map((req) => (
                          <li key={req} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="w-3.5 h-3.5 text-[#e31c23] mt-0.5 shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12">
            <Badge variant="info" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Apply Online</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1c3557] dark:text-white">Online Application</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Fill out the form below to submit your application. We&apos;ll get back to you within 48 hours.</p>
          </FadeInSection>
          <FadeInSection>
            <Card className="border-0 shadow-xl bg-[#f8f6f0] dark:bg-gray-800 rounded-2xl">
              <CardContent className="p-8 md:p-10">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-[#1c3557] dark:text-white mb-2">Application Submitted!</h3>
                    <p className="text-gray-600 dark:text-gray-400">Thank you, {formData.name}. We have received your application for {formData.program}. Our admissions team will contact you at {formData.email} within 48 hours.</p>
                    <Button variant="outline" className="mt-6" onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", program: "", address: "", previousSchool: "", previousGrade: "" }) }}>
                      Submit Another Application
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#1c3557] dark:text-white"><User className="w-4 h-4 inline mr-1.5" />Full Name</Label>
                        <Input id="name" placeholder="Enter your full name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required className="bg-white dark:bg-gray-900" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#1c3557] dark:text-white"><Mail className="w-4 h-4 inline mr-1.5" />Email Address</Label>
                        <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} required className="bg-white dark:bg-gray-900" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[#1c3557] dark:text-white"><Phone className="w-4 h-4 inline mr-1.5" />Phone Number</Label>
                        <Input id="phone" placeholder="98XXXXXXXX" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} required className="bg-white dark:bg-gray-900" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="program" className="text-[#1c3557] dark:text-white"><GraduationCap className="w-4 h-4 inline mr-1.5" />Program</Label>
                        <Select onValueChange={(v) => handleChange("program", v)} required>
                          <SelectTrigger className="bg-white dark:bg-gray-900"><SelectValue placeholder="Select a program" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BCA">BCA - Bachelor of Computer Applications</SelectItem>
                            <SelectItem value="BBM">BBM - Bachelor of Business Management</SelectItem>
                            <SelectItem value="BBS">BBS - Bachelor of Business Studies</SelectItem>
                            <SelectItem value="BASW">BASW - Bachelor of Arts in Social Work</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address" className="text-[#1c3557] dark:text-white"><Pin className="w-4 h-4 inline mr-1.5" />Permanent Address</Label>
                        <Input id="address" placeholder="District, Municipality, Ward No." value={formData.address} onChange={(e) => handleChange("address", e.target.value)} required className="bg-white dark:bg-gray-900" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="previousSchool" className="text-[#1c3557] dark:text-white"><School className="w-4 h-4 inline mr-1.5" />Previous School/College</Label>
                        <Input id="previousSchool" placeholder="Name of your Grade 12 institution" value={formData.previousSchool} onChange={(e) => handleChange("previousSchool", e.target.value)} required className="bg-white dark:bg-gray-900" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="previousGrade" className="text-[#1c3557] dark:text-white"><BookOpen className="w-4 h-4 inline mr-1.5" />Previous Grade / GPA</Label>
                        <Input id="previousGrade" placeholder="e.g. A, 3.2 GPA, 65%" value={formData.previousGrade} onChange={(e) => handleChange("previousGrade", e.target.value)} required className="bg-white dark:bg-gray-900" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-[#1c3557] dark:text-white"><Upload className="w-4 h-4 inline mr-1.5" />Upload Documents</Label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center bg-white dark:bg-gray-900">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">Drag and drop or click to upload your transcripts, certificates, and photos</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Accepted: PDF, JPG, PNG (Max 5MB each)</p>
                          <Button type="button" variant="outline" size="sm" className="mt-3"><Upload className="w-4 h-4 mr-2" />Browse Files</Button>
                        </div>
                      </div>
                    </div>
                    <Button type="submit" size="xl" className="w-full bg-[#e31c23] hover:bg-[#c4181e] text-white shadow-lg shadow-[#e31c23]/25">
                      <Send className="w-5 h-5 mr-2" />Submit Application
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </FadeInSection>
        </div>
      </section>

      {/* FEE STRUCTURE */}
      <section className="py-20 bg-[#f8f6f0] dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12">
            <Badge variant="warning" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Fee Structure</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1c3557] dark:text-white">Fee Breakdown (Annual)</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Affordable and transparent fee structure for all programs. Fees are payable per academic year.</p>
          </FadeInSection>
          <FadeInSection>
            <div className="overflow-x-auto">
              <Table className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <TableHeader>
                  <TableRow className="bg-[#1c3557] hover:bg-[#1c3557]">
                    <TableHead className="text-white font-semibold">Program</TableHead>
                    <TableHead className="text-white font-semibold">Tuition Fee</TableHead>
                    <TableHead className="text-white font-semibold">Admission Fee</TableHead>
                    <TableHead className="text-white font-semibold">Exam Fee</TableHead>
                    <TableHead className="text-white font-semibold">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {FEE_STRUCTURE.map((fee) => (
                    <TableRow key={fee.program} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <TableCell className="font-medium text-[#1c3557] dark:text-white">{fee.program}</TableCell>
                      <TableCell>{fee.tuition}</TableCell>
                      <TableCell>{fee.admission}</TableCell>
                      <TableCell>{fee.exam}</TableCell>
                      <TableCell className="font-bold text-[#e31c23]">{fee.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">* Fees are subject to change as per TU guidelines. Library, lab, and other miscellaneous fees are additional.</p>
          </FadeInSection>
        </div>
      </section>

      {/* SCHOLARSHIPS */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <Badge variant="success" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Scholarships</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1c3557] dark:text-white">Financial Aid & Scholarships</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Milton International College offers various scholarships to support deserving students.</p>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SCHOLARSHIPS.map((s) => {
              const Icon = s.icon
              return (
                <FadeInSection key={s.title}>
                  <Card className="h-full border-0 shadow-md bg-white dark:bg-gray-800 rounded-xl">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-xl bg-[#c9a84c]/20 dark:bg-[#c9a84c]/30 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-7 h-7 text-[#c9a84c]" />
                      </div>
                      <h3 className="text-lg font-display font-bold text-[#1c3557] dark:text-white mb-2">{s.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{s.description}</p>
                    </CardContent>
                  </Card>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* IMPORTANT DATES */}
      <section className="py-20 bg-[#f8f6f0] dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12">
            <Badge variant="warning" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Important Dates</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1c3557] dark:text-white">Key Deadlines</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Mark your calendar with these important dates for the 2026/27 admission cycle.</p>
          </FadeInSection>
          <FadeInSection>
            <div className="space-y-4">
              {IMPORTANT_DATES.map((d, i) => (
                <div key={d.event} className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-[#1c3557] flex items-center justify-center text-white font-display font-bold shrink-0">{i + 1}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#1c3557] dark:text-white">{d.event}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-[#e31c23]">{d.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
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
              Start Your{" "}
              <span className="bg-gradient-to-r from-[#e31c23] to-[#c9a84c] bg-clip-text text-transparent">Journey</span> Today
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Don&apos;t miss this opportunity. Apply now and become part of the Milton legacy.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="xl" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}