"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  GripVertical, Plus, Trash2, Copy, Eye, EyeOff,
  Save, Globe, FileText, Image as ImageIcon, Video, BarChart3,
  Layout, MessageSquare, HelpCircle, Map, Minus, Edit3,
  FilePlus, X, Type, Grid3X3, ImagePlus,
  Star, FormInput, Loader2
} from "lucide-react"
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
  type DragEndEvent
} from "@dnd-kit/core"
import {
  SortableContext, useSortable,
  verticalListSortingStrategy, arrayMove
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"

type BlockContent = Record<string, unknown>

type PageBlock = {
  id: string
  pageId: string
  blockType: string
  content: BlockContent
  displayOrder: number
  isVisible: boolean
  styleSettings?: Record<string, unknown>
}

type Page = {
  id: string
  slug: string
  title: string
  isPublished: boolean
  isHomepage: boolean
  blocks: PageBlock[]
}

type BlockTypeConfig = {
  type: string
  label: string
  icon: React.ElementType
  color: string
  defaultContent: BlockContent
}

const BLOCK_TYPES: BlockTypeConfig[] = [
  {
    type: "hero", label: "Hero", icon: Globe, color: "#1b3a5c",
    defaultContent: { heading: "Welcome to Milton", subtext: "Shape Your Future", badge: "Admissions Open 2026", primaryCta: "Apply Now", secondaryCta: "Learn More", imageUrl: "", headingColor: "#ffffff" },
  },
  {
    type: "text", label: "Text", icon: Type, color: "#1b3a5c",
    defaultContent: { title: "Section Title", body: "Add your content here..." },
  },
  {
    type: "image", label: "Image", icon: ImageIcon, color: "#1b3a5c",
    defaultContent: { src: "", alt: "Image description", caption: "", fullWidth: false },
  },
  {
    type: "gallery", label: "Gallery", icon: ImagePlus, color: "#d93a2b",
    defaultContent: { title: "Gallery", images: "", columns: "3" },
  },
  {
    type: "video", label: "Video", icon: Video, color: "#d93a2b",
    defaultContent: { title: "", embedUrl: "" },
  },
  {
    type: "stats", label: "Stats", icon: BarChart3, color: "#1b3a5c",
    defaultContent: { stats: [{ label: "Students", value: 500, suffix: "+" }, { label: "Faculty", value: 50, suffix: "" }] },
  },
  {
    type: "cardGrid", label: "Card Grid", icon: Grid3X3, color: "#1b3a5c",
    defaultContent: { title: "Our Programs", description: "", columns: "3", cards: [{ title: "Program", description: "", icon: "", link: "", image: "" }] },
  },
  {
    type: "testimonial", label: "Testimonial", icon: MessageSquare, color: "#1b3a5c",
    defaultContent: { title: "What Students Say", testimonials: [{ name: "Student Name", role: "Student", content: "", rating: 5 }] },
  },
  {
    type: "cta", label: "CTA", icon: Layout, color: "#d93a2b",
    defaultContent: { heading: "Join Milton Today", subtext: "Take the first step toward your future", primaryCta: "Apply Now", secondaryCta: "Contact Us" },
  },
  {
    type: "form", label: "Form", icon: FormInput, color: "#d93a2b",
    defaultContent: { title: "Contact Us", submitLabel: "Submit", fields: [{ label: "Full Name", type: "text", placeholder: "Your Name", required: true }] },
  },
  {
    type: "faq", label: "FAQ", icon: HelpCircle, color: "#1b3a5c",
    defaultContent: { title: "Frequently Asked Questions", items: [{ question: "Question?", answer: "Answer here." }] },
  },
  {
    type: "map", label: "Map", icon: Map, color: "#1b3a5c",
    defaultContent: { title: "Find Us", embedUrl: "" },
  },
  {
    type: "divider", label: "Divider", icon: Minus, color: "#6b7280",
    defaultContent: {},
  },
]

function BlockIcon({ type, className }: { type: string; className?: string }) {
  const cfg = BLOCK_TYPES.find((b) => b.type === type)
  if (!cfg) return <Layout className={className} />
  const Icon = cfg.icon
  return <Icon className={className} />
}

function SortableBlock({
  block,
  index,
  onEdit,
  onDuplicate,
  onToggleVisibility,
  onDelete,
  totalBlocks,
}: {
  block: PageBlock
  index: number
  onEdit: (b: PageBlock) => void
  onDuplicate: (b: PageBlock) => void
  onToggleVisibility: (b: PageBlock) => void
  onDelete: (b: PageBlock) => void
  totalBlocks: number
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id })
  const style = { transform: CSS.Transform.toString(transform), transition }
  const cfg = BLOCK_TYPES.find((b) => b.type === block.blockType)

  return (
    <div ref={setNodeRef} style={style} className={cn("relative group", isDragging && "z-50 opacity-50")}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: index * 0.03 }}
        className={cn(
          "rounded-lg border bg-card shadow-sm overflow-hidden",
          !block.isVisible && "opacity-50",
        )}
      >
        <div
          className="flex items-center gap-2 px-3 py-2 text-white text-xs font-semibold"
          style={{ backgroundColor: cfg?.color || "#6b7280" }}
        >
          <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing hover:opacity-80" type="button">
            <GripVertical className="h-4 w-4" />
          </button>
          <BlockIcon type={block.blockType} className="h-3.5 w-3.5" />
          <span>{cfg?.label || block.blockType}</span>
          {!block.isVisible && <Badge variant="secondary" className="ml-auto text-[10px] h-5 px-1.5 bg-white/20 text-white">Hidden</Badge>}
          <div className="ml-auto flex items-center gap-1">
            <button onClick={() => onEdit(block)} className="p-1 rounded hover:bg-white/20" type="button" title="Edit">
              <Edit3 className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => onDuplicate(block)} className="p-1 rounded hover:bg-white/20" type="button" title="Duplicate">
              <Copy className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => onToggleVisibility(block)} className="p-1 rounded hover:bg-white/20" type="button" title={block.isVisible ? "Hide" : "Show"}>
              {block.isVisible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            </button>
            <button onClick={() => onDelete(block)} className="p-1 rounded hover:bg-white/20" type="button" title="Delete">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <div className="p-3 text-sm text-muted-foreground">
          <BlockPreview block={block} />
        </div>
      </motion.div>
    </div>
  )
}

function BlockPreview({ block }: { block: PageBlock }) {
  const c = block.content
  switch (block.blockType) {
    case "hero":
      return <span className="font-medium text-foreground">{(c.heading as string) || "Hero Section"}</span>
    case "text":
      return <span className="font-medium text-foreground">{(c.title as string) || "Text Block"}</span>
    case "image":
      return <span>{(c.src as string) ? `Image: ${c.alt as string || "No alt"}` : "No image selected"}</span>
    case "gallery":
      return <span>Gallery: {(c.title as string) || "Untitled"}</span>
    case "video":
      return <span>Video: {(c.title as string) || "Untitled"}</span>
    case "stats":
      return <span>{(c.stats as Array<unknown>)?.length || 0} stats</span>
    case "cardGrid":
      return <span>{(c.cards as Array<unknown>)?.length || 0} cards</span>
    case "testimonial":
      return <span>{(c.testimonials as Array<unknown>)?.length || 0} testimonials</span>
    case "cta":
      return <span>CTA: {(c.heading as string) || "Untitled"}</span>
    case "form":
      return <span>Form: {(c.title as string) || "Untitled"} ({(c.fields as Array<unknown>)?.length || 0} fields)</span>
    case "faq":
      return <span>{(c.items as Array<unknown>)?.length || 0} FAQ items</span>
    case "map":
      return <span>{(c.embedUrl as string) ? "Map embedded" : "No map URL set"}</span>
    case "divider":
      return <span className="italic">Divider line</span>
    default:
      return <span>{block.blockType} block</span>
  }
}

function BlockEditDialog({
  block,
  open,
  onOpenChange,
  onSave,
}: {
  block: PageBlock | null
  open: boolean
  onOpenChange: (o: boolean) => void
  onSave: (block: PageBlock) => void
}) {
  const [content, setContent] = useState<BlockContent>({})
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (block) {
      setContent(JSON.parse(JSON.stringify(block.content)))
      setVisible(block.isVisible)
    }
  }, [block])

  if (!block) return null

  const updateContent = (key: string, value: unknown) => {
    setContent((prev) => ({ ...prev, [key]: value }))
  }

  const cfg = BLOCK_TYPES.find((b) => b.type === block.blockType)

  const handleSave = () => {
    onSave({ ...block, content, isVisible: visible })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {cfg && <cfg.icon className="h-5 w-5" style={{ color: cfg.color }} />}
            Edit {cfg?.label || block.blockType} Block
          </DialogTitle>
          <DialogDescription>Configure the content and settings for this block.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-2">
              {visible ? <Eye className="h-4 w-4 text-muted-foreground" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
              <Label className="cursor-pointer">Visible on page</Label>
            </div>
            <Switch checked={visible} onCheckedChange={setVisible} />
          </div>
          <Separator />
          {block.blockType === "hero" && (
            <div className="grid gap-3">
              <div className="space-y-1.5">
                <Label>Heading</Label>
                <Input value={content.heading as string || ""} onChange={(e) => updateContent("heading", e.target.value)} placeholder="Main heading" />
              </div>
              <div className="space-y-1.5">
                <Label>Subtext</Label>
                <Textarea value={content.subtext as string || ""} onChange={(e) => updateContent("subtext", e.target.value)} placeholder="Subtext or description" rows={2} />
              </div>
              <div className="space-y-1.5">
                <Label>Badge</Label>
                <Input value={content.badge as string || ""} onChange={(e) => updateContent("badge", e.target.value)} placeholder="e.g. Admissions Open 2026" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Primary CTA</Label>
                  <Input value={content.primaryCta as string || ""} onChange={(e) => updateContent("primaryCta", e.target.value)} placeholder="Apply Now" />
                </div>
                <div className="space-y-1.5">
                  <Label>Secondary CTA</Label>
                  <Input value={content.secondaryCta as string || ""} onChange={(e) => updateContent("secondaryCta", e.target.value)} placeholder="Learn More" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Background Image URL</Label>
                <Input value={content.imageUrl as string || ""} onChange={(e) => updateContent("imageUrl", e.target.value)} placeholder="https://..." />
              </div>
              <div className="space-y-1.5">
                <Label>Heading Color</Label>
                <Input type="color" value={content.headingColor as string || "#ffffff"} onChange={(e) => updateContent("headingColor", e.target.value)} className="h-10 w-full" />
              </div>
            </div>
          )}
          {block.blockType === "text" && (
            <div className="grid gap-3">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input value={content.title as string || ""} onChange={(e) => updateContent("title", e.target.value)} placeholder="Section title" />
              </div>
              <div className="space-y-1.5">
                <Label>Body</Label>
                <Textarea value={content.body as string || ""} onChange={(e) => updateContent("body", e.target.value)} placeholder="Content body..." rows={6} />
              </div>
            </div>
          )}
          {block.blockType === "image" && (
            <div className="grid gap-3">
              <div className="space-y-1.5">
                <Label>Image URL</Label>
                <Input value={content.src as string || ""} onChange={(e) => updateContent("src", e.target.value)} placeholder="https://..." />
              </div>
              <div className="space-y-1.5">
                <Label>Alt Text</Label>
                <Input value={content.alt as string || ""} onChange={(e) => updateContent("alt", e.target.value)} placeholder="Describe the image" />
              </div>
              <div className="space-y-1.5">
                <Label>Caption</Label>
                <Input value={content.caption as string || ""} onChange={(e) => updateContent("caption", e.target.value)} placeholder="Optional caption" />
              </div>
              <div className="flex items-center gap-2 rounded-lg border p-3">
                <Switch checked={!!content.fullWidth} onCheckedChange={(v) => updateContent("fullWidth", v)} />
                <Label className="cursor-pointer">Full width</Label>
              </div>
            </div>
          )}
          {block.blockType === "gallery" && (
            <div className="grid gap-3">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input value={content.title as string || ""} onChange={(e) => updateContent("title", e.target.value)} placeholder="Gallery title" />
              </div>
              <div className="space-y-1.5">
                <Label>Image URLs (comma-separated)</Label>
                <Textarea value={content.images as string || ""} onChange={(e) => updateContent("images", e.target.value)} placeholder="https://image1.jpg, https://image2.jpg" rows={3} />
              </div>
              <div className="space-y-1.5">
                <Label>Columns</Label>
                <Select value={String(content.columns || "3")} onValueChange={(v) => updateContent("columns", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Columns</SelectItem>
                    <SelectItem value="3">3 Columns</SelectItem>
                    <SelectItem value="4">4 Columns</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          {block.blockType === "video" && (
            <div className="grid gap-3">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input value={content.title as string || ""} onChange={(e) => updateContent("title", e.target.value)} placeholder="Video title" />
              </div>
              <div className="space-y-1.5">
                <Label>Embed URL</Label>
                <Input value={content.embedUrl as string || ""} onChange={(e) => updateContent("embedUrl", e.target.value)} placeholder="https://www.youtube.com/embed/..." />
              </div>
            </div>
          )}
          {block.blockType === "stats" && (
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label>Stats Items</Label>
                <Button variant="outline" size="sm" onClick={() => updateContent("stats", [...(content.stats as Array<Record<string, unknown>> || []), { label: "", value: 0, suffix: "" }])}>
                  <Plus className="h-3 w-3 mr-1" /> Add Stat
                </Button>
              </div>
              {(content.stats as Array<Record<string, unknown>> || []).map((stat: Record<string, unknown>, i: number) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end rounded-lg border p-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Label</Label>
                    <Input value={stat.label as string || ""} onChange={(e) => {
                      const arr = [...(content.stats as Array<Record<string, unknown>> || [])]
                      arr[i] = { ...arr[i], label: e.target.value }
                      updateContent("stats", arr)
                    }} />
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="space-y-1">
                      <Label className="text-xs">Value</Label>
                      <Input type="number" value={String(stat.value || 0)} onChange={(e) => {
                        const arr = [...(content.stats as Array<Record<string, unknown>> || [])]
                        arr[i] = { ...arr[i], value: Number(e.target.value) }
                        updateContent("stats", arr)
                      }} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Suffix</Label>
                      <Input value={stat.suffix as string || ""} onChange={(e) => {
                        const arr = [...(content.stats as Array<Record<string, unknown>> || [])]
                        arr[i] = { ...arr[i], suffix: e.target.value }
                        updateContent("stats", arr)
                      }} placeholder="+" />
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive shrink-0" onClick={() => {
                    const arr = [...(content.stats as Array<Record<string, unknown>> || [])]
                    arr.splice(i, 1)
                    updateContent("stats", arr)
                  }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          {block.blockType === "cardGrid" && (
            <div className="grid gap-3">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input value={content.title as string || ""} onChange={(e) => updateContent("title", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea value={content.description as string || ""} onChange={(e) => updateContent("description", e.target.value)} rows={2} />
              </div>
              <div className="space-y-1.5">
                <Label>Columns</Label>
                <Select value={String(content.columns || "3")} onValueChange={(v) => updateContent("columns", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Columns</SelectItem>
                    <SelectItem value="3">3 Columns</SelectItem>
                    <SelectItem value="4">4 Columns</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label>Cards</Label>
                <Button variant="outline" size="sm" onClick={() => updateContent("cards", [...(content.cards as Array<Record<string, unknown>> || []), { title: "", description: "", icon: "", link: "", image: "" }])}>
                  <Plus className="h-3 w-3 mr-1" /> Add Card
                </Button>
              </div>
              {(content.cards as Array<Record<string, unknown>> || []).map((card: Record<string, unknown>, i: number) => (
                <div key={i} className="rounded-lg border p-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">Card {i + 1}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => {
                      const arr = [...(content.cards as Array<Record<string, unknown>> || [])]
                      arr.splice(i, 1)
                      updateContent("cards", arr)
                    }}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Title" value={card.title as string || ""} onChange={(e) => {
                      const arr = [...(content.cards as Array<Record<string, unknown>> || [])]; arr[i] = { ...arr[i], title: e.target.value }; updateContent("cards", arr)
                    }} />
                    <Input placeholder="Icon name" value={card.icon as string || ""} onChange={(e) => {
                      const arr = [...(content.cards as Array<Record<string, unknown>> || [])]; arr[i] = { ...arr[i], icon: e.target.value }; updateContent("cards", arr)
                    }} />
                  </div>
                  <Textarea placeholder="Description" value={card.description as string || ""} onChange={(e) => {
                    const arr = [...(content.cards as Array<Record<string, unknown>> || [])]; arr[i] = { ...arr[i], description: e.target.value }; updateContent("cards", arr)
                  }} rows={2} />
                  <Input placeholder="Link URL" value={card.link as string || ""} onChange={(e) => {
                    const arr = [...(content.cards as Array<Record<string, unknown>> || [])]; arr[i] = { ...arr[i], link: e.target.value }; updateContent("cards", arr)
                  }} />
                </div>
              ))}
            </div>
          )}
          {block.blockType === "testimonial" && (
            <div className="grid gap-3">
              <div className="space-y-1.5">
                <Label>Section Title</Label>
                <Input value={content.title as string || ""} onChange={(e) => updateContent("title", e.target.value)} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Testimonials</Label>
                <Button variant="outline" size="sm" onClick={() => updateContent("testimonials", [...(content.testimonials as Array<Record<string, unknown>> || []), { name: "", role: "", content: "", rating: 5 }])}>
                  <Plus className="h-3 w-3 mr-1" /> Add Testimonial
                </Button>
              </div>
              {(content.testimonials as Array<Record<string, unknown>> || []).map((t: Record<string, unknown>, i: number) => (
                <div key={i} className="rounded-lg border p-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">Testimonial {i + 1}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => {
                      const arr = [...(content.testimonials as Array<Record<string, unknown>> || [])]; arr.splice(i, 1); updateContent("testimonials", arr)
                    }}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Name" value={t.name as string || ""} onChange={(e) => {
                      const arr = [...(content.testimonials as Array<Record<string, unknown>> || [])]; arr[i] = { ...arr[i], name: e.target.value }; updateContent("testimonials", arr)
                    }} />
                    <Input placeholder="Role" value={t.role as string || ""} onChange={(e) => {
                      const arr = [...(content.testimonials as Array<Record<string, unknown>> || [])]; arr[i] = { ...arr[i], role: e.target.value }; updateContent("testimonials", arr)
                    }} />
                  </div>
                  <Textarea placeholder="Content" value={t.content as string || ""} onChange={(e) => {
                    const arr = [...(content.testimonials as Array<Record<string, unknown>> || [])]; arr[i] = { ...arr[i], content: e.target.value }; updateContent("testimonials", arr)
                  }} rows={2} />
                  <div className="space-y-1">
                    <Label className="text-xs">Rating (1-5)</Label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => {
                          const arr = [...(content.testimonials as Array<Record<string, unknown>> || [])]; arr[i] = { ...arr[i], rating: star }; updateContent("testimonials", arr)
                        }}>
                          <Star className={cn("h-5 w-5", (t.rating as number || 0) >= star ? "fill-[#d93a2b] text-[#d93a2b]" : "text-muted-foreground")} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {block.blockType === "cta" && (
            <div className="grid gap-3">
              <div className="space-y-1.5">
                <Label>Heading</Label>
                <Input value={content.heading as string || ""} onChange={(e) => updateContent("heading", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Subtext</Label>
                <Textarea value={content.subtext as string || ""} onChange={(e) => updateContent("subtext", e.target.value)} rows={2} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Primary CTA</Label>
                  <Input value={content.primaryCta as string || ""} onChange={(e) => updateContent("primaryCta", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Secondary CTA</Label>
                  <Input value={content.secondaryCta as string || ""} onChange={(e) => updateContent("secondaryCta", e.target.value)} />
                </div>
              </div>
            </div>
          )}
          {block.blockType === "form" && (
            <div className="grid gap-3">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input value={content.title as string || ""} onChange={(e) => updateContent("title", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Submit Button Label</Label>
                <Input value={content.submitLabel as string || ""} onChange={(e) => updateContent("submitLabel", e.target.value)} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Form Fields</Label>
                <Button variant="outline" size="sm" onClick={() => updateContent("fields", [...(content.fields as Array<Record<string, unknown>> || []), { label: "", type: "text", placeholder: "", required: false }])}>
                  <Plus className="h-3 w-3 mr-1" /> Add Field
                </Button>
              </div>
              {(content.fields as Array<Record<string, unknown>> || []).map((field: Record<string, unknown>, i: number) => (
                <div key={i} className="rounded-lg border p-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">Field {i + 1}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => {
                      const arr = [...(content.fields as Array<Record<string, unknown>> || [])]; arr.splice(i, 1); updateContent("fields", arr)
                    }}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Label" value={field.label as string || ""} onChange={(e) => {
                      const arr = [...(content.fields as Array<Record<string, unknown>> || [])]; arr[i] = { ...arr[i], label: e.target.value }; updateContent("fields", arr)
                    }} />
                    <Select value={field.type as string || "text"} onValueChange={(v) => {
                      const arr = [...(content.fields as Array<Record<string, unknown>> || [])]; arr[i] = { ...arr[i], type: v }; updateContent("fields", arr)
                    }}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="tel">Phone</SelectItem>
                        <SelectItem value="textarea">Textarea</SelectItem>
                        <SelectItem value="select">Select</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Placeholder" value={field.placeholder as string || ""} onChange={(e) => {
                      const arr = [...(content.fields as Array<Record<string, unknown>> || [])]; arr[i] = { ...arr[i], placeholder: e.target.value }; updateContent("fields", arr)
                    }} />
                    <div className="flex items-center gap-2">
                      <Switch checked={!!field.required} onCheckedChange={(v) => {
                        const arr = [...(content.fields as Array<Record<string, unknown>> || [])]; arr[i] = { ...arr[i], required: v }; updateContent("fields", arr)
                      }} />
                      <Label className="text-xs">Required</Label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {block.blockType === "faq" && (
            <div className="grid gap-3">
              <div className="space-y-1.5">
                <Label>Section Title</Label>
                <Input value={content.title as string || ""} onChange={(e) => updateContent("title", e.target.value)} />
              </div>
              <div className="flex items-center justify-between">
                <Label>FAQ Items</Label>
                <Button variant="outline" size="sm" onClick={() => updateContent("items", [...(content.items as Array<Record<string, unknown>> || []), { question: "", answer: "" }])}>
                  <Plus className="h-3 w-3 mr-1" /> Add Item
                </Button>
              </div>
              {(content.items as Array<Record<string, unknown>> || []).map((item: Record<string, unknown>, i: number) => (
                <div key={i} className="rounded-lg border p-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">Item {i + 1}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => {
                      const arr = [...(content.items as Array<Record<string, unknown>> || [])]; arr.splice(i, 1); updateContent("items", arr)
                    }}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <Input placeholder="Question" value={item.question as string || ""} onChange={(e) => {
                    const arr = [...(content.items as Array<Record<string, unknown>> || [])]; arr[i] = { ...arr[i], question: e.target.value }; updateContent("items", arr)
                  }} />
                  <Textarea placeholder="Answer" value={item.answer as string || ""} onChange={(e) => {
                    const arr = [...(content.items as Array<Record<string, unknown>> || [])]; arr[i] = { ...arr[i], answer: e.target.value }; updateContent("items", arr)
                  }} rows={2} />
                </div>
              ))}
            </div>
          )}
          {block.blockType === "map" && (
            <div className="grid gap-3">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input value={content.title as string || ""} onChange={(e) => updateContent("title", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Embed URL</Label>
                <Input value={content.embedUrl as string || ""} onChange={(e) => updateContent("embedUrl", e.target.value)} placeholder="https://www.google.com/maps/embed?pb=..." />
                <p className="text-xs text-muted-foreground">Paste the Google Maps embed iframe src URL</p>
              </div>
            </div>
          )}
          {block.blockType === "divider" && (
            <div className="py-4 text-center text-sm text-muted-foreground">
              A horizontal divider line. No additional settings.
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} className="gap-1.5"><Save className="h-4 w-4" /> Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function AddBlockButton({ onClick, label }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="group relative flex items-center justify-center w-full py-2 rounded-lg border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5 transition-all"
    >
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-primary">
        <Plus className="h-3.5 w-3.5" />
        <span>{label || "Add Block"}</span>
      </div>
    </button>
  )
}

export default function SectionBuilder() {
  const { toast } = useToast()
  const [pages, setPages] = useState<Page[]>([])
  const [selectedPageId, setSelectedPageId] = useState<string>("")
  const [blocks, setBlocks] = useState<PageBlock[]>([])
  const [editBlock, setEditBlock] = useState<PageBlock | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [newPageTitle, setNewPageTitle] = useState("")
  const [newPageSlug, setNewPageSlug] = useState("")
  const [insertAtIndex, setInsertAtIndex] = useState<number | null>(null)
  const [isPublishing, setIsPublishing] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  )

  useEffect(() => {
    fetch("/api/pages")
      .then((r) => r.json())
      .then((data) => {
        const p = Array.isArray(data) ? data : (data?.pages || [])
        setPages(p)
        if (p.length > 0) setSelectedPageId(p[0].id)
      })
      .catch(() => {
        setPages([])
      })
  }, [])

  useEffect(() => {
    if (!selectedPageId) return
    const page = pages.find((p) => p.id === selectedPageId)
    if (page?.blocks) {
      setBlocks(page.blocks.sort((a, b) => a.displayOrder - b.displayOrder))
    } else {
      fetch(`/api/pages/${selectedPageId}`)
        .then((r) => r.json())
        .then((data) => {
          const b = data?.blocks || []
          setBlocks(b.sort((a: PageBlock, b_: PageBlock) => a.displayOrder - b_.displayOrder))
        })
        .catch(() => setBlocks([]))
    }
  }, [selectedPageId, pages])

  const selectedPage = pages.find((p) => p.id === selectedPageId)

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return
      const oldIndex = blocks.findIndex((b) => b.id === active.id)
      const newIndex = blocks.findIndex((b) => b.id === over.id)
      if (oldIndex === -1 || newIndex === -1) return
      const reordered = arrayMove(blocks, oldIndex, newIndex).map((b, i) => ({ ...b, displayOrder: i }))
      setBlocks(reordered)
    },
    [blocks],
  )

  const addBlock = useCallback(
    (type: string, insertAt?: number) => {
      const cfg = BLOCK_TYPES.find((b) => b.type === type)
      if (!cfg) return
      const pos = insertAt !== undefined ? insertAt : blocks.length
      const newBlock: PageBlock = {
        id: `new-${Date.now()}`,
        pageId: selectedPageId,
        blockType: type,
        content: JSON.parse(JSON.stringify(cfg.defaultContent)),
        displayOrder: pos,
        isVisible: true,
      }
      const updated = [...blocks]
      updated.splice(pos, 0, newBlock)
      setBlocks(updated.map((b, i) => ({ ...b, displayOrder: i })))
      setInsertAtIndex(null)
      toast({ title: "Block added", description: `${cfg.label} block has been added.` })
    },
    [blocks, selectedPageId, toast],
  )

  const duplicateBlock = useCallback(
    (block: PageBlock) => {
      const idx = blocks.findIndex((b) => b.id === block.id)
      const dup: PageBlock = {
        ...JSON.parse(JSON.stringify(block)),
        id: `dup-${Date.now()}`,
        displayOrder: idx + 1,
      }
      const updated = [...blocks]
      updated.splice(idx + 1, 0, dup)
      setBlocks(updated.map((b, i) => ({ ...b, displayOrder: i })))
      toast({ title: "Block duplicated" })
    },
    [blocks, toast],
  )

  const toggleVisibility = useCallback(
    (block: PageBlock) => {
      setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, isVisible: !b.isVisible } : b)))
    },
    [blocks],
  )

  const deleteBlock = useCallback(
    (block: PageBlock) => {
      setBlocks(blocks.filter((b) => b.id !== block.id).map((b, i) => ({ ...b, displayOrder: i })))
      toast({ title: "Block deleted", variant: "destructive" })
    },
    [blocks, toast],
  )

  const saveBlockEdit = useCallback(
    (block: PageBlock) => {
      setBlocks(blocks.map((b) => (b.id === block.id ? block : b)))
      toast({ title: "Block updated" })
    },
    [blocks, toast],
  )

  const handlePublish = useCallback(async () => {
    if (!selectedPageId) return
    setIsPublishing(true)
    try {
      const sortedBlocks = blocks.map((b, i) => ({ ...b, displayOrder: i }))
      const res = await fetch("/api/pages/blocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId: selectedPageId, blocks: sortedBlocks, publish: !selectedPage?.isPublished }),
      })
      if (!res.ok) throw new Error("Failed to save")
      setPages((prev) => prev.map((p) => (p.id === selectedPageId ? { ...p, isPublished: !p.isPublished } : p)))
      toast({
        title: selectedPage?.isPublished ? "Unpublished" : "Published",
        description: `Page has been ${selectedPage?.isPublished ? "unpublished" : "published"} successfully.`,
      })
    } catch {
      toast({ title: "Error", description: "Failed to save changes. Try again.", variant: "destructive" })
    } finally {
      setIsPublishing(false)
    }
  }, [selectedPageId, blocks, selectedPage, toast])

  const handleCreatePage = useCallback(async () => {
    if (!newPageTitle.trim() || !newPageSlug.trim()) return
    try {
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newPageTitle, slug: newPageSlug }),
      })
      if (!res.ok) throw new Error("Failed to create page")
      const newPage = await res.json()
      setPages((prev) => [...prev, newPage])
      setSelectedPageId(newPage.id)
      setCreateOpen(false)
      setNewPageTitle("")
      setNewPageSlug("")
      toast({ title: "Page created", description: `"${newPageTitle}" has been created.` })
    } catch {
      toast({ title: "Error", description: "Could not create page.", variant: "destructive" })
    }
  }, [newPageTitle, newPageSlug, toast])

  const blockTypeButtons = (
    <div className="grid grid-cols-2 gap-1.5">
      {BLOCK_TYPES.map((bt) => (
        <button
          key={bt.type}
          onClick={() => addBlock(bt.type)}
          type="button"
          className="flex items-center gap-2 rounded-md border border-muted-foreground/20 px-2.5 py-2 text-xs font-medium hover:bg-muted/50 hover:border-muted-foreground/40 transition-all text-left"
        >
          <bt.icon className="h-4 w-4 shrink-0" style={{ color: bt.color }} />
          <span>{bt.label}</span>
        </button>
      ))}
    </div>
  )

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <aside className="w-64 shrink-0 border-r bg-muted/20 p-4 flex flex-col gap-4 overflow-y-auto">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold">Page Selector</span>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPageId} onValueChange={setSelectedPageId}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a page" />
              </SelectTrigger>
              <SelectContent>
                {pages.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    <span className="flex items-center gap-2">
                      {p.isHomepage && <Globe className="h-3 w-3 text-[#1b3a5c]" />}
                      {p.title}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <FilePlus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Page</DialogTitle>
                  <DialogDescription>Add a new page to the website.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-1.5">
                    <Label>Page Title</Label>
                    <Input value={newPageTitle} onChange={(e) => { setNewPageTitle(e.target.value); setNewPageSlug(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")) }} placeholder="e.g. About Us" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Slug</Label>
                    <Input value={newPageSlug} onChange={(e) => setNewPageSlug(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""))} placeholder="about-us" />
                    <p className="text-xs text-muted-foreground">URL: /{newPageSlug || "..."}</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreatePage} disabled={!newPageTitle.trim() || !newPageSlug.trim()}>Create Page</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Separator />
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Plus className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold">Add Block</span>
          </div>
          <ScrollArea className="h-[calc(100vh-20rem)]">
            {blockTypeButtons}
          </ScrollArea>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b bg-background px-6 py-3">
          <div>
            <h1 className="text-lg font-bold">Section Builder</h1>
            <p className="text-xs text-muted-foreground">
              {selectedPage ? `Editing: ${selectedPage.title}` : "No page selected"}
              {selectedPage?.isHomepage && <Badge variant="secondary" className="ml-2 text-[10px]">Homepage</Badge>}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
              selectedPage?.isPublished ? "text-[#1b3a5c] border-[#e2e5ea] bg-[#e8eef7] dark:bg-[#12283f] dark:border-[#1e3a5c]" : "text-[#b82e21] border-[#e2e5ea] bg-[#fde9e6] dark:bg-[#7a1f16] dark:border-[#b82e21]",
            )}>
              {selectedPage?.isPublished ? <Globe className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
              {selectedPage?.isPublished ? "Published" : "Draft"}
            </div>
            <Button
              variant={selectedPage?.isPublished ? "outline" : "default"}
              size="sm"
              onClick={handlePublish}
              disabled={!selectedPageId || isPublishing}
              className="gap-1.5"
            >
              {isPublishing ? <Loader2 className="h-4 w-4 animate-spin" /> : selectedPage?.isPublished ? <EyeOff className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
              {selectedPage?.isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Save className="h-4 w-4" /> Save Draft
            </Button>
          </div>
        </header>

        {!selectedPageId ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-3">
              <Layout className="h-12 w-12 mx-auto text-muted-foreground/40" />
              <p className="text-muted-foreground">Select or create a page to start building</p>
              <Button onClick={() => setCreateOpen(true)} variant="outline" className="gap-1.5">
                <FilePlus className="h-4 w-4" /> Create New Page
              </Button>
            </div>
          </div>
        ) : (
          <ScrollArea className="flex-1">
            <div className="mx-auto max-w-3xl p-6 space-y-2">
              <AnimatePresence mode="popLayout">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                    {blocks.map((block, index) => (
                      <div key={block.id} className="space-y-2">
                        <AddBlockButton onClick={() => setInsertAtIndex(index)} />
                        <SortableBlock
                          block={block}
                          index={index}
                          onEdit={(b) => { setEditBlock(b); setEditOpen(true) }}
                          onDuplicate={duplicateBlock}
                          onToggleVisibility={toggleVisibility}
                          onDelete={deleteBlock}
                          totalBlocks={blocks.length}
                        />
                      </div>
                    ))}
                  </SortableContext>
                </DndContext>
              </AnimatePresence>

              <AddBlockButton onClick={() => setInsertAtIndex(blocks.length)} label="Add Block at End" />

              {blocks.length === 0 && (
                <div className="py-16 text-center space-y-4">
                  <Layout className="h-16 w-16 mx-auto text-muted-foreground/20" />
                  <p className="text-muted-foreground">No blocks yet. Add a block to start building your page.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        )}

        <AnimatePresence>
          {insertAtIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={() => setInsertAtIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-background rounded-xl shadow-2xl p-6 w-full max-w-lg mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Choose a Block Type</h2>
                  <button onClick={() => setInsertAtIndex(null)} className="p-1 rounded-md hover:bg-muted" type="button">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {BLOCK_TYPES.map((bt) => (
                    <button
                      key={bt.type}
                      onClick={() => addBlock(bt.type, insertAtIndex)}
                      type="button"
                      className="flex items-center gap-2.5 rounded-lg border p-3 text-sm font-medium hover:bg-muted/50 hover:border-muted-foreground/40 transition-all text-left"
                    >
                      <div className="rounded-md p-1.5" style={{ backgroundColor: `${bt.color}20` }}>
                        <bt.icon className="h-5 w-5" style={{ color: bt.color }} />
                      </div>
                      <div>
                        <div>{bt.label}</div>
                        <div className="text-[10px] text-muted-foreground font-normal">Click to add</div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <BlockEditDialog block={editBlock} open={editOpen} onOpenChange={setEditOpen} onSave={saveBlockEdit} />
      </main>
    </div>
  )
}
