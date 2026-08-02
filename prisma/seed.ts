import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  transactionOptions: { timeout: 120000, maxWait: 20000 },
});

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getWeekdaysInRange(start: Date, end: Date): Date[] {
  const dates: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) {
      dates.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function weightedRandom(weights: Record<string, number>): string {
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (const [key, weight] of Object.entries(weights)) {
    r -= weight;
    if (r <= 0) return key;
  }
  return Object.keys(weights)[0];
}

async function main() {
  console.log("🌱 Seeding database...");
  const startTime = Date.now();

  // ──────────────────────────────────────────────
  // 1. CHECK IF ALREADY SEEDED
  // ──────────────────────────────────────────────
  const existingUsers = await prisma.user.count();
  if (existingUsers > 0) {
    console.log("✅ Database already seeded, skipping.");
    return;
  }

  // ──────────────────────────────────────────────
  // 2. HASH PASSWORD
  // ──────────────────────────────────────────────
  console.log("🔑 Hashing passwords...");
  const hashedPassword = await bcrypt.hash("password123", 10);
  console.log("✅ Passwords hashed.");

  // ──────────────────────────────────────────────
  // 3. CREATE USERS
  // ──────────────────────────────────────────────
  console.log("👤 Creating users...");

  const [superAdmin, admin, faculty1, faculty2, faculty3, accountant, ...studentUsers] =
    await prisma.$transaction(async (tx) => {
      const sa = await tx.user.create({
        data: {
          email: "admin@milton.edu",
          password: hashedPassword,
          name: "Super Admin",
          role: "SUPER_ADMIN",
          image: "/images/users/admin.jpg",
        },
      });

      const ad = await tx.user.create({
        data: {
          email: "principal@milton.edu",
          password: hashedPassword,
          name: "Dr. Rajesh Hamal",
          role: "ADMIN",
          image: "/images/users/principal.jpg",
        },
      });

      const f1 = await tx.user.create({
        data: {
          email: "dr.sharma@milton.edu",
          password: hashedPassword,
          name: "Dr. Rajan Sharma",
          role: "FACULTY",
          image: "/images/users/faculty1.jpg",
        },
      });

      const f2 = await tx.user.create({
        data: {
          email: "prof.gurung@milton.edu",
          password: hashedPassword,
          name: "Prof. Anil Gurung",
          role: "FACULTY",
          image: "/images/users/faculty2.jpg",
        },
      });

      const f3 = await tx.user.create({
        data: {
          email: "ms.thapa@milton.edu",
          password: hashedPassword,
          name: "Ms. Sunita Thapa",
          role: "FACULTY",
          image: "/images/users/faculty3.jpg",
        },
      });

      const acc = await tx.user.create({
        data: {
          email: "accountant@milton.edu",
          password: hashedPassword,
          name: "Krishna Poudel",
          role: "ACCOUNTANT",
          image: "/images/users/accountant.jpg",
        },
      });

      const studentData = [
        { email: "aarav.sharma@milton.edu", name: "Aarav Sharma", studentId: "MIL-2024-BCA-001" },
        { email: "priya.thapa@milton.edu", name: "Priya Thapa", studentId: "MIL-2024-BCA-002" },
        { email: "rohan.gurung@milton.edu", name: "Rohan Gurung", studentId: "MIL-2024-BCA-003" },
        { email: "sita.poudel@milton.edu", name: "Sita Poudel", studentId: "MIL-2024-BBM-001" },
        { email: "bibek.khadka@milton.edu", name: "Bibek Khadka", studentId: "MIL-2024-BBM-002" },
        { email: "anjali.karki@milton.edu", name: "Anjali Karki", studentId: "MIL-2024-BBS-001" },
        { email: "sandesh.adhikari@milton.edu", name: "Sandesh Adhikari", studentId: "MIL-2024-BASW-001" },
        { email: "deepa.neupane@milton.edu", name: "Deepa Neupane", studentId: "MIL-2023-BCA-004" },
        { email: "sagar.basnet@milton.edu", name: "Sagar Basnet", studentId: "MIL-2023-BCA-005" },
        { email: "nisha.tamang@milton.edu", name: "Nisha Tamang", studentId: "MIL-2023-BBM-003" },
        { email: "amrit.rai@milton.edu", name: "Amrit Rai", studentId: "MIL-2024-BCA-006" },
        { email: "kabita.shrestha@milton.edu", name: "Kabita Shrestha", studentId: "MIL-2023-BCA-007" },
      ];

      const sus = await Promise.all(
        studentData.map((s) =>
          tx.user.create({
            data: {
              email: s.email,
              password: hashedPassword,
              name: s.name,
              role: "STUDENT",
              studentId: s.studentId,
            },
          })
        )
      );

      return [sa, ad, f1, f2, f3, acc, ...sus];
    });

  console.log(`✅ Created ${7 + studentUsers.length} users.`);

  // ──────────────────────────────────────────────
  // 4. CREATE PROGRAMS
  // ──────────────────────────────────────────────
  console.log("📚 Creating programs...");

  const [bcaProgram, bbmProgram, bbsProgram, baswProgram] = await prisma.$transaction(async (tx) => {
    const bca = await tx.program.create({
      data: {
        code: "BCA",
        name: "BCA",
        fullName: "Bachelor of Computer Application",
        duration: "4 Years (8 Semesters)",
        description:
          "Bachelor of Computer Application (BCA) is a four-year undergraduate program affiliated with Tribhuvan University (TU). The program provides a strong foundation in computer science, programming, database management, networking, and software development. Students gain both theoretical knowledge and practical skills through lab work, projects, and internships.",
        careerOpportunities: [
          "Software Developer",
          "Web Developer",
          "Database Administrator",
          "System Analyst",
          "IT Consultant",
          "Network Administrator",
          "Project Manager",
          "Data Scientist",
        ],
        eligibility:
          "Students who have successfully completed 10+2 or equivalent with minimum 45% marks in aggregate and have studied Mathematics or Computer Science as a major subject.",
        syllabusUrl: "/syllabus/bca-syllabus.pdf",
        icon: "/icons/bca.svg",
      },
    });

    const bbm = await tx.program.create({
      data: {
        code: "BBM",
        name: "BBM",
        fullName: "Bachelor of Business Management",
        duration: "4 Years (8 Semesters)",
        description:
          "Bachelor of Business Management (BBM) is a four-year undergraduate program affiliated with Tribhuvan University (TU). The program develops managerial and entrepreneurial skills through comprehensive study of business administration, marketing, finance, human resources, and organizational behavior.",
        careerOpportunities: [
          "Business Manager",
          "Marketing Executive",
          "Human Resource Manager",
          "Financial Analyst",
          "Entrepreneur",
          "Consultant",
          "Operations Manager",
          "Brand Manager",
        ],
        eligibility:
          "Students who have successfully completed 10+2 or equivalent with minimum 45% marks in aggregate.",
        syllabusUrl: "/syllabus/bbm-syllabus.pdf",
        icon: "/icons/bbm.svg",
      },
    });

    const bbs = await tx.program.create({
      data: {
        code: "BBS",
        name: "BBS",
        fullName: "Bachelor of Business Studies",
        duration: "4 Years (8 Semesters)",
        description:
          "Bachelor of Business Studies (BBS) is a four-year undergraduate program offered by Tribhuvan University (TU). The program focuses on accounting, finance, economics, and business law, preparing students for careers in banking, finance, accounting, and corporate management.",
        careerOpportunities: [
          "Accountant",
          "Banking Officer",
          "Financial Manager",
          "Auditor",
          "Tax Consultant",
          "Business Analyst",
          "Investment Advisor",
          "Corporate Executive",
        ],
        eligibility:
          "Students who have successfully completed 10+2 or equivalent with minimum 45% marks in aggregate. Commerce background preferred.",
        syllabusUrl: "/syllabus/bbs-syllabus.pdf",
        icon: "/icons/bbs.svg",
      },
    });

    const basw = await tx.program.create({
      data: {
        code: "BASW",
        name: "BASW",
        fullName: "Bachelor of Arts in Social Work",
        duration: "4 Years (8 Semesters)",
        description:
          "Bachelor of Arts in Social Work (BASW) is a four-year undergraduate program affiliated with Tribhuvan University (TU). The program prepares students for professional social work practice through study of social welfare, community development, counseling, and social research methods.",
        careerOpportunities: [
          "Social Worker",
          "Community Development Officer",
          "NGO Program Manager",
          "Counselor",
          "Child Welfare Specialist",
          "Healthcare Social Worker",
          "Policy Analyst",
          "Human Rights Advocate",
        ],
        eligibility:
          "Students who have successfully completed 10+2 or equivalent with minimum 45% marks in aggregate.",
        syllabusUrl: "/syllabus/basw-syllabus.pdf",
        icon: "/icons/basw.svg",
      },
    });

    return [bca, bbm, bbs, basw];
  });

  console.log("✅ Created 4 programs.");

  // ──────────────────────────────────────────────
  // 5. CREATE SUBJECTS
  // ──────────────────────────────────────────────
  console.log("📖 Creating subjects...");

  interface SubjectInput {
    code: string;
    name: string;
    credits: number;
    semester: number;
  }

  const bcaSubjects: SubjectInput[] = [
    // Semester 1
    { code: "CMP 101", name: "C Programming", credits: 3, semester: 1 },
    { code: "DLC 101", name: "Digital Logic", credits: 3, semester: 1 },
    { code: "MTH 101", name: "Discrete Mathematics", credits: 3, semester: 1 },
    { code: "ENG 101", name: "English I", credits: 3, semester: 1 },
    { code: "MTH 102", name: "Mathematics I", credits: 3, semester: 1 },
    { code: "CFA 101", name: "Computer Fundamentals & Applications", credits: 3, semester: 1 },
    // Semester 2
    { code: "OOP 201", name: "Object-Oriented Programming", credits: 3, semester: 2 },
    { code: "MPA 201", name: "Microprocessor & Assembly Language", credits: 3, semester: 2 },
    { code: "MTH 201", name: "Mathematics II", credits: 3, semester: 2 },
    { code: "ENG 201", name: "English II", credits: 3, semester: 2 },
    { code: "DSA 201", name: "Data Structures & Algorithms", credits: 3, semester: 2 },
    { code: "ACC 201", name: "Financial Accounting", credits: 3, semester: 2 },
    // Semester 3
    { code: "STA 301", name: "Statistics I", credits: 3, semester: 3 },
    { code: "CAR 301", name: "Computer Architecture", credits: 3, semester: 3 },
    { code: "OPS 301", name: "Operating Systems", credits: 3, semester: 3 },
    { code: "NUM 301", name: "Numerical Methods", credits: 3, semester: 3 },
    { code: "WEB 301", name: "Web Technology", credits: 3, semester: 3 },
    { code: "DBM 301", name: "Database Management System", credits: 3, semester: 3 },
    // Semester 4
    { code: "STA 401", name: "Statistics II", credits: 3, semester: 4 },
    { code: "SEN 401", name: "Software Engineering", credits: 3, semester: 4 },
    { code: "CNW 401", name: "Computer Networks", credits: 3, semester: 4 },
    { code: "OOD 401", name: "Object-Oriented Design & Modeling", credits: 3, semester: 4 },
    { code: "JAV 401", name: "Java Programming", credits: 3, semester: 4 },
    { code: "AIN 401", name: "Artificial Intelligence", credits: 3, semester: 4 },
    // Semester 5
    { code: "MIS 501", name: "Management Information System", credits: 3, semester: 5 },
    { code: "DAA 501", name: "Design & Analysis of Algorithms", credits: 3, semester: 5 },
    { code: "SAD 501", name: "System Analysis & Design", credits: 3, semester: 5 },
    { code: "NET 501", name: ".NET Programming", credits: 3, semester: 5 },
    { code: "GRM 501", name: "Graphics & Multimedia", credits: 3, semester: 5 },
    { code: "EBC 501", name: "E-Business", credits: 3, semester: 5 },
    // Semester 6
    { code: "NWA 601", name: "Network Administration", credits: 3, semester: 6 },
    { code: "MAD 601", name: "Mobile Application Development", credits: 3, semester: 6 },
    { code: "DWH 601", name: "Data Warehousing & Data Mining", credits: 3, semester: 6 },
    { code: "CMP 601", name: "Cloud Computing", credits: 3, semester: 6 },
    { code: "INT 601", name: "Internship", credits: 3, semester: 6 },
    { code: "RES 601", name: "Research Methodology", credits: 3, semester: 6 },
    // Semester 7
    { code: "DIP 701", name: "Digital Image Processing", credits: 3, semester: 7 },
    { code: "CRY 701", name: "Cryptography", credits: 3, semester: 7 },
    { code: "IOT 701", name: "Internet of Things", credits: 3, semester: 7 },
    { code: "MUL 701", name: "Multimedia Systems", credits: 3, semester: 7 },
    { code: "ELE 701", name: "Elective I", credits: 3, semester: 7 },
    { code: "PRO 701", name: "Project I", credits: 3, semester: 7 },
    // Semester 8
    { code: "DSS 801", name: "Decision Support System", credits: 3, semester: 8 },
    { code: "INF 801", name: "Information Security", credits: 3, semester: 8 },
    { code: "ELE 802", name: "Elective II", credits: 3, semester: 8 },
    { code: "PRO 801", name: "Project II", credits: 3, semester: 8 },
    { code: "SEM 801", name: "Seminar", credits: 2, semester: 8 },
  ];

  const bbmSubjects: SubjectInput[] = [
    { code: "BBM 101", name: "Principles of Management", credits: 3, semester: 1 },
    { code: "BBM 102", name: "Business Mathematics", credits: 3, semester: 1 },
    { code: "BBM 103", name: "Business English I", credits: 3, semester: 1 },
    { code: "BBM 104", name: "Financial Accounting I", credits: 3, semester: 1 },
    { code: "BBM 105", name: "Microeconomics", credits: 3, semester: 1 },
    { code: "BBM 106", name: "Computer Applications", credits: 3, semester: 1 },
    { code: "BBM 201", name: "Organizational Behavior", credits: 3, semester: 2 },
    { code: "BBM 202", name: "Business Statistics", credits: 3, semester: 2 },
    { code: "BBM 203", name: "Business English II", credits: 3, semester: 2 },
    { code: "BBM 204", name: "Financial Accounting II", credits: 3, semester: 2 },
    { code: "BBM 205", name: "Macroeconomics", credits: 3, semester: 2 },
    { code: "BBM 206", name: "Marketing Principles", credits: 3, semester: 2 },
    { code: "BBM 301", name: "Human Resource Management", credits: 3, semester: 3 },
    { code: "BBM 302", name: "Cost Accounting", credits: 3, semester: 3 },
    { code: "BBM 303", name: "Business Law", credits: 3, semester: 3 },
    { code: "BBM 304", name: "Corporate Finance", credits: 3, semester: 3 },
    { code: "BBM 305", name: "Business Communication", credits: 3, semester: 3 },
    { code: "BBM 306", name: "Taxation in Nepal", credits: 3, semester: 3 },
    { code: "BBM 401", name: "Entrepreneurship", credits: 3, semester: 4 },
    { code: "BBM 402", name: "Investment Management", credits: 3, semester: 4 },
    { code: "BBM 403", name: "Operations Management", credits: 3, semester: 4 },
    { code: "BBM 404", name: "International Business", credits: 3, semester: 4 },
    { code: "BBM 405", name: "E-Commerce", credits: 3, semester: 4 },
    { code: "BBM 406", name: "Research Methods", credits: 3, semester: 4 },
  ];

  const bbsSubjects: SubjectInput[] = [
    { code: "BBS 101", name: "English I", credits: 3, semester: 1 },
    { code: "BBS 102", name: "Business Mathematics", credits: 3, semester: 1 },
    { code: "BBS 103", name: "Financial Accounting I", credits: 3, semester: 1 },
    { code: "BBS 104", name: "Principles of Management", credits: 3, semester: 1 },
    { code: "BBS 105", name: "Microeconomics", credits: 3, semester: 1 },
    { code: "BBS 106", name: "Computer Applications", credits: 3, semester: 1 },
    { code: "BBS 201", name: "English II", credits: 3, semester: 2 },
    { code: "BBS 202", name: "Business Statistics", credits: 3, semester: 2 },
    { code: "BBS 203", name: "Financial Accounting II", credits: 3, semester: 2 },
    { code: "BBS 204", name: "Organizational Behavior", credits: 3, semester: 2 },
    { code: "BBS 205", name: "Macroeconomics", credits: 3, semester: 2 },
    { code: "BBS 206", name: "Business Law", credits: 3, semester: 2 },
  ];

  const baswSubjects: SubjectInput[] = [
    { code: "BASW 101", name: "Introduction to Social Work", credits: 3, semester: 1 },
    { code: "BASW 102", name: "Sociology", credits: 3, semester: 1 },
    { code: "BASW 103", name: "Psychology", credits: 3, semester: 1 },
    { code: "BASW 104", name: "English I", credits: 3, semester: 1 },
    { code: "BASW 105", name: "Political Science", credits: 3, semester: 1 },
    { code: "BASW 106", name: "Nepali Society & Culture", credits: 3, semester: 1 },
    { code: "BASW 201", name: "Social Work Practice", credits: 3, semester: 2 },
    { code: "BASW 202", name: "Social Psychology", credits: 3, semester: 2 },
    { code: "BASW 203", name: "English II", credits: 3, semester: 2 },
    { code: "BASW 204", name: "Research Methods in Social Work", credits: 3, semester: 2 },
    { code: "BASW 205", name: "Community Development", credits: 3, semester: 2 },
    { code: "BASW 206", name: "Counseling Skills", credits: 3, semester: 2 },
  ];

  const createdSubjects = await prisma.$transaction(async (tx) => {
    const all: Record<string, any> = {};

    for (const sub of bcaSubjects) {
      const s = await tx.subject.create({
        data: {
          code: sub.code,
          name: sub.name,
          credits: sub.credits,
          semester: sub.semester,
          programId: bcaProgram.id,
        },
      });
      all[`BCA-${sub.semester}-${sub.code}`] = s;
    }

    for (const sub of bbmSubjects) {
      const s = await tx.subject.create({
        data: {
          code: sub.code,
          name: sub.name,
          credits: sub.credits,
          semester: sub.semester,
          programId: bbmProgram.id,
        },
      });
      all[`BBM-${sub.semester}-${sub.code}`] = s;
    }

    for (const sub of bbsSubjects) {
      const s = await tx.subject.create({
        data: {
          code: sub.code,
          name: sub.name,
          credits: sub.credits,
          semester: sub.semester,
          programId: bbsProgram.id,
        },
      });
      all[`BBS-${sub.semester}-${sub.code}`] = s;
    }

    for (const sub of baswSubjects) {
      const s = await tx.subject.create({
        data: {
          code: sub.code,
          name: sub.name,
          credits: sub.credits,
          semester: sub.semester,
          programId: baswProgram.id,
        },
      });
      all[`BASW-${sub.semester}-${sub.code}`] = s;
    }

    return all;
  });

  console.log("✅ Created subjects.");

  function getSubjectsForProgramSemester(
    programCode: string,
    semester: number
  ): any[] {
    return Object.entries(createdSubjects)
      .filter(([key]) => key.startsWith(`${programCode}-${semester}-`))
      .map(([, value]) => value);
  }

  // ──────────────────────────────────────────────
  // 6. CREATE FACULTY
  // ──────────────────────────────────────────────
  console.log("👨‍🏫 Creating faculty...");

  const [facultyRecord1, facultyRecord2, facultyRecord3] = await prisma.$transaction(async (tx) => {
    const f1 = await tx.faculty.create({
      data: {
        userId: faculty1.id,
        firstName: "Rajan",
        lastName: "Sharma",
        photoUrl: "/images/faculty/sharma.jpg",
        qualifications: ["PhD in Computer Science", "MSc in Information Technology"],
        specialization: "Programming, Database Systems, Artificial Intelligence",
        subjects: ["C Programming", "Database Management System", "Artificial Intelligence", "Java Programming"],
        email: "dr.sharma@milton.edu",
        phone: "9851012345",
        bio: "Dr. Rajan Sharma has over 15 years of teaching experience in computer science. He completed his PhD from Tribhuvan University and has published numerous research papers in national and international journals.",
        joinedDate: new Date("2020-09-01"),
      },
    });

    const f2 = await tx.faculty.create({
      data: {
        userId: faculty2.id,
        firstName: "Anil",
        lastName: "Gurung",
        photoUrl: "/images/faculty/gurung.jpg",
        qualifications: ["MSc in Physics", "MEd in Mathematics"],
        specialization: "Mathematics, Statistics, Numerical Methods",
        subjects: ["Discrete Mathematics", "Mathematics I & II", "Statistics", "Numerical Methods"],
        email: "prof.gurung@milton.edu",
        phone: "9851023456",
        bio: "Prof. Anil Gurung is a dedicated mathematics educator with 12 years of experience. His expertise spans across discrete mathematics, statistics, and numerical methods.",
        joinedDate: new Date("2021-01-15"),
      },
    });

    const f3 = await tx.faculty.create({
      data: {
        userId: faculty3.id,
        firstName: "Sunita",
        lastName: "Thapa",
        photoUrl: "/images/faculty/thapa.jpg",
        qualifications: ["MCA in Computer Applications", "BCA"],
        specialization: "Web Technology, Networking, Software Engineering",
        subjects: ["Web Technology", "Computer Networks", "Software Engineering", "Object-Oriented Programming"],
        email: "ms.thapa@milton.edu",
        phone: "9851034567",
        bio: "Ms. Sunita Thapa specializes in web technologies and software engineering. With 8 years of industry and teaching experience, she brings practical knowledge to the classroom.",
        joinedDate: new Date("2022-03-01"),
      },
    });

    return [f1, f2, f3];
  });

  console.log("✅ Created 3 faculty members.");

  // ──────────────────────────────────────────────
  // 7. CREATE STUDENTS
  // ──────────────────────────────────────────────
  console.log("🎓 Creating students...");

  interface StudentInput {
    userIndex: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    phone: string;
    address: string;
    enrollmentNumber: string;
    programId: string;
    semester: number;
    batch: string;
    admissionDate: Date;
  }

  const studentInputs: StudentInput[] = [
    {
      userIndex: 0,
      firstName: "Aarav",
      lastName: "Sharma",
      dateOfBirth: new Date("2002-05-15"),
      gender: "Male",
      phone: "9841012345",
      address: "Baneshwor, Kathmandu",
      enrollmentNumber: "MIL-2024-BCA-001",
      programId: bcaProgram.id,
      semester: 1,
      batch: "2024-2028",
      admissionDate: new Date("2024-09-01"),
    },
    {
      userIndex: 1,
      firstName: "Priya",
      lastName: "Thapa",
      dateOfBirth: new Date("2003-03-22"),
      gender: "Female",
      phone: "9841023456",
      address: "Lalitpur, Kathmandu",
      enrollmentNumber: "MIL-2024-BCA-002",
      programId: bcaProgram.id,
      semester: 1,
      batch: "2024-2028",
      admissionDate: new Date("2024-09-01"),
    },
    {
      userIndex: 2,
      firstName: "Rohan",
      lastName: "Gurung",
      dateOfBirth: new Date("2002-11-08"),
      gender: "Male",
      phone: "9841034567",
      address: "Pokhara, Kaski",
      enrollmentNumber: "MIL-2024-BCA-003",
      programId: bcaProgram.id,
      semester: 1,
      batch: "2024-2028",
      admissionDate: new Date("2024-09-01"),
    },
    {
      userIndex: 3,
      firstName: "Sita",
      lastName: "Poudel",
      dateOfBirth: new Date("2003-07-19"),
      gender: "Female",
      phone: "9841045678",
      address: "Baneshwor, Kathmandu",
      enrollmentNumber: "MIL-2024-BBM-001",
      programId: bbmProgram.id,
      semester: 2,
      batch: "2024-2028",
      admissionDate: new Date("2024-09-01"),
    },
    {
      userIndex: 4,
      firstName: "Bibek",
      lastName: "Khadka",
      dateOfBirth: new Date("2002-09-30"),
      gender: "Male",
      phone: "9841056789",
      address: "Bhaktapur",
      enrollmentNumber: "MIL-2024-BBM-002",
      programId: bbmProgram.id,
      semester: 2,
      batch: "2024-2028",
      admissionDate: new Date("2024-09-01"),
    },
    {
      userIndex: 5,
      firstName: "Anjali",
      lastName: "Karki",
      dateOfBirth: new Date("2003-01-14"),
      gender: "Female",
      phone: "9841067890",
      address: "Koteshwor, Kathmandu",
      enrollmentNumber: "MIL-2024-BBS-001",
      programId: bbsProgram.id,
      semester: 1,
      batch: "2024-2028",
      admissionDate: new Date("2024-09-01"),
    },
    {
      userIndex: 6,
      firstName: "Sandesh",
      lastName: "Adhikari",
      dateOfBirth: new Date("2002-06-25"),
      gender: "Male",
      phone: "9841078901",
      address: "New Baneshwor, Kathmandu",
      enrollmentNumber: "MIL-2024-BASW-001",
      programId: baswProgram.id,
      semester: 2,
      batch: "2024-2028",
      admissionDate: new Date("2024-09-01"),
    },
    {
      userIndex: 7,
      firstName: "Deepa",
      lastName: "Neupane",
      dateOfBirth: new Date("2001-04-10"),
      gender: "Female",
      phone: "9841089012",
      address: "Patan, Lalitpur",
      enrollmentNumber: "MIL-2023-BCA-004",
      programId: bcaProgram.id,
      semester: 3,
      batch: "2023-2027",
      admissionDate: new Date("2023-09-01"),
    },
    {
      userIndex: 8,
      firstName: "Sagar",
      lastName: "Basnet",
      dateOfBirth: new Date("2001-12-05"),
      gender: "Male",
      phone: "9841090123",
      address: "Chabahil, Kathmandu",
      enrollmentNumber: "MIL-2023-BCA-005",
      programId: bcaProgram.id,
      semester: 3,
      batch: "2023-2027",
      admissionDate: new Date("2023-09-01"),
    },
    {
      userIndex: 9,
      firstName: "Nisha",
      lastName: "Tamang",
      dateOfBirth: new Date("2002-08-18"),
      gender: "Female",
      phone: "9841101234",
      address: "Dharan, Sunsari",
      enrollmentNumber: "MIL-2023-BBM-003",
      programId: bbmProgram.id,
      semester: 4,
      batch: "2023-2027",
      admissionDate: new Date("2023-09-01"),
    },
    {
      userIndex: 10,
      firstName: "Amrit",
      lastName: "Rai",
      dateOfBirth: new Date("2003-02-28"),
      gender: "Male",
      phone: "9841112345",
      address: "Biratnagar, Morang",
      enrollmentNumber: "MIL-2024-BCA-006",
      programId: bcaProgram.id,
      semester: 1,
      batch: "2024-2028",
      admissionDate: new Date("2024-09-01"),
    },
    {
      userIndex: 11,
      firstName: "Kabita",
      lastName: "Shrestha",
      dateOfBirth: new Date("2001-10-12"),
      gender: "Female",
      phone: "9841123456",
      address: "Kirtipur, Kathmandu",
      enrollmentNumber: "MIL-2023-BCA-007",
      programId: bcaProgram.id,
      semester: 3,
      batch: "2023-2027",
      admissionDate: new Date("2023-09-01"),
    },
  ];

  const createdStudents = await prisma.$transaction(async (tx) => {
    const students = await Promise.all(
      studentInputs.map((s) =>
        tx.student.create({
          data: {
            userId: studentUsers[s.userIndex].id,
            firstName: s.firstName,
            lastName: s.lastName,
            dateOfBirth: s.dateOfBirth,
            gender: s.gender,
            phone: s.phone,
            address: s.address,
            enrollmentNumber: s.enrollmentNumber,
            programId: s.programId,
            semester: s.semester,
            batch: s.batch,
            admissionDate: s.admissionDate,
            status: "ACTIVE",
          },
        })
      )
    );
    return students;
  });

  console.log(`✅ Created ${createdStudents.length} students.`);

  // ──────────────────────────────────────────────
  // 8. CREATE ATTENDANCE (past month)
  // ──────────────────────────────────────────────
  console.log("📋 Creating attendance records...");

  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const weekdays = getWeekdaysInRange(thirtyDaysAgo, now);
  const attendanceStatuses: ("PRESENT" | "ABSENT" | "LATE" | "HOLIDAY")[] = [
    "PRESENT",
    "PRESENT",
    "PRESENT",
    "PRESENT",
    "ABSENT",
    "PRESENT",
    "LATE",
    "PRESENT",
    "PRESENT",
    "HOLIDAY",
  ];

  let attendanceCount = 0;
  const attendanceRows: {
    studentId: string;
    subjectId: string;
    date: Date;
    status: "PRESENT" | "ABSENT" | "LATE" | "HOLIDAY";
    markedBy: string;
  }[] = [];

  for (const student of createdStudents) {
    const programCode = student.enrollmentNumber.includes("BCA")
      ? "BCA"
      : student.enrollmentNumber.includes("BBM")
        ? "BBM"
        : student.enrollmentNumber.includes("BBS")
          ? "BBS"
          : "BASW";
    const subjects = getSubjectsForProgramSemester(programCode, student.semester);

    for (const subject of subjects) {
      for (const date of weekdays) {
        const status = randomItem(attendanceStatuses) as any;
        const markedBy =
          student.semester <= 2 ? faculty1.id : randomItem([faculty1.id, faculty2.id, faculty3.id]);
        attendanceRows.push({
          studentId: student.id,
          subjectId: subject.id,
          date,
          status,
          markedBy,
        });
        attendanceCount++;
      }
    }
  }

  for (let i = 0; i < attendanceRows.length; i += 500) {
    await prisma.attendance.createMany({ data: attendanceRows.slice(i, i + 500) });
  }

  console.log(`✅ Created ${attendanceCount} attendance records.`);

  // ──────────────────────────────────────────────
  // 9. CREATE FEES
  // ──────────────────────────────────────────────
  console.log("💰 Creating fee records...");

  const currentYear = now.getFullYear();
  const academicYear = now.getMonth() >= 8 ? `${currentYear}-${currentYear + 1}` : `${currentYear - 1}-${currentYear}`;

  let feeCount = 0;
  await prisma.$transaction(async (tx) => {
    for (const student of createdStudents) {
      const tuitionFee = await tx.fee.create({
        data: {
          studentId: student.id,
          amount: 120000,
          paidAmount: student.semester <= 2 ? 120000 : 60000,
          dueDate: new Date(`${academicYear.split("-")[0]}-09-30`),
          paidDate: student.semester <= 2 ? new Date(`${academicYear.split("-")[0]}-09-15`) : null,
          status: student.semester <= 2 ? "PAID" : "PARTIAL",
          type: "TUITION",
          description: `Annual Tuition Fee - ${academicYear}`,
          transactionId: student.semester <= 2 ? `TXN${String(randomInt(100000, 999999))}` : null,
        },
      });
      feeCount++;

      const examFee = await tx.fee.create({
        data: {
          studentId: student.id,
          amount: 5000,
          paidAmount: randomItem([5000, 0, 5000, 5000]),
          dueDate: new Date(`${academicYear.split("-")[1] || (parseInt(academicYear.split("-")[0]) + 1)}-02-28`),
          paidDate: randomItem([new Date(`${academicYear.split("-")[1] || (parseInt(academicYear.split("-")[0]) + 1)}-02-15`), null]),
          status: randomItem(["PAID", "PAID", "PAID", "UNPAID"] as const),
          type: "EXAM",
          description: `Semester Examination Fee - ${academicYear}`,
          transactionId: `TXN${String(randomInt(100000, 999999))}`,
        },
      });
      feeCount++;

      if (student.semester >= 3) {
        await tx.fee.create({
          data: {
            studentId: student.id,
            amount: 3000,
            paidAmount: 0,
            dueDate: new Date(`${academicYear.split("-")[1] || (parseInt(academicYear.split("-")[0]) + 1)}-03-31`),
            status: "UNPAID",
            type: "LIBRARY",
            description: `Library Fee - ${academicYear}`,
          },
        });
        feeCount++;
      }
    }
  });

  console.log(`✅ Created ${feeCount} fee records.`);

  // ──────────────────────────────────────────────
  // 10. CREATE GRADES
  // ──────────────────────────────────────────────
  console.log("📝 Creating grades...");

  let gradeCount = 0;
  await prisma.$transaction(async (tx) => {
    for (const student of createdStudents) {
      const programCode = student.enrollmentNumber.includes("BCA")
        ? "BCA"
        : student.enrollmentNumber.includes("BBM")
          ? "BBM"
          : student.enrollmentNumber.includes("BBS")
            ? "BBS"
            : "BASW";
      const semester = student.semester;
      const subjects = getSubjectsForProgramSemester(programCode, semester).filter(
        (_, i) => i < 5
      );

      for (const subject of subjects) {
        const internalMarks = randomInt(15, 30);
        const finalMarks = randomInt(35, 65);
        const totalMarks = internalMarks + finalMarks;
        let grade: string;
        let gradePoint: number;

        if (totalMarks >= 90) {
          grade = "A+";
          gradePoint = 4.0;
        } else if (totalMarks >= 80) {
          grade = "A";
          gradePoint = 3.7;
        } else if (totalMarks >= 70) {
          grade = "B+";
          gradePoint = 3.3;
        } else if (totalMarks >= 60) {
          grade = "B";
          gradePoint = 3.0;
        } else if (totalMarks >= 50) {
          grade = "C+";
          gradePoint = 2.7;
        } else if (totalMarks >= 40) {
          grade = "D";
          gradePoint = 2.0;
        } else {
          grade = "F";
          gradePoint = 0.0;
        }

        await tx.grade.create({
          data: {
            studentId: student.id,
            subjectId: subject.id,
            semester,
            internalMarks,
            finalMarks,
            totalMarks,
            gradePoint,
            grade,
            academicYear: academicYear,
          },
        });
        gradeCount++;
      }
    }
  });

  console.log(`✅ Created ${gradeCount} grade records.`);

  // ──────────────────────────────────────────────
  // 11. CREATE NEWS / NOTICES / EVENTS
  // ──────────────────────────────────────────────
  console.log("📰 Creating news articles...");

  const newsItems = [
    {
      title: "Milton College Celebrates 15th Annual Sports Day",
      slug: "milton-college-15th-annual-sports-day",
      excerpt:
        "Milton International College successfully organized its 15th Annual Sports Day with enthusiastic participation from students across all programs.",
      content: `Milton International College celebrated its 15th Annual Sports Day on June 15, 2026, at the college ground in New Baneshwor, Kathmandu. The event was inaugurated by the college principal, Dr. Rajesh Hamal, who encouraged students to participate in sports for holistic development.

Students from BCA, BBM, BBS, and BASW programs competed in various events including athletics, basketball, volleyball, badminton, and chess. The highlight of the day was the inter-program relay race, which was won by the BCA team.

The sports day concluded with a prize distribution ceremony where winners were awarded medals and certificates. The college management appreciated the efforts of all participants and organizers.`,
      type: "EVENT" as const,
      imageUrl: "/images/news/sports-day.jpg",
      published: true,
      authorId: admin.id,
      tags: ["sports", "event", "annual"],
    },
    {
      title: "Admission Open for 2026-2027 Academic Year",
      slug: "admission-open-2026-2027",
      excerpt:
        "Milton International College announces admissions open for BCA, BBM, BBS, and BASW programs for the academic year 2026-2027. Scholarships available for meritorious students.",
      content: `Milton International College, affiliated with Tribhuvan University, is pleased to announce that admissions are now open for the academic year 2026-2027. The college offers four undergraduate programs: BCA (Bachelor of Computer Application), BBM (Bachelor of Business Management), BBS (Bachelor of Business Studies), and BASW (Bachelor of Arts in Social Work).

Eligibility Criteria:
- Minimum 45% in 10+2 or equivalent
- Mathematics or Computer Science background preferred for BCA

The college provides state-of-the-art computer labs, a well-stocked library, experienced faculty, and scholarship opportunities for meritorious and deserving students.

Interested candidates can visit the college campus at New Baneshwor, Kathmandu, or apply online through the college website.`,
      type: "NOTICE" as const,
      imageUrl: "/images/news/admission.jpg",
      published: true,
      authorId: superAdmin.id,
      tags: ["admission", "notice", "2026-2027"],
    },
    {
      title: "BCA Students Win National Hackathon 2026",
      slug: "bca-students-win-national-hackathon-2026",
      excerpt:
        "A team of BCA students from Milton College secured first place at the National Inter-College Hackathon organized by ICT Foundation Nepal.",
      content: `We are proud to announce that a team of three BCA students from Milton International College won the first prize at the National Inter-College Hackathon 2026, organized by ICT Foundation Nepal at Kathmandu University.

The team, consisting of Aarav Sharma, Priya Thapa, and Rohan Gurung, developed an AI-powered platform for disaster management and response. Their solution impressed the judges with its innovative approach to early warning systems and resource coordination during natural disasters.

The winning team received a cash prize of NPR 100,000 and an opportunity to represent Nepal at the South Asian Tech Summit. The college management and faculty have congratulated the students for their outstanding achievement.`,
      type: "ACHIEVEMENT" as const,
      imageUrl: "/images/news/hackathon.jpg",
      published: true,
      authorId: faculty1.id,
      tags: ["achievement", "hackathon", "bca", "national"],
    },
    {
      title: "College Closed: Tihar Festival Holiday Notice",
      slug: "tihar-festival-holiday-notice-2026",
      excerpt:
        "The college will remain closed from November 8 to November 12, 2026, in observance of the Tihar festival. Regular classes will resume on November 13.",
      content: `This is to inform all students, faculty, and staff that Milton International College will remain closed from November 8 (Sunday) to November 12 (Thursday), 2026, in celebration of the Tihar festival (Deepawali and Bhai Tika).

The college administration wishes everyone a joyful and safe Tihar celebration. All students are requested to complete their assignments and prepare for upcoming internal examinations scheduled for late November.

Regular classes will resume on November 13, 2026 (Friday). Hostel students may return to the hostel by the evening of November 12.`,
      type: "NOTICE" as const,
      imageUrl: null,
      published: true,
      authorId: admin.id,
      tags: ["holiday", "tihar", "festival", "notice"],
    },
    {
      title: "Guest Lecture on Cybersecurity by Industry Expert",
      slug: "guest-lecture-cybersecurity-2026",
      excerpt:
        "A guest lecture session on Cybersecurity Trends and Career Opportunities was conducted by Mr. Arjun Thapa, Senior Security Engineer at DeerHoldings.",
      content: `Milton International College organized a guest lecture on "Cybersecurity Trends and Career Opportunities" on July 10, 2026. The session was delivered by Mr. Arjun Thapa, a Senior Security Engineer at DeerHoldings and an alumnus of Milton College.

Mr. Thapa covered various topics including ethical hacking, network security, data protection, and the growing demand for cybersecurity professionals in Nepal and abroad. He also shared his personal journey from being a BCA student at Milton to becoming a cybersecurity professional.

The interactive session saw active participation from BCA and BBM students. The event was coordinated by Dr. Rajan Sharma, Head of the Computer Science Department.`,
      type: "NEWS" as const,
      imageUrl: "/images/news/guest-lecture.jpg",
      published: true,
      authorId: faculty1.id,
      tags: ["guest-lecture", "cybersecurity", "industry", "event"],
    },
    {
      title: "Milton College Alumni Meet 2026",
      slug: "alumni-meet-2026",
      excerpt:
        "The Milton International College Alumni Association organized its annual alumni meet, bringing together graduates from all batches for networking and reminiscence.",
      content: `The Milton International College Alumni Association hosted its Annual Alumni Meet on June 25, 2026, at the college auditorium. The event saw participation from over 200 alumni spanning multiple batches from 2015 to 2025.

The program featured interactive sessions where alumni shared their professional experiences and success stories with current students. Notable alumni included IT professionals working in top companies like DeerHoldings, F1Soft, and various multinational corporations.

The event also included cultural performances, a networking dinner, and the announcement of the Distinguished Alumni Award, which was presented to Ms. Anju Pradhan (BCA Batch 2016) for her contributions to the tech industry.

The alumni association also pledged to establish a scholarship fund for deserving students from economically disadvantaged backgrounds.`,
      type: "EVENT" as const,
      imageUrl: "/images/news/alumni-meet.jpg",
      published: true,
      authorId: admin.id,
      tags: ["alumni", "event", "networking", "annual"],
    },
  ];

  await prisma.$transaction(
    newsItems.map((news) =>
      prisma.news.create({
        data: news,
      })
    )
  );

  console.log(`✅ Created ${newsItems.length} news articles.`);

  // ──────────────────────────────────────────────
  // 12. CREATE EVENTS
  // ──────────────────────────────────────────────
  console.log("🎪 Creating events...");

  const [tourEvent, workshopEvent, culturalEvent] = await prisma.$transaction(async (tx) => {
    const tour = await tx.event.create({
      data: {
        title: "International Educational Tour to Singapore & Malaysia 2026",
        description: `Milton International College is organizing an international educational tour to Singapore and Malaysia from December 20-28, 2026. This tour is designed to provide students with exposure to international education systems, cultural diversity, and industrial practices.

Package includes:
- Round trip airfare (Kathmandu - Singapore - Kuala Lumpur - Kathmandu)
- Accommodation in 3-star hotels (twin sharing)
- Visit to National University of Singapore (NUS)
- Tour of Singapore's tech hub and Gardens by the Bay
- Visit to Kuala Lumpur's Petronas Twin Towers
- Cultural sites including Batu Caves
- Daily breakfast and selected meals
- Travel insurance

Interested students can register at the college administration office. Limited seats available.`,
        type: "TOUR",
        startDate: new Date("2026-12-20"),
        endDate: new Date("2026-12-28"),
        location: "Singapore & Kuala Lumpur, Malaysia",
        maxParticipants: 30,
        fee: 85000,
        imageUrl: "/images/events/singapore-tour.jpg",
      },
    });

    const workshop = await tx.event.create({
      data: {
        title: "Workshop on Mobile App Development with Flutter",
        description: `A hands-on workshop on mobile application development using Flutter framework. This two-day workshop will cover:

Day 1: Introduction to Flutter & Dart, Widgets, Layouts
Day 2: State Management, API Integration, Publishing Apps

Students will build a complete mobile app by the end of the workshop. Bring your own laptop.`,
        type: "WORKSHOP",
        startDate: new Date("2026-09-05"),
        endDate: new Date("2026-09-06"),
        location: "Computer Lab, Milton International College",
        maxParticipants: 40,
        fee: 1500,
        imageUrl: "/images/events/flutter-workshop.jpg",
      },
    });

    const cultural = await tx.event.create({
      data: {
        title: "Milton Cultural Fest 2026",
        description: `Milton International College presents its annual Cultural Fest - a celebration of Nepal's diverse cultural heritage. The event features:

- Traditional dance and music performances by students
- Inter-program cultural competitions
- Food stalls featuring cuisines from different regions of Nepal
- Art exhibition showcasing student artwork
- Fashion show featuring traditional attire

All students, faculty, and staff are encouraged to participate and showcase their talents.`,
        type: "CULTURAL",
        startDate: new Date("2026-10-15"),
        endDate: new Date("2026-10-16"),
        location: "College Auditorium & Ground, New Baneshwor",
        maxParticipants: 500,
        fee: null,
        imageUrl: "/images/events/cultural-fest.jpg",
      },
    });

    return [tour, workshop, cultural];
  });

  console.log("✅ Created 3 events.");

  // ──────────────────────────────────────────────
  // 13. CREATE EVENT REGISTRATIONS
  // ──────────────────────────────────────────────
  console.log("📝 Creating event registrations...");

  await prisma.$transaction(async (tx) => {
    // Register some students for the tour
    const tourStudents = createdStudents.slice(0, 5);
    for (const student of tourStudents) {
      await tx.eventRegistration.create({
        data: {
          eventId: tourEvent.id,
          studentId: student.id,
          status: randomItem(["REGISTERED", "CONFIRMED"] as const),
          paymentStatus: randomItem(["PENDING", "PAID"] as const),
        },
      });
    }

    // Register many students for the workshop
    const workshopStudents = createdStudents.slice(0, 8);
    for (const student of workshopStudents) {
      await tx.eventRegistration.create({
        data: {
          eventId: workshopEvent.id,
          studentId: student.id,
          status: "CONFIRMED",
          paymentStatus: "PAID",
        },
      });
    }

    // Register all students for cultural fest
    for (const student of createdStudents) {
      await tx.eventRegistration.create({
        data: {
          eventId: culturalEvent.id,
          studentId: student.id,
          status: "REGISTERED",
          paymentStatus: "PENDING",
        },
      });
    }
  });

  console.log("✅ Created event registrations.");

  // ──────────────────────────────────────────────
  // 14. CREATE GALLERY ITEMS
  // ──────────────────────────────────────────────
  console.log("🖼️ Creating gallery items...");

  const galleryItems = [
    {
      title: "College Building - New Baneshwor Campus",
      description: "Milton International College's main building located at New Baneshwor, Kathmandu.",
      imageUrl: "/images/gallery/campus-building.jpg",
      category: "Campus",
      tags: ["campus", "building", "infrastructure"],
      uploadedBy: superAdmin.id,
    },
    {
      title: "Computer Lab - BCA Students at Work",
      description: "BCA students working on programming assignments in the college computer lab.",
      imageUrl: "/images/gallery/computer-lab.jpg",
      category: "Facilities",
      tags: ["lab", "computers", "bca", "students"],
      uploadedBy: faculty1.id,
    },
    {
      title: "Library - Reading Hall",
      description: "The college library reading hall equipped with reference books, journals, and quiet study spaces.",
      imageUrl: "/images/gallery/library.jpg",
      category: "Facilities",
      tags: ["library", "reading", "study"],
      uploadedBy: admin.id,
    },
    {
      title: "Sports Day 2026 - Prize Distribution",
      description: "Students receiving medals and certificates at the 15th Annual Sports Day prize distribution ceremony.",
      imageUrl: "/images/gallery/sports-day-2026.jpg",
      category: "Events",
      tags: ["sports", "event", "prize", "students"],
      uploadedBy: faculty3.id,
    },
    {
      title: "Cultural Fest - Traditional Dance Performance",
      description: "Students performing traditional Nepali dance at the Milton Cultural Fest 2026.",
      imageUrl: "/images/gallery/cultural-fest.jpg",
      category: "Events",
      tags: ["cultural", "dance", "festival", "tradition"],
      uploadedBy: admin.id,
    },
  ];

  await prisma.$transaction(
    galleryItems.map((item) =>
      prisma.gallery.create({ data: item })
    )
  );

  console.log(`✅ Created ${galleryItems.length} gallery items.`);

  // ──────────────────────────────────────────────
  // 15. CREATE LIBRARY BOOKS
  // ──────────────────────────────────────────────
  console.log("📚 Creating library books...");

  const libraryBooks = [
    {
      title: "The C Programming Language",
      author: "Brian W. Kernighan & Dennis M. Ritchie",
      isbn: "978-0131103627",
      publisher: "Prentice Hall",
      category: "Computer Science",
      quantity: 10,
      available: 8,
      shelfLocation: "CS-A01",
      coverUrl: "/images/books/c-programming.jpg",
    },
    {
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen, Charles E. Leiserson",
      isbn: "978-0262033848",
      publisher: "MIT Press",
      category: "Computer Science",
      quantity: 6,
      available: 5,
      shelfLocation: "CS-A02",
      coverUrl: "/images/books/algorithms.jpg",
    },
    {
      title: "Database System Concepts",
      author: "Abraham Silberschatz, Henry F. Korth",
      isbn: "978-0073523323",
      publisher: "McGraw-Hill",
      category: "Computer Science",
      quantity: 8,
      available: 6,
      shelfLocation: "CS-A03",
      coverUrl: "/images/books/database.jpg",
    },
    {
      title: "Principles of Management",
      author: "Harold Koontz & Heinz Weihrich",
      isbn: "978-0071326467",
      publisher: "McGraw-Hill Education",
      category: "Management",
      quantity: 12,
      available: 10,
      shelfLocation: "MG-B01",
      coverUrl: "/images/books/management.jpg",
    },
    {
      title: "Financial Accounting",
      author: "Mukherjee & Hanif",
      isbn: "978-9387886234",
      publisher: "Tata McGraw-Hill",
      category: "Accounting",
      quantity: 7,
      available: 5,
      shelfLocation: "AC-C01",
      coverUrl: "/images/books/accounting.jpg",
    },
    {
      title: "Introduction to Social Work",
      author: "Rex A. Skidmore & Milton G. Thackeray",
      isbn: "978-0205272536",
      publisher: "Allyn & Bacon",
      category: "Social Work",
      quantity: 5,
      available: 4,
      shelfLocation: "SW-D01",
      coverUrl: "/images/books/social-work.jpg",
    },
  ];

  const createdBooks = await prisma.$transaction(
    libraryBooks.map((book) =>
      prisma.libraryBook.create({ data: book })
    )
  );

  console.log(`✅ Created ${createdBooks.length} library books.`);

  // ──────────────────────────────────────────────
  // 16. CREATE BOOK BORROWS
  // ──────────────────────────────────────────────
  console.log("📖 Creating book borrow records...");

  await prisma.$transaction(async (tx) => {
    const now = new Date();
    for (let i = 0; i < 3; i++) {
      const student = createdStudents[i];
      const book = createdBooks[i % createdBooks.length];
      const borrowedDate = new Date(now);
      borrowedDate.setDate(borrowedDate.getDate() - randomInt(5, 20));
      const dueDate = new Date(borrowedDate);
      dueDate.setDate(dueDate.getDate() + 14);

      await tx.bookBorrow.create({
        data: {
          bookId: book.id,
          studentId: student.id,
          borrowedDate,
          dueDate,
          returnedDate: i % 2 === 0 ? new Date() : null,
          status: i % 2 === 0 ? "RETURNED" : "BORROWED",
          fine: i % 2 === 0 ? null : null,
        },
      });
    }
  });

  console.log("✅ Created book borrow records.");

  // ──────────────────────────────────────────────
  // 17. CREATE MESSAGES
  // ──────────────────────────────────────────────
  console.log("✉️ Creating messages...");

  const messages = [
    {
      senderId: studentUsers[0].id,
      receiverId: admin.id,
      subject: "Question about BCA syllabus",
      content: "Dear Sir/Madam, I would like to know if there have been any recent updates to the BCA syllabus. Could you please provide the latest version? Thank you. - Aarav Sharma",
      read: true,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      senderId: admin.id,
      receiverId: studentUsers[0].id,
      subject: "Re: Question about BCA syllabus",
      content: "Dear Aarav, the BCA syllabus has been updated as per TU guidelines. Please visit the college website or check with Dr. Sharma for the detailed syllabus document. Best regards, Dr. Rajesh Hamal",
      read: true,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    },
    {
      senderId: studentUsers[3].id,
      receiverId: admin.id,
      subject: "Fee payment inquiry",
      content: "Respected Principal, I have paid my tuition fee but the online portal still shows it as pending. Could you please look into this matter? - Sita Poudel",
      read: false,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      senderId: admin.id,
      receiverId: studentUsers[3].id,
      subject: "Re: Fee payment inquiry",
      content: "Dear Sita, we have verified your payment and it has been updated in our system. Please check the portal again. If the issue persists, visit the accounts office. Best regards, Dr. Rajesh Hamal",
      read: true,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      senderId: studentUsers[7].id,
      receiverId: faculty1.id,
      subject: "Request for project guidance",
      content: "Dear Dr. Sharma, I am working on my third-semester project and would like to schedule a meeting to discuss my progress. Please let me know your available time slots. Thank you. - Deepa Neupane",
      read: false,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  ];

  await prisma.$transaction(
    messages.map((msg) => prisma.message.create({ data: msg }))
  );

  console.log(`✅ Created ${messages.length} messages.`);

  // ──────────────────────────────────────────────
  // 18. CREATE ASSIGNMENTS & SUBMISSIONS
  // ──────────────────────────────────────────────
  console.log("📝 Creating assignments and submissions...");

  await prisma.$transaction(async (tx) => {
    const bcaSem1Subjects = getSubjectsForProgramSemester("BCA", 1);
    const bcaSem3Subjects = getSubjectsForProgramSemester("BCA", 3);
    const bbmSem2Subjects = getSubjectsForProgramSemester("BBM", 2);

    const assignDefs = [
      {
        subjectId: bcaSem1Subjects[0]?.id,
        title: "C Programming Assignment: Data Structures",
        description: "Implement linked list, stack, and queue data structures using C programming language. Submit the source code with proper documentation.",
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        maxScore: 100,
        fileUrl: "/assignments/c-programming-dsa.pdf",
      },
      {
        subjectId: bcaSem1Subjects[1]?.id,
        title: "Digital Logic: Circuit Design Problem Set",
        description: "Design and simplify Boolean expressions using K-maps. Implement logic circuits using basic gates.",
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        maxScore: 50,
        fileUrl: null,
      },
      {
        subjectId: bcaSem3Subjects[0]?.id,
        title: "Statistics: Data Analysis Project",
        description: "Collect sample data, perform statistical analysis including mean, median, mode, standard deviation, and present findings using appropriate charts.",
        dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        maxScore: 100,
        fileUrl: "/assignments/statistics-project.pdf",
      },
      {
        subjectId: bbmSem2Subjects[0]?.id,
        title: "Organizational Behavior Case Study",
        description: "Analyze a real-world organization's culture and behavior. Submit a 2000-word report covering organizational structure, leadership style, and recommendations.",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxScore: 75,
        fileUrl: null,
      },
    ];

    for (const def of assignDefs) {
      if (!def.subjectId) continue;
      const assignment = await tx.assignment.create({
        data: {
          subjectId: def.subjectId,
          title: def.title,
          description: def.description,
          dueDate: def.dueDate,
          maxScore: def.maxScore,
          fileUrl: def.fileUrl,
        },
      });

      const relevantStudents = createdStudents.filter(
        (s) => {
          const programCode = s.enrollmentNumber.includes("BCA")
            ? "BCA"
            : s.enrollmentNumber.includes("BBM")
              ? "BBM"
              : s.enrollmentNumber.includes("BBS")
                ? "BBS"
                : "BASW";
          const subs = getSubjectsForProgramSemester(programCode, s.semester);
          return subs.some((sub) => sub.id === def.subjectId);
        }
      );

      for (const student of relevantStudents.slice(0, 3)) {
        await tx.assignmentSubmission.create({
          data: {
            assignmentId: assignment.id,
            studentId: student.id,
            fileUrl: `/submissions/${student.enrollmentNumber}/${assignment.id}.pdf`,
            score: randomItem([null, null, null, randomInt(60, 95)]),
            feedback: null,
            submittedAt: new Date(Date.now() - randomInt(1, 5) * 24 * 60 * 60 * 1000),
            status: randomItem(["SUBMITTED", "GRADED"] as const),
          },
        });
      }
    }
  });

  console.log("✅ Created assignments and submissions.");

  // ──────────────────────────────────────────────
  // 19. CREATE APPLICANTS
  // ──────────────────────────────────────────────
  console.log("📋 Creating applicants...");

  const applicants = [
    {
      firstName: "Ramesh",
      lastName: "Adhikari",
      email: "ramesh.adhikari@gmail.com",
      phone: "9861012345",
      programId: bcaProgram.id,
      address: "Kalanki, Kathmandu",
      dob: new Date("2004-03-15"),
      gender: "Male",
      nationality: "Nepali",
      previousSchool: "Trinity International College",
      previousGrade: "3.2 GPA",
      documents: ["transcript.pdf", "character.pdf", "citizenship.pdf"],
      status: "PENDING" as const,
      notes: null,
    },
    {
      firstName: "Asha",
      lastName: "Magar",
      email: "asha.magar@gmail.com",
      phone: "9861023456",
      programId: bbmProgram.id,
      address: "Butwal, Rupandehi",
      dob: new Date("2004-07-22"),
      gender: "Female",
      nationality: "Nepali",
      previousSchool: "Butwal Multiple Campus",
      previousGrade: "3.0 GPA",
      documents: ["transcript.pdf", "character.pdf", "citizenship.pdf"],
      status: "REVIEWING" as const,
      notes: "Strong recommendation from previous school.",
    },
    {
      firstName: "Mohan",
      lastName: "Khadgi",
      email: "mohan.khadgi@gmail.com",
      phone: "9861034567",
      programId: baswProgram.id,
      address: "Patan, Lalitpur",
      dob: new Date("2003-11-08"),
      gender: "Male",
      nationality: "Nepali",
      previousSchool: "Patan High School",
      previousGrade: "2.8 GPA",
      documents: ["transcript.pdf"],
      status: "ACCEPTED" as const,
      notes: "Accepted for BASW program 2026 batch.",
    },
    {
      firstName: "Sushma",
      lastName: "Dahal",
      email: "sushma.dahal@gmail.com",
      phone: "9861045678",
      programId: bbsProgram.id,
      address: "Kirtipur, Kathmandu",
      dob: new Date("2004-01-30"),
      gender: "Female",
      nationality: "Nepali",
      previousSchool: "Kirtipur Secondary School",
      previousGrade: "3.5 GPA",
      documents: ["transcript.pdf", "character.pdf", "citizenship.pdf", "migration.pdf"],
      status: "ACCEPTED" as const,
      notes: "Merit scholarship recommended.",
    },
  ];

  await prisma.$transaction(
    applicants.map((a) => prisma.applicant.create({ data: a }))
  );

  console.log(`✅ Created ${applicants.length} applicants.`);

  // ──────────────────────────────────────────────
  // 20. CREATE ACTIVITY LOGS
  // ──────────────────────────────────────────────
  console.log("📊 Creating activity logs...");

  const activities = [
    { userId: superAdmin.id, action: "LOGIN", entity: "User", entityId: superAdmin.id, details: "Super Admin logged in from admin panel." },
    { userId: admin.id, action: "LOGIN", entity: "User", entityId: admin.id, details: "Admin logged in from admin panel." },
    { userId: superAdmin.id, action: "CREATE", entity: "User", entityId: studentUsers[0].id, details: "Created new student user: Aarav Sharma" },
    { userId: admin.id, action: "UPDATE", entity: "News", entityId: null, details: "Published news article: Admission Open for 2026-2027" },
    { userId: faculty1.id, action: "MARK_ATTENDANCE", entity: "Attendance", entityId: null, details: "Marked attendance for BCA 1st Semester students." },
    { userId: accountant.id, action: "UPDATE", entity: "Fee", entityId: null, details: "Updated fee status for student: Sita Poudel" },
  ];

  await prisma.$transaction(
    activities.map((a) => prisma.activityLog.create({ data: a }))
  );

  console.log(`✅ Created ${activities.length} activity logs.`);

  // ──────────────────────────────────────────────
  // SUMMARY
  // ──────────────────────────────────────────────
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log("\n🎉 Database seeding completed successfully!");
  console.log(`⏱️  Time taken: ${elapsed}s`);
  console.log("\n📊 Summary:");
  console.log(`   👤 Users: ${7 + studentUsers.length}`);
  console.log(`   📚 Programs: 4`);
  console.log(`   📖 Subjects: ${Object.keys(createdSubjects).length}`);
  console.log(`   👨‍🏫 Faculty: 3`);
  console.log(`   🎓 Students: ${createdStudents.length}`);
  console.log(`   📋 Attendance: ${attendanceCount}`);
  console.log(`   💰 Fee records: ${feeCount}`);
  console.log(`   📝 Grades: ${gradeCount}`);
  console.log(`   📰 News articles: ${newsItems.length}`);
  console.log(`   🎪 Events: 3`);
  console.log(`   🖼️ Gallery items: ${galleryItems.length}`);
  console.log(`   📚 Library books: ${createdBooks.length}`);
  console.log(`   ✉️ Messages: ${messages.length}`);
  console.log(`   📋 Applicants: ${applicants.length}`);
  console.log(`   📊 Activity logs: ${activities.length}`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
