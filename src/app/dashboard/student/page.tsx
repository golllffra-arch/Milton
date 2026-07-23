"use client"

import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  CalendarCheck,
  Clock,
  GraduationCap,
  DollarSign,
  FileText,
  BookOpen,
  Bell,
  Calendar,
  BadgeCheck,
  Menu,
  X,
  Search,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  User,
  Settings,
  ChevronRight,
  ArrowUpRight,
  ExternalLink,
  CreditCard,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock as ClockIcon,
  BookMarked,
  MapPin,
} from "lucide-react"
import { useTheme } from "next-themes"

import { cn, formatDate, formatCurrency, getInitials } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const STUDENT = {
  name: "Aarav Sharma",
  enrollment: "BCA-2022-047",
  program: "Bachelor of Computer Application (BCA)",
  batch: "2022-2026",
  semester: "4th Semester",
  email: "aarav.sharma@milton.edu.np",
  phone: "+977 9841XXXXXX",
  photo: "/images/student-placeholder.jpg",
}

const QUICK_STATS = {
  attendance: 84,
  gpa: 3.42,
  upcomingDeadlines: 4,
  pendingFees: 12500,
}

const ATTENDANCE_DATA = [
  { subject: "Data Structures & Algorithms", total: 42, attended: 38 },
  { subject: "Computer Networks", total: 40, attended: 32 },
  { subject: "Database Management System", total: 44, attended: 40 },
  { subject: "Operating Systems", total: 38, attended: 29 },
  { subject: "Software Engineering", total: 36, attended: 33 },
  { subject: "Web Technologies", total: 40, attended: 36 },
]

const ROUTINE = [
  { day: "Monday", slots: [
    { time: "6:00 - 6:50", subject: "Data Structures", teacher: "Mr. Rajesh K.", room: "Lab 3" },
    { time: "7:00 - 7:50", subject: "Computer Networks", teacher: "Ms. Sunita P.", room: "Room 204" },
    { time: "8:00 - 8:50", subject: "Database Management", teacher: "Dr. Amit S.", room: "Room 205" },
    { time: "9:00 - 9:50", subject: "Operating Systems", teacher: "Mr. Prakash M.", room: "Lab 2" },
    { time: "10:00 - 10:50", subject: "Web Technologies", teacher: "Ms. Reema G.", room: "Lab 1" },
    { time: "11:00 - 11:50", subject: "Math Lab", teacher: "Mr. Deepak T.", room: "Room 206" },
  ]},
  { day: "Tuesday", slots: [
    { time: "6:00 - 6:50", subject: "Web Technologies", teacher: "Ms. Reema G.", room: "Lab 1" },
    { time: "7:00 - 7:50", subject: "Data Structures", teacher: "Mr. Rajesh K.", room: "Lab 3" },
    { time: "8:00 - 8:50", subject: "Software Engineering", teacher: "Dr. Anita R.", room: "Room 204" },
    { time: "9:00 - 9:50", subject: "Computer Networks", teacher: "Ms. Sunita P.", room: "Room 205" },
    { time: "10:00 - 10:50", subject: "Database Management", teacher: "Dr. Amit S.", room: "Lab 2" },
    { time: "11:00 - 11:50", subject: "Library", teacher: "Self Study", room: "Library" },
  ]},
  { day: "Wednesday", slots: [
    { time: "6:00 - 6:50", subject: "Operating Systems", teacher: "Mr. Prakash M.", room: "Lab 2" },
    { time: "7:00 - 7:50", subject: "Software Engineering", teacher: "Dr. Anita R.", room: "Room 204" },
    { time: "8:00 - 8:50", subject: "Data Structures", teacher: "Mr. Rajesh K.", room: "Lab 3" },
    { time: "9:00 - 9:50", subject: "Web Technologies", teacher: "Ms. Reema G.", room: "Lab 1" },
    { time: "10:00 - 10:50", subject: "Computer Networks", teacher: "Ms. Sunita P.", room: "Room 205" },
    { time: "11:00 - 11:50", subject: "Club Activity", teacher: "Coordinator", room: "Auditorium" },
  ]},
  { day: "Thursday", slots: [
    { time: "6:00 - 6:50", subject: "Database Management", teacher: "Dr. Amit S.", room: "Lab 2" },
    { time: "7:00 - 7:50", subject: "Operating Systems", teacher: "Mr. Prakash M.", room: "Room 204" },
    { time: "8:00 - 8:50", subject: "Web Technologies", teacher: "Ms. Reema G.", room: "Lab 1" },
    { time: "9:00 - 9:50", subject: "Data Structures", teacher: "Mr. Rajesh K.", room: "Lab 3" },
    { time: "10:00 - 10:50", subject: "Software Engineering", teacher: "Dr. Anita R.", room: "Room 205" },
    { time: "11:00 - 11:50", subject: "Sports", teacher: "Coach Sharma", room: "Ground" },
  ]},
  { day: "Friday", slots: [
    { time: "6:00 - 6:50", subject: "Computer Networks", teacher: "Ms. Sunita P.", room: "Room 204" },
    { time: "7:00 - 7:50", subject: "Database Management", teacher: "Dr. Amit S.", room: "Lab 2" },
    { time: "8:00 - 8:50", subject: "Operating Systems", teacher: "Mr. Prakash M.", room: "Room 205" },
    { time: "9:00 - 9:50", subject: "Software Engineering", teacher: "Dr. Anita R.", room: "Room 204" },
    { time: "10:00 - 10:50", subject: "Data Structures Lab", teacher: "Mr. Rajesh K.", room: "Lab 3" },
    { time: "11:00 - 11:50", subject: "Seminar", teacher: "Guest Speaker", room: "Seminar Hall" },
  ]},
]

const GRADES_DATA: Record<string, { subject: string; internal: number; final: number; total: number; credits: number }[]> = {
  "Semester 1": [
    { subject: "English I", internal: 28, final: 62, total: 90, credits: 3 },
    { subject: "Mathematics I", internal: 25, final: 58, total: 83, credits: 3 },
    { subject: "Digital Logic", internal: 26, final: 60, total: 86, credits: 3 },
    { subject: "C Programming", internal: 29, final: 63, total: 92, credits: 4 },
    { subject: "Physics", internal: 24, final: 55, total: 79, credits: 3 },
  ],
  "Semester 2": [
    { subject: "English II", internal: 27, final: 60, total: 87, credits: 3 },
    { subject: "Mathematics II", internal: 26, final: 56, total: 82, credits: 3 },
    { subject: "Discrete Structures", internal: 25, final: 58, total: 83, credits: 3 },
    { subject: "Object-Oriented Programming", internal: 28, final: 62, total: 90, credits: 4 },
    { subject: "Microprocessor", internal: 24, final: 54, total: 78, credits: 3 },
  ],
  "Semester 3": [
    { subject: "Data Structures", internal: 28, final: 61, total: 89, credits: 4 },
    { subject: "Computer Architecture", internal: 25, final: 57, total: 82, credits: 3 },
    { subject: "Statistics", internal: 26, final: 59, total: 85, credits: 3 },
    { subject: "Java Programming", internal: 29, final: 64, total: 93, credits: 4 },
    { subject: "Sociology", internal: 27, final: 58, total: 85, credits: 3 },
  ],
  "Semester 4": [
    { subject: "Data Structures & Algorithms", internal: 27, final: 60, total: 87, credits: 4 },
    { subject: "Computer Networks", internal: 25, final: 56, total: 81, credits: 3 },
    { subject: "Database Management System", internal: 28, final: 62, total: 90, credits: 4 },
    { subject: "Operating Systems", internal: 24, final: 55, total: 79, credits: 3 },
    { subject: "Software Engineering", internal: 26, final: 59, total: 85, credits: 3 },
    { subject: "Web Technologies", internal: 28, final: 61, total: 89, credits: 3 },
  ],
}

const SEMESTERS = ["Semester 1", "Semester 2", "Semester 3", "Semester 4"]

const FEES_DATA = [
  { type: "Tuition Fee", amount: 45000, paid: 45000, dueDate: "2026-01-15", status: "paid" as const },
  { type: "Lab Fee", amount: 8000, paid: 8000, dueDate: "2026-01-15", status: "paid" as const },
  { type: "Library Fee", amount: 3000, paid: 3000, dueDate: "2026-01-15", status: "paid" as const },
  { type: "Exam Fee", amount: 5000, paid: 3000, dueDate: "2026-03-01", status: "partial" as const },
  { type: "Sports Fee", amount: 2000, paid: 0, dueDate: "2026-02-20", status: "unpaid" as const },
  { type: "Development Fee", amount: 5500, paid: 0, dueDate: "2026-02-15", status: "overdue" as const },
  { type: "Transport Fee", amount: 6000, paid: 6000, dueDate: "2026-01-15", status: "paid" as const },
  { type: "Miscellaneous", amount: 2000, paid: 0, dueDate: "2026-03-10", status: "unpaid" as const },
]

const ASSIGNMENTS = [
  { title: "Binary Tree Implementation", subject: "Data Structures & Algorithms", dueDate: "2026-07-25", status: "submitted" as const },
  { title: "Network Topology Report", subject: "Computer Networks", dueDate: "2026-07-28", status: "pending" as const },
  { title: "ER Diagram for Library System", subject: "Database Management System", dueDate: "2026-07-20", status: "overdue" as const },
  { title: "Process Scheduling Algorithms", subject: "Operating Systems", dueDate: "2026-08-02", status: "pending" as const },
  { title: "SRS Document Draft", subject: "Software Engineering", dueDate: "2026-08-05", status: "pending" as const },
  { title: "Responsive Web Page Design", subject: "Web Technologies", dueDate: "2026-07-30", status: "submitted" as const },
]

const BORROWED_BOOKS = [
  { title: "Introduction to Algorithms (CLRS)", author: "Cormen et al.", isbn: "978-0262033848", borrowed: "2026-06-15", due: "2026-07-15", fine: 0 },
  { title: "Computer Networking: A Top-Down Approach", author: "Kurose & Ross", isbn: "978-0133594140", borrowed: "2026-06-20", due: "2026-07-20", fine: 5 },
  { title: "Database System Concepts", author: "Silberschatz et al.", isbn: "978-0078022159", borrowed: "2026-06-25", due: "2026-07-25", fine: 0 },
  { title: "Operating System Concepts", author: "Silberschatz & Galvin", isbn: "978-1118063330", borrowed: "2026-07-01", due: "2026-07-31", fine: 0 },
]

const NOTIFICATIONS = [
  { id: 1, title: "Assignment Submission Reminder", message: "Your ER Diagram assignment is overdue. Please submit immediately.", time: "2 hours ago", type: "urgent" as const, unread: true },
  { id: 2, title: "Exam Schedule Published", message: "The 4th semester final exam schedule has been published. Check the notice board.", time: "1 day ago", type: "info" as const, unread: true },
  { id: 3, title: "Fee Payment Due", message: "Your sports fee of NPR 2,000 is due by Feb 20. Pay online to avoid late fee.", time: "2 days ago", type: "warning" as const, unread: true },
  { id: 4, title: "Tour Registration Open", message: "Registration for Singapore Educational Tour is now open. Limited seats available.", time: "3 days ago", type: "info" as const, unread: false },
  { id: 5, title: "Library Fine Notice", message: "You have a pending fine of NPR 5 for late return of 'Computer Networking'.", time: "5 days ago", type: "warning" as const, unread: false },
  { id: 6, title: "Holiday Notice", message: "College will remain closed on March 8 for International Women's Day.", time: "1 week ago", type: "info" as const, unread: false },
  { id: 7, title: "Sports Day Announcement", message: "Annual Sports Day is scheduled for March 15. Register your participation.", time: "1 week ago", type: "info" as const, unread: false },
]

const EVENTS = [
  { title: "BCA Project Exhibition", date: "2026-08-10", time: "10:00 AM", venue: "College Auditorium", type: "academic" as const },
  { title: "Annual Sports Day", date: "2026-08-15", time: "7:00 AM", venue: "College Ground", type: "sports" as const },
  { title: "Industry Visit: Tech Park", date: "2026-08-20", time: "8:00 AM", venue: "Banepa IT Park", type: "academic" as const },
  { title: "Farewell 2026", date: "2026-08-28", time: "5:00 PM", venue: "College Lawn", type: "cultural" as const },
  { title: "Parent-Teacher Meeting", date: "2026-09-05", time: "9:00 AM", venue: "Multi-Purpose Hall", type: "meeting" as const },
]

const TOURS = [
  { destination: "Singapore Educational Tour", dates: "Sept 15-22, 2026", cost: 85000, seatsLeft: 12, status: "open" as const, registered: false },
  { destination: "Malaysia IT & Culture Tour", dates: "Oct 5-12, 2026", cost: 65000, seatsLeft: 8, status: "open" as const, registered: true },
]

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "attendance", label: "Attendance", icon: CalendarCheck },
  { id: "routine", label: "Class Routine", icon: Clock },
  { id: "grades", label: "Grades & Results", icon: GraduationCap },
  { id: "fees", label: "Fee Status", icon: DollarSign },
  { id: "assignments", label: "Assignments", icon: FileText },
  { id: "library", label: "Library", icon: BookOpen },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "events", label: "Events & Tours", icon: Calendar },
  { id: "idcard", label: "Digital ID Card", icon: BadgeCheck },
]

function getGradeInfo(total: number) {
  if (total >= 90) return { grade: "A+", gradePoint: 4.0, color: "text-green-600" }
  if (total >= 80) return { grade: "A", gradePoint: 3.6, color: "text-green-500" }
  if (total >= 70) return { grade: "B+", gradePoint: 3.2, color: "text-blue-500" }
  if (total >= 60) return { grade: "B", gradePoint: 2.8, color: "text-yellow-500" }
  if (total >= 50) return { grade: "C+", gradePoint: 2.4, color: "text-orange-500" }
  if (total >= 40) return { grade: "C", gradePoint: 2.0, color: "text-red-500" }
  return { grade: "F", gradePoint: 0.0, color: "text-red-600" }
}

function calcSemesterGPA(subjects: { total: number; credits: number }[]) {
  let totalPoints = 0
  let totalCreds = 0
  for (const s of subjects) {
    const gp = getGradeInfo(s.total).gradePoint
    totalPoints += gp * s.credits
    totalCreds += s.credits
  }
  return totalCreds > 0 ? Math.round((totalPoints / totalCreds) * 100) / 100 : 0
}

function calcCumulativeGPA(allSemesters: string[]) {
  let totalPoints = 0
  let totalCreds = 0
  for (const sem of allSemesters) {
    const subs = GRADES_DATA[sem]
    if (!subs) continue
    for (const s of subs) {
      const gp = getGradeInfo(s.total).gradePoint
      totalPoints += gp * s.credits
      totalCreds += s.credits
    }
  }
  return totalCreds > 0 ? Math.round((totalPoints / totalCreds) * 100) / 100 : 0
}

function getDaysRemaining(dateStr: string) {
  const now = new Date()
  const due = new Date(dateStr)
  const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

function getOverdueDays(dateStr: string) {
  const now = new Date()
  const due = new Date(dateStr)
  const diff = Math.ceil((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

function CircularProgress({ value, size = 120, strokeWidth = 8, color }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference
  const strokeColor = value >= 75 ? "#10b981" : value >= 60 ? "#f59e0b" : "#ef4444"

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color || strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      <span className="absolute text-xl font-bold" style={{ color: color || strokeColor }}>
        {value}%
      </span>
    </div>
  )
}

function NavIcon({ icon: Icon, active }: { icon: React.ElementType; active: boolean }) {
  return <Icon className={cn("h-5 w-5 shrink-0", active ? "text-white" : "text-muted-foreground")} />
}

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedSemester, setSelectedSemester] = useState("Semester 4")
  const [searchQuery, setSearchQuery] = useState("")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const todayName = days[new Date().getDay()]
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length
  const currentGrades = GRADES_DATA[selectedSemester] || []
  const semGPA = calcSemesterGPA(currentGrades)
  const cumGPA = calcCumulativeGPA(SEMESTERS)
  const totalDue = FEES_DATA.reduce((sum, f) => sum + (f.amount - f.paid), 0)

  const filteredBooks = BORROWED_BOOKS.filter(
    (b) => b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.author.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-milton-cream to-white dark:from-gray-950 dark:to-gray-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white/80 px-4 backdrop-blur-xl dark:bg-gray-950/80 md:px-6">
        <Button variant="ghost" size="icon" className="shrink-0 md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon" className="hidden shrink-0 md:inline-flex" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="h-5 w-5" />
        </Button>

        <div className="relative hidden flex-1 sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search courses, assignments..." className="w-full max-w-md border-0 bg-muted/50 pl-9 focus-visible:ring-1" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          {mounted && (
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="relative">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}

          <Button variant="ghost" size="icon" className="relative" onClick={() => setActiveTab("notifications")}>
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-milton-red text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8 border-2 border-milton-navy/20">
                  <AvatarImage src={STUDENT.photo} alt={STUDENT.name} />
                  <AvatarFallback className="bg-milton-navy text-xs text-white">{getInitials(STUDENT.name)}</AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium md:inline">{STUDENT.name}</span>
                <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{STUDENT.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">{STUDENT.enrollment}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside
          className={cn(
            "fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] flex-col border-r bg-white transition-all duration-300 dark:bg-gray-950 md:flex",
            sidebarOpen ? "w-60" : "w-16"
          )}
        >
          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  activeTab === item.id
                    ? "bg-milton-navy text-white shadow-md"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
                title={sidebarOpen ? undefined : item.label}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", activeTab === item.id && "text-white")} />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </button>
            ))}
          </nav>
          <div className={cn("border-t p-3", !sidebarOpen && "text-center")}>
            <div className={cn("flex items-center gap-3", !sidebarOpen && "justify-center")}>
              <Avatar className="h-8 w-8 border-2 border-milton-navy/20">
                <AvatarFallback className="bg-milton-navy text-[10px] text-white">{getInitials(STUDENT.name)}</AvatarFallback>
              </Avatar>
              {sidebarOpen && (
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{STUDENT.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{STUDENT.program}</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={cn("flex-1 transition-all duration-300", sidebarOpen ? "md:ml-60" : "md:ml-16")}>
          <div className="container mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
            {/* ==================== OVERVIEW ==================== */}
            {activeTab === "overview" && (
              <div className="animate-fade-in space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="font-display text-2xl font-bold tracking-tight text-milton-navy dark:text-white md:text-3xl">
                      Welcome back, {STUDENT.name.split(" ")[0]}!
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                      {STUDENT.program} &middot; {STUDENT.semester}
                    </p>
                  </div>
                  <Avatar className="h-16 w-16 border-2 border-milton-navy/10 shadow-lg">
                    <AvatarImage src={STUDENT.photo} alt={STUDENT.name} />
                    <AvatarFallback className="bg-milton-navy text-lg text-white">{getInitials(STUDENT.name)}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Card className="border-l-4 border-l-green-500 shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                      <CalendarCheck className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent className="flex flex-col items-center pb-4">
                      <CircularProgress value={QUICK_STATS.attendance} size={100} strokeWidth={7} />
                      <p className="mt-2 text-xs text-muted-foreground">Overall attendance</p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500 shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
                      <GraduationCap className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-milton-navy dark:text-white">{QUICK_STATS.gpa}</div>
                      <p className="text-xs text-muted-foreground">Cumulative: {cumGPA}</p>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                          style={{ width: `${(QUICK_STATS.gpa / 4) * 100}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-amber-500 shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Deadlines</CardTitle>
                      <Clock className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-amber-500">{QUICK_STATS.upcomingDeadlines}</div>
                      <p className="text-xs text-muted-foreground">Upcoming assignments</p>
                      <Button variant="link" className="mt-1 h-auto p-0 text-xs" onClick={() => setActiveTab("assignments")}>
                        View assignments <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-red-500 shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
                      <DollarSign className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-red-500">{formatCurrency(QUICK_STATS.pendingFees)}</div>
                      <p className="text-xs text-muted-foreground">Due amount</p>
                      <Button variant="link" className="mt-1 h-auto p-0 text-xs" onClick={() => setActiveTab("fees")}>
                        Pay now <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                  <Card className="lg:col-span-2 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">Today&apos;s Schedule</CardTitle>
                      <CardDescription>{todayName}, {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {(() => {
                        const todayRoutine = ROUTINE.find((r) => r.day === todayName)
                        if (!todayRoutine) return <p className="text-sm text-muted-foreground">No classes scheduled for today.</p>
                        return (
                          <div className="space-y-3">
                            {todayRoutine.slots.map((slot, i) => (
                              <div key={i} className="flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/30">
                                <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-md bg-milton-navy text-[10px] font-medium leading-tight text-white">
                                  {slot.time}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium">{slot.subject}</p>
                                  <p className="text-xs text-muted-foreground">{slot.teacher} &middot; {slot.room}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )
                      })()}
                    </CardContent>
                  </Card>

                  <Card className="shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">Recent Notifications</CardTitle>
                      <Badge variant="destructive">{unreadCount} new</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {NOTIFICATIONS.slice(0, 3).map((n) => (
                        <div key={n.id} className={cn("rounded-lg border p-3 text-sm", n.unread && "border-l-2 border-l-milton-navy bg-muted/30")}>
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-medium">{n.title}</p>
                            {n.unread && <span className="h-2 w-2 rounded-full bg-milton-red" />}
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{n.message}</p>
                          <p className="mt-1 text-[10px] text-muted-foreground">{n.time}</p>
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => setActiveTab("notifications")}>
                        View all notifications
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* ==================== ATTENDANCE ==================== */}
            {activeTab === "attendance" && (
              <div className="animate-fade-in space-y-6">
                <div>
                  <h1 className="font-display text-2xl font-bold text-milton-navy dark:text-white">Attendance Tracker</h1>
                  <p className="mt-1 text-muted-foreground">Monitor your class attendance across all subjects</p>
                </div>

                <Card className="bg-gradient-to-r from-milton-navy to-milton-navy/90 text-white shadow-xl">
                  <CardContent className="flex flex-col items-center gap-6 py-8 sm:flex-row">
                    <CircularProgress value={QUICK_STATS.attendance} size={130} strokeWidth={9} color="white" />
                    <div>
                      <h3 className="text-2xl font-bold">Overall Attendance: {QUICK_STATS.attendance}%</h3>
                      <p className="mt-1 text-white/70">
                        {QUICK_STATS.attendance >= 75 ? "Excellent! Keep it up." : QUICK_STATS.attendance >= 60 ? "Needs improvement." : "Critical - please attend classes regularly."}
                      </p>
                      <div className="mt-4 flex gap-4 text-xs">
                        <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-green-400" /> {">"}75% Good</span>
                        <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-yellow-400" /> 60-75% Avg</span>
                        <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /> {"<"}60% Low</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Subject-wise Breakdown</CardTitle>
                    <CardDescription>Attendance details for {STUDENT.semester}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead className="text-center">Total Classes</TableHead>
                          <TableHead className="text-center">Attended</TableHead>
                          <TableHead className="text-center">Percentage</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ATTENDANCE_DATA.map((row) => {
                          const pct = Math.round((row.attended / row.total) * 100)
                          const color = pct >= 75 ? "text-green-600" : pct >= 60 ? "text-yellow-500" : "text-red-500"
                          const bg = pct >= 75 ? "bg-green-100 text-green-800 dark:bg-green-900/30" : pct >= 60 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30" : "bg-red-100 text-red-800 dark:bg-red-900/30"
                          return (
                            <TableRow key={row.subject}>
                              <TableCell className="font-medium">{row.subject}</TableCell>
                              <TableCell className="text-center">{row.total}</TableCell>
                              <TableCell className="text-center">{row.attended}</TableCell>
                              <TableCell className={cn("text-center font-semibold", color)}>{pct}%</TableCell>
                              <TableCell className="text-center">
                                <Badge variant={pct >= 75 ? "success" : pct >= 60 ? "warning" : "destructive"}>
                                  {pct >= 75 ? "Good" : pct >= 60 ? "Average" : "Low"}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* ==================== CLASS ROUTINE ==================== */}
            {activeTab === "routine" && (
              <div className="animate-fade-in space-y-6">
                <div>
                  <h1 className="font-display text-2xl font-bold text-milton-navy dark:text-white">Class Routine</h1>
                  <p className="mt-1 text-muted-foreground">Weekly timetable for {STUDENT.semester}</p>
                </div>

                <div className="overflow-x-auto rounded-xl border shadow-md">
                  <table className="w-full min-w-[800px] text-sm">
                    <thead>
                      <tr className="bg-milton-navy text-white">
                        <th className="sticky left-0 z-10 bg-milton-navy px-4 py-3 text-left font-medium">Time</th>
                        {ROUTINE.map((r) => (
                          <th key={r.day} className={cn("px-4 py-3 text-left font-medium", r.day === todayName && "bg-milton-red")}>
                            {r.day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ROUTINE[0].slots.map((_, slotIdx) => (
                        <tr key={slotIdx} className="border-b transition-colors hover:bg-muted/20">
                          <td className="sticky left-0 z-10 bg-white px-4 py-3 font-medium text-muted-foreground dark:bg-gray-950">
                            {ROUTINE[0].slots[slotIdx].time}
                          </td>
                          {ROUTINE.map((day) => {
                            const slot = day.slots[slotIdx]
                            const isToday = day.day === todayName
                            return (
                              <td key={day.day} className={cn("px-4 py-3", isToday && "bg-milton-red/5 ring-1 ring-inset ring-milton-red/20")}>
                                {slot ? (
                                  <div>
                                    <p className={cn("font-medium", isToday && "text-milton-red")}>{slot.subject}</p>
                                    <p className="text-xs text-muted-foreground">{slot.teacher}</p>
                                    <Badge variant="outline" className="mt-1 text-[10px]">{slot.room}</Badge>
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground/50">-</span>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ==================== GRADES ==================== */}
            {activeTab === "grades" && (
              <div className="animate-fade-in space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-milton-navy dark:text-white">Grades & Results</h1>
                    <p className="mt-1 text-muted-foreground">Academic performance overview</p>
                  </div>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {SEMESTERS.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-white/80">Semester GPA</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">{semGPA}</div>
                      <p className="mt-1 text-sm text-white/70">{selectedSemester}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-milton-navy to-milton-navy/80 text-white shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-white/80">Cumulative GPA</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">{cumGPA}</div>
                      <p className="mt-1 text-sm text-white/70">All semesters</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Subject-wise Marks - {selectedSemester}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead className="text-center">Internal</TableHead>
                          <TableHead className="text-center">Final</TableHead>
                          <TableHead className="text-center">Total</TableHead>
                          <TableHead className="text-center">Grade</TableHead>
                          <TableHead className="text-center">Grade Point</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentGrades.map((row) => {
                          const gi = getGradeInfo(row.total)
                          return (
                            <TableRow key={row.subject}>
                              <TableCell className="font-medium">{row.subject}</TableCell>
                              <TableCell className="text-center">{row.internal}</TableCell>
                              <TableCell className="text-center">{row.final}</TableCell>
                              <TableCell className="text-center font-semibold">{row.total}</TableCell>
                              <TableCell className="text-center">
                                <span className={cn("font-bold", gi.color)}>{gi.grade}</span>
                              </TableCell>
                              <TableCell className="text-center">{gi.gradePoint.toFixed(1)}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* ==================== FEES ==================== */}
            {activeTab === "fees" && (
              <div className="animate-fade-in space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-milton-navy dark:text-white">Fee Payment Status</h1>
                    <p className="mt-1 text-muted-foreground">Track your tuition and other fee payments</p>
                  </div>
                  <Card className="border-2 border-red-200 bg-red-50 px-6 py-3 dark:border-red-900 dark:bg-red-950/30">
                    <p className="text-xs text-red-600 dark:text-red-400">Total Due</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">{formatCurrency(totalDue)}</p>
                  </Card>
                </div>

                <Card className="shadow-md">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fee Type</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="text-right">Paid</TableHead>
                          <TableHead className="text-right">Due</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {FEES_DATA.map((fee) => {
                          const due = fee.amount - fee.paid
                          const isOverdue = fee.status !== "paid" && new Date(fee.dueDate) < new Date()
                          const status = isOverdue ? "overdue" : fee.status
                          const variant = status === "paid" ? "success" : status === "partial" ? "warning" : status === "overdue" ? "destructive" : "secondary"
                          const label = status === "paid" ? "Paid" : status === "partial" ? "Partial" : status === "overdue" ? "Overdue" : "Unpaid"
                          return (
                            <TableRow key={fee.type}>
                              <TableCell className="font-medium">{fee.type}</TableCell>
                              <TableCell className="text-right">{formatCurrency(fee.amount)}</TableCell>
                              <TableCell className="text-right">{formatCurrency(fee.paid)}</TableCell>
                              <TableCell className={cn("text-right font-semibold", due > 0 && "text-red-500")}>{formatCurrency(due)}</TableCell>
                              <TableCell>{formatDate(fee.dueDate)}</TableCell>
                              <TableCell className="text-center">
                                <Badge variant={variant}>{label}</Badge>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button className="bg-milton-red hover:bg-milton-red/90 shadow-lg shadow-milton-red/25">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay Now
                  </Button>
                </div>
              </div>
            )}

            {/* ==================== ASSIGNMENTS ==================== */}
            {activeTab === "assignments" && (
              <div className="animate-fade-in space-y-6">
                <div>
                  <h1 className="font-display text-2xl font-bold text-milton-navy dark:text-white">Assignments</h1>
                  <p className="mt-1 text-muted-foreground">Track and submit your academic assignments</p>
                </div>

                <div className="grid gap-4">
                  {ASSIGNMENTS.map((a) => {
                    const daysLeft = getDaysRemaining(a.dueDate)
                    const isOverdue = a.status === "overdue" || daysLeft < 0
                    const variant = a.status === "submitted" ? "success" : isOverdue ? "destructive" : "warning"
                    const label = a.status === "submitted" ? "Submitted" : isOverdue ? "Overdue" : "Pending"
                    return (
                      <Card key={a.title} className={cn("shadow-sm transition-shadow hover:shadow-md", isOverdue && "border-l-2 border-l-red-500")}>
                        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{a.title}</h3>
                              <Badge variant={variant}>{label}</Badge>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{a.subject}</p>
                            <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <ClockIcon className="h-3 w-3" />
                                Due: {formatDate(a.dueDate)}
                              </span>
                              {a.status !== "submitted" && (
                                <span className={cn("font-semibold", isOverdue ? "text-red-500" : "text-amber-500")}>
                                  {isOverdue ? `${Math.abs(daysLeft)} days overdue` : `${daysLeft} days remaining`}
                                </span>
                              )}
                            </div>
                          </div>
                          {a.status === "pending" && (
                            <Button variant="milton" size="sm">
                              Submit Now
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ==================== LIBRARY ==================== */}
            {activeTab === "library" && (
              <div className="animate-fade-in space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-milton-navy dark:text-white">Library</h1>
                    <p className="mt-1 text-muted-foreground">Search books and manage your borrowings</p>
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by title or author..."
                    className="w-full pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookMarked className="h-5 w-5" />
                      Borrowed Books
                    </CardTitle>
                    <CardDescription>You have {filteredBooks.length} book(s) currently issued</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title / Author</TableHead>
                          <TableHead>Borrowed</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead className="text-center">Fine</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredBooks.map((b) => {
                          const isOverdue = new Date(b.due) < new Date()
                          return (
                            <TableRow key={b.isbn}>
                              <TableCell>
                                <p className="font-medium">{b.title}</p>
                                <p className="text-xs text-muted-foreground">{b.author}</p>
                              </TableCell>
                              <TableCell>{formatDate(b.borrowed)}</TableCell>
                              <TableCell>{formatDate(b.due)}</TableCell>
                              <TableCell className="text-center">
                                {b.fine > 0 ? (
                                  <span className="font-semibold text-red-500">{formatCurrency(b.fine)}</span>
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )}
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge variant={isOverdue ? "destructive" : "success"}>
                                  {isOverdue ? "Overdue" : "Active"}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                        {filteredBooks.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                              No books found matching your search.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {filteredBooks.reduce((sum, b) => sum + b.fine, 0) > 0 && (
                  <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-semibold text-red-600 dark:text-red-400">Pending Library Fine</p>
                          <p className="text-xs text-red-500/70">Please return overdue books and pay fine</p>
                        </div>
                      </div>
                      <p className="text-xl font-bold text-red-600 dark:text-red-400">
                        {formatCurrency(filteredBooks.reduce((sum, b) => sum + b.fine, 0))}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* ==================== NOTIFICATIONS ==================== */}
            {activeTab === "notifications" && (
              <div className="animate-fade-in space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-milton-navy dark:text-white">Notifications</h1>
                    <p className="mt-1 text-muted-foreground">Stay updated with college announcements</p>
                  </div>
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="text-sm">{unreadCount} unread</Badge>
                  )}
                </div>

                <div className="space-y-3">
                  {NOTIFICATIONS.map((n) => {
                    const variant = n.type === "urgent" ? "destructive" : n.type === "warning" ? "warning" : "info"
                    return (
                      <Card key={n.id} className={cn("transition-shadow hover:shadow-md", n.unread && "border-l-4 border-l-milton-navy")}>
                        <CardContent className="flex items-start gap-4 p-4">
                          <div className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                            n.type === "urgent" ? "bg-red-100 text-red-600 dark:bg-red-900/30" :
                            n.type === "warning" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30" :
                            "bg-blue-100 text-blue-600 dark:bg-blue-900/30"
                          )}>
                            {n.type === "urgent" ? <AlertCircle className="h-5 w-5" /> :
                             n.type === "warning" ? <DollarSign className="h-5 w-5" /> :
                             <Bell className="h-5 w-5" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{n.title}</p>
                              {n.unread && <span className="h-2 w-2 rounded-full bg-milton-red" />}
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{n.message}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{n.time}</p>
                          </div>
                          <Badge variant={variant} className="shrink-0 capitalize">
                            {n.type}
                          </Badge>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ==================== EVENTS & TOURS ==================== */}
            {activeTab === "events" && (
              <div className="animate-fade-in space-y-6">
                <div>
                  <h1 className="font-display text-2xl font-bold text-milton-navy dark:text-white">Events & Tours</h1>
                  <p className="mt-1 text-muted-foreground">Upcoming college events and educational tours</p>
                </div>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {EVENTS.map((e, i) => {
                      const variant = e.type === "academic" ? "info" : e.type === "sports" ? "success" : e.type === "cultural" ? "warning" : "secondary"
                      return (
                        <div key={i} className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/20">
                          <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-milton-navy text-white">
                            <span className="text-lg font-bold">{new Date(e.date).getDate()}</span>
                            <span className="text-[10px] uppercase leading-tight">
                              {new Date(e.date).toLocaleString("default", { month: "short" })}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{e.title}</p>
                              <Badge variant={variant} className="capitalize">{e.type}</Badge>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              <ClockIcon className="mr-1 inline h-3 w-3" />
                              {e.time} &middot; <MapPin className="ml-1 mr-1 inline h-3 w-3" />
                              {e.venue}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Educational Tours
                    </CardTitle>
                    <CardDescription>International exposure opportunities for students</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {TOURS.map((t, i) => (
                      <div key={i} className="rounded-lg border p-4 transition-colors hover:bg-muted/20">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h3 className="font-medium">{t.destination}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{t.dates}</p>
                            <div className="mt-2 flex flex-wrap gap-3 text-xs">
                              <Badge variant="outline">Cost: {formatCurrency(t.cost)}</Badge>
                              <Badge variant="secondary">{t.seatsLeft} seats left</Badge>
                              <Badge variant={t.status === "open" ? "success" : "destructive"} className="capitalize">{t.status}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {t.registered ? (
                              <Badge variant="success" className="gap-1">
                                <CheckCircle2 className="h-3 w-3" /> Registered
                              </Badge>
                            ) : (
                              <Button variant="milton" size="sm">
                                Register Now
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* ==================== DIGITAL ID CARD ==================== */}
            {activeTab === "idcard" && (
              <div className="animate-fade-in space-y-6">
                <div>
                  <h1 className="font-display text-2xl font-bold text-milton-navy dark:text-white">Digital ID Card</h1>
                  <p className="mt-1 text-muted-foreground">Your official Milton International College identification</p>
                </div>

                <div className="flex justify-center">
                  <div className="w-full max-w-md overflow-hidden rounded-2xl border-2 border-milton-navy/20 bg-white shadow-2xl dark:bg-gray-900">
                    {/* Top stripe */}
                    <div className="bg-gradient-to-r from-milton-navy to-milton-navy/90 px-6 py-5 text-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                            <span className="text-lg font-bold">M</span>
                          </div>
                          <div>
                            <h2 className="font-display text-lg font-bold leading-tight">Milton International</h2>
                            <p className="text-xs text-white/70">College</p>
                          </div>
                        </div>
                        <Badge className="border-white/30 bg-white/10 text-white">Student</Badge>
                      </div>
                    </div>

                    {/* Photo & name */}
                    <div className="flex flex-col items-center px-6 pt-6">
                      <Avatar className="h-24 w-24 border-4 border-milton-navy/10 shadow-lg">
                        <AvatarImage src={STUDENT.photo} alt={STUDENT.name} />
                        <AvatarFallback className="bg-milton-navy text-2xl text-white">{getInitials(STUDENT.name)}</AvatarFallback>
                      </Avatar>
                      <h3 className="mt-3 font-display text-xl font-bold text-milton-navy dark:text-white">{STUDENT.name}</h3>
                      <p className="text-sm text-muted-foreground">{STUDENT.enrollment}</p>
                    </div>

                    <div className="space-y-3 px-6 py-5">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-sm text-muted-foreground">Program</span>
                        <span className="text-sm font-medium">BCA (Bachelor of Computer Application)</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-sm text-muted-foreground">Batch</span>
                        <span className="text-sm font-medium">{STUDENT.batch}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-sm text-muted-foreground">Semester</span>
                        <span className="text-sm font-medium">{STUDENT.semester}</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span className="text-sm text-muted-foreground">Email</span>
                        <span className="text-sm font-medium">{STUDENT.email}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-3 px-6 py-4">
                      <Button variant="navy" className="flex-1">
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                        <ExternalLink className="mr-2 h-4 w-4" /> Print
                      </Button>
                    </div>

                    <div className="bg-muted/30 px-6 py-3 text-center">
                      <p className="text-[10px] text-muted-foreground">
                        New Baneshwor, Kathmandu, Nepal &middot; TU Affiliated &middot; Est. 2010
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Bottom Navigation - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/90 backdrop-blur-lg dark:bg-gray-950/90 md:hidden">
        <div className="flex overflow-x-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex min-w-[60px] flex-1 flex-col items-center gap-0.5 px-2 py-2 text-[10px] font-medium transition-colors",
                activeTab === item.id
                  ? "text-milton-navy dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", activeTab === item.id && "text-milton-navy dark:text-white")} />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
