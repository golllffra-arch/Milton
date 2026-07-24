export interface FacultyMember {
  id: string
  name: string
  qualifications: string
  specialization: string
  subjects: string[]
  department: string
  email: string
  bio?: string
  education?: string[]
  experience?: { role: string; institution: string; years: string }[]
  achievements?: string[]
}

export const FACULTY: FacultyMember[] = [
  {
    id: "rajesh-sharma", name: "Prof. Dr. Rajesh Sharma",
    qualifications: "Ph.D. in Computer Science, M.Sc. IT",
    specialization: "Data Structures, Algorithms, Database Systems",
    subjects: ["Data Structures", "Database Management", "Algorithm Analysis"],
    department: "BCA", email: "rajesh.sharma@milton.edu.com",
    bio: "Prof. Dr. Rajesh Sharma has over 15 years of teaching and research experience in computer science. He has published numerous research papers in international journals and has guided several Ph.D. students. His passion for teaching and commitment to student success make him a valued member of the Milton faculty.",
    education: ["Ph.D. in Computer Science - Tribhuvan University", "M.Sc. IT - Kathmandu University", "B.Sc. Computer Science - TU"],
    experience: [
      { role: "Professor", institution: "Milton International College", years: "2015 - Present" },
      { role: "Associate Professor", institution: "Purbanchal University", years: "2010 - 2015" },
      { role: "Lecturer", institution: "Kathmandu College", years: "2008 - 2010" },
    ],
    achievements: ["Best Researcher Award 2020", "Published 25+ research papers", "Ph.D. guide for 5 scholars"],
  },
  {
    id: "sunita-koirala", name: "Dr. Sunita Koirala",
    qualifications: "Ph.D. in Management, MBA",
    specialization: "Marketing Management, Organizational Behavior",
    subjects: ["Marketing Management", "Organizational Behavior", "Business Communication"],
    department: "BBM", email: "sunita.koirala@milton.edu.com",
    bio: "Dr. Sunita Koirala brings a wealth of industry and academic experience to the classroom. With a Ph.D. in Management and an MBA, she combines theoretical knowledge with practical business insights. She has worked with leading corporations before transitioning to academia.",
    education: ["Ph.D. in Management - Tribhuvan University", "MBA - Kathmandu University", "BBA - Purbanchal University"],
    experience: [
      { role: "Associate Professor", institution: "Milton International College", years: "2016 - Present" },
      { role: "Marketing Manager", institution: "Nepal Investment Bank", years: "2012 - 2016" },
      { role: "Lecturer", institution: "Kathmandu College", years: "2009 - 2012" },
    ],
    achievements: ["Best Teacher Award 2022", "Corporate Leadership Award", "Research Excellence Award"],
  },
  {
    id: "bibek-thapa", name: "Asst. Prof. Bibek Thapa",
    qualifications: "M.Sc. in Mathematics, M.Phil.",
    specialization: "Applied Mathematics, Statistics",
    subjects: ["Business Mathematics", "Statistics", "Quantitative Methods"],
    department: "BBS", email: "bibek.thapa@milton.edu.com",
    bio: "Asst. Prof. Bibek Thapa is a dedicated mathematics educator with a talent for making complex concepts accessible. His M.Phil. research focused on applied statistical methods in business, and he regularly conducts workshops on data analysis.",
    education: ["M.Phil. in Mathematics - Tribhuvan University", "M.Sc. Mathematics - TU", "B.Sc. Mathematics - TU"],
    experience: [
      { role: "Assistant Professor", institution: "Milton International College", years: "2017 - Present" },
      { role: "Mathematics Lecturer", institution: "Trinity College", years: "2013 - 2017" },
    ],
    achievements: ["Published 10+ research papers", "Workshop facilitator on Data Science"],
  },
  {
    id: "anju-poudel", name: "Ms. Anju Poudel",
    qualifications: "MSW, M.A. Sociology",
    specialization: "Community Development, Social Research",
    subjects: ["Social Work Practice", "Community Development", "Social Research Methods"],
    department: "BASW", email: "anju.poudel@milton.edu.com",
    bio: "Ms. Anju Poudel is a passionate social work educator with extensive field experience in community development. She has led numerous community outreach programs and research projects focused on social justice and women empowerment.",
    education: ["MSW - Tribhuvan University", "M.A. Sociology - TU", "BSW - Purbanchal University"],
    experience: [
      { role: "Assistant Professor", institution: "Milton International College", years: "2018 - Present" },
      { role: "Social Worker", institution: "Save the Children Nepal", years: "2014 - 2018" },
      { role: "Research Associate", institution: "NGO Federation Nepal", years: "2012 - 2014" },
    ],
    achievements: ["Community Service Award 2021", "Research Grant from UGC Nepal"],
  },
  {
    id: "sagar-acharya", name: "Er. Sagar Acharya",
    qualifications: "M.E. in Software Engineering, B.E. Computer",
    specialization: "Web Technologies, Software Architecture",
    subjects: ["Web Development", "Software Engineering", "Object-Oriented Programming"],
    department: "BCA", email: "sagar.acharya@milton.edu.com",
    education: ["M.E. Software Engineering - Pokhara University", "B.E. Computer - Kathmandu University"],
    experience: [
      { role: "Assistant Professor", institution: "Milton International College", years: "2019 - Present" },
      { role: "Software Engineer", institution: "Leapfrog Technology", years: "2015 - 2019" },
    ],
    achievements: ["Built college management system", "Google认证开发者"],
  },
  {
    id: "krishna-dhungana", name: "Mr. Krishna Dhungana",
    qualifications: "MBA, M.A. Economics",
    specialization: "Microeconomics, Financial Management",
    subjects: ["Microeconomics", "Financial Management", "Business Environment"],
    department: "BBM", email: "krishna.dhungana@milton.edu.com",
    education: ["MBA - Tribhuvan University", "M.A. Economics - TU"],
    experience: [
      { role: "Lecturer", institution: "Milton International College", years: "2018 - Present" },
      { role: "Financial Analyst", institution: "NMB Bank", years: "2014 - 2018" },
    ],
    achievements: ["Published case studies on Nepal's economy"],
  },
  {
    id: "mamata-ghimire", name: "Ms. Mamata Ghimire",
    qualifications: "M.A. English, M.Ed.",
    specialization: "English Literature, Academic Writing",
    subjects: ["English Composition", "Academic Writing", "Communication Skills"],
    department: "Administration", email: "mamata.ghimire@milton.edu.com",
    education: ["M.A. English - Tribhuvan University", "M.Ed. - TU"],
    experience: [
      { role: "Senior Lecturer", institution: "Milton International College", years: "2015 - Present" },
      { role: "English Teacher", institution: "St. Xavier's College", years: "2011 - 2015" },
    ],
    achievements: ["Best Teacher Award 2019", "Curriculum development for communication"],
  },
  {
    id: "prakash-neupane", name: "Mr. Prakash Neupane",
    qualifications: "M.Sc. Physics, B.Ed.",
    specialization: "Physics, General Science",
    subjects: ["General Science", "Physics Fundamentals", "Environmental Studies"],
    department: "BBS", email: "prakash.neupane@milton.edu.com",
    education: ["M.Sc. Physics - Tribhuvan University", "B.Ed. - TU"],
    experience: [
      { role: "Lecturer", institution: "Milton International College", years: "2016 - Present" },
      { role: "Science Teacher", institution: "Capital College", years: "2012 - 2016" },
    ],
    achievements: ["Science Olympiad coach", "Lab development contributor"],
  },
  {
    id: "srijana-baral", name: "Ms. Srijana Baral",
    qualifications: "MSW, M.A. Gender Studies",
    specialization: "Gender Studies, Counseling, Human Rights",
    subjects: ["Social Welfare", "Gender Studies", "Counseling Skills"],
    department: "BASW", email: "srijana.baral@milton.edu.com",
    education: ["MSW - Tribhuvan University", "M.A. Gender Studies - TU"],
    experience: [
      { role: "Assistant Professor", institution: "Milton International College", years: "2019 - Present" },
      { role: "Counselor", institution: "Women's Rehabilitation Center", years: "2015 - 2019" },
    ],
    achievements: ["Human Rights Advocacy Award", "Counseling certification from WHO"],
  },
  {
    id: "anil-maharjan", name: "Mr. Anil Maharjan",
    qualifications: "M.C.A., B.Sc. IT",
    specialization: "Computer Networks, Cyber Security",
    subjects: ["Computer Networks", "Cyber Security", "Operating Systems"],
    department: "BCA", email: "anil.maharjan@milton.edu.com",
    education: ["M.C.A. - Purbanchal University", "B.Sc. IT - Kathmandu University"],
    experience: [
      { role: "Assistant Professor", institution: "Milton International College", years: "2020 - Present" },
      { role: "Network Engineer", institution: "WorldLink Communications", years: "2016 - 2020" },
    ],
    achievements: ["CEH Certified", "Network security workshop facilitator"],
  },
]
