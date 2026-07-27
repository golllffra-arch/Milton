"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const NAV_LINKS = [{ label: "Home", href: "/" }]

const ABOUT_LINKS = [
  { label: "Our Story", href: "/about" },
  { label: "Faculty", href: "/faculty" },
  { label: "News & Events", href: "/news" },
  { label: "Gallery", href: "/gallery" },
]

const PROGRAM_LINKS = [
  { label: "BCA — Computer Applications", href: "/programs/bca" },
  { label: "BBM — Business Management", href: "/programs/bbm" },
  { label: "BBS — Business Studies", href: "/programs/bbs" },
  { label: "BASW — Social Work", href: "/programs/basw" },
]

const RESOURCE_LINKS = [
  { label: "Virtual Tour", href: "/virtual-tour" },
  { label: "Career Center", href: "/career-center" },
  { label: "Student Life", href: "/student-life" },
  { label: "Downloads", href: "/downloads" },
]

function Dropdown({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 py-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
      >
        {label}
        <svg width="10" height="10" viewBox="0 0 10 6" aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-20 mt-1 w-56 overflow-hidden rounded-xl border border-black/5 bg-white py-2 shadow-xl"
          >
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block px-4 py-2 text-sm text-[var(--ink)] hover:bg-[var(--sky)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[var(--indigo)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="font-display text-lg font-semibold text-white">
          Milton International College
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-white/90 hover:text-white">
              {l.label}
            </a>
          ))}
          <Dropdown label="About" items={ABOUT_LINKS} />
          <Dropdown label="Programs" items={PROGRAM_LINKS} />
          <a href="/admissions" className="text-sm font-medium text-white/90 hover:text-white">
            Admissions
          </a>
          <a href="/faculty" className="text-sm font-medium text-white/90 hover:text-white">
            Faculty
          </a>
          <Dropdown label="Resources" items={RESOURCE_LINKS} />
        </nav>

        <a
          href="/login"
          className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden fill="none">
            <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.4" />
            <path d="M2.5 14c1-3 3.2-4.5 5.5-4.5S13 11 14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          Student Portal
        </a>
      </div>
    </header>
  )
}
