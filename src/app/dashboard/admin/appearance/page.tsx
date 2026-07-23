"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Palette,
  Type,
  Image,
  Eye,
  Save,
  RotateCcw,
  Check,
  ChevronRight,
  Upload,
  X,
  Loader2,
  Globe,
  FileImage,
  Monitor,
  Smartphone,
  Tablet,
  Moon,
  Sun,
  Layout,
  RefreshCw,
  Download,
  Sparkles,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type VariantItem = {
  id: string
  name: string
  colors: [string, string, string]
  description: string
}

type FontPair = {
  heading: string
  body: string
}

type ColorScheme = {
  primary: string
  secondary: string
  accent: string
  background: string
}

type Settings = {
  colors: ColorScheme
  fonts: FontPair
  variants: Record<string, string>
  features: Record<string, boolean>
  logo: string | null
  favicon: string | null
}

type SectionKey =
  | "navbar" | "footer" | "hero" | "dashboard" | "events"
  | "news" | "notice" | "gallery" | "faculty" | "programs"

const FONT_PAIRS: FontPair[] = [
  { heading: "Playfair Display", body: "Inter" },
  { heading: "Poppins", body: "Open Sans" },
  { heading: "Merriweather", body: "Source Sans Pro" },
  { heading: "Montserrat", body: "Roboto" },
  { heading: "Lora", body: "Nunito" },
  { heading: "DM Serif Display", body: "DM Sans" },
]

const SECTIONS: SectionKey[] = [
  "navbar", "footer", "hero", "dashboard", "events",
  "news", "notice", "gallery", "faculty", "programs",
]

const SECTION_LABELS: Record<SectionKey, string> = {
  navbar: "Navbar", footer: "Footer", hero: "Hero Section",
  dashboard: "Dashboard", events: "Events Page", news: "News Page",
  notice: "Notice Board", gallery: "Gallery Page",
  faculty: "Faculty Page", programs: "Programs Page",
}

const SECTION_VARIANTS: Record<SectionKey, VariantItem[]> = {
  navbar: [
    { id: "default", name: "Default", colors: ["#1c3557", "#ffffff", "#e31c23"], description: "Solid navy bar" },
    { id: "transparent", name: "Transparent", colors: ["transparent", "#ffffff", "#e31c23"], description: "Floating overlay" },
    { id: "centered", name: "Centered", colors: ["#ffffff", "#1c3557", "#e31c23"], description: "White centered" },
    { id: "minimal", name: "Minimal", colors: ["#1c3557", "#94a3b8", "#e31c23"], description: "Compact minimal" },
  ],
  footer: [
    { id: "dark", name: "Dark", colors: ["#0f172a", "#ffffff", "#e31c23"], description: "Dark navy footer" },
    { id: "light", name: "Light", colors: ["#f8fafc", "#1c3557", "#e31c23"], description: "Light footer" },
    { id: "split", name: "Split", colors: ["#1c3557", "#ffffff", "#334155"], description: "Split design" },
    { id: "minimal", name: "Minimal", colors: ["#ffffff", "#64748b", "#1c3557"], description: "Minimal layout" },
  ],
  hero: [
    { id: "gradient", name: "Gradient", colors: ["#1c3557", "#ffffff", "#e31c23"], description: "Navy gradient bg" },
    { id: "image", name: "Image Focus", colors: ["#0f172a", "#ffffff", "#e31c23"], description: "Dark overlay bg" },
    { id: "minimal", name: "Minimal", colors: ["#ffffff", "#1c3557", "#e31c23"], description: "Clean white hero" },
    { id: "split", name: "Split Screen", colors: ["#1c3557", "#ffffff", "#e31c23"], description: "Split layout" },
  ],
  dashboard: [
    { id: "default", name: "Default", colors: ["#1c3557", "#ffffff", "#e31c23"], description: "Standard admin" },
    { id: "compact", name: "Compact", colors: ["#1c3557", "#f1f5f9", "#e31c23"], description: "Dense layout" },
    { id: "light", name: "Light", colors: ["#ffffff", "#1c3557", "#3b82f6"], description: "Light theme" },
    { id: "modern", name: "Modern", colors: ["#0f172a", "#ffffff", "#6366f1"], description: "Glass morphism" },
  ],
  events: [
    { id: "cards", name: "Card Grid", colors: ["#ffffff", "#1c3557", "#e31c23"], description: "Grid of cards" },
    { id: "list", name: "List View", colors: ["#ffffff", "#1c3557", "#e31c23"], description: "Horizontal list" },
    { id: "calendar", name: "Calendar", colors: ["#ffffff", "#1c3557", "#e31c23"], description: "Calendar layout" },
    { id: "timeline", name: "Timeline", colors: ["#f8fafc", "#1c3557", "#e31c23"], description: "Chronological" },
  ],
  news: [
    { id: "magazine", name: "Magazine", colors: ["#ffffff", "#1c3557", "#e31c23"], description: "Feature grid" },
    { id: "blog", name: "Blog Style", colors: ["#ffffff", "#1c3557", "#e31c23"], description: "List with sidebar" },
    { id: "modern", name: "Modern", colors: ["#f8fafc", "#1c3557", "#3b82f6"], description: "Clean modern" },
    { id: "compact", name: "Compact", colors: ["#ffffff", "#1c3557", "#e31c23"], description: "Dense layout" },
  ],
  notice: [
    { id: "banner", name: "Banner", colors: ["#e31c23", "#ffffff", "#1c3557"], description: "Red banner alerts" },
    { id: "sidebar", name: "Sidebar", colors: ["#ffffff", "#1c3557", "#e31c23"], description: "Side panel list" },
    { id: "modal", name: "Popover", colors: ["#ffffff", "#1c3557", "#e31c23"], description: "Modal notifications" },
    { id: "marquee", name: "Marquee", colors: ["#1c3557", "#ffffff", "#e31c23"], description: "Scrolling ticker" },
  ],
  gallery: [
    { id: "grid", name: "Grid", colors: ["#ffffff", "#1c3557", "#e31c23"], description: "Masonry grid" },
    { id: "slider", name: "Slider", colors: ["#0f172a", "#ffffff", "#e31c23"], description: "Fullscreen slider" },
    { id: "carousel", name: "Carousel", colors: ["#ffffff", "#1c3557", "#e31c23"], description: "Horizontal carousel" },
    { id: "lightbox", name: "Lightbox", colors: ["#0f172a", "#ffffff", "#e31c23"], description: "Grid + lightbox" },
  ],
  faculty: [
    { id: "cards", name: "Card Grid", colors: ["#ffffff", "#1c3557", "#e31c23"], description: "Profile cards" },
    { id: "list", name: "List", colors: ["#ffffff", "#1c3557", "#e31c23"], description: "Directory list" },
    { id: "table", name: "Table", colors: ["#ffffff", "#1c3557", "#e31c23"], description: "Data table" },
    { id: "modern", name: "Modern", colors: ["#f8fafc", "#1c3557", "#6366f1"], description: "Modern profiles" },
  ],
  programs: [
    { id: "cards", name: "Card Grid", colors: ["#ffffff", "#1c3557", "#e31c23"], description: "Program cards" },
    { id: "accordion", name: "Accordion", colors: ["#ffffff", "#1c3557", "#e31c23"], description: "Expandable list" },
    { id: "tabs", name: "Tabbed", colors: ["#ffffff", "#1c3557", "#e31c23"], description: "Tab navigation" },
    { id: "detailed", name: "Detailed", colors: ["#f8fafc", "#1c3557", "#e31c23"], description: "Full detail view" },
  ],
}

const FEATURES_CONFIG: { id: string; label: string; description: string }[] = [
  { id: "stats", label: "Statistics Display", description: "Show enrollment & performance stats" },
  { id: "testimonials", label: "Testimonials", description: "Display student & parent testimonials" },
  { id: "darkMode", label: "Dark Mode Toggle", description: "Allow users to switch to dark mode" },
  { id: "liveSearch", label: "Live Search", description: "Real-time search filtering" },
  { id: "animations", label: "Page Animations", description: "Framer-motion transitions" },
  { id: "breadcrumbs", label: "Breadcrumbs", description: "Show navigation breadcrumbs" },
  { id: "backToTop", label: "Back to Top", description: "Floating scroll-to-top button" },
  { id: "socialShare", label: "Social Share", description: "Share buttons on news & events" },
  { id: "newsletter", label: "Newsletter Signup", description: "Email subscription form" },
  { id: "multiLanguage", label: "Multi-Language", description: "Nepali & English language toggle" },
]

const DEFAULT_SETTINGS: Settings = {
  colors: { primary: "#1c3557", secondary: "#e31c23", accent: "#3b82f6", background: "#ffffff" },
  fonts: { heading: "Playfair Display", body: "Inter" },
  variants: Object.fromEntries(SECTIONS.map((s) => [s, SECTION_VARIANTS[s][0].id])),
  features: Object.fromEntries(FEATURES_CONFIG.map((f) => [f.id, f.id === "stats" || f.id === "darkMode" || f.id === "backToTop"])),
  logo: null,
  favicon: null,
}

const TAB_ITEMS = [
  { id: "colors", label: "Colors & Fonts", icon: Palette },
  { id: "variants", label: "Section Variants", icon: Layout },
  { id: "uploads", label: "Logo & Favicon", icon: Image },
  { id: "features", label: "Features", icon: Sparkles },
  { id: "preview", label: "Preview", icon: Eye },
]

function VariantPreview({ colors, selected }: { colors: [string, string, string]; selected: boolean }) {
  return (
    <div
      className={cn(
        "relative h-20 w-full overflow-hidden rounded-lg border-2 transition-all duration-200",
        selected ? "border-[#e31c23] shadow-md shadow-red-500/20" : "border-border hover:border-muted-foreground/40"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-2 items-center gap-1 px-2" style={{ backgroundColor: colors[0] === "transparent" ? "#1c3557" : colors[0] }}>
          <div className="h-1 w-1 rounded-full bg-white/60" />
          <div className="h-1 w-4 rounded-sm bg-white/40" />
          <div className="ml-auto flex gap-1">
            <div className="h-1 w-1 rounded-full bg-white/40" />
            <div className="h-1 w-1 rounded-full bg-white/40" />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 px-2" style={{ backgroundColor: colors[0] === "transparent" ? "oklch(0.967 0.003 264.542)" : "#f8fafc" }}>
          <div className="h-2 w-6 rounded-sm" style={{ backgroundColor: colors[2] }} />
          <div className="h-2 w-6 rounded-sm bg-muted-foreground/30" />
          <div className="h-2 w-6 rounded-sm bg-muted-foreground/30" />
        </div>
        <div className="flex h-2 items-center px-2" style={{ backgroundColor: colors[0] === "transparent" ? "#1c3557" : colors[0] }}>
          <div className="h-1 w-1 rounded-full bg-white/40" />
        </div>
      </div>
      {selected && (
        <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#e31c23]">
          <Check className="h-3 w-3 text-white" />
        </div>
      )}
    </div>
  )
}

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3">
      <Label className="w-28 shrink-0 text-sm font-medium text-muted-foreground">{label}</Label>
      <div className="relative flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-9 cursor-pointer rounded-lg border-0 bg-transparent p-0.5 ring-1 ring-border ring-offset-1 transition-shadow hover:ring-foreground/30"
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-28 font-mono text-xs uppercase"
        />
      </div>
    </div>
  )
}

function FontSelector({
  label, value, options, onChange,
}: {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}) {
  return (
    <div className="flex items-center gap-3">
      <Label className="w-28 shrink-0 text-sm font-medium text-muted-foreground">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-56">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              <span style={{ fontFamily: opt.value }}>{opt.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function LogoUpload({
  label, current, onUpload, onRemove,
}: {
  label: string
  current: string | null
  onUpload: () => void
  onRemove: () => void
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border-2 border-dashed bg-muted/30">
        {current ? (
          <img src={current} alt={label} className="h-12 w-12 rounded object-contain" />
        ) : (
          <FileImage className="h-6 w-6 text-muted-foreground/60" />
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">PNG, SVG or JPG. Max 2MB.</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onUpload}>
          <Upload className="mr-1 h-3 w-3" /> Upload
        </Button>
        {current && (
          <Button variant="ghost" size="sm" className="text-red-500" onClick={onRemove}>
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  )
}

function PreviewPanel({ settings }: { settings: Settings }) {
  const pairIndex = FONT_PAIRS.findIndex(
    (p) => p.heading === settings.fonts.heading && p.body === settings.fonts.body
  )

  return (
    <div className="space-y-4">
      <div
        className="overflow-hidden rounded-xl border shadow-lg"
        style={{ backgroundColor: settings.colors.background }}
      >
        <div className="flex items-center gap-4 px-6 py-3" style={{ backgroundColor: settings.colors.primary }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/20 text-sm font-bold text-white">M</div>
          <div className="flex gap-4">
            {["Home", "About", "Programs", "Contact"].map((link) => (
              <span key={link} className="text-xs font-medium text-white/80 hover:text-white">{link}</span>
            ))}
          </div>
        </div>
        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2
                className="text-2xl font-bold tracking-tight"
                style={{
                  fontFamily: settings.fonts.heading,
                  color: settings.colors.primary,
                }}
              >
                Milton International College
              </h2>
              <p
                className="text-sm"
                style={{
                  fontFamily: settings.fonts.body,
                  color: settings.colors.secondary,
                }}
              >
                Affiliated with Tribhuvan University
              </p>
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded-lg" style={{ backgroundColor: settings.colors.accent }} />
              <div className="h-8 w-8 rounded-lg" style={{ backgroundColor: settings.colors.secondary }} />
              <div className="h-8 w-8 rounded-lg" style={{ backgroundColor: settings.colors.primary }} />
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-3 gap-3">
            {["BCA", "BBM", "BBS"].map((prog) => (
              <div
                key={prog}
                className="rounded-lg border p-3 text-center"
                style={{ borderColor: settings.colors.secondary + "40" }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{
                    fontFamily: settings.fonts.heading,
                    color: settings.colors.primary,
                  }}
                >
                  {prog}
                </p>
                <p
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: settings.fonts.body }}
                >
                  4-year program
                </p>
              </div>
            ))}
          </div>
          <div
            className="rounded-lg px-4 py-2 text-center text-sm font-medium text-white"
            style={{ backgroundColor: settings.colors.secondary }}
          >
            Admissions Open for 2026
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 px-6 py-3" style={{ backgroundColor: settings.colors.primary }}>
          <span className="text-xs text-white/60">© 2026 Milton International College</span>
          <span className="text-xs text-white/60">Privacy Policy</span>
          <span className="text-xs text-white/60">Contact Us</span>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/20 p-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Globe className="h-3 w-3" />
          <span>Font pair: </span>
          <span style={{ fontFamily: settings.fonts.heading }} className="font-semibold text-foreground">
            {settings.fonts.heading}
          </span>
          <span>+</span>
          <span style={{ fontFamily: settings.fonts.body }} className="text-foreground">
            {settings.fonts.body}
          </span>
          <span className="ml-auto">
            Color: {settings.colors.primary} / {settings.colors.secondary} / {settings.colors.accent}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function AppearancePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("colors")
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [hasChanges, setHasChanges] = useState(false)
  const settingsRef = useRef(settings)

  useEffect(() => {
    settingsRef.current = settings
  }, [settings])

  useEffect(() => {
    async function fetchData() {
      try {
        const [settingsRes, variantsRes] = await Promise.all([
          fetch("/api/settings"),
          fetch("/api/variants"),
        ])
        if (settingsRes.ok) {
          const data = await settingsRes.json()
          setSettings({ ...DEFAULT_SETTINGS, ...data })
        }
        if (!variantsRes.ok) {
          console.warn("Could not load variants, using defaults")
        }
      } catch {
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: "Could not load settings. Using defaults.",
        })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateSetting = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }, [])

  const updateColors = useCallback((key: keyof ColorScheme, value: string) => {
    setSettings((prev) => ({ ...prev, colors: { ...prev.colors, [key]: value } }))
    setHasChanges(true)
  }, [])

  const updateFonts = useCallback((key: keyof FontPair, value: string) => {
    setSettings((prev) => ({
      ...prev,
      fonts: { ...prev.fonts, [key]: value },
    }))
    setHasChanges(true)
  }, [])

  const updateVariant = useCallback((section: SectionKey, variantId: string) => {
    setSettings((prev) => ({
      ...prev,
      variants: { ...prev.variants, [section]: variantId },
    }))
    setHasChanges(true)
  }, [])

  const toggleFeature = useCallback((id: string) => {
    setSettings((prev) => ({
      ...prev,
      features: { ...prev.features, [id]: !prev.features[id] },
    }))
    setHasChanges(true)
  }, [])

  const handleSave = useCallback(
    async (publish: boolean) => {
      setSaving(true)
      try {
        const res = await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...settingsRef.current, published: publish }),
        })
        if (!res.ok) throw new Error("Save failed")
        setHasChanges(false)
        toast({
          variant: "success",
          title: publish ? "Changes Published" : "Draft Saved",
          description: publish
            ? "Your appearance changes are now live."
            : "Your changes have been saved as a draft.",
        })
      } catch {
        toast({
          variant: "destructive",
          title: "Save Failed",
          description: "Could not save changes. Please try again.",
        })
      } finally {
        setSaving(false)
      }
    },
    [toast]
  )

  const handleReset = useCallback(() => {
    setSettings(DEFAULT_SETTINGS)
    setHasChanges(true)
    toast({
      title: "Reset to Defaults",
      description: "Settings have been reverted. Save to apply.",
    })
  }, [toast])

  const handleUpload = useCallback(
    (type: "logo" | "favicon") => {
      toast({
        title: "Upload",
        description: `${type === "logo" ? "Logo" : "Favicon"} upload dialog would open here.`,
      })
    },
    [toast]
  )

  const handleRemoveUpload = useCallback(
    (type: "logo" | "favicon") => {
      updateSetting(type === "logo" ? "logo" : "favicon", null)
      toast({ title: "Removed", description: `${type === "logo" ? "Logo" : "Favicon"} has been removed.` })
    },
    [updateSetting, toast]
  )

  const headingOptions = FONT_PAIRS.map((p) => ({ value: p.heading, label: p.heading }))
  const bodyOptions = FONT_PAIRS.map((p) => ({ value: p.body, label: p.body }))

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#1c3557]" />
          <p className="text-sm text-muted-foreground">Loading appearance settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1c3557] dark:text-white md:text-3xl">
            Appearance
          </h1>
          <p className="mt-1 text-muted-foreground">
            Customize your college&apos;s visual identity &mdash; colors, fonts, layouts, and features.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="mr-1 h-4 w-4" /> Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSave(false)}
            disabled={saving || !hasChanges}
          >
            {saving ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Save className="mr-1 h-4 w-4" />}
            Save Draft
          </Button>
          <Button
            variant="navy"
            size="sm"
            onClick={() => handleSave(true)}
            disabled={saving || !hasChanges}
          >
            {saving ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              <Check className="mr-1 h-4 w-4" />
            )}
            Publish
          </Button>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start overflow-x-auto bg-muted/50 p-1">
          {TAB_ITEMS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800"
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── Colors & Fonts Tab ── */}
        <TabsContent value="colors" className="mt-6 space-y-6">
          <motion.div key="cf" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-[#1c3557]/10 p-2">
                    <Palette className="h-5 w-5 text-[#1c3557]" />
                  </div>
                  <div>
                    <CardTitle>Site Colors</CardTitle>
                    <CardDescription>Set the primary, secondary, accent, and background colors</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <ColorPicker label="Primary" value={settings.colors.primary} onChange={(v) => updateColors("primary", v)} />
                  <ColorPicker label="Secondary" value={settings.colors.secondary} onChange={(v) => updateColors("secondary", v)} />
                  <ColorPicker label="Accent" value={settings.colors.accent} onChange={(v) => updateColors("accent", v)} />
                  <ColorPicker label="Background" value={settings.colors.background} onChange={(v) => updateColors("background", v)} />
                </div>
                <div className="flex gap-3 rounded-lg border bg-muted/20 p-3">
                  {Object.entries(settings.colors).map(([name, hex]) => (
                    <div key={name} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="h-4 w-4 rounded-full border" style={{ backgroundColor: hex }} />
                      <span className="capitalize">{name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6 border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-[#1c3557]/10 p-2">
                    <Type className="h-5 w-5 text-[#1c3557]" />
                  </div>
                  <div>
                    <CardTitle>Typography</CardTitle>
                    <CardDescription>Choose from carefully selected Google font pairs</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <FontSelector
                  label="Heading Font"
                  value={settings.fonts.heading}
                  options={headingOptions}
                  onChange={(v) => updateFonts("heading", v)}
                />
                <FontSelector
                  label="Body Font"
                  value={settings.fonts.body}
                  options={bodyOptions}
                  onChange={(v) => updateFonts("body", v)}
                />
                <Separator />
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p
                    className="text-lg font-bold"
                    style={{ fontFamily: settings.fonts.heading }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                  <p
                    className="mt-2 text-sm leading-relaxed text-muted-foreground"
                    style={{ fontFamily: settings.fonts.body }}
                  >
                    Milton International College provides quality education affiliated with
                    Tribhuvan University, offering BCA, BBM, BBS, and BASW programs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* ── Section Variants Tab ── */}
        <TabsContent value="variants" className="mt-6">
          <motion.div key="sv" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-[#1c3557]/10 p-2">
                    <Layout className="h-5 w-5 text-[#1c3557]" />
                  </div>
                  <div>
                    <CardTitle>Section Variants</CardTitle>
                    <CardDescription>Choose a visual style for each section of the site</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[520px] pr-4">
                  <div className="space-y-6">
                    {SECTIONS.map((section) => {
                      const variants = SECTION_VARIANTS[section]
                      const selected = settings.variants[section]
                      return (
                        <div key={section}>
                          <div className="mb-3 flex items-center gap-2">
                            <Badge variant="outline" className="bg-[#1c3557]/5 px-2 py-0 text-xs font-medium text-[#1c3557] dark:text-white">
                              {SECTION_LABELS[section]}
                            </Badge>
                          </div>
                          <div className="flex gap-3 overflow-x-auto pb-2">
                            {variants.map((v) => (
                              <button
                                key={v.id}
                                onClick={() => updateVariant(section, v.id)}
                                className={cn(
                                  "group w-[160px] shrink-0 rounded-xl border-2 p-2 text-left transition-all duration-200",
                                  selected === v.id
                                    ? "border-[#e31c23] bg-red-50 dark:bg-red-950/20"
                                    : "border-border bg-card hover:border-muted-foreground/40 hover:shadow-md"
                                )}
                              >
                                <VariantPreview colors={v.colors} selected={selected === v.id} />
                                <p className="mt-2 text-xs font-semibold">{v.name}</p>
                                <p className="text-[10px] leading-tight text-muted-foreground">
                                  {v.description}
                                </p>
                              </button>
                            ))}
                          </div>
                          {section !== SECTIONS[SECTIONS.length - 1] && (
                            <Separator className="mt-4" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* ── Logo & Favicon Tab ── */}
        <TabsContent value="uploads" className="mt-6">
          <motion.div key="up" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-[#1c3557]/10 p-2">
                    <Image className="h-5 w-5 text-[#1c3557]" />
                  </div>
                  <div>
                    <CardTitle>Logo & Favicon</CardTitle>
                    <CardDescription>Upload your college branding assets</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <LogoUpload
                  label="College Logo"
                  current={settings.logo}
                  onUpload={() => handleUpload("logo")}
                  onRemove={() => handleRemoveUpload("logo")}
                />
                <Separator />
                <LogoUpload
                  label="Favicon"
                  current={settings.favicon}
                  onUpload={() => handleUpload("favicon")}
                  onRemove={() => handleRemoveUpload("favicon")}
                />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* ── Features Tab ── */}
        <TabsContent value="features" className="mt-6">
          <motion.div key="fe" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-[#1c3557]/10 p-2">
                    <Sparkles className="h-5 w-5 text-[#1c3557]" />
                  </div>
                  <div>
                    <CardTitle>Feature Toggles</CardTitle>
                    <CardDescription>Enable or disable site-wide features</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-1">
                    {FEATURES_CONFIG.map((feature) => {
                      const enabled = settings.features[feature.id]
                      return (
                        <div
                          key={feature.id}
                          className={cn(
                            "flex items-center justify-between rounded-lg px-4 py-3 transition-colors",
                            enabled ? "bg-green-50/50 dark:bg-green-950/10" : "hover:bg-muted/30"
                          )}
                        >
                          <div>
                            <Label className="cursor-pointer text-sm font-medium">{feature.label}</Label>
                            <p className="text-xs text-muted-foreground">{feature.description}</p>
                          </div>
                          <Switch
                            checked={enabled}
                            onCheckedChange={() => toggleFeature(feature.id)}
                          />
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* ── Preview Tab ── */}
        <TabsContent value="preview" className="mt-6">
          <motion.div key="pr" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-[#1c3557]/10 p-2">
                    <Eye className="h-5 w-5 text-[#1c3557]" />
                  </div>
                  <div>
                    <CardTitle>Live Preview</CardTitle>
                    <CardDescription>See how your changes will look on the site</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <PreviewPanel settings={settings} />
                <div className="mt-6 flex items-center justify-between rounded-lg border bg-muted/20 p-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Monitor className="h-4 w-4" />
                    <span>Desktop preview</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={hasChanges ? "warning" : "success"}
                      className="gap-1"
                    >
                      {hasChanges ? (
                        <><AlertTriangle className="h-3 w-3" /> Unsaved changes</>
                      ) : (
                        <><Check className="h-3 w-3" /> All saved</>
                      )}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}