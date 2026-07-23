import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NPR",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function calculateGPA(grades: { gradePoint: number; credits: number }[]): number {
  if (grades.length === 0) return 0;
  const totalPoints = grades.reduce((sum, g) => sum + g.gradePoint * g.credits, 0);
  const totalCredits = grades.reduce((sum, g) => sum + g.credits, 0);
  return totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 100) / 100 : 0;
}

export function getGradeFromMarks(marks: number): { grade: string; gradePoint: number } {
  if (marks >= 90) return { grade: "A+", gradePoint: 4.0 };
  if (marks >= 80) return { grade: "A", gradePoint: 3.6 };
  if (marks >= 70) return { grade: "B+", gradePoint: 3.2 };
  if (marks >= 60) return { grade: "B", gradePoint: 2.8 };
  if (marks >= 50) return { grade: "C+", gradePoint: 2.4 };
  if (marks >= 40) return { grade: "C", gradePoint: 2.0 };
  if (marks >= 30) return { grade: "D", gradePoint: 1.6 };
  return { grade: "F", gradePoint: 0.0 };
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + "..." : str;
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
