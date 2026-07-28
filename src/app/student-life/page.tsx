"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import {
  Users, Trophy, Music, Globe, Heart, BookOpen,
  Palette, Handshake, Quote, MapPin, ArrowRight,
  Camera, Sparkles, ChevronRight, Star, Guitar,
  Laptop, Dumbbell, Theater
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const CLUBS = [
  { icon: Laptop, name: "IT Club", description: "Coding competitions, workshops, hackathons, and tech talks to sharpen your programming skills.", color: "from-blue-600 to-cyan-700" },
  { icon: Users, name: "Debate & Public Speaking Club", description: "Sharpen your oratory skills through debates, extempore, and public speaking events.", color: "from-purple-600 to-violet-700" },
  { icon: Dumbbell, name: "Sports Club", description: "Organizes inter-college tournaments, fitness challenges, and recreational sports activities.", color: "from-green-600 to-emerald-700" },
  { icon: Palette, name: "Cultural Club", description: "Celebrates Nepal's diverse culture through dance, music, drama, and art exhibitions.", color: "from-amber-600 to-orange-700" },
  { icon: Heart, name: "Community Service Club", description: "Volunteer initiatives, awareness campaigns, and social outreach programs for community impact.", color: "from-rose-600 to-red-700" },
  { icon: Globe, name: "Tourism & Travel Club", description: "Organizes educational tours, treks, and international exposure trips for students.", color: "from-teal-600 to-cyan-700" },
]

const TOURS = [
  { destination: "Dubai, UAE", description: "Visit to tech parks, business hubs, and cultural landmarks in Dubai.", year: "2026" },
  { destination: "Singapore", description: "Academic exchange at NUS, industry visits to tech companies.", year: "2025" },
  { destination: "Malaysia", description: "University visits, cultural immersion, and business exposure in Kuala Lumpur.", year: "2025" },
  { destination: "Thailand", description: "Bangkok study tour with visits to multinational corporations and cultural sites.", year: "2024" },
]

const GALLERY_THUMBS = [
  { color: "from-blue-600 to-indigo-800", label: "Sports Day" },
  { color: "from-amber-600 to-yellow-800", label: "Cultural Fest" },
  { color: "from-green-600 to-emerald-800", label: "IT Workshop" },
  { color: "from-rose-600 to-pink-800", label: "Volunteer Drive" },
  { color: "from-cyan-600 to-teal-800", label: "Study Tour" },
  { color: "from-purple-600 to-violet-800", label: "Debate Comp" },
]

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="atmosphere-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? "var(--page-primary, #7c3aed)" : i % 3 === 1 ? "var(--page-secondary, #ec4899)" : "var(--page-accent, #fbbf24)",
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        />
      ))}
      <div
        className="atmosphere-blob"
        style={{
          background: "var(--page-primary, #7c3aed)",
          width: "300px",
          height: "300px",
          top: "-10%",
          left: "-5%",
          animationDelay: "0s",
        }}
      />
      <div
        className="atmosphere-blob"
        style={{
          background: "var(--page-secondary, #ec4899)",
          width: "250px",
          height: "250px",
          bottom: "-10%",
          right: "-5%",
          animationDelay: "-3s",
        }}
      />
      <div
        className="atmosphere-blob"
        style={{
          background: "var(--page-accent, #fbbf24)",
          width: "200px",
          height: "200px",
          top: "30%",
          left: "50%",
          animationDelay: "-6s",
          opacity: 0.15,
        }}
      />
    </div>
  )
}

export default function StudentLifePage() {
  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg, var(--page-hero-from, #db2777), var(--page-hero-to, #14b8a6))" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(227,28,35,0.15),transparent_60%)] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,168,76,0.08),transparent_50%)] z-0" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNFYzNEg2ek02IDRWMEg0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] z-0 opacity-30" />
        <FloatingParticles />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-white/20 text-white/80 bg-white/5 backdrop-blur-sm">
              <Users className="w-3.5 h-3.5 mr-1.5" style={{ color: "var(--page-secondary, #14b8a6)" }} />
              Campus Life
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight"
          >
            Student Life at Milton
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Beyond the classroom — discover a vibrant campus filled with clubs, sports,
            cultural events, international tours, and lifelong friendships.
          </motion.p>
        </div>
      </section>

      {/* ─── CLUBS & SOCIETIES ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-14">
            <Badge variant="info" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Get Involved</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white" style={{ color: "var(--page-text, #831843)" }}>
              Clubs & Societies
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover your passion and build skills beyond academics through our diverse clubs.
            </p>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLUBS.map((club, index) => {
              const Icon = club.icon
              return (
                <FadeInSection key={club.name}>
                  <motion.div whileHover={{ y: -6 }} className="group h-full">
                    <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                      <div className={`bg-gradient-to-br ${club.color} p-5`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-display font-bold dark:text-white mb-2" style={{ color: "var(--page-text, #831843)" }}>{club.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{club.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── SPORTS & ATHLETICS ─── */}
      <section className="py-20 dark:bg-gray-900" style={{ background: "var(--page-bg, #fdf2f8)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <Badge variant="warning" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Stay Active</Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white leading-tight" style={{ color: "var(--page-text, #831843)" }}>
                Sports &<br />
                <span style={{ color: "var(--page-secondary, #14b8a6)" }}>Athletics</span>
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Milton believes in the holistic development of students through sports and physical fitness.
                Our sports program includes cricket, basketball, football, volleyball, table tennis, badminton,
                and athletics. We have dedicated coaches and facilities to help students excel in their chosen sports.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: "Cricket", emoji: "🏏" },
                  { label: "Basketball", emoji: "🏀" },
                  { label: "Football", emoji: "⚽" },
                  { label: "Table Tennis", emoji: "🏓" },
                  { label: "Badminton", emoji: "🏸" },
                  { label: "Volleyball", emoji: "🏐" },
                  { label: "Athletics", emoji: "🏃" },
                  { label: "Chess", emoji: "♟️" },
                ].map((sport) => (
                  <div key={sport.label} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <span className="text-xl">{sport.emoji}</span>
                    <span className="text-sm font-medium dark:text-white" style={{ color: "var(--page-text, #831843)" }}>{sport.label}</span>
                  </div>
                ))}
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#c9a84c]/20 rounded-2xl" />
                <div className="relative bg-gradient-to-br from-green-600 to-emerald-800 rounded-2xl p-10 shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
                  <Trophy className="w-16 h-16 text-white/30 mb-6 relative z-10" />
                  <h3 className="text-3xl font-display font-bold text-white relative z-10">Inter-College Champions</h3>
                  <p className="text-white/70 mt-2 relative z-10">
                    Our teams have consistently won inter-college tournaments across multiple sports disciplines.
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── EVENTS & FESTIVALS ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-14">
            <Badge variant="info" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Celebrate</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white" style={{ color: "var(--page-text, #831843)" }}>
              Events & Festivals
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From cultural festivals to academic fests, the Milton calendar is packed with exciting events year-round.
            </p>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Music, title: "Milton Mela", description: "Annual college fest with music, dance competitions, food stalls, and celebrity performances that bring the entire campus together.",
                color: "from-rose-500 to-pink-700",
              },
              {
                icon: Laptop, title: "Tech Fusion", description: "Inter-college tech festival featuring coding competitions, robotics, gaming tournaments, and workshops by industry experts.",
                color: "from-blue-500 to-indigo-700",
              },
              {
                icon: Palette, title: "Cultural Extravaganza", description: "Celebration of Nepali culture through traditional dance, music, art exhibitions, and ethnic food fairs during major festivals.",
                color: "from-amber-500 to-orange-700",
              },
              {
                icon: Users, title: "Freshers' Welcome", description: "A grand welcome event for new students featuring ice-breaking sessions, talent shows, and campus orientation.",
                color: "from-green-500 to-emerald-700",
              },
              {
                icon: Heart, title: "Community Week", description: "A week dedicated to social service with blood donation drives, orphanage visits, environmental clean-ups, and awareness campaigns.",
                color: "from-red-500 to-rose-700",
              },
              {
                icon: Globe, title: "International Day", description: "Celebrating global cultures with international food, costumes, presentations, and exchange stories from study tours.",
                color: "from-cyan-500 to-teal-700",
              },
            ].map((event, index) => {
              const Icon = event.icon
              return (
                <FadeInSection key={event.title}>
                  <motion.div whileHover={{ y: -4 }} className="group h-full">
                    <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                      <div className={`bg-gradient-to-br ${event.color} p-5`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-display font-bold dark:text-white mb-2" style={{ color: "var(--page-text, #831843)" }}>{event.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{event.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── INTERNATIONAL TOURS ─── */}
      <section className="py-20 dark:bg-gray-900" style={{ background: "var(--page-bg, #fdf2f8)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-14">
            <Badge variant="warning" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Global Exposure</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white" style={{ color: "var(--page-text, #831843)" }}>
              International Tours
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Broadening horizons through global exposure — our students travel the world for learning and cultural exchange.
            </p>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOURS.map((tour, index) => (
              <FadeInSection key={tour.destination}>
                <motion.div whileHover={{ y: -6 }} className="group h-full">
                  <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                    <div className="bg-gradient-to-br from-sky-600 to-blue-800 p-6 text-center relative">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] opacity-30" />
                      <Globe className="w-12 h-12 text-white/40 mx-auto mb-2 relative z-10" />
                      <h3 className="text-xl font-display font-bold text-white relative z-10">{tour.destination}</h3>
                    </div>
                    <CardContent className="p-5">
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">{tour.description}</p>
                      <Badge variant="info" className="text-[10px]">{tour.year}</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PHOTO GALLERY ROW ─── */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-10">
            <Badge variant="info" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Campus Moments</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white" style={{ color: "var(--page-text, #831843)" }}>
              Life in Pictures
            </h2>
          </FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {GALLERY_THUMBS.map((thumb, index) => (
              <FadeInSection key={thumb.label}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-br ${thumb.color} aspect-square rounded-xl flex items-center justify-center relative group cursor-pointer overflow-hidden`}
                >
                  <Camera className="w-8 h-8 text-white/40 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-white text-xs font-medium">{thumb.label}</span>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ─── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--page-hero-from, #db2777), var(--page-hero-to, #14b8a6))" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(227,28,35,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(201,168,76,0.06),transparent_50%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <Quote className="w-14 h-14 mx-auto mb-6" style={{ color: "var(--page-accent, #fbbf24)" }} />
            <blockquote className="text-2xl md:text-3xl font-display text-white leading-relaxed italic">
              &ldquo;Milton gave me more than a degree — it gave me a family. The clubs, the festivals,
              the international tour to Singapore, and the lifelong friendships I made here shaped who
              I am today. Campus life at Milton is vibrant, supportive, and unforgettable.&rdquo;
            </blockquote>
            <div className="mt-8">
              <div className="w-16 h-16 rounded-full bg-[#c9a84c] flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">RS</span>
              </div>
              <p className="text-white font-display font-bold text-lg">Riya Shrestha</p>
              <p className="text-white/60 text-sm">BCA Graduate, Class of 2025</p>
              <div className="flex justify-center gap-1 mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#c9a84c]" style={{ color: "var(--page-accent, #fbbf24)" }} />
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 dark:bg-gray-900" style={{ background: "var(--page-bg, #fdf2f8)" }}>
        <FloatingParticles />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeInSection>
            <Sparkles className="w-12 h-12 mx-auto mb-6" style={{ color: "var(--page-accent, #fbbf24)" }} />
            <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white leading-tight" style={{ color: "var(--page-text, #831843)" }}>
              Experience Milton{" "}
              <span style={{ color: "var(--page-secondary, #14b8a6)" }}>Yourself</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Come visit our campus, meet our students, and see why Milton is the place to be.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" asChild className="text-white shadow-xl" style={{ background: "var(--page-secondary, #14b8a6)" }}>
                <Link href="/contact">
                  Schedule a Visit
                  <MapPin className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="hover:text-white" style={{ borderColor: "var(--page-primary, #db2777)", color: "var(--page-primary, #db2777)" }}>
                <Link href="/virtual-tour">
                  Take Virtual Tour
                </Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}
