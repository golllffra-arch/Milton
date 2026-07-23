import Link from "next/link"
import { GraduationCap, MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react"

const FOOTER_LINKS = {
  Programs: [
    { label: "BCA", href: "/programs/bca" },
    { label: "BBM", href: "/programs/bbm" },
    { label: "BBS", href: "/programs/bbs" },
    { label: "BASW", href: "/programs/basw" },
  ],
  QuickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Admissions", href: "/admissions" },
    { label: "Faculty", href: "/faculty" },
    { label: "News & Events", href: "/news" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Student Portal", href: "/login" },
    { label: "Virtual Tour", href: "/virtual-tour" },
    { label: "Career Center", href: "/career-center" },
    { label: "Student Life", href: "/student-life" },
    { label: "Downloads", href: "/downloads" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#0e1d31] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-[#e31c23]" />
              </div>
              <div>
                <span className="font-display text-xl font-bold">Milton</span>
                <span className="block text-xs uppercase tracking-widest text-[#e31c23] font-medium -mt-1">
                  International College
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              Affiliated with Tribhuvan University, Milton International College has been 
              providing quality education in New Baneshwor, Kathmandu since 2010. 
              We offer BCA, BBM, BBS, and BASW programs designed for academic excellence 
              and career success.
            </p>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[#e31c23]" />
                <span>New Baneshwor, Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#e31c23]" />
                <span>+977-1-4XXXXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#e31c23]" />
                <span>info@miltoncollege.edu.np</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#e31c23]" />
                <span>Sun - Fri: 6:00 AM - 2:00 PM</span>
              </div>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                {title.replace(/([A-Z])/g, " $1").trim()}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Milton International College. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Facebook</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Instagram</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">YouTube</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
