"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Moon, Sun, GraduationCap, Search } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getVariant } from "@/lib/variants/renderers"
import type { NavbarVariantConfig } from "@/lib/variants/types"

// Default nav items used when DB isn't available
const DEFAULT_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about", children: [
    { label: "Our Story", href: "/about" },
    { label: "Mission & Vision", href: "/about#mission" },
    { label: "Leadership", href: "/about#leadership" },
    { label: "Accreditation", href: "/about#accreditation" },
  ]},
  { label: "Programs", href: "/programs", children: [
    { label: "BCA", href: "/programs/bca" },
    { label: "BBM", href: "/programs/bbm" },
    { label: "BBS", href: "/programs/bbs" },
    { label: "BASW", href: "/programs/basw" },
  ]},
  { label: "Admissions", href: "/admissions" },
  { label: "Faculty", href: "/faculty" },
  { label: "More", href: "#", children: [
    { label: "Gallery", href: "/gallery" },
    { label: "News & Events", href: "/news" },
    { label: "Student Life", href: "/student-life" },
    { label: "Career Center", href: "/career-center" },
    { label: "Virtual Tour", href: "/virtual-tour" },
    { label: "Contact", href: "/contact" },
  ]},
]

interface DynamicNavbarProps {
  variantSlug?: string
  settings?: any
}

export function DynamicNavbar({ variantSlug = "navbar-default", settings }: DynamicNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [navItems, setNavItems] = useState(DEFAULT_NAV_ITEMS)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const variant = getVariant("navbar", variantSlug)
  const config: NavbarVariantConfig = variant?.config || {}

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  // Fetch nav items from DB
  useEffect(() => {
    fetch("/api/settings/nav-menu")
      .then((r) => r.json())
      .then((items) => {
        if (items?.length) {
          const mapped = items.map((item: any) => ({
            label: item.label,
            href: item.link,
            children: item.children?.length
              ? item.children.map((c: any) => ({ label: c.label, href: c.link }))
              : undefined,
          }))
          setNavItems(mapped)
        }
      })
      .catch(() => {}) // Fall back to defaults
  }, [])

  const isTransparent = config.transparent && !scrolled
  const isDark = config.style === "dark-mode"
  const isCompact = config.height === "compact"
  const textColor = isTransparent ? "text-white" : isDark ? "text-gray-200" : "text-gray-700"

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent ? "bg-transparent" : scrolled || !config.transparent
          ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-sm"
          : "bg-transparent",
        isCompact ? "h-14" : "h-16 md:h-20"
      )}
    >
      {/* Announcement strip */}
      {config.style === "top-announcement" && config.announcementText && (
        <div
          className="text-white text-center text-sm py-2 px-4"
          style={{ backgroundColor: config.announcementColor || "#e31c23" }}
        >
          {config.announcementText}
        </div>
      )}

      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", config.layout === "contained" ? "max-w-7xl" : "")}>
        <div className={cn("flex items-center justify-between", isCompact ? "h-14" : "h-16 md:h-20")}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
              style={{ backgroundColor: settings?.primaryColor || "#1c3557" }}
            >
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-lg font-bold leading-tight" style={{ color: isTransparent ? "#fff" : settings?.primaryColor || "#1c3557" }}>
                {settings?.collegeName || "Milton"}
              </span>
              <span className="block text-[10px] uppercase tracking-widest font-medium -mt-1"
                style={{ color: settings?.secondaryColor || "#e31c23" }}
              >
                International College
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.href + item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1",
                    pathname === item.href
                      ? "text-[#e31c23]"
                      : `${textColor} hover:text-[#e31c23] dark:hover:text-[#e31c23]`
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3 h-3" />}
                </Link>
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#e31c23] transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {config.showSearch && (
              <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            )}
            {config.showThemeToggle && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            {config.showCta && (
              <Link href={config.ctaLink || "/login"}>
                <Button size="sm" className="hidden sm:inline-flex"
                  style={{ backgroundColor: settings?.secondaryColor || "#e31c23" }}
                >
                  {config.ctaLabel || "Student Portal"}
                </Button>
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-950 border-t dark:border-gray-800 animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.href + item.label}>
                <Link href={item.href} className="block px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[#e31c23] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 space-y-1 pb-2">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="block px-3 py-2 text-sm text-gray-500 hover:text-[#e31c23] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/login" className="block px-3 py-2.5 mt-2">
              <Button className="w-full" style={{ backgroundColor: settings?.secondaryColor || "#e31c23" }}>
                {config.ctaLabel || "Student Portal"}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
