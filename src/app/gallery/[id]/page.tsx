"use client"

import { useState, useRef } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  ArrowLeft, Image as ImageIcon, Camera, Calendar,
  ChevronLeft, ChevronRight, X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GALLERY_ALBUMS } from "@/lib/data/gallery"

export default function GalleryAlbumPage() {
  const { id } = useParams<{ id: string }>()
  const album = GALLERY_ALBUMS.find((a) => a.id === id)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!album) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 pt-20">
        <div className="text-center">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold dark:text-white mb-2" style={{ color: "var(--page-text, #000000)" }}>Album Not Found</h1>
          <p className="text-gray-500 mb-6">The gallery album you are looking for does not exist.</p>
          <Link href="/gallery"><Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" />Back to Gallery</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      {/* Back bar */}
      <div className="border-b border-gray-100 dark:border-gray-800 dark:bg-gray-900" style={{ background: "var(--page-bg, #ffffff)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/gallery" className="inline-flex items-center text-sm text-gray-500 transition-colors"
            style={{ color: "var(--page-secondary, #fe0000)" }}>
            <ArrowLeft className="w-4 h-4 mr-1.5" />Back to Gallery
          </Link>
        </div>
      </div>

      {/* Album header */}
      <section className={`relative py-16 bg-gradient-to-br ${album.color}`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="outline" className="mb-4 border-white/30 text-white bg-white/10">{album.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white">{album.title}</h1>
            {album.date && <p className="text-white/70 mt-2 flex items-center justify-center gap-1.5"><Calendar className="w-4 h-4" />{album.date}</p>}
            <p className="text-white/60 mt-2 max-w-xl mx-auto">{album.coverDescription}</p>
            <p className="text-white/50 text-sm mt-2">{album.images.length} photos</p>
          </motion.div>
        </div>
      </section>

      {/* Image grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {album.images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setLightboxIndex(i)}
              >
                <div className={`relative aspect-video rounded-xl bg-gradient-to-br ${album.color} flex items-center justify-center overflow-hidden`}>
                  <ImageIcon className="w-12 h-12 text-white/30 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-xs">{img.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/gallery">
              <Button variant="outline" style={{ borderColor: "var(--page-primary, #1b3f63)", color: "var(--page-text, #000000)" }}>
                <ArrowLeft className="w-4 h-4 mr-2" />Back to All Albums
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={() => setLightboxIndex(null)}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white z-10" onClick={() => setLightboxIndex(null)}>
            <X className="w-8 h-8" />
          </button>
          {lightboxIndex > 0 && (
            <button className="absolute left-4 text-white/70 hover:text-white z-10" onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1) }}>
              <ChevronLeft className="w-10 h-10" />
            </button>
          )}
          {lightboxIndex < album.images.length - 1 && (
            <button className="absolute right-4 text-white/70 hover:text-white z-10" onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1) }}>
              <ChevronRight className="w-10 h-10" />
            </button>
          )}
          <div className="text-center px-4" onClick={(e) => e.stopPropagation()}>
            <div className="w-full max-w-4xl aspect-video rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-4">
              <ImageIcon className="w-24 h-24 text-gray-600" />
            </div>
            <p className="text-white text-lg">{album.images[lightboxIndex].caption}</p>
            <p className="text-white/50 text-sm mt-1">{lightboxIndex + 1} / {album.images.length}</p>
          </div>
        </div>
      )}
    </div>
  )
}
