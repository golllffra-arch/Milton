"use client"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const pageThemeMap: Record<string, string> = {
  "/": "home",
  "/about": "about",
  "/programs": "services",
  "/programs/bca": "services",
  "/programs/bbm": "services",
  "/programs/bbs": "services",
  "/programs/basw": "services",
  "/admissions": "admissions",
  "/faculty": "team",
  "/faculty/": "team",
  "/gallery": "projects",
  "/gallery/": "projects",
  "/news": "news",
  "/student-life": "student-life",
  "/career-center": "career-center",
  "/virtual-tour": "virtual-tour",
  "/contact": "contact",
  "/login": "login",
  "/dashboard": "dashboard",
  "/dashboard/student": "dashboard",
  "/dashboard/admin": "dashboard",
}

export function ThemeWatcher() {
  const pathname = usePathname()

  useEffect(() => {
    const theme = Object.entries(pageThemeMap).find(([path]) =>
      pathname === path || pathname.startsWith(path + "/")
    )?.[1] || "home"
    document.documentElement.setAttribute("data-page-theme", theme)
  }, [pathname])

  return null
}
