"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { getPageTheme } from "@/lib/page-themes"
import type { PageTheme } from "@/lib/page-themes"

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

interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

const allItems: NavItem[] = [
  ...NAV_LINKS,
  { label: "About", href: "/about", children: ABOUT_LINKS },
  { label: "Programs", href: "/programs", children: PROGRAM_LINKS },
  { label: "Admissions", href: "/admissions" },
  { label: "Faculty", href: "/faculty" },
  { label: "Resources", href: "#", children: RESOURCE_LINKS },
]

/* ─── Stagger variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

const mobileItemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" },
  }),
}

/* ─── Underline component ─── */
function HoverUnderline() {
  return (
    <motion.span
      className="absolute inset-x-[20%] -bottom-0.5 h-[2px] origin-center rounded-full"
      style={{ background: "var(--nav-accent, #d93a2b)" }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileHover={{ scaleX: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      layoutId="nav-underline"
    />
  )
}

/* ─── Active pill indicator ─── */
function ActivePill() {
  return (
    <motion.span
      layoutId="active-pill"
      className="absolute inset-0 rounded-full"
      style={{
        background: "linear-gradient(135deg, var(--nav-accent, #d93a2b), var(--nav-accent, #d93a2b)/80)",
        boxShadow: "0 0 20px var(--nav-glow, rgba(255,181,61,0.3))",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  )
}

/* ─── Dropdown ─── */
function Dropdown({
  label,
  items,
  scrolled,
}: {
  label: string
  items: { label: string; href: string }[]
  scrolled: boolean
}) {
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
        className="group relative flex items-center gap-1 py-2 text-sm font-medium transition-colors"
        style={{ color: "var(--nav-text, #ffffff)" }}
      >
        {label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 6"
          aria-hidden
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: "var(--nav-muted, rgba(255,255,255,0.6))" }}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
        <HoverUnderline />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-xl border py-2 shadow-2xl backdrop-blur-xl"
            style={{
              backgroundColor: "var(--nav-dropdown-bg, rgba(23,22,58,0.95))",
              borderColor: "var(--nav-border, rgba(255,255,255,0.1))",
            }}
          >
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-4 py-2.5 text-sm transition-colors"
                  style={{ color: "var(--nav-muted, rgba(255,255,255,0.65))" }}
                  onClick={() => setOpen(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--nav-accent, #d93a2b)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--nav-muted, rgba(255,255,255,0.65))"
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Particles ─── */
function NavParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 6 }).map((_: unknown, i) => (
        <div
          key={i}
          className="nav-particle absolute h-[2px] w-[2px] rounded-full"
          style={{
            background: "var(--nav-accent, #d93a2b)",
            left: `${10 + i * 18}%`,
            top: `${30 + (i % 3) * 25}%`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${6 + i * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ─── Light sweep ─── */
function LightSweep() {
  return (
    <div
      className="nav-sweep absolute inset-0 z-10"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
      }}
    />
  )
}

/* ─── Hamburger icon ─── */
function MenuToggle({ open }: { open: boolean }) {
  return (
    <div className="relative h-5 w-5">
      <motion.span
        className="absolute left-0 top-0 h-[2px] w-full rounded-full"
        style={{ background: "var(--nav-text, #ffffff)" }}
        animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full"
        style={{ background: "var(--nav-text, #ffffff)" }}
        animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute bottom-0 left-0 h-[2px] w-full rounded-full"
        style={{ background: "var(--nav-text, #ffffff)" }}
        animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}

/* ─── Main component ─── */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const headerRef = useRef<HTMLDivElement>(null)

  /* Detect scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  /* Mounted flag for client-side entrance animation */
  useEffect(() => {
    setMounted(true)
  }, [])

  /* Derive nav theme from data-page-theme */
  const [navTheme, setNavTheme] = useState<PageTheme | null>(null)

  useEffect(() => {
    const html = document.documentElement
    const theme = html.getAttribute("data-page-theme") || "home"
    setNavTheme(getPageTheme(theme))
  }, [pathname])

  const theme = navTheme

  const navStyle: React.CSSProperties = theme
    ? {
        "--nav-bg": scrolled
          ? "rgba(18,40,63,0.92)"
          : "rgba(18,40,63,0.25)",
        "--nav-text": "#ffffff",
        "--nav-muted": "rgba(255,255,255,0.6)",
        "--nav-accent": theme.accent,
        "--nav-border": "rgba(255,255,255,0.1)",
        "--nav-glow": theme.glow,
        "--nav-dropdown-bg": `color-mix(in srgb, ${theme.heroFrom} 98%, transparent)`,
      } as React.CSSProperties
    : {}

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}
      style={{
        ...navStyle,
        backgroundColor: "var(--nav-bg, rgba(18,40,63,0.25))",
        backdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
        borderBottom: scrolled ? "1px solid var(--nav-border, rgba(255,255,255,0.1))" : "1px solid transparent",
        boxShadow: scrolled
          ? "0 4px 30px rgba(0,0,0,0.15)"
          : "0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Light sweep on mount */}
      {mounted && <LightSweep />}

      {/* Ambient particles */}
      {mounted && !scrolled && <NavParticles />}

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 md:py-4 relative z-20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={mounted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link href="/" className="font-display text-lg font-semibold text-white tracking-tight">
            Milton<span className="font-normal opacity-60"> International College</span>
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <motion.nav
          initial="hidden"
          animate={mounted ? "show" : "hidden"}
          variants={containerVariants}
          className="hidden items-center gap-1 md:flex"
        >
          {allItems.map((item) =>
            item.children ? (
              <motion.div key={item.label} variants={itemVariants}>
                <Dropdown label={item.label} items={item.children} scrolled={scrolled} />
              </motion.div>
            ) : (
              <motion.div key={item.href} variants={itemVariants} className="relative">
                <Link
                  href={item.href}
                  className="relative flex items-center px-3 py-2 text-sm font-medium transition-colors"
                  style={{
                    color: isActive(item.href)
                      ? "#12283f"
                      : "var(--nav-text, #ffffff)",
                    zIndex: 1,
                  }}
                >
                  {isActive(item.href) && <ActivePill />}
                  <span className="relative z-10">{item.label}</span>
                </Link>
                {!isActive(item.href) && <HoverUnderline />}
              </motion.div>
            )
          )}

          {/* Student Portal */}
          <motion.div variants={itemVariants} className="ml-4">
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-white/10"
              style={{
                borderColor: "var(--nav-border, rgba(255,255,255,0.2))",
                color: "var(--nav-text, #ffffff)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden fill="none">
                <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.4" />
                <path d="M2.5 14c1-3 3.2-4.5 5.5-4.5S13 11 14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Student Portal
            </Link>
          </motion.div>
        </motion.nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="relative z-30 flex items-center justify-center p-2 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <MenuToggle open={mobileOpen} />
        </button>
      </div>

      {/* ─── Mobile menu ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-20 flex flex-col pt-20 md:hidden"
            style={{
              backgroundColor: "rgba(23,22,58,0.98)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <nav className="flex-1 overflow-y-auto px-6 py-6">
              {allItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                >
                  {item.children ? (
                    <div className="mb-2">
                      <span
                        className="block px-3 pb-1 pt-4 text-[11px] font-mono uppercase tracking-widest"
                        style={{ color: "var(--nav-muted, rgba(255,255,255,0.4))" }}
                      >
                        {item.label}
                      </span>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-3 py-2.5 text-base font-medium transition-colors"
                          style={{ color: "var(--nav-text, #ffffff)" }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block rounded-lg px-3 py-3 text-lg font-medium transition-colors"
                      style={{
                        color: isActive(item.href)
                          ? "var(--nav-accent, #d93a2b)"
                          : "var(--nav-text, #ffffff)",
                      }}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              <div className="mt-8 px-3">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all"
                  style={{
                    borderColor: "var(--nav-accent, #d93a2b)",
                    color: "var(--nav-accent, #d93a2b)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden fill="none">
                    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M2.5 14c1-3 3.2-4.5 5.5-4.5S13 11 14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  Student Portal
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
