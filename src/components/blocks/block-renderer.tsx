"use client"
import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Play, MapPin, ChevronRight, ArrowRight, Star, Quote, GraduationCap, BookOpen, Users, Trophy, Calendar, Clock, Download, Mail, Phone } from "lucide-react"
import type { BlockType, BlockStyleSettings } from "@/lib/variants/types"

interface BlockRendererProps {
  blockType: BlockType
  content: Record<string, any>
  styleSettings?: BlockStyleSettings
  index?: number
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ")
}

export function BlockRenderer({ blockType, content, styleSettings, index = 0 }: BlockRendererProps) {
  const baseStyle: React.CSSProperties = {
    backgroundColor: styleSettings?.backgroundColor || undefined,
    color: styleSettings?.textColor || undefined,
  }

  const paddingY = styleSettings?.paddingY || "medium"
  const paddingMap = { none: "py-0", small: "py-8", medium: "py-16", large: "py-24" }
  const textAlign = styleSettings?.textAlign || "left"
  const alignClass = textAlign === "center" ? "text-center" : textAlign === "right" ? "text-right" : "text-left"
  const maxWidth = styleSettings?.maxWidth || "medium"
  const widthMap = { narrow: "max-w-3xl", medium: "max-w-5xl", wide: "max-w-7xl", full: "max-w-full" }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(paddingMap[paddingY], alignClass, styleSettings?.borderTop ? "border-t" : "", "relative")}
      style={baseStyle}
    >
      {styleSettings?.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{ backgroundImage: `url(${styleSettings.backgroundImage})` }}
        />
      )}
      {styleSettings?.backgroundOverlay && (
        <div className="absolute inset-0 -z-10" style={{ backgroundColor: styleSettings.backgroundOverlay, opacity: 0.6 }} />
      )}
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", widthMap[maxWidth], "relative z-10")}>
        {renderBlock(blockType, content)}
      </div>
    </motion.section>
  )
}

function renderBlock(blockType: BlockType, content: Record<string, any>) {
  switch (blockType) {
    case "hero": return <HeroBlock content={content} />
    case "text": return <TextBlock content={content} />
    case "image": return <ImageBlock content={content} />
    case "gallery": return <GalleryBlock content={content} />
    case "video": return <VideoBlock content={content} />
    case "stats": return <StatsBlock content={content} />
    case "cardGrid": return <CardGridBlock content={content} />
    case "testimonial": return <TestimonialBlock content={content} />
    case "cta": return <CtaBlock content={content} />
    case "form": return <FormBlock content={content} />
    case "faq": return <FaqBlock content={content} />
    case "map": return <MapBlock content={content} />
    case "divider": return <Separator className="my-12" />
    default: return <TextBlock content={content} />
  }
}

function HeroBlock({ content }: { content: any }) {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 min-h-[60vh]">
      <div className="flex-1 space-y-6">
        <Badge variant="secondary" className="text-sm px-4 py-1">{content.badge || "Welcome to Milton"}</Badge>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: content.headingColor }}>
          {content.heading || "Shape Your Future at Milton"}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl">{content.subtext || "Excellence in Education since 2010"}</p>
        <div className="flex flex-wrap gap-4 pt-2">
          {content.primaryCta && <Button size="lg" className="bg-[#fe0000] hover:bg-[#fe0000]">{content.primaryCta} <ArrowRight className="ml-2 w-4 h-4" /></Button>}
          {content.secondaryCta && <Button size="lg" variant="outline">{content.secondaryCta}</Button>}
        </div>
      </div>
      {content.imageUrl && (
        <div className="flex-1">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img src={content.imageUrl} alt={content.heading || "Hero"} className="w-full h-auto object-cover" />
          </div>
        </div>
      )}
    </div>
  )
}

function TextBlock({ content }: { content: any }) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {content.title && <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{content.title}</h2>}
      {content.body && <div dangerouslySetInnerHTML={{ __html: content.body }} />}
    </div>
  )
}

function ImageBlock({ content }: { content: any }) {
  return (
    <div className={cn("flex", content.caption ? "flex-col items-center" : "")}>
      <img src={content.src} alt={content.alt || ""} className={cn("rounded-xl shadow-lg max-w-full h-auto", content.fullWidth ? "w-full" : "mx-auto")} />
      {content.caption && <p className="text-sm text-muted-foreground mt-2">{content.caption}</p>}
    </div>
  )
}

function GalleryBlock({ content }: { content: any }) {
  const images = content.images || []
  const cols = content.columns || 3
  return (
    <div>
      {content.title && <h2 className="font-display text-3xl font-bold text-center mb-10">{content.title}</h2>}
      <div className={cn("grid gap-4", cols === 2 ? "grid-cols-1 sm:grid-cols-2" : cols === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1 sm:grid-cols-3")}>
        {images.map((img: string, i: number) => (
          <div key={i} className="aspect-square rounded-xl overflow-hidden">
            <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
          </div>
        ))}
      </div>
    </div>
  )
}

function VideoBlock({ content }: { content: any }) {
  return (
    <div className="space-y-4">
      {content.title && <h2 className="font-display text-3xl font-bold text-center">{content.title}</h2>}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-muted max-w-4xl mx-auto">
        {content.embedUrl ? (
          <iframe src={content.embedUrl} className="absolute inset-0 w-full h-full" allowFullScreen />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1b3f63] to-[#1b3f63]">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
              <Play className="w-10 h-10 text-white ml-1" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatsBlock({ content }: { content: any }) {
  const stats = content.stats || [
    { label: "Years of Excellence", value: "15", suffix: "+" },
    { label: "Programs Offered", value: "4" },
    { label: "Students Enrolled", value: "500", suffix: "+" },
    { label: "Expert Faculty", value: "50", suffix: "+" },
  ]
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat: any, i: number) => (
        <div key={i} className="text-center space-y-2">
          <div className="text-4xl md:text-5xl font-bold font-display text-[#1b3f63] dark:text-white">
            {stat.value}{stat.suffix || ""}
          </div>
          <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

function CardGridBlock({ content }: { content: any }) {
  const cards = content.cards || []
  const cols = content.columns || 3
  return (
    <div>
      {content.title && <h2 className="font-display text-3xl font-bold text-center mb-4">{content.title}</h2>}
      {content.description && <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">{content.description}</p>}
      <div className={cn("grid gap-6", cols === 1 ? "grid-cols-1" : cols === 2 ? "grid-cols-1 md:grid-cols-2" : cols === 4 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
        {cards.map((card: any, i: number) => (
          <Card key={i} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              {card.icon && <div className="w-12 h-12 rounded-lg bg-[#fe0000]/10 flex items-center justify-center text-[#fe0000]">{getIcon(card.icon)}</div>}
              {card.image && <img src={card.image} alt={card.title} className="w-full h-40 object-cover rounded-lg" />}
              {card.title && <h3 className="font-display text-xl font-semibold">{card.title}</h3>}
              {card.description && <p className="text-muted-foreground text-sm">{card.description}</p>}
              {card.link && <a href={card.link} className="text-[#fe0000] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Learn More <ChevronRight className="w-3 h-3" /></a>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TestimonialBlock({ content }: { content: any }) {
  const items = content.testimonials || [
    { name: "Aarav Sharma", role: "BCA Student", photo: "https://randomuser.me/api/portraits/men/8.jpg", content: "Milton College has given me the best education experience. The faculty is excellent and the campus environment is amazing.", rating: 5 },
    { name: "Sita Rijal", role: "BBM Graduate", photo: "https://randomuser.me/api/portraits/women/33.jpg", content: "The practical exposure and international tours at Milton shaped my career. Highly recommend!", rating: 5 },
  ]
  return (
    <div>
      {content.title && <h2 className="font-display text-3xl font-bold text-center mb-10">{content.title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((t: any, i: number) => (
          <Card key={i} className="relative">
            <Quote className="absolute top-4 left-4 w-8 h-8 text-[#fe0000]/20" />
            <CardContent className="p-6 pt-12 space-y-4">
              <p className="text-muted-foreground italic">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1b3f63] flex items-center justify-center text-white font-bold text-sm overflow-hidden">
                  {t.photo ? (
                    <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    t.name.split(" ").map((n:string)=>n[0]).join("")
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
              {t.rating && <div className="flex gap-0.5">{Array.from({length: t.rating}).map((_: unknown, j: number)=><Star key={j} className="w-4 h-4 fill-[#fe0000] text-[#fe0000]" />)}</div>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function CtaBlock({ content }: { content: any }) {
  return (
    <div className="rounded-2xl p-12 text-center space-y-6 bg-gradient-to-br from-[#1b3f63] to-[#1b3f63] text-white">
      <h2 className="font-display text-3xl md:text-4xl font-bold">{content.heading || "Begin Your Journey at Milton"}</h2>
      <p className="text-white/80 max-w-2xl mx-auto">{content.subtext || "Apply now and shape your future with quality education"}</p>
      <div className="flex flex-wrap justify-center gap-4">
        {content.primaryCta && <Button size="lg" className="bg-[#fe0000] hover:bg-[#fe0000] text-white">{content.primaryCta}</Button>}
        {content.secondaryCta && <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">{content.secondaryCta}</Button>}
      </div>
    </div>
  )
}

function FormBlock({ content }: { content: any }) {
  const fields = content.fields || [
    { type: "text", label: "Full Name", required: true },
    { type: "email", label: "Email", required: true },
    { type: "textarea", label: "Message", required: true },
  ]
  return (
    <div className="max-w-lg mx-auto space-y-6">
      {content.title && <h2 className="font-display text-2xl font-bold text-center">{content.title}</h2>}
      <Card>
        <CardContent className="p-6 space-y-4">
          {fields.map((field: any, i: number) => (
            <div key={i} className="space-y-2">
              <label className="text-sm font-medium">{field.label} {field.required && <span className="text-red-500">*</span>}</label>
              {field.type === "textarea" ? <Textarea rows={4} placeholder={field.placeholder || ""} /> : <Input type={field.type} placeholder={field.placeholder || ""} />}
            </div>
          ))}
          <Button className="w-full bg-[#1b3f63] hover:bg-[#1b3f63]">{content.submitLabel || "Submit"}</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function FaqBlock({ content }: { content: any }) {
  const items = content.items || []
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {content.title && <h2 className="font-display text-3xl font-bold text-center mb-8">{content.title}</h2>}
      {items.map((item: any, i: number) => (
        <details key={i} className="group border rounded-xl p-4 [&[open]]:border-[#fe0000]">
          <summary className="cursor-pointer font-medium flex items-center justify-between">{item.question}<ChevronRight className="w-4 h-4 group-open:rotate-90 transition-transform" /></summary>
          <p className="mt-3 text-muted-foreground text-sm">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}

function MapBlock({ content }: { content: any }) {
  const src = content.embedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2!2d85.3!3d27.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQyJzAwLjAiTiA4NcKwMTgnMDAuMCJF!5e0!3m2!1sen!2snp!4v1"
  return (
    <div className="space-y-4">
      {content.title && <h2 className="font-display text-3xl font-bold text-center">{content.title}</h2>}
      <div className="aspect-video rounded-xl overflow-hidden">
        <iframe src={src} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
      </div>
    </div>
  )
}

function getIcon(name: string) {
  const icons: Record<string, React.ReactNode> = {
    graduation: <GraduationCap className="w-6 h-6" />,
    book: <BookOpen className="w-6 h-6" />,
    users: <Users className="w-6 h-6" />,
    trophy: <Trophy className="w-6 h-6" />,
    calendar: <Calendar className="w-6 h-6" />,
    clock: <Clock className="w-6 h-6" />,
    download: <Download className="w-6 h-6" />,
    mail: <Mail className="w-6 h-6" />,
    phone: <Phone className="w-6 h-6" />,
    map: <MapPin className="w-6 h-6" />,
  }
  return icons[name] || <GraduationCap className="w-6 h-6" />
}
