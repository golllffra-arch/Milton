export interface GalleryAlbum {
  id: string
  title: string
  category: string
  color: string
  coverDescription: string
  images: { src: string; caption: string }[]
  date?: string
}

export const GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: "annual-sports-day-2026", title: "Annual Sports Day 2026", category: "sports",
    color: "from-[#1b3f63] to-[#1b3f63]", coverDescription: "Students competing in various sports events",
    date: "March 2026",
    images: [
      { src: "", caption: "Opening ceremony with torch relay" },
      { src: "", caption: "100m sprint finals" },
      { src: "", caption: "Basketball tournament" },
      { src: "", caption: "Medal ceremony winners" },
      { src: "", caption: "Volleyball match" },
      { src: "", caption: "Closing ceremony" },
    ],
  },
  {
    id: "tech-fest-coding", title: "Tech Fest Coding Competition", category: "events",
    color: "from-[#1b3f63] to-[#1b3f63]", coverDescription: "Students participating in coding challenge",
    date: "February 2026",
    images: [
      { src: "", caption: "Competition opening" },
      { src: "", caption: "Participants coding" },
      { src: "", caption: "Judges reviewing submissions" },
      { src: "", caption: "Winner announcement" },
    ],
  },
  {
    id: "college-library", title: "College Library", category: "campus",
    color: "from-[#fe0000] to-[#fe0000]", coverDescription: "Our well-stocked library facility",
    date: "2026",
    images: [
      { src: "", caption: "Main reading hall" },
      { src: "", caption: "Book shelves" },
      { src: "", caption: "Digital resource section" },
      { src: "", caption: "Study carrels" },
      { src: "", caption: "Reference section" },
    ],
  },
  {
    id: "dashain-celebration-2025", title: "Dashain Celebration 2025", category: "cultural",
    color: "from-[#fe0000] to-[#fe0000]", coverDescription: "Dashain festival celebration on campus",
    date: "October 2025",
    images: [
      { src: "", caption: "Tika ceremony" },
      { src: "", caption: "Cultural performances" },
      { src: "", caption: "Feast and gathering" },
      { src: "", caption: "Traditional music" },
    ],
  },
  {
    id: "singapore-study-tour", title: "Singapore Study Tour", category: "tours",
    color: "from-[#1b3f63] to-[#1b3f63]", coverDescription: "Students on educational tour to Singapore",
    date: "January 2026",
    images: [
      { src: "", caption: "At Singapore CBD" },
      { src: "", caption: "University visit" },
      { src: "", caption: "Gardens by the Bay" },
      { src: "", caption: "Sentosa Island" },
      { src: "", caption: "Cultural immersion" },
      { src: "", caption: "Group photo" },
    ],
  },
  {
    id: "computer-lab-session", title: "Computer Lab Session", category: "campus",
    color: "from-[#1b3f63] to-[#1b3f63]", coverDescription: "Students in modern computer lab",
    date: "2026",
    images: [
      { src: "", caption: "Lab overview" },
      { src: "", caption: "Programming practical" },
      { src: "", caption: "Instructor helping students" },
    ],
  },
  {
    id: "inter-college-debate", title: "Inter-College Debate", category: "events",
    color: "from-[#fe0000] to-[#fe0000]", coverDescription: "Debate competition between colleges",
    date: "December 2025",
    images: [
      { src: "", caption: "Debate stage" },
      { src: "", caption: "Participants arguing" },
      { src: "", caption: "Audience" },
      { src: "", caption: "Award ceremony" },
    ],
  },
  {
    id: "basketball-tournament", title: "Basketball Tournament", category: "sports",
    color: "from-[#1b3f63] to-[#1b3f63]", coverDescription: "Inter-class basketball competition",
    date: "February 2026",
    images: [
      { src: "", caption: "Tip-off" },
      { src: "", caption: "Action shot" },
      { src: "", caption: "Team huddle" },
      { src: "", caption: "Champions" },
    ],
  },
  {
    id: "cultural-day-performances", title: "Cultural Day Performances", category: "cultural",
    color: "from-[#fe0000] to-[#fe0000]", coverDescription: "Students showcasing cultural performances",
    date: "November 2025",
    images: [
      { src: "", caption: "Traditional dance" },
      { src: "", caption: "Music performance" },
      { src: "", caption: "Costume display" },
      { src: "", caption: "Audience cheering" },
      { src: "", caption: "Group performance" },
    ],
  },
  {
    id: "dubai-industrial-visit", title: "Dubai Industrial Visit", category: "tours",
    color: "from-[#1b3f63] to-[#1b3f63]", coverDescription: "Industry visit to Dubai",
    date: "December 2025",
    images: [
      { src: "", caption: "At Dubai skyline" },
      { src: "", caption: "Company visit" },
      { src: "", caption: "Desert safari" },
      { src: "", caption: "Group photo" },
    ],
  },
  {
    id: "classroom-discussion", title: "Classroom Discussion", category: "campus",
    color: "from-slate-600 to-gray-800", coverDescription: "Interactive classroom sessions",
    date: "2026",
    images: [
      { src: "", caption: "Group discussion" },
      { src: "", caption: "Presentation" },
      { src: "", caption: "Teacher interaction" },
    ],
  },
  {
    id: "freshers-party-2025", title: "Freshers' Party 2025", category: "events",
    color: "from-[#1b3f63] to-[#1b3f63]", coverDescription: "Welcome party for new students",
    date: "November 2025",
    images: [
      { src: "", caption: "Stage decoration" },
      { src: "", caption: "New students" },
      { src: "", caption: " performances" },
      { src: "", caption: "Group photo" },
    ],
  },
  {
    id: "volunteer-orphanage", title: "Volunteer at Orphanage", category: "cultural",
    color: "from-[#1b3f63] to-[#1b3f63]", coverDescription: "Students volunteering at local orphanage",
    date: "January 2026",
    images: [
      { src: "", caption: "With children" },
      { src: "", caption: "Teaching session" },
      { src: "", caption: "Donation drive" },
    ],
  },
  {
    id: "malaysia-university-visit", title: "Malaysia University Visit", category: "tours",
    color: "from-[#1b3f63] to-[#1b3f63]", coverDescription: "Visiting universities in Malaysia",
    date: "January 2026",
    images: [
      { src: "", caption: "University campus" },
      { src: "", caption: "Lab visit" },
      { src: "", caption: "International students" },
      { src: "", caption: "Cultural exchange" },
    ],
  },
  {
    id: "campus-main-building", title: "Campus View - Main Building", category: "campus",
    color: "from-stone-600 to-neutral-800", coverDescription: "Exterior view of main building",
    date: "2026",
    images: [
      { src: "", caption: "Front view" },
      { src: "", caption: "Entrance" },
      { src: "", caption: "Garden" },
      { src: "", caption: "Parking area" },
    ],
  },
]
