"use client"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Moon, Sun, GraduationCap, Search } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getVariant } from "@/lib/variants/renderers"
import type { NavbarVariantConfig } from "@/lib/variants/types"

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

  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  const handleClickOutside = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest("[data-nav-item]")) {
      setActiveDropdown(null)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [handleClickOutside])

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
      .catch(() => {})
  }, [])

  const headerBg = scrolled
    ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-sm"
    : isHomePage
    ? "bg-transparent"
    : "bg-transparent"

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        headerBg,
        config.height === "compact" ? "h-14" : "h-16 md:h-20"
      )}
    >
      {config.style === "top-announcement" && config.announcementText && (
        <div
          className="text-white text-center text-sm py-2 px-4"
          style={{ backgroundColor: config.announcementColor || "#fe0000" }}
        >
          {config.announcementText}
        </div>
      )}

      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", config.layout === "contained" ? "max-w-7xl" : "")}>
        <div className={cn("flex items-center justify-between", config.height === "compact" ? "h-14" : "h-16 md:h-20")}>
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105"
              style={{ backgroundColor: "var(--page-primary, #1b3f63)" }}
            >
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span
                className="font-display text-lg font-bold leading-tight transition-colors"
                style={{ color: isHomePage && !scrolled ? "#fff" : "var(--page-primary, #1b3f63)" }}
              >
                {settings?.collegeName || "Milton"}
              </span>
              <span
                className="block text-[10px] uppercase tracking-widest font-medium -mt-1"
                style={{ color: "var(--page-secondary, #fe0000)" }}
              >
                International College
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.href + item.label}
                data-nav-item
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveDropdown(activeDropdown === item.label ? null : item.label)
                    }}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-1",
                      pathname === item.href
                        ? "text-[var(--page-secondary,#fe0000)]"
                        : isHomePage && !scrolled
                        ? "text-white/80 hover:text-white"
                        : "text-gray-700 dark:text-gray-200 hover:text-[var(--page-secondary,#fe0000)] dark:hover:text-[var(--page-secondary,#fe0000)]"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-1",
                      pathname === item.href
                        ? "text-[var(--page-secondary,#fe0000)]"
                        : isHomePage && !scrolled
                        ? "text-white/80 hover:text-white"
                        : "text-gray-700 dark:text-gray-200 hover:text-[var(--page-secondary,#fe0000)] dark:hover:text-[var(--page-secondary,#fe0000)]"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
                {item.children && activeDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 mt-1 w-56 rounded-xl shadow-xl py-2 animate-fade-in"
                    style={{
                      backgroundColor: "var(--page-surface, #ffffff)",
                      borderColor: "var(--page-border, #e2e5ea)",
                      borderWidth: "1px",
                    }}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                        style={{
                          color: "var(--page-text, #1b3f63)",
                        }}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {config.showSearch && (
              <button
                className="p-2 rounded-lg transition-colors"
                style={{
                  color: isHomePage && !scrolled ? "rgba(255,255,255,0.7)" : "var(--page-muted, #6b7280)",
                }}
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            {config.showThemeToggle && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg transition-colors"
                style={{
                  color: isHomePage && !scrolled ? "rgba(255,255,255,0.7)" : "var(--page-muted, #6b7280)",
                }}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            {config.showCta && (
              <Link href={config.ctaLink || "/login"}>
                <Button
                  size="sm"
                  className="hidden sm:inline-flex text-white border-0"
                  style={{ backgroundColor: "var(--page-secondary, #fe0000)" }}
                >
                  {config.ctaLabel || "Student Portal"}
                </Button>
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{
                color: isHomePage && !scrolled ? "rgba(255,255,255,0.7)" : "var(--page-muted, #6b7280)",
              }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="lg:hidden border-t animate-fade-in"
          style={{
            backgroundColor: "var(--page-surface, #ffffff)",
            borderColor: "var(--page-border, #e2e5ea)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.href + item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg"
                      style={{ color: "var(--page-text, #1b3f63)" }}
                    >
                      {item.label}
                      <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", activeDropdown === item.label && "rotate-180")} />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="ml-4 space-y-1 pb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-3 py-2 text-sm rounded-lg"
                            style={{ color: "var(--page-muted, #6b7280)" }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-2.5 text-sm font-medium rounded-lg"
                    style={{ color: "var(--page-text, #1b3f63)" }}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link href="/login" className="block px-3 py-2.5 mt-2">
              <Button
                className="w-full text-white border-0"
                style={{ backgroundColor: "var(--page-secondary, #fe0000)" }}
              >
                {config.ctaLabel || "Student Portal"}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
