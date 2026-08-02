"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  Image, Camera, MapPin,
  Maximize2, ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GALLERY_ALBUMS } from "@/lib/data/gallery"

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "events", label: "Events" },
  { value: "campus", label: "Campus" },
  { value: "sports", label: "Sports" },
  { value: "cultural", label: "Cultural" },
  { value: "tours", label: "Tours" },
]

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
          width: "200px",
          height: "200px",
          bottom: "-10%",
          right: "-5%",
          animationDelay: "2s",
        }}
      />
    </div>
  )
}

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

function GalleryCard({ item, index }: { item: typeof GALLERY_ALBUMS[0]; index: number }) {
  return (
    <Link href={`/gallery/${item.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="relative group cursor-pointer overflow-hidden rounded-xl"
      >
        <div className={`relative w-full h-64 bg-gradient-to-br ${item.color} flex items-center justify-center`}>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 z-10" />
          <Image className="w-12 h-12 text-white/30 group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20" />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
            <Badge variant="secondary" className="mb-2 text-[10px] uppercase tracking-wider">
              {item.category}
            </Badge>
            <h3 className="text-white font-semibold text-sm leading-tight inline-flex items-center gap-1">
              {item.title}
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-white/50 text-[10px] mt-0.5">{item.images.length} photos</p>
          </div>
          <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Maximize2 className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filtered = activeTab === "all"
    ? GALLERY_ALBUMS
    : GALLERY_ALBUMS.filter((item) => item.category === activeTab)

  return (
    <div className="overflow-hidden" data-page-theme="projects">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--page-hero-from,#1b3a5c)] via-[var(--page-hero-from,#1b3a5c)]/95 to-[var(--page-hero-to,#d93a2b)] z-0" />
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
              <Camera className="w-3.5 h-3.5 mr-1.5 text-[var(--page-secondary,#d93a2b)]" />
              Moments at Milton
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight"
          >
            Our Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            A visual journey through life at Milton — events, campus, sports, culture, and beyond.
          </motion.p>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="py-16 bg-[var(--page-surface,white)] dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="mb-10">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center">
                <TabsList className="bg-[var(--page-bg,#ffffff)] dark:bg-gray-800 p-1 rounded-xl">
                  {CATEGORIES.map((cat) => (
                    <TabsTrigger
                      key={cat.value}
                      value={cat.value}
                      className="px-5 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-[var(--page-surface,white)] dark:data-[state=active]:bg-gray-700 data-[state=active]:text-[var(--page-text,#1a1a1a)] dark:data-[state=active]:text-white data-[state=active]:shadow-sm"
                    >
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
              >
                <GalleryCard item={item} index={index} />
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-[var(--page-text,#1a1a1a)] dark:text-white mb-2">No photos found</h3>
              <p className="text-gray-500">No gallery items in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-[var(--page-bg,#ffffff)] dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <Camera className="w-12 h-12 text-[var(--page-accent,#d93a2b)] mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--page-text,#1a1a1a)] dark:text-white leading-tight">
              Want to See More?{" "}
              <span className="text-[var(--page-secondary,#d93a2b)]">Visit Us!</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the Milton campus in person. Schedule a campus tour and see our facilities firsthand.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" className="bg-[var(--page-secondary,#d93a2b)] hover:bg-[#b82e21] text-white shadow-xl shadow-[var(--page-secondary,#d93a2b)]/25">
                Schedule a Tour
                <MapPin className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="xl" className="border-[var(--page-primary,#1b3a5c)]/20 text-[var(--page-text,#1a1a1a)] hover:bg-[var(--page-primary,#1b3a5c)] hover:text-white">
                Virtual Tour
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}
