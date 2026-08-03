"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, X, FileText, GraduationCap, Newspaper, Users, Image as ImageIcon, ArrowRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Category = "Pages" | "Programs" | "News" | "Faculty" | "Gallery"

interface SearchResult {
  id: string
  title: string
  subtitle?: string
  href: string
  category: Category
  keywords: string
}

const CATEGORY_ORDER: Category[] = ["Pages", "Programs", "News", "Faculty", "Gallery"]

const CATEGORY_META: Record<Category, { icon: React.ElementType; accent: string }> = {
  Pages: { icon: FileText, accent: "#1b3f63" },
  Programs: { icon: GraduationCap, accent: "#fe0000" },
  News: { icon: Newspaper, accent: "#1b3f63" },
  Faculty: { icon: Users, accent: "#fe0000" },
  Gallery: { icon: ImageIcon, accent: "#1b3f63" },
}

const STATIC_PAGES: SearchResult[] = [
  { id: "home", title: "Home", subtitle: "Milton International College", href: "/", category: "Pages", keywords: "home milton international college main welcome" },
  { id: "about", title: "About Us", subtitle: "Our story, mission & vision", href: "/about", category: "Pages", keywords: "about story mission vision history college milton" },
  { id: "faculty", title: "Faculty", subtitle: "Meet our teachers and staff", href: "/faculty", category: "Pages", keywords: "faculty teachers staff professors lecturers team" },
  { id: "news", title: "News & Events", subtitle: "Latest updates from campus", href: "/news", category: "Pages", keywords: "news events updates announcements campus" },
  { id: "gallery", title: "Gallery", subtitle: "Photos & moments at Milton", href: "/gallery", category: "Pages", keywords: "gallery photos images pictures moments campus" },
  { id: "admissions", title: "Admissions", subtitle: "How to apply & requirements", href: "/admissions", category: "Pages", keywords: "admissions apply admission requirements form eligibility fees" },
  { id: "virtual-tour", title: "Virtual Tour", subtitle: "Explore our campus online", href: "/virtual-tour", category: "Pages", keywords: "virtual tour campus explore 360 walkthrough" },
  { id: "career-center", title: "Career Center", subtitle: "Internships & placements", href: "/career-center", category: "Pages", keywords: "career center jobs internships placements recruitment work" },
  { id: "student-life", title: "Student Life", subtitle: "Clubs, activities & culture", href: "/student-life", category: "Pages", keywords: "student life clubs activities sports culture societies" },
  { id: "downloads", title: "Downloads", subtitle: "Forms, brochures & resources", href: "/downloads", category: "Pages", keywords: "downloads forms brochures syllabus resources documents pdf" },
  { id: "contact", title: "Contact", subtitle: "Location, map & social links", href: "/contact", category: "Pages", keywords: "contact location address map phone email baneshwor kathmandu" },
  { id: "portal", title: "Student Portal", subtitle: "Login to your dashboard", href: "/login", category: "Pages", keywords: "student portal login dashboard sign in password milton" },
  { id: "register", title: "Get Your Student ID", subtitle: "Register as a new student", href: "/register", category: "Pages", keywords: "register student id new account sign up milton" },
  { id: "bca", title: "BCA — Bachelor of Computer Applications", subtitle: "4-year program with semesters", href: "/programs/bca", category: "Pages", keywords: "bca computer application programming software it degree program" },
  { id: "bbm", title: "BBM — Bachelor of Business Management", subtitle: "4-year program with semesters", href: "/programs/bbm", category: "Pages", keywords: "bbm business management marketing finance hr degree program" },
  { id: "bbs", title: "BBS — Bachelor of Business Studies", subtitle: "4-year program (Year 1–4)", href: "/programs/bbs", category: "Pages", keywords: "bbs business studies accounting commerce tuition economics degree program" },
  { id: "basw", title: "BASW — Bachelor of Arts in Social Work", subtitle: "4-year program with semesters", href: "/programs/basw", category: "Pages", keywords: "basw social work community development welfare degree program" },
]

export default function GlobalSearch({
  variant = "icon",
  placeholder = "Search courses, programs, news, faculty...",
  className,
}: {
  variant?: "icon" | "input"
  placeholder?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [live, setLive] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  /* Close on navigation */
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  /* Focus input when opened */
  useEffect(() => {
    if (open) {
      setQuery("")
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  /* Lock body scroll while open */
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  /* Fetch live content once */
  useEffect(() => {
    if (!open || live.length > 0) return
    let cancelled = false
    setLoading(true)

    Promise.all([
      fetch("/api/programs?limit=50").then((r) => r.json()).catch(() => null),
      fetch("/api/news?limit=20").then((r) => r.json()).catch(() => null),
      fetch("/api/faculty?limit=50").then((r) => r.json()).catch(() => null),
      fetch("/api/gallery?limit=50").then((r) => r.json()).catch(() => null),
    ])
      .then(([programs, news, faculty, gallery]: any[]) => {
        if (cancelled) return
        const items: SearchResult[] = []

        if (Array.isArray(programs?.programs)) {
          for (const p of programs.programs) {
            if (!p?.code || !p?.fullName) continue
            items.push({
              id: `prog-${p.code}`,
              title: `${p.code} — ${p.fullName}`,
              subtitle: p.duration || p.description?.slice(0, 60),
              href: `/programs/${p.code}`,
              category: "Programs",
              keywords: `${p.code} ${p.fullName} ${p.duration || ""} ${p.description || ""}`.toLowerCase(),
            })
          }
        }

        if (Array.isArray(news?.news)) {
          for (const n of news.news) {
            if (!n?.title) continue
            items.push({
              id: `news-${n.id || n.slug || n.title}`,
              title: n.title,
              subtitle: n.excerpt?.slice(0, 80),
              href: "/news",
              category: "News",
              keywords: `${n.title} ${n.excerpt || ""} ${(n.tags || []).join(" ")}`.toLowerCase(),
            })
          }
        }

        if (Array.isArray(faculty?.faculty)) {
          for (const f of faculty.faculty) {
            const name = f?.user?.name || f?.name
            if (!name) continue
            items.push({
              id: `fac-${f.id || name}`,
              title: name,
              subtitle: f.position || f.department || "Faculty",
              href: `/faculty/${f.id}`,
              category: "Faculty",
              keywords: `${name} ${f.position || ""} ${f.department || ""}`.toLowerCase(),
            })
          }
        }

        if (Array.isArray(gallery?.gallery)) {
          for (const g of gallery.gallery) {
            if (!g?.title) continue
            items.push({
              id: `gal-${g.id || g.title}`,
              title: g.title,
              subtitle: g.description?.slice(0, 80),
              href: `/gallery/${g.id}`,
              category: "Gallery",
              keywords: `${g.title} ${g.description || ""}`.toLowerCase(),
            })
          }
        }

        setLive(items)
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [open, live.length])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return [...STATIC_PAGES, ...live].filter((r) => r.keywords.includes(q))
  }, [query, live])

  const grouped = useMemo(() => {
    const groups: { category: Category; items: SearchResult[] }[] = []
    for (const cat of CATEGORY_ORDER) {
      const items = results.filter((r) => r.category === cat)
      if (items.length) groups.push({ category: cat, items })
    }
    return groups
  }, [results])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false)
      return
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const target = results[activeIndex]
      if (target) {
        window.location.href = target.href
        setOpen(false)
      }
    }
  }

  const go = (href: string) => {
    setOpen(false)
    window.location.href = href
  }

  let flatIndex = -1

  return (
    <>
      {variant === "icon" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Search"
          className={cn("p-2 rounded-lg transition-colors hover:bg-white/10", className)}
          style={{ color: "var(--nav-text, currentColor)" }}
        >
          <Search className="w-5 h-5" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-lg border-0 bg-muted/50 px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted/80 focus:outline-none focus-visible:ring-1",
            className
          )}
        >
          <Search className="h-4 w-4 shrink-0" />
          <span className="truncate">{placeholder}</span>
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 px-4 pt-[10vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl"
            style={{
              backgroundColor: "var(--page-surface, #ffffff)",
              borderColor: "var(--page-border, #e2e5ea)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input row */}
            <div className="flex items-center gap-3 border-b px-4" style={{ borderColor: "var(--page-border, #e2e5ea)" }}>
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActiveIndex(0)
                }}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                className="w-full bg-transparent py-3.5 text-sm outline-none dark:text-white"
                style={{ color: "var(--page-text, #000000)" }}
              />
              {loading && <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close search"
                className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
              {query.trim() === "" ? (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                  Start typing to search the entire site
                </p>
              ) : results.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No results found for &ldquo;{query}&rdquo;
                </p>
              ) : (
                grouped.map((group) => {
                  const Meta = CATEGORY_META[group.category]
                  return (
                    <div key={group.category} className="mb-2">
                      <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {group.category}
                      </p>
                      {group.items.map((item) => {
                        flatIndex += 1
                        const index = flatIndex
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => go(item.href)}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                              activeIndex === index && "bg-muted/70"
                            )}
                          >
                            <span
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                              style={{ background: `color-mix(in srgb, ${Meta.accent} 12%, transparent)` }}
                            >
                              <Meta.icon className="h-4 w-4" style={{ color: Meta.accent }} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-medium dark:text-white" style={{ color: "var(--page-text, #000000)" }}>
                                {item.title}
                              </span>
                              {item.subtitle && (
                                <span className="block truncate text-xs text-muted-foreground">{item.subtitle}</span>
                              )}
                            </span>
                            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                          </button>
                        )
                      })}
                    </div>
                  )
                })
              )}
            </div>

            <div
              className="flex items-center justify-between border-t px-4 py-2 text-[11px] text-muted-foreground"
              style={{ borderColor: "var(--page-border, #e2e5ea)" }}
            >
              <span>
                <kbd className="rounded border px-1 py-0.5 font-mono">↑↓</kbd> navigate
                <span className="mx-2">&middot;</span>
                <kbd className="rounded border px-1 py-0.5 font-mono">↵</kbd> open
                <span className="mx-2">&middot;</span>
                <kbd className="rounded border px-1 py-0.5 font-mono">esc</kbd> close
              </span>
              <Link href="/programs" className="font-medium hover:underline" onClick={() => setOpen(false)} style={{ color: "var(--page-accent, #fe0000)" }}>
                Browse all programs
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
