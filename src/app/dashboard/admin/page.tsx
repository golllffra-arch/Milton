"use client"

import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  FileText,
  Calendar,
  ClipboardList,
  BarChart3,
  Activity,
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
  Bell,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Globe,
  Image,
  ToggleLeft,
  ToggleRight,
  Link,
  ExternalLink,
  FileSpreadsheet,
  FileText as FileTextIcon,
  AlertTriangle,
  Banknote,
  TrendingUp,
  PieChart,
  LineChart,
  BarChart,
  Home,
  Star,
  Send,
  Printer,
  Copy,
  MoreHorizontal,
  FolderOpen,
  ShieldCheck,
  UserCheck,
  UserX,
  ThumbsUp,
  ThumbsDown,
  BookMarked,
  Briefcase,
  Award,
  CalendarCheck,
  CreditCard,
  UploadCloud,
  type LucideIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import {
  LineChart as RechartsLine,
  Line,
  BarChart as RechartsBar,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const ADMIN = {
  name: "Dr. Rajesh Khadka",
  email: "rajesh.khadka@milton.edu.com",
  role: "Administrator",
  photo: "/images/admin-placeholder.jpg",
}

const ENROLLMENT_TRENDS = [
  { month: "Feb", students: 420, faculty: 42 },
  { month: "Mar", students: 445, faculty: 44 },
  { month: "Apr", students: 468, faculty: 46 },
  { month: "May", students: 485, faculty: 48 },
  { month: "Jun", students: 502, faculty: 51 },
  { month: "Jul", students: 525, faculty: 53 },
]

const PROGRAM_DISTRIBUTION = [
  { name: "BCA", value: 280, color: "#1c3557" },
  { name: "BBM", value: 95, color: "#e31c23" },
  { name: "BBS", value: 85, color: "#3b82f6" },
  { name: "BASW", value: 65, color: "#10b981" },
]

const RECENT_ACTIVITIES = [
  { user: "Dr. Rajesh Khadka", action: "Approved admission", entity: "Aarav Sharma (BCA)", date: "2 hours ago" },
  { user: "Ms. Sunita P.", action: "Uploaded syllabus", entity: "Computer Networks (4th Sem)", date: "4 hours ago" },
  { user: "Mr. Rajesh K.", action: "Marked attendance", entity: "Data Structures Lab", date: "6 hours ago" },
  { user: "Admin Staff", action: "Generated invoice", entity: "Fee Invoice #F-2024-089", date: "1 day ago" },
  { user: "Dr. Amit S.", action: "Published notice", entity: "Exam Schedule Notice", date: "1 day ago" },
  { user: "Ms. Reema G.", action: "Submitted grades", entity: "Web Technologies (4th Sem)", date: "2 days ago" },
  { user: "Admin Staff", action: "Updated event", entity: "Sports Day 2026", date: "2 days ago" },
  { user: "Mr. Prakash M.", action: "Requested leave", entity: "Medical Leave (Mar 5-7)", date: "3 days ago" },
]

const STUDENTS_DATA = [
  { sn: 1, name: "Aarav Sharma", enrollment: "BCA-2022-047", program: "BCA", semester: "4th", status: "active" as const },
  { sn: 2, name: "Sita Rijal", enrollment: "BCA-2022-052", program: "BCA", semester: "4th", status: "active" as const },
  { sn: 3, name: "Binod Thapa", enrollment: "BBM-2023-012", program: "BBM", semester: "2nd", status: "active" as const },
  { sn: 4, name: "Anita Gurung", enrollment: "BBS-2022-033", program: "BBS", semester: "4th", status: "active" as const },
  { sn: 5, name: "Prakash Adhikari", enrollment: "BASW-2023-008", program: "BASW", semester: "2nd", status: "active" as const },
  { sn: 6, name: "Krishna Maharjan", enrollment: "BCA-2021-015", program: "BCA", semester: "6th", status: "active" as const },
  { sn: 7, name: "Nisha KC", enrollment: "BBM-2023-025", program: "BBM", semester: "2nd", status: "inactive" as const },
  { sn: 8, name: "Deepak Sharma", enrollment: "BCA-2022-091", program: "BCA", semester: "4th", status: "active" as const },
  { sn: 9, name: "Ranjana Devi", enrollment: "BBS-2023-041", program: "BBS", semester: "2nd", status: "active" as const },
  { sn: 10, name: "Sagar Poudel", enrollment: "BCA-2021-003", program: "BCA", semester: "6th", status: "graduate" as const },
  { sn: 11, name: "Maya Tamang", enrollment: "BASW-2022-015", program: "BASW", semester: "4th", status: "active" as const },
  { sn: 12, name: "Rabi Lamichhane", enrollment: "BCA-2023-067", program: "BCA", semester: "2nd", status: "active" as const },
]

const FACULTY_DATA = [
  { name: "Dr. Amit Shrestha", email: "amit.shrestha@milton.edu.com", specialization: "Database Systems", subjects: "DBMS, Data Structures", joined: "2019-03-15", role: "Senior Faculty" as const },
  { name: "Ms. Sunita Poudel", email: "sunita.poudel@milton.edu.com", specialization: "Computer Networks", subjects: "Computer Networks, Cybersecurity", joined: "2020-06-01", role: "Faculty" as const },
  { name: "Mr. Rajesh Khatiwada", email: "rajesh.khatiwada@milton.edu.com", specialization: "Algorithms", subjects: "DSA, C Programming", joined: "2018-09-12", role: "Senior Faculty" as const },
  { name: "Dr. Anita Rijal", email: "anita.rijal@milton.edu.com", specialization: "Software Engineering", subjects: "Software Eng., Project Mgmt", joined: "2021-01-20", role: "Faculty" as const },
  { name: "Mr. Prakash Mishra", email: "prakash.mishra@milton.edu.com", specialization: "Operating Systems", subjects: "OS, Computer Architecture", joined: "2020-11-05", role: "Faculty" as const },
  { name: "Ms. Reema Ghimire", email: "reema.ghimire@milton.edu.com", specialization: "Web Technologies", subjects: "Web Tech, JavaScript", joined: "2022-04-18", role: "Junior Faculty" as const },
  { name: "Mr. Deepak Tiwari", email: "deepak.tiwari@milton.edu.com", specialization: "Mathematics", subjects: "Math I, Math II, Statistics", joined: "2017-07-10", role: "Senior Faculty" as const },
]

const COURSES_BY_PROGRAM = [
  {
    program: "BCA",
    semesters: [
      { semester: "1st Sem", subjects: ["English I", "Mathematics I", "Digital Logic", "C Programming", "Physics"] },
      { semester: "2nd Sem", subjects: ["English II", "Mathematics II", "Discrete Structures", "OOP in C++", "Microprocessor"] },
      { semester: "3rd Sem", subjects: ["Data Structures", "Computer Architecture", "Statistics", "Java Programming", "Sociology"] },
      { semester: "4th Sem", subjects: ["Data Structures & Algorithms", "Computer Networks", "DBMS", "Operating Systems", "Software Engineering", "Web Technologies"] },
    ],
  },
  {
    program: "BBM",
    semesters: [
      { semester: "1st Sem", subjects: ["English I", "Business Math", "Principles of Management", "Financial Accounting", "Microeconomics"] },
      { semester: "2nd Sem", subjects: ["English II", "Business Statistics", "Marketing Management", "Cost Accounting", "Macroeconomics"] },
      { semester: "3rd Sem", subjects: ["Organizational Behavior", "Business Law", "Human Resource Mgmt", "Taxation", "Business Research"] },
    ],
  },
  {
    program: "BBS",
    semesters: [
      { semester: "1st Sem", subjects: ["English I", "Business Math", "Microeconomics", "Financial Accounting", "Business Psychology"] },
      { semester: "2nd Sem", subjects: ["English II", "Business Statistics", "Macroeconomics", "Cost Accounting", "Business Communication"] },
      { semester: "3rd Sem", subjects: ["Business Law", "Entrepreneurship", "Financial Mgmt", "Marketing", "Taxation in Nepal"] },
    ],
  },
  {
    program: "BASW",
    semesters: [
      { semester: "1st Sem", subjects: ["English I", "Sociology", "Psychology", "Social Work Practice I", "Nepali Society"] },
      { semester: "2nd Sem", subjects: ["English II", "Social Anthropology", "Social Work Practice II", "Research Methods", "Gender Studies"] },
      { semester: "3rd Sem", subjects: ["Community Development", "Counseling Skills", "Social Policy", "Field Work I", "Human Rights"] },
    ],
  },
]

const FEE_RECORDS = [
  { id: "F-2024-001", student: "Aarav Sharma", program: "BCA", amount: 45000, paid: 45000, status: "paid" as const, dueDate: "2026-01-15" },
  { id: "F-2024-002", student: "Sita Rijal", program: "BCA", amount: 45000, paid: 40000, status: "partial" as const, dueDate: "2026-01-15" },
  { id: "F-2024-003", student: "Binod Thapa", program: "BBM", amount: 42000, paid: 42000, status: "paid" as const, dueDate: "2026-01-15" },
  { id: "F-2024-004", student: "Anita Gurung", program: "BBS", amount: 38000, paid: 20000, status: "partial" as const, dueDate: "2026-01-15" },
  { id: "F-2024-005", student: "Prakash Adhikari", program: "BASW", amount: 35000, paid: 0, status: "unpaid" as const, dueDate: "2026-01-15" },
  { id: "F-2024-006", student: "Krishna Maharjan", program: "BCA", amount: 45000, paid: 45000, status: "paid" as const, dueDate: "2026-01-15" },
  { id: "F-2024-007", student: "Nisha KC", program: "BBM", amount: 42000, paid: 0, status: "overdue" as const, dueDate: "2025-12-15" },
  { id: "F-2024-008", student: "Deepak Sharma", program: "BCA", amount: 45000, paid: 25000, status: "partial" as const, dueDate: "2026-01-15" },
  { id: "F-2024-009", student: "Maya Tamang", program: "BASW", amount: 35000, paid: 35000, status: "paid" as const, dueDate: "2026-01-15" },
  { id: "F-2024-010", student: "Rabi Lamichhane", program: "BCA", amount: 45000, paid: 0, status: "unpaid" as const, dueDate: "2026-02-15" },
]

const NEWS_DATA = [
  { id: 1, title: "Exam Schedule for 4th Semester Published", content: "The final examination schedule for all 4th semester programs has been published. Students can collect their admit cards from the admin office.", type: "notice" as const, date: "2026-07-15", published: true },
  { id: 2, title: "BCA Project Exhibition 2026", content: "The annual BCA project exhibition will be held on August 10. All BCA students must submit their project abstracts by July 30.", type: "event" as const, date: "2026-07-12", published: true },
  { id: 3, title: "Holiday Notice: Janai Purnima", content: "College will remain closed on July 23 on the occasion of Janai Purnima.", type: "notice" as const, date: "2026-07-10", published: true },
  { id: 4, title: "Scholarship Application Open", content: "Merit-based scholarships for deserving students are now open. Apply by August 15 with your academic transcripts.", type: "news" as const, date: "2026-07-08", published: false },
  { id: 5, title: "Industrial Visit to Banepa IT Park", content: "A one-day industrial visit is being organized for BCA and BBM students on August 20.", type: "event" as const, date: "2026-07-05", published: true },
]

const EVENTS_DATA = [
  { id: 1, title: "BCA Project Exhibition", date: "2026-08-10", venue: "College Auditorium", type: "academic" as const, registrations: 45, capacity: 60 },
  { id: 2, title: "Annual Sports Day", date: "2026-08-15", venue: "College Ground", type: "sports" as const, registrations: 120, capacity: 200 },
  { id: 3, title: "Industry Visit: Tech Park", date: "2026-08-20", venue: "Banepa IT Park", type: "academic" as const, registrations: 38, capacity: 45 },
  { id: 4, title: "Farewell 2026", date: "2026-08-28", venue: "College Lawn", type: "cultural" as const, registrations: 85, capacity: 150 },
  { id: 5, title: "Parent-Teacher Meeting", date: "2026-09-05", venue: "Multi-Purpose Hall", type: "meeting" as const, registrations: 0, capacity: 0 },
]

const EVENT_REGISTRATIONS = [
  { name: "Aarav Sharma", program: "BCA", email: "aarav@milton.edu.com", paymentStatus: "paid" as const, registeredAt: "2026-07-10" },
  { name: "Sita Rijal", program: "BCA", email: "sita@milton.edu.com", paymentStatus: "paid" as const, registeredAt: "2026-07-11" },
  { name: "Binod Thapa", program: "BBM", email: "binod@milton.edu.com", paymentStatus: "pending" as const, registeredAt: "2026-07-12" },
  { name: "Anita Gurung", program: "BBS", email: "anita@milton.edu.com", paymentStatus: "paid" as const, registeredAt: "2026-07-09" },
  { name: "Krishna Maharjan", program: "BCA", email: "krishna@milton.edu.com", paymentStatus: "unpaid" as const, registeredAt: "2026-07-13" },
]

const APPLICANTS_DATA = [
  { id: 1, name: "Roshan Karki", program: "BCA", appliedDate: "2026-07-01", status: "pending" as const, email: "roshan.k@email.com", phone: "9841XXXXXX", school: "Trinity College" },
  { id: 2, name: "Pooja Limbu", program: "BBM", appliedDate: "2026-07-03", status: "pending" as const, email: "pooja.l@email.com", phone: "9842XXXXXX", school: "Global Academy" },
  { id: 3, name: "Suman Rai", program: "BCA", appliedDate: "2026-06-28", status: "accepted" as const, email: "suman.r@email.com", phone: "9843XXXXXX", school: "NIST College" },
  { id: 4, name: "Kabita Shah", program: "BASW", appliedDate: "2026-06-25", status: "accepted" as const, email: "kabita.s@email.com", phone: "9844XXXXXX", school: "Himalayan HSS" },
  { id: 5, name: "Milan Gurung", program: "BBS", appliedDate: "2026-07-05", status: "pending" as const, email: "milan.g@email.com", phone: "9845XXXXXX", school: "Nepal Public College" },
  { id: 6, name: "Anjali Sharma", program: "BCA", appliedDate: "2026-06-20", status: "rejected" as const, email: "anjali.s@email.com", phone: "9846XXXXXX", school: "Whitefield College" },
  { id: 7, name: "Bibek Thapa", program: "BBM", appliedDate: "2026-07-08", status: "pending" as const, email: "bibek.t@email.com", phone: "9847XXXXXX", school: "Premier College" },
  { id: 8, name: "Smriti Neupane", program: "BCA", appliedDate: "2026-06-30", status: "accepted" as const, email: "smriti.n@email.com", phone: "9848XXXXXX", school: "Kathmandu Model" },
]

const GALLERY_ITEMS = [
  { id: 1, title: "BCA Project Exhibition 2025", url: "/gallery/project-exhibition.jpg", date: "2025-12-15" },
  { id: 2, title: "Sports Day 2025", url: "/gallery/sports-day.jpg", date: "2025-11-20" },
  { id: 3, title: "Cultural Program 2025", url: "/gallery/cultural.jpg", date: "2025-10-05" },
]

const BANNERS = [
  { id: 1, title: "Admissions Open 2026", subtitle: "Apply now for BCA, BBM, BBS & BASW programs", active: true, image: "/banners/admission.jpg" },
  { id: 2, title: "Scholarship Available", subtitle: "Merit-based scholarships for top performers", active: true, image: "/banners/scholarship.jpg" },
  { id: 3, title: "Singapore Tour 2026", subtitle: "Educational tour - Limited seats available", active: false, image: "/banners/tour.jpg" },
]

type StatusType = "active" | "inactive" | "graduate" | "paid" | "partial" | "unpaid" | "overdue" | "pending" | "accepted" | "rejected" | "notice" | "event" | "news" | "academic" | "sports" | "cultural" | "meeting"
type FacultyRole = "Senior Faculty" | "Faculty" | "Junior Faculty"

const statusBadge = (status: StatusType) => {
  const map: Record<string, "success" | "warning" | "destructive" | "secondary" | "info" | "default"> = {
    active: "success", inactive: "secondary", graduate: "info",
    paid: "success", partial: "warning", unpaid: "secondary", overdue: "destructive",
    pending: "warning", accepted: "success", rejected: "destructive",
    notice: "info", event: "warning", news: "default",
    academic: "info", sports: "success", cultural: "warning", meeting: "secondary",
  }
  return map[status] || "default"
}

const NAV_ITEMS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "faculty", label: "Faculty & Staff", icon: GraduationCap },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "fees", label: "Fee Management", icon: DollarSign },
  { id: "cms", label: "Content (CMS)", icon: FileText },
  { id: "events", label: "Events & Tours", icon: Calendar },
  { id: "applicants", label: "Applicants", icon: ClipboardList },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "logs", label: "Activity Logs", icon: Activity },
]

function StatCard({ title, value, subtitle, icon: Icon, color, trend }: { title: string; value: string; subtitle?: string; icon: LucideIcon; color: string; trend?: { value: string; positive: boolean } }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="shadow-md border-0 overflow-hidden">
        <div className={`h-1.5 w-full bg-gradient-to-r ${color}`} />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className={`rounded-lg p-2 bg-gradient-to-br ${color} text-white shadow-sm`}>
            <Icon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tracking-tight">{value}</div>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className={cn("h-3 w-3", trend.positive ? "text-green-500" : "text-red-500")} />
              <span className={cn("text-xs font-medium", trend.positive ? "text-green-500" : "text-red-500")}>{trend.value}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function formatCurrencyShort(amount: number): string {
  if (amount >= 1000000) return `NPR ${(amount / 1000000).toFixed(1)}M`
  if (amount >= 1000) return `NPR ${(amount / 1000).toFixed(1)}K`
  return `NPR ${amount}`
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [studentSearch, setStudentSearch] = useState("")
  const [studentProgram, setStudentProgram] = useState("all")
  const [studentSemester, setStudentSemester] = useState("all")
  const [studentStatus, setStudentStatus] = useState("all")
  const [feeFilter, setFeeFilter] = useState("all")
  const [addStudentOpen, setAddStudentOpen] = useState(false)
  const [addFacultyOpen, setAddFacultyOpen] = useState(false)
  const [createEventOpen, setCreateEventOpen] = useState(false)
  const [addNewsOpen, setAddNewsOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState("BCA")
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const totalCollected = FEE_RECORDS.reduce((s, f) => s + f.paid, 0)
  const totalPending = FEE_RECORDS.reduce((s, f) => s + (f.status === "unpaid" || f.status === "partial" ? f.amount - f.paid : 0), 0)
  const totalOverdue = FEE_RECORDS.filter(f => f.status === "overdue").reduce((s, f) => s + (f.amount - f.paid), 0)
  const totalApplications = APPLICANTS_DATA.length
  const pendingApps = APPLICANTS_DATA.filter(a => a.status === "pending").length
  const acceptedApps = APPLICANTS_DATA.filter(a => a.status === "accepted").length

  const filteredStudents = STUDENTS_DATA.filter(s => {
    const matchName = s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.enrollment.toLowerCase().includes(studentSearch.toLowerCase())
    const matchProgram = studentProgram === "all" || s.program === studentProgram
    const matchSemester = studentSemester === "all" || s.semester === studentSemester
    const matchStatus = studentStatus === "all" || s.status === studentStatus
    return matchName && matchProgram && matchSemester && matchStatus
  })

  const filteredFees = FEE_RECORDS.filter(f => feeFilter === "all" || f.status === feeFilter)

  const currentProgramCourses = COURSES_BY_PROGRAM.find(p => p.program === selectedProgram)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white/80 px-4 backdrop-blur-xl dark:bg-gray-950/80 md:px-6">
        <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <div className="hidden md:flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1c3557] text-white text-sm font-bold">M</div>
          <span className="text-sm font-semibold text-[#1c3557] dark:text-white">Admin Panel</span>
        </div>

        <div className="relative hidden flex-1 sm:block max-w-md ml-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search students, faculty, records..." className="w-full border-0 bg-muted/50 pl-9 focus-visible:ring-1" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          {mounted && (
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#e31c23] text-[10px] font-bold text-white">5</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8 border-2 border-[#1c3557]/20">
                  <AvatarImage src={ADMIN.photo} alt={ADMIN.name} />
                  <AvatarFallback className="bg-[#1c3557] text-xs text-white">{getInitials(ADMIN.name)}</AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium md:inline">{ADMIN.name}</span>
                <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{ADMIN.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">{ADMIN.role}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><User className="mr-2 h-4 w-4" />Profile</DropdownMenuItem>
              <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Settings</DropdownMenuItem>
              <DropdownMenuItem><ShieldCheck className="mr-2 h-4 w-4" />Permissions</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500"><LogOut className="mr-2 h-4 w-4" />Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] flex-col border-r bg-white transition-all duration-300 dark:bg-gray-950 md:flex",
            sidebarOpen ? "w-60" : "w-16"
          )}
        >
          <nav className="flex-1 space-y-1 overflow-y-auto p-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  activeTab === item.id
                    ? "bg-[#1c3557] text-white shadow-md"
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
              <Avatar className="h-8 w-8 border-2 border-[#1c3557]/20">
                <AvatarFallback className="bg-[#1c3557] text-[10px] text-white">{getInitials(ADMIN.name)}</AvatarFallback>
              </Avatar>
              {sidebarOpen && (
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{ADMIN.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{ADMIN.role}</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={cn("flex-1 transition-all duration-300", sidebarOpen ? "md:ml-60" : "md:ml-16")}>
          <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              {/* ==================== OVERVIEW ==================== */}
              {activeTab === "overview" && (
                <motion.div key="overview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold tracking-tight text-[#1c3557] dark:text-white md:text-3xl">Welcome back, Dr. Khadka</h1>
                      <p className="text-muted-foreground">Here&apos;s what&apos;s happening at Milton International College today.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm"><RefreshCw className="mr-1 h-4 w-4" />Refresh</Button>
                      <Button size="sm" className="bg-[#1c3557] text-white hover:bg-[#152944]">
                        <Download className="mr-1 h-4 w-4" />Export Report
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard title="Total Students" value="525+" subtitle="Across all programs" icon={Users} color="from-blue-600 to-blue-400" trend={{ value: "12% from last month", positive: true }} />
                    <StatCard title="Faculty & Staff" value="53" subtitle="Full-time educators" icon={GraduationCap} color="from-[#1c3557] to-[#2a4a7a]" trend={{ value: "3 new this semester", positive: true }} />
                    <StatCard title="Revenue Collected" value={formatCurrencyShort(totalCollected)} subtitle="This academic year" icon={DollarSign} color="from-green-600 to-green-400" trend={{ value: "85% collection rate", positive: true }} />
                    <StatCard title="Avg. Attendance" value="87.3%" subtitle="College-wide average" icon={CalendarCheck} color="from-[#e31c23] to-red-400" trend={{ value: "2.1% improvement", positive: true }} />
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    <Card className="lg:col-span-2 shadow-md">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Enrollment Trends</CardTitle>
                          <CardDescription>Student & faculty growth over the last 6 months</CardDescription>
                        </div>
                        <Badge variant="outline" className="gap-1"><TrendingUp className="h-3 w-3 text-green-500" /> Growing</Badge>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <RechartsLine data={ENROLLMENT_TRENDS}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))" }} />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="students" stroke="#1c3557" strokeWidth={3} dot={{ fill: "#1c3557" }} name="Students" />
                            <Line yAxisId="right" type="monotone" dataKey="faculty" stroke="#e31c23" strokeWidth={3} dot={{ fill: "#e31c23" }} name="Faculty" />
                          </RechartsLine>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>Program Distribution</CardTitle>
                        <CardDescription>Students by program</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                          <RechartsPie>
                            <Pie data={PROGRAM_DISTRIBUTION} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                              {PROGRAM_DISTRIBUTION.map((entry, i) => (
                                <Cell key={i} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </RechartsPie>
                        </ResponsiveContainer>
                        <Separator className="my-4" />
                        <div className="space-y-2">
                          {PROGRAM_DISTRIBUTION.map((p) => (
                            <div key={p.name} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
                                <span className="font-medium">{p.name}</span>
                              </div>
                              <span className="text-muted-foreground">{p.value} students</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 rounded-lg bg-muted/50 p-3 text-center">
                          <BarChart className="mx-auto h-5 w-5 text-[#1c3557]" />
                          <p className="mt-1 text-xs text-muted-foreground">BCA is the largest program with 53% of students</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5" /> Recent Activity</CardTitle>
                      <CardDescription>Latest actions across the college</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Entity</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {RECENT_ACTIVITIES.map((a, i) => (
                            <TableRow key={i}>
                              <TableCell className="font-medium">{a.user}</TableCell>
                              <TableCell><Badge variant="secondary">{a.action}</Badge></TableCell>
                              <TableCell className="text-muted-foreground">{a.entity}</TableCell>
                              <TableCell className="text-right text-xs text-muted-foreground">{a.date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* ==================== STUDENT MANAGEMENT ==================== */}
              {activeTab === "students" && (
                <motion.div key="students" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-[#1c3557] dark:text-white">Student Management</h1>
                      <p className="text-muted-foreground">Manage all enrolled students</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dialog open={addStudentOpen} onOpenChange={setAddStudentOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-[#1c3557] text-white hover:bg-[#152944]"><Plus className="mr-1 h-4 w-4" />Add Student</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Add New Student</DialogTitle>
                            <DialogDescription>Fill in the student details to enroll a new student.</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Full Name</label>
                                <Input placeholder="Student name" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Enrollment No.</label>
                                <Input placeholder="e.g. BCA-2024-001" />
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Program</label>
                                <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>
                                  <SelectItem value="BCA">BCA</SelectItem><SelectItem value="BBM">BBM</SelectItem><SelectItem value="BBS">BBS</SelectItem><SelectItem value="BASW">BASW</SelectItem>
                                </SelectContent></Select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Semester</label>
                                <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>
                                  <SelectItem value="1st">1st</SelectItem><SelectItem value="2nd">2nd</SelectItem><SelectItem value="3rd">3rd</SelectItem><SelectItem value="4th">4th</SelectItem><SelectItem value="5th">5th</SelectItem><SelectItem value="6th">6th</SelectItem>
                                </SelectContent></Select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Batch</label>
                                <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>
                                  <SelectItem value="2022-2026">2022-2026</SelectItem><SelectItem value="2023-2027">2023-2027</SelectItem><SelectItem value="2024-2028">2024-2028</SelectItem>
                                </SelectContent></Select>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input type="email" placeholder="student@milton.edu.com" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Phone</label>
                                <Input placeholder="+977 98XXXXXXXX" />
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setAddStudentOpen(false)}>Cancel</Button>
                            <Button className="bg-[#1c3557] text-white hover:bg-[#152944]">Enroll Student</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="icon"><UploadCloud className="h-4 w-4" /></Button>
                    </div>
                  </div>

                  <Card className="shadow-md">
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input placeholder="Search by name or enrollment..." className="pl-9" value={studentSearch} onChange={e => setStudentSearch(e.target.value)} />
                        </div>
                        <Select value={studentProgram} onValueChange={setStudentProgram}>
                          <SelectTrigger className="w-32"><SelectValue placeholder="Program" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Programs</SelectItem>
                            <SelectItem value="BCA">BCA</SelectItem><SelectItem value="BBM">BBM</SelectItem>
                            <SelectItem value="BBS">BBS</SelectItem><SelectItem value="BASW">BASW</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={studentSemester} onValueChange={setStudentSemester}>
                          <SelectTrigger className="w-32"><SelectValue placeholder="Semester" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Semesters</SelectItem>
                            <SelectItem value="2nd">2nd</SelectItem><SelectItem value="4th">4th</SelectItem><SelectItem value="6th">6th</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={studentStatus} onValueChange={setStudentStatus}>
                          <SelectTrigger className="w-32"><SelectValue placeholder="Status" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem><SelectItem value="graduate">Graduate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-md">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-14">S.N</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Enrollment No.</TableHead>
                            <TableHead>Program</TableHead>
                            <TableHead>Semester</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredStudents.map((s) => (
                            <TableRow key={s.sn} className="hover:bg-muted/30">
                              <TableCell className="text-muted-foreground">{s.sn}</TableCell>
                              <TableCell className="font-medium">{s.name}</TableCell>
                              <TableCell className="text-muted-foreground">{s.enrollment}</TableCell>
                              <TableCell><Badge variant="outline">{s.program}</Badge></TableCell>
                              <TableCell>{s.semester}</TableCell>
                              <TableCell><Badge variant={statusBadge(s.status)} className="capitalize">{s.status}</Badge></TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500"><Trash2 className="h-4 w-4" /></Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                          {filteredStudents.length === 0 && (
                            <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">No students found.</TableCell></TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Showing {filteredStudents.length} of {STUDENTS_DATA.length} students</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>Previous</Button>
                      <Button variant="outline" size="sm" className="bg-[#1c3557] text-white">1</Button>
                      <Button variant="outline" size="sm">2</Button>
                      <Button variant="outline" size="sm">3</Button>
                      <Button variant="outline" size="sm">Next</Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ==================== FACULTY & STAFF ==================== */}
              {activeTab === "faculty" && (
                <motion.div key="faculty" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-[#1c3557] dark:text-white">Faculty & Staff Management</h1>
                      <p className="text-muted-foreground">Manage educators and staff members</p>
                    </div>
                    <Dialog open={addFacultyOpen} onOpenChange={setAddFacultyOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-[#1c3557] text-white hover:bg-[#152944]"><Plus className="mr-1 h-4 w-4" />Add Faculty</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Add New Faculty</DialogTitle>
                          <DialogDescription>Enter the details of the new faculty member.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Full Name</label>
                              <Input placeholder="Faculty name" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Email</label>
                              <Input type="email" placeholder="faculty@milton.edu.com" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Specialization</label>
                            <Input placeholder="e.g. Computer Networks" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Subjects Taught</label>
                            <Input placeholder="e.g. Data Structures, Algorithms" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Role</label>
                              <Select><SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger><SelectContent>
                                <SelectItem value="Senior Faculty">Senior Faculty</SelectItem>
                                <SelectItem value="Faculty">Faculty</SelectItem>
                                <SelectItem value="Junior Faculty">Junior Faculty</SelectItem>
                              </SelectContent></Select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Joined Date</label>
                              <Input type="date" />
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setAddFacultyOpen(false)}>Cancel</Button>
                          <Button className="bg-[#1c3557] text-white hover:bg-[#152944]">Add Faculty</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Card className="shadow-md">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Specialization</TableHead>
                            <TableHead>Subjects</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {FACULTY_DATA.map((f) => (
                            <TableRow key={f.email}>
                              <TableCell className="font-medium">{f.name}</TableCell>
                              <TableCell className="text-muted-foreground">{f.email}</TableCell>
                              <TableCell>{f.specialization}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{f.subjects}</TableCell>
                              <TableCell className="text-muted-foreground">{formatDate(f.joined)}</TableCell>
                              <TableCell>
                                <Select defaultValue={f.role}>
                                  <SelectTrigger className="h-7 w-36 border-0 bg-muted/50 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Senior Faculty">Senior Faculty</SelectItem>
                                    <SelectItem value="Faculty">Faculty</SelectItem>
                                    <SelectItem value="Junior Faculty">Junior Faculty</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8"><Mail className="h-4 w-4" /></Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* ==================== COURSE MANAGEMENT ==================== */}
              {activeTab === "courses" && (
                <motion.div key="courses" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-[#1c3557] dark:text-white">Course Management</h1>
                      <p className="text-muted-foreground">Manage programs, semesters and subjects</p>
                    </div>
                    <div className="flex gap-2">
                      {["BCA", "BBM", "BBS", "BASW"].map((p) => (
                        <Button key={p} variant={selectedProgram === p ? "default" : "outline"} size="sm" onClick={() => setSelectedProgram(p)}
                          className={selectedProgram === p ? "bg-[#1c3557] text-white" : ""}>{p}</Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {currentProgramCourses?.semesters.map((sem) => (
                      <Card key={sem.semester} className="shadow-md border-l-4 border-l-[#1c3557]">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{sem.semester}</CardTitle>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><Plus className="h-4 w-4" /></Button>
                          </div>
                          <CardDescription>{sem.subjects.length} subjects</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {sem.subjects.map((sub) => (
                              <li key={sub} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm hover:bg-muted/30">
                                <span className="flex items-center gap-2"><BookOpen className="h-3.5 w-3.5 text-muted-foreground" />{sub}</span>
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="icon" className="h-6 w-6"><Edit className="h-3 w-3" /></Button>
                                  <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500"><Trash2 className="h-3 w-3" /></Button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle>Syllabus Management</CardTitle>
                      <CardDescription>Upload or update course syllabi</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-10">
                        <div className="text-center">
                          <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
                          <p className="mt-2 font-medium">Drag & drop syllabus files here</p>
                          <p className="text-sm text-muted-foreground">PDF format, max 10MB</p>
                          <Button variant="outline" className="mt-4"><Upload className="mr-2 h-4 w-4" />Browse Files</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* ==================== FEE MANAGEMENT ==================== */}
              {activeTab === "fees" && (
                <motion.div key="fees" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-[#1c3557] dark:text-white">Fee Management</h1>
                      <p className="text-muted-foreground">Track fee collections, pending dues & invoices</p>
                    </div>
                    <Button className="bg-[#1c3557] text-white hover:bg-[#152944]"><Plus className="mr-1 h-4 w-4" />Generate Invoice</Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
                      <CardHeader className="pb-2"><CardTitle className="text-sm text-white/80">Total Collected</CardTitle></CardHeader>
                      <CardContent><p className="text-3xl font-bold">{formatCurrencyShort(totalCollected)}</p><p className="text-sm text-white/70">This academic year</p></CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg">
                      <CardHeader className="pb-2"><CardTitle className="text-sm text-white/80">Pending</CardTitle></CardHeader>
                      <CardContent><p className="text-3xl font-bold">{formatCurrencyShort(totalPending)}</p><p className="text-sm text-white/70">Due from students</p></CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg">
                      <CardHeader className="pb-2"><CardTitle className="text-sm text-white/80">Overdue</CardTitle></CardHeader>
                      <CardContent><p className="text-3xl font-bold">{formatCurrencyShort(totalOverdue)}</p><p className="text-sm text-white/70">Past due date</p></CardContent>
                    </Card>
                  </div>

                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    {["all", "paid", "partial", "unpaid", "overdue"].map((s) => (
                      <Button key={s} variant={feeFilter === s ? "default" : "outline"} size="sm" onClick={() => setFeeFilter(s)}
                        className={feeFilter === s ? "bg-[#1c3557] text-white" : "capitalize"}>{s}</Button>
                    ))}
                  </div>

                  <Card className="shadow-md">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow><TableHead>Invoice ID</TableHead><TableHead>Student</TableHead><TableHead>Program</TableHead><TableHead className="text-right">Amount</TableHead><TableHead className="text-right">Paid</TableHead><TableHead className="text-right">Due</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredFees.map((f) => {
                            const due = f.amount - f.paid
                            return (
                              <TableRow key={f.id}>
                                <TableCell className="font-mono text-xs">{f.id}</TableCell>
                                <TableCell className="font-medium">{f.student}</TableCell>
                                <TableCell><Badge variant="outline">{f.program}</Badge></TableCell>
                                <TableCell className="text-right">{formatCurrencyShort(f.amount)}</TableCell>
                                <TableCell className="text-right">{formatCurrencyShort(f.paid)}</TableCell>
                                <TableCell className="text-right font-semibold text-red-500">{due > 0 ? formatCurrencyShort(due) : "-"}</TableCell>
                                <TableCell><Badge variant={statusBadge(f.status)} className="capitalize">{f.status}</Badge></TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><CreditCard className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Printer className="h-4 w-4" /></Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* ==================== CMS ==================== */}
              {activeTab === "cms" && (
                <motion.div key="cms" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-[#1c3557] dark:text-white">Content Management</h1>
                      <p className="text-muted-foreground">Manage news, notices, gallery and banners</p>
                    </div>
                    <Dialog open={addNewsOpen} onOpenChange={setAddNewsOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-[#1c3557] text-white hover:bg-[#152944]"><Plus className="mr-1 h-4 w-4" />Add News</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Add News / Notice</DialogTitle>
                          <DialogDescription>Create a new announcement for the college website.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input placeholder="News title" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Content</label>
                            <textarea className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Write your content..." />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Type</label>
                              <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent>
                                <SelectItem value="news">News</SelectItem><SelectItem value="notice">Notice</SelectItem><SelectItem value="event">Event</SelectItem>
                              </SelectContent></Select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Image URL</label>
                              <Input placeholder="https://..." />
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setAddNewsOpen(false)}>Cancel</Button>
                          <Button className="bg-[#1c3557] text-white hover:bg-[#152944]">Publish</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Tabs defaultValue="news">
                    <TabsList>
                      <TabsTrigger value="news">News & Notices</TabsTrigger>
                      <TabsTrigger value="gallery">Gallery</TabsTrigger>
                      <TabsTrigger value="banners">Banners</TabsTrigger>
                    </TabsList>

                    <TabsContent value="news" className="space-y-4">
                      {NEWS_DATA.map((n) => (
                        <Card key={n.id} className="shadow-sm">
                          <CardContent className="flex items-start justify-between p-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Badge variant={statusBadge(n.type)} className="capitalize">{n.type}</Badge>
                                {n.published ? <Badge variant="success">Published</Badge> : <Badge variant="secondary">Draft</Badge>}
                              </div>
                              <h3 className="mt-2 font-medium">{n.title}</h3>
                              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{n.content}</p>
                              <p className="mt-1 text-xs text-muted-foreground">{formatDate(n.date)}</p>
                            </div>
                            <div className="flex items-center gap-1 ml-4">
                              <Button variant="ghost" size="icon" className="h-8 w-8">{n.published ? <ToggleRight className="h-4 w-4 text-green-500" /> : <ToggleLeft className="h-4 w-4" />}</Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="gallery" className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-3">
                        {GALLERY_ITEMS.map((g) => (
                          <Card key={g.id} className="shadow-sm overflow-hidden">
                            <div className="aspect-video bg-muted flex items-center justify-center">
                              <Image className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <CardContent className="p-3">
                              <p className="text-sm font-medium">{g.title}</p>
                              <p className="text-xs text-muted-foreground">{formatDate(g.date)}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-8">
                        <div className="text-center">
                          <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground" />
                          <p className="mt-2 text-sm font-medium">Upload images to gallery</p>
                          <Button variant="outline" className="mt-2"><Upload className="mr-2 h-4 w-4" />Upload Images</Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="banners" className="space-y-4">
                      {BANNERS.map((b) => (
                        <Card key={b.id} className="shadow-sm">
                          <CardContent className="flex items-center gap-4 p-4">
                            <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-muted">
                              <Image className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{b.title}</h3>
                              <p className="text-sm text-muted-foreground">{b.subtitle}</p>
                            </div>
                            <Badge variant={b.active ? "success" : "secondary"}>{b.active ? "Active" : "Inactive"}</Badge>
                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  </Tabs>
                </motion.div>
              )}

              {/* ==================== EVENTS & TOURS ==================== */}
              {activeTab === "events" && (
                <motion.div key="events" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-[#1c3557] dark:text-white">Events & Tour Management</h1>
                      <p className="text-muted-foreground">Create and manage college events and educational tours</p>
                    </div>
                    <Dialog open={createEventOpen} onOpenChange={setCreateEventOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-[#1c3557] text-white hover:bg-[#152944]"><Plus className="mr-1 h-4 w-4" />Create Event</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Create New Event</DialogTitle>
                          <DialogDescription>Set up a new college event or tour.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Event Title</label>
                            <Input placeholder="Event name" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Date</label>
                              <Input type="date" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Type</label>
                              <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>
                                <SelectItem value="academic">Academic</SelectItem><SelectItem value="sports">Sports</SelectItem>
                                <SelectItem value="cultural">Cultural</SelectItem><SelectItem value="meeting">Meeting</SelectItem>
                              </SelectContent></Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Venue</label>
                            <Input placeholder="Event location" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Capacity</label>
                              <Input type="number" placeholder="e.g. 100" />
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setCreateEventOpen(false)}>Cancel</Button>
                          <Button className="bg-[#1c3557] text-white hover:bg-[#152944]">Create Event</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {EVENTS_DATA.map((e) => (
                      <Card key={e.id} className={cn("shadow-md cursor-pointer transition-all hover:shadow-lg", selectedEvent === e.id && "ring-2 ring-[#1c3557]")} onClick={() => setSelectedEvent(selectedEvent === e.id ? null : e.id)}>
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <Badge variant={statusBadge(e.type)} className="capitalize">{e.type}</Badge>
                            {e.capacity > 0 && (
                              <span className="text-xs text-muted-foreground">{e.registrations}/{e.capacity}</span>
                            )}
                          </div>
                          <CardTitle className="text-base mt-2">{e.title}</CardTitle>
                          <CardDescription className="flex items-center gap-1"><MapPin className="h-3 w-3" />{e.venue}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{formatDate(e.date)}</span>
                            {e.capacity > 0 && (
                              <Progress value={(e.registrations / e.capacity) * 100} className="w-24 h-2" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {selectedEvent && (
                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>Registrations for {EVENTS_DATA.find(e => e.id === selectedEvent)?.title}</CardTitle>
                        <CardDescription>Students registered with payment status</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow><TableHead>Name</TableHead><TableHead>Program</TableHead><TableHead>Email</TableHead><TableHead>Registered</TableHead><TableHead>Payment</TableHead></TableRow>
                          </TableHeader>
                          <TableBody>
                            {EVENT_REGISTRATIONS.map((r, i) => (
                              <TableRow key={i}>
                                <TableCell className="font-medium">{r.name}</TableCell>
                                <TableCell><Badge variant="outline">{r.program}</Badge></TableCell>
                                <TableCell className="text-muted-foreground">{r.email}</TableCell>
                                <TableCell className="text-sm">{formatDate(r.registeredAt)}</TableCell>
                                <TableCell><Badge variant={statusBadge(r.paymentStatus)} className="capitalize">{r.paymentStatus}</Badge></TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              )}

              {/* ==================== APPLICANT MANAGEMENT ==================== */}
              {activeTab === "applicants" && (
                <motion.div key="applicants" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold text-[#1c3557] dark:text-white">Applicant Management</h1>
                    <p className="text-muted-foreground">Review and process admission applications</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                      <CardHeader className="pb-2"><CardTitle className="text-sm text-white/80">Total Applications</CardTitle></CardHeader>
                      <CardContent><p className="text-3xl font-bold">{totalApplications}</p><p className="text-sm text-white/70">This intake</p></CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg">
                      <CardHeader className="pb-2"><CardTitle className="text-sm text-white/80">Pending Review</CardTitle></CardHeader>
                      <CardContent><p className="text-3xl font-bold">{pendingApps}</p><p className="text-sm text-white/70">Awaiting decision</p></CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
                      <CardHeader className="pb-2"><CardTitle className="text-sm text-white/80">Accepted</CardTitle></CardHeader>
                      <CardContent><p className="text-3xl font-bold">{acceptedApps}</p><p className="text-sm text-white/70">Enrolled so far</p></CardContent>
                    </Card>
                  </div>

                  <Card className="shadow-md">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow><TableHead>Name</TableHead><TableHead>Program</TableHead><TableHead>School</TableHead><TableHead>Applied Date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
                        </TableHeader>
                        <TableBody>
                          {APPLICANTS_DATA.map((a) => (
                            <TableRow key={a.id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{a.name}</p>
                                  <p className="text-xs text-muted-foreground">{a.email}</p>
                                </div>
                              </TableCell>
                              <TableCell><Badge variant="outline">{a.program}</Badge></TableCell>
                              <TableCell className="text-muted-foreground">{a.school}</TableCell>
                              <TableCell className="text-muted-foreground">{formatDate(a.appliedDate)}</TableCell>
                              <TableCell>
                                <Badge variant={statusBadge(a.status)} className="capitalize">{a.status}</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                {a.status === "pending" ? (
                                  <div className="flex items-center justify-end gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500"><ThumbsUp className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500"><ThumbsDown className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                                  </div>
                                ) : (
                                  <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* ==================== REPORTS ==================== */}
              {activeTab === "reports" && (
                <motion.div key="reports" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-[#1c3557] dark:text-white">Reports</h1>
                      <p className="text-muted-foreground">Generate and export institutional reports</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline"><FileSpreadsheet className="mr-2 h-4 w-4" />Export Excel</Button>
                      <Button variant="outline"><FileTextIcon className="mr-2 h-4 w-4" />Export PDF</Button>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <Card className="shadow-md">
                      <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-[#1c3557]" />Attendance Summary</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                        <div><div className="flex justify-between text-sm mb-1"><span>BCA</span><span className="font-medium">88.2%</span></div><Progress value={88.2} className="h-2" /></div>
                        <div><div className="flex justify-between text-sm mb-1"><span>BBM</span><span className="font-medium">85.7%</span></div><Progress value={85.7} className="h-2" /></div>
                        <div><div className="flex justify-between text-sm mb-1"><span>BBS</span><span className="font-medium">82.5%</span></div><Progress value={82.5} className="h-2" /></div>
                        <div><div className="flex justify-between text-sm mb-1"><span>BASW</span><span className="font-medium">79.8%</span></div><Progress value={79.8} className="h-2" /></div>
                        <Separator />
                        <div className="flex justify-between text-sm font-medium"><span>Overall</span><span>87.3%</span></div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-md">
                      <CardHeader><CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-[#1c3557]" />Fee Collection Report</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                        <ResponsiveContainer width="100%" height={160}>
                          <RechartsBar data={[
                            { name: "Collected", value: totalCollected, fill: "#10b981" },
                            { name: "Pending", value: totalPending, fill: "#f59e0b" },
                            { name: "Overdue", value: totalOverdue, fill: "#ef4444" },
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="name" fontSize={11} />
                            <YAxis fontSize={11} />
                            <Tooltip />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                          </RechartsBar>
                        </ResponsiveContainer>
                        <div className="flex justify-between text-sm"><span>Collection Rate</span><span className="font-medium text-green-600">74.2%</span></div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-md">
                      <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-[#1c3557]" />Enrollment Report</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                        <ResponsiveContainer width="100%" height={160}>
                          <AreaChart data={ENROLLMENT_TRENDS}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="month" fontSize={11} />
                            <YAxis fontSize={11} />
                            <Tooltip />
                            <Area type="monotone" dataKey="students" stroke="#1c3557" fill="#1c3557" fillOpacity={0.2} />
                          </AreaChart>
                        </ResponsiveContainer>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between"><span>Current Enrollment</span><span className="font-medium">525</span></div>
                          <div className="flex justify-between"><span>Year-over-Year</span><span className="font-medium text-green-600">+12.5%</span></div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="shadow-md">
                    <CardHeader><CardTitle>Download Reports</CardTitle><CardDescription>Generate and export detailed reports</CardDescription></CardHeader>
                    <CardContent>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          { title: "Student List Report", desc: "Complete list of all enrolled students", icon: Users },
                          { title: "Faculty Directory", desc: "Faculty and staff contact directory", icon: GraduationCap },
                          { title: "Fee Collection Summary", desc: "Detailed fee collection breakdown", icon: DollarSign },
                          { title: "Attendance Report", desc: "Monthly attendance summary by program", icon: CalendarCheck },
                          { title: "Grade Sheet Report", desc: "Semester-wise grade distribution", icon: Award },
                          { title: "Admission Report", desc: "Application and enrollment statistics", icon: ClipboardList },
                        ].map((r, i) => (
                          <div key={i} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/30">
                            <div className="flex items-center gap-3">
                              <div className="rounded-lg bg-[#1c3557]/10 p-2"><r.icon className="h-4 w-4 text-[#1c3557]" /></div>
                              <div><p className="text-sm font-medium">{r.title}</p><p className="text-xs text-muted-foreground">{r.desc}</p></div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* ==================== ACTIVITY LOGS ==================== */}
              {activeTab === "logs" && (
                <motion.div key="logs" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-[#1c3557] dark:text-white">Activity Logs</h1>
                      <p className="text-muted-foreground">Complete audit trail of all system activities</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm"><RefreshCw className="mr-1 h-4 w-4" />Refresh</Button>
                      <Button variant="outline" size="sm"><Download className="mr-1 h-4 w-4" />Export Logs</Button>
                    </div>
                  </div>

                  <Card className="shadow-md">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead><div className="flex items-center gap-1"><User className="h-4 w-4" /> User</div></TableHead>
                            <TableHead><div className="flex items-center gap-1"><Activity className="h-4 w-4" /> Action</div></TableHead>
                            <TableHead>Entity</TableHead>
                            <TableHead className="text-right">Date & Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[...RECENT_ACTIVITIES, ...RECENT_ACTIVITIES.slice(0, 4)].map((a, i) => (
                            <TableRow key={i} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-7 w-7">
                                    <AvatarFallback className="bg-[#1c3557] text-[10px] text-white">{getInitials(a.user)}</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium text-sm">{a.user}</span>
                                </div>
                              </TableCell>
                              <TableCell><Badge variant="secondary" className="font-normal">{a.action}</Badge></TableCell>
                              <TableCell className="text-muted-foreground text-sm">{a.entity}</TableCell>
                              <TableCell className="text-right text-xs text-muted-foreground">{a.date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <div className="flex items-center justify-center gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm" className="bg-[#1c3557] text-white">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Bottom Nav - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/90 backdrop-blur-lg dark:bg-gray-950/90 md:hidden">
        <div className="flex overflow-x-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex min-w-[60px] flex-1 flex-col items-center gap-0.5 px-2 py-2 text-[10px] font-medium transition-colors",
                activeTab === item.id ? "text-[#1c3557] dark:text-white" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", activeTab === item.id && "text-[#1c3557] dark:text-white")} />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
