export type Role = "SUPER_ADMIN" | "ADMIN" | "FACULTY" | "ACCOUNTANT" | "STUDENT";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  image?: string | null;
  studentId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: string;
  userId: string;
  user: User;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  phone: string;
  address: string;
  photoUrl?: string | null;
  enrollmentNumber: string;
  program: Program;
  programId: string;
  semester: number;
  batch: string;
  admissionDate: Date;
  status: "ACTIVE" | "GRADUATED" | "DROPPED" | "SUSPENDED";
  createdAt: Date;
  updatedAt: Date;
}

export interface Program {
  id: string;
  code: string;
  name: string;
  fullName: string;
  duration: string;
  description: string;
  careerOpportunities: string[];
  eligibility: string;
  curriculum: CurriculumItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CurriculumItem {
  semester: number;
  subjects: Subject[];
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  programId: string;
}

export interface Faculty {
  id: string;
  userId: string;
  user: User;
  firstName: string;
  lastName: string;
  photoUrl?: string | null;
  qualifications: string[];
  specialization: string;
  subjects: string[];
  email: string;
  phone: string;
  bio?: string | null;
  joinedDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attendance {
  id: string;
  studentId: string;
  subjectId: string;
  date: Date;
  status: "PRESENT" | "ABSENT" | "LATE" | "HOLIDAY";
  markedBy: string;
  createdAt: Date;
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  paidAmount: number;
  dueDate: Date;
  paidDate?: Date | null;
  status: "PAID" | "PARTIAL" | "UNPAID" | "OVERDUE";
  type: "TUITION" | "EXAM" | "LIBRARY" | "SPORTS" | "ACTIVITY" | "OTHER";
  description: string;
  transactionId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  subject: Subject;
  semester: number;
  internalMarks: number;
  finalMarks: number;
  totalMarks: number;
  gradePoint: number;
  grade: string;
  academicYear: string;
  createdAt: Date;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  type: "NEWS" | "NOTICE" | "EVENT" | "ACHIEVEMENT";
  imageUrl?: string | null;
  published: boolean;
  authorId: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: "TOUR" | "WORKSHOP" | "SEMINAR" | "CULTURAL" | "SPORTS" | "OTHER";
  startDate: Date;
  endDate: Date;
  location: string;
  maxParticipants?: number | null;
  fee?: number | null;
  imageUrl?: string | null;
  registrations: EventRegistration[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  studentId: string;
  status: "REGISTERED" | "CONFIRMED" | "CANCELLED" | "ATTENDED";
  paymentStatus: "PENDING" | "PAID" | "REFUNDED";
  registeredAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  category: string;
  quantity: number;
  available: number;
  shelfLocation: string;
  coverUrl?: string | null;
  createdAt: Date;
}

export interface BookBorrow {
  id: string;
  bookId: string;
  book: LibraryBook;
  studentId: string;
  borrowedDate: Date;
  dueDate: Date;
  returnedDate?: Date | null;
  status: "BORROWED" | "RETURNED" | "OVERDUE";
  fine?: number | null;
}

export interface Assignment {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  dueDate: Date;
  maxScore: number;
  fileUrl?: string | null;
  submissions: AssignmentSubmission[];
  createdAt: Date;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  fileUrl: string;
  score?: number | null;
  feedback?: string | null;
  submittedAt: Date;
  status: "SUBMITTED" | "GRADED" | "LATE";
}

export interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  programId: string;
  address: string;
  dob: Date;
  gender: string;
  nationality: string;
  previousSchool: string;
  previousGrade: string;
  documents: string[];
  status: "PENDING" | "REVIEWING" | "ACCEPTED" | "REJECTED" | "WAITLISTED";
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalStudents: number;
  totalFaculty: number;
  totalPrograms: number;
  totalRevenue: number;
  averageAttendance: number;
  enrollmentTrend: { month: string; count: number }[];
  programDistribution: { name: string; count: number }[];
  attendanceBySubject: { subject: string; present: number; absent: number }[];
}
