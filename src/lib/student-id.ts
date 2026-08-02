export const DEFAULT_STUDENT_PASSWORD = "milton"

export function getInitialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "XX"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function formatStudentId(initials: string, seq: number): string {
  return `MIC${initials}${seq.toString().padStart(3, "0")}`
}

export function studentIdPrefix(name: string): string {
  return `MIC${getInitialsFromName(name)}`
}
