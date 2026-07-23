"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Moon, Sun, GraduationCap } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about" },
      { label: "Mission & Vision", href: "/about#mission" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Accreditation", href: "/about#accreditation" },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "BCA", href: "/programs/bca" },
      { label: "BBM", href: "/programs/bbm" },
      { label: "BBS", href: "/programs/bbs" },
      { label: "BASW", href: "/programs/basw" },
    ],
  },
  { label: "Admissions", href: "/admissions" },
  { label: "Faculty", href: "/faculty" },
  {
    label: "More",
    href: "#",
    children: [
      { label: "Gallery", href: "/gallery" },
      { label: "News & Events", href: "/news" },
      { label: "Student Life", href: "/student-life" },
      { label: "Career Center", href: "/career-center" },
      { label: "Virtual Tour", href: "/virtual-tour" },
      { label: "Contact", href: "/contact" },
    ],
  },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-[#1c3557] flex items-center justify-center group-hover:bg-[#e31c23] transition-colors">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-lg font-bold text-[#1c3557] dark:text-white leading-tight">
                Milton
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-[#e31c23] font-medium -mt-1">
                International College
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.href}
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
                      : "text-gray-700 dark:text-gray-200 hover:text-[#e31c23] dark:hover:text-[#e31c23]"
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

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link href="/login">
              <Button variant="navy" size="sm" className="hidden sm:inline-flex">
                Student Portal
              </Button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[#e31c23] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 space-y-1 pb-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#e31c23] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/login" className="block px-3 py-2.5 mt-2">
              <Button variant="navy" size="sm" className="w-full">
                Student Portal
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
