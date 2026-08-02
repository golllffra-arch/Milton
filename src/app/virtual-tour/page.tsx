"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  Play, MapPin, Monitor, BookOpen, Dumbbell, Utensils,
  Building2, Camera, ArrowRight, Maximize2, Globe, ChevronRight,
  Eye, Sparkles, GraduationCap, Wifi, Library, TreePine
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const HIGHLIGHTS = [
  { icon: Monitor, name: "Computer Labs", description: "Modern computer labs with high-speed internet and latest software for hands-on learning.", color: "from-[#1b3a5c] to-[#12283f]" },
  { icon: Library, name: "Library", description: "Well-stocked library with thousands of books, journals, and digital resources for research.", color: "from-[#d93a2b] to-[#b82e21]" },
  { icon: Building2, name: "Smart Classrooms", description: "Fully equipped smart classrooms with projectors, audio systems, and interactive boards.", color: "from-[#1b3a5c] to-[#12283f]" },
  { icon: Dumbbell, name: "Sports Ground", description: "Spacious grounds for cricket, football, basketball, volleyball, and athletic events.", color: "from-[#1b3a5c] to-[#12283f]" },
  { icon: Utensils, name: "Cafeteria", description: "Hygienic and spacious cafeteria serving nutritious meals, snacks, and beverages.", color: "from-[#d93a2b] to-[#b82e21]" },
  { icon: TreePine, name: "Student Lounge", description: "Relax and socialize in our comfortable student lounge with recreational activities.", color: "from-[#1b3a5c] to-[#12283f]" },
]

const LOCATIONS = [
  { name: "New Baneshwor, Kathmandu", desc: "Heart of Kathmandu valley, easily accessible from all parts of the city" },
  { name: "TU Affiliated Campus", desc: "Officially affiliated with Tribhuvan University since 2012" },
  { name: "5 Minutes from Airport", desc: "Conveniently located near Tribhuvan International Airport" },
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
      {Array.from({ length: 20 }).map((_: unknown, i: number) => (
        <div
          key={i}
          className="atmosphere-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? "var(--page-primary, #1b3a5c)" : i % 3 === 1 ? "var(--page-secondary, #d93a2b)" : "var(--page-accent, #d93a2b)",
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
          background: "var(--page-primary, #1b3a5c)",
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
          background: "var(--page-secondary, #d93a2b)",
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
          background: "var(--page-accent, #d93a2b)",
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

export default function VirtualTourPage() {
  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg, var(--page-hero-from, #1e293b), var(--page-hero-to, #0f172a))" }} />
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
              <Globe className="w-3.5 h-3.5 mr-1.5" style={{ color: "var(--page-secondary, #d93a2b)" }} />
              Explore Milton
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight"
          >
            Virtual Campus Tour
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Explore Milton International College from anywhere in the world. Take a virtual walk
            through our campus, facilities, and learning spaces.
          </motion.p>
        </div>
      </section>

      {/* ─── VIDEO TOUR ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-10">
            <Badge variant="info" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Watch</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white" style={{ color: "var(--page-text, #f1f5f9)" }}>
              Campus Video Tour
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Take a visual journey through our campus, classrooms, labs, and student spaces.
            </p>
          </FadeInSection>
          <FadeInSection>
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video flex items-center justify-center relative" style={{ background: "linear-gradient(135deg, var(--page-hero-from, #1e293b), var(--page-hero-to, #0f172a))" }}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(227,28,35,0.12),transparent_60%)]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer shadow-2xl" style={{ background: "var(--page-secondary, #d93a2b)" }}
                  >
                    <Play className="w-8 h-8 text-white ml-1" />
                  </motion.div>
                  <p className="mt-4 text-white/60 text-sm font-medium">Play Campus Tour Video</p>
                </div>
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="outline" className="border-white/20 text-white/80 bg-black/30 backdrop-blur-sm">4K Tour</Badge>
                </div>
                <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-white/60" />
                  <span className="text-white/60 text-xs">Fullscreen</span>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─── 360° GALLERY ─── */}
      <section className="py-20 dark:bg-gray-900" style={{ background: "var(--page-bg, #0f172a)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-14">
            <Badge variant="warning" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Immersive Views</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white" style={{ color: "var(--page-text, #f1f5f9)" }}>
              360° Photo Gallery
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Spin, pan, and explore every corner of our campus with interactive 360° views.
            </p>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Main Entrance & Plaza", color: "from-[#1e293b] to-[#0f172a]" },
              { name: "Computer Science Lab", color: "from-[#1b3a5c] to-[#12283f]" },
              { name: "Central Library", color: "from-[#d93a2b] to-[#b82e21]" },
              { name: "Sports Ground", color: "from-[#1b3a5c] to-[#12283f]" },
              { name: "Smart Classroom", color: "from-[#1b3a5c] to-[#12283f]" },
              { name: "Cafeteria & Lounge", color: "from-[#d93a2b] to-[#b82e21]" },
            ].map((item, index) => (
              <FadeInSection key={item.name}>
                <motion.div whileHover={{ y: -6 }} className="group cursor-pointer">
                  <div className={`bg-gradient-to-br ${item.color} rounded-xl overflow-hidden shadow-lg relative aspect-[4/3]`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Camera className="w-7 h-7 text-white" />
                      </div>
                      <p className="text-white/80 text-sm font-medium">{item.name}</p>
                      <Badge variant="outline" className="mt-2 border-white/20 text-white/60 text-[10px]">
                        Click to Explore
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3 z-20">
                      <Globe className="w-5 h-5 text-white/40" />
                    </div>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CAMPUS MAP ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <Badge variant="info" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Navigate</Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white leading-tight" style={{ color: "var(--page-text, #f1f5f9)" }}>
                Campus{" "}
                <span style={{ color: "var(--page-secondary, #d93a2b)" }}>Map</span>
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Our campus is designed for convenience and inspiration. Located in the heart of
                New Baneshwor, the college is spread across a modern building with easy access
                to all facilities across multiple floors.
              </p>
              <div className="mt-8 space-y-4">
                {LOCATIONS.map((loc) => (
                  <div key={loc.name} className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "var(--page-secondary, #d93a2b)" }} />
                    <div>
                      <p className="font-semibold dark:text-white text-sm" style={{ color: "var(--page-text, #f1f5f9)" }}>{loc.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{loc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#d93a2b]/20 rounded-2xl" />
                <div className="relative rounded-2xl p-6 shadow-xl overflow-hidden" style={{ background: "linear-gradient(135deg, var(--page-hero-from, #1e293b), var(--page-hero-to, #0f172a))" }}>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(227,28,35,0.08),transparent_60%)]" />
                  <div className="relative z-10">
                    <MapPin className="w-8 h-8 mb-4" style={{ color: "var(--page-accent, #1b3a5c)" }} />
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Ground Floor", items: "Admin, Library, Cafeteria" },
                        { label: "First Floor", items: "Classrooms, Faculty Rooms" },
                        { label: "Second Floor", items: "Computer Labs, Smart Rooms" },
                        { label: "Third Floor", items: "Seminar Hall, Club Rooms" },
                        { label: "Top Floor", items: "Sports Area, Rooftop Lounge" },
                        { label: "Basement", items: "Parking, Storage, Generator" },
                      ].map((floor) => (
                        <div key={floor.label} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--page-accent, #1b3a5c)" }}>{floor.label}</p>
                          <p className="text-white/70 text-xs mt-1">{floor.items}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── KEY HIGHLIGHTS ─── */}
      <section className="py-20 dark:bg-gray-900" style={{ background: "var(--page-bg, #0f172a)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-14">
            <Badge variant="warning" className="mb-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">Explore Our Facilities</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white" style={{ color: "var(--page-text, #f1f5f9)" }}>
              Key Campus Locations
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the spaces that make Milton a great place to learn, grow, and connect.
            </p>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HIGHLIGHTS.map((item, index) => {
              const Icon = item.icon
              return (
                <FadeInSection key={item.name}>
                  <motion.div whileHover={{ y: -6 }} className="group h-full">
                    <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                      <div className={`bg-gradient-to-br ${item.color} p-5`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-display font-bold dark:text-white mb-2" style={{ color: "var(--page-text, #f1f5f9)" }}>{item.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--page-hero-from, #1e293b), var(--page-hero-to, #0f172a))" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(227,28,35,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(201,168,76,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTQwIDQwTDAgMGgyMEwwIDIwaDIweiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <FloatingParticles />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Eye className="w-12 h-12 mx-auto mb-6" style={{ color: "var(--page-accent, #1b3a5c)" }} />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
              Experience It{" "}
              <span className="bg-gradient-to-r from-[#d93a2b] to-[#d93a2b] bg-clip-text text-transparent">
                In Person
              </span>
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
              Nothing beats the real experience. Schedule a campus visit and see everything
              Milton has to offer with your own eyes.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="xl"
                  className="text-white shadow-xl group"
                  style={{ background: "var(--page-secondary, #d93a2b)" }}
                >
                  Schedule a Visit
                  <MapPin className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/admissions">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                >
                  Apply Online
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}
