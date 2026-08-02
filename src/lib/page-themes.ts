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

export const NAVY = "#1b3a5c"
export const NAVY_DARK = "#12283f"
export const RED = "#d93a2b"
export const RED_DARK = "#b82e21"

const brandTheme: PageTheme = {
  bg: "#ffffff",
  surface: "#ffffff",
  primary: NAVY,
  secondary: RED,
  accent: RED,
  text: "#1a1a1a",
  muted: "#6b7280",
  border: "#e2e5ea",
  heroFrom: NAVY,
  heroTo: NAVY_DARK,
  glow: "rgba(27,58,92,0.2)",
  gradientBg: "linear-gradient(135deg, #ffffff 0%, #f5f6f8 50%, #ffffff 100%)",
  cardBg: "#ffffff",
}

const darkTheme: PageTheme = {
  ...brandTheme,
  bg: "#0b1522",
  surface: "#12283f",
  text: "#ffffff",
  muted: "#94a3b8",
  border: "#1e3a5c",
  heroFrom: "#12283f",
  heroTo: "#0b1522",
  glow: "rgba(217,58,43,0.2)",
  gradientBg: "linear-gradient(135deg, #0b1522 0%, #12283f 50%, #0b1522 100%)",
  cardBg: "#12283f",
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
