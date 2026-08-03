export interface PageTheme {
  bg: string
  surface: string
  primary: string
  secondary: string
  accent: string
  text: string
  muted: string
  border: string
  heroFrom: string
  heroTo: string
  glow: string
  gradientBg: string
  cardBg: string
}

export const NAVY = "#1b3f63"
export const NAVY_DARK = "#1b3f63"
export const RED = "#fe0000"
export const RED_DARK = "#fe0000"

const brandTheme: PageTheme = {
  bg: "#ffffff",
  surface: "#ffffff",
  primary: NAVY,
  secondary: RED,
  accent: RED,
  text: "#000000",
  muted: "#6b7280",
  border: "#e2e5ea",
  heroFrom: NAVY,
  heroTo: NAVY_DARK,
  glow: "rgba(27,63,99,0.2)",
  gradientBg: "linear-gradient(135deg, #ffffff 0%, #f5f6f8 50%, #ffffff 100%)",
  cardBg: "#ffffff",
}

const darkTheme: PageTheme = {
  ...brandTheme,
  bg: "#000000",
  surface: "#1b3f63",
  text: "#ffffff",
  muted: "#94a3b8",
  border: "#1b3f63",
  heroFrom: "#1b3f63",
  heroTo: "#000000",
  glow: "rgba(254,0,0,0.2)",
  gradientBg: "linear-gradient(135deg, #000000 0%, #1b3f63 50%, #000000 100%)",
  cardBg: "#1b3f63",
}

export const pageThemes: Record<string, PageTheme> = {
  home: brandTheme,
  about: brandTheme,
  services: brandTheme,
  projects: brandTheme,
  coor: brandTheme,
  contact: brandTheme,
  admissions: brandTheme,
  news: brandTheme,
  "student-life": brandTheme,
  "career-center": brandTheme,
  "virtual-tour": darkTheme,
}

export function getPageTheme(pathname: string): PageTheme {
  const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "")
  if (pageThemes[path]) return pageThemes[path]
  const match = Object.keys(pageThemes).find((key) => path.startsWith(key))
  return match ? pageThemes[match] : pageThemes.home
}
