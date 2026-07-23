"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Image, Camera, X, MapPin, ChevronLeft, ChevronRight,
  Maximize2, Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Dialog, DialogContent, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "events", label: "Events" },
  { value: "campus", label: "Campus" },
  { value: "sports", label: "Sports" },
  { value: "cultural", label: "Cultural" },
  { value: "tours", label: "Tours" },
]

const GALLERY_ITEMS = [
  { id: 1, title: "Annual Sports Day 2026", category: "sports", color: "from-green-600 to-emerald-800", span: "md:col-span-2 md:row-span-2" },
  { id: 2, title: "Tech Fest Coding Competition", category: "events", color: "from-blue-600 to-indigo-800", span: "" },
  { id: 3, title: "College Library", category: "campus", color: "from-amber-600 to-yellow-800", span: "" },
  { id: 4, title: "Dashain Celebration 2025", category: "cultural", color: "from-red-600 to-rose-800", span: "" },
  { id: 5, title: "Singapore Study Tour", category: "tours", color: "from-cyan-600 to-teal-800", span: "" },
  { id: 6, title: "Computer Lab Session", category: "campus", color: "from-purple-600 to-violet-800", span: "" },
  { id: 7, title: "Inter-College Debate", category: "events", color: "from-orange-600 to-red-800", span: "" },
  { id: 8, title: "Basketball Tournament", category: "sports", color: "from-emerald-600 to-green-800", span: "" },
  { id: 9, title: "Cultural Day Performances", category: "cultural", color: "from-pink-600 to-rose-800", span: "md:col-span-2" },
  { id: 10, title: "Dubai Industrial Visit", category: "tours", color: "from-sky-600 to-blue-800", span: "" },
  { id: 11, title: "Classroom Discussion", category: "campus", color: "from-slate-600 to-gray-800", span: "" },
  { id: 12, title: "Freshers' Party 2025", category: "events", color: "from-fuchsia-600 to-purple-800", span: "" },
  { id: 13, title: "Volunteer at Orphanage", category: "cultural", color: "from-teal-600 to-cyan-800", span: "" },
  { id: 14, title: "Malaysia University Visit", category: "tours", color: "from-indigo-600 to-blue-800", span: "" },
  { id: 15, title: "Campus View - Main Building", category: "campus", color: "from-stone-600 to-neutral-800", span: "" },
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

function GalleryCard({ item, index }: { item: typeof GALLERY_ITEMS[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className={`relative group cursor-pointer overflow-hidden rounded-xl ${item.span}`}
        >
          <div className={`relative w-full h-64 bg-gradient-to-br ${item.color} flex items-center justify-center`}>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 z-10" />
            <Image className="w-12 h-12 text-white/30 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20" />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
              <Badge variant="secondary" className="mb-2 text-[10px] uppercase tracking-wider">
                {item.category}
              </Badge>
              <h3 className="text-white font-semibold text-sm leading-tight">{item.title}</h3>
            </div>
            <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 bg-transparent border-0 shadow-2xl">
        <div className={`w-full aspect-video rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center relative overflow-hidden`}>
          <Image className="w-20 h-20 text-white/40" />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
            <Badge variant="secondary" className="mb-2 text-xs">{item.category}</Badge>
            <DialogTitle className="text-white text-2xl font-display font-bold">{item.title}</DialogTitle>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filtered = activeTab === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeTab)

  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c3557] via-[#1c3557]/95 to-[#0e1d31] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(227,28,35,0.15),transparent_60%)] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,168,76,0.08),transparent_50%)] z-0" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNFYzNEg2ek02IDRWMEg0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] z-0 opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-white/20 text-white/80 bg-white/5 backdrop-blur-sm">
              <Camera className="w-3.5 h-3.5 mr-1.5 text-[#e31c23]" />
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
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="mb-10">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center">
                <TabsList className="bg-[#f8f6f0] dark:bg-gray-800 p-1 rounded-xl">
                  {CATEGORIES.map((cat) => (
                    <TabsTrigger
                      key={cat.value}
                      value={cat.value}
                      className="px-5 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-[#1c3557] dark:data-[state=active]:text-white data-[state=active]:shadow-sm"
                    >
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
          </FadeInSection>

          <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid"
              >
                <GalleryCard item={item} index={index} />
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-[#1c3557] dark:text-white mb-2">No photos found</h3>
              <p className="text-gray-500">No gallery items in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-[#f8f6f0] dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <Camera className="w-12 h-12 text-[#c9a84c] mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1c3557] dark:text-white leading-tight">
              Want to See More?{" "}
              <span className="text-[#e31c23]">Visit Us!</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the Milton campus in person. Schedule a campus tour and see our facilities firsthand.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" className="bg-[#e31c23] hover:bg-[#c4181e] text-white shadow-xl shadow-[#e31c23]/25">
                Schedule a Tour
                <MapPin className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="xl" className="border-[#1c3557]/20 text-[#1c3557] hover:bg-[#1c3557] hover:text-white">
                Virtual Tour
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}
