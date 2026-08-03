import {
  VariantSection,
  NavbarVariantConfig,
  FooterVariantConfig,
  HeroVariantConfig,
  DashboardVariantConfig,
  EventsVariantConfig,
  NewsVariantConfig,
  NoticeVariantConfig,
  GalleryVariantConfig,
  FacultyVariantConfig,
  ProgramsVariantConfig,
} from "./types";

// ==================== NAVBAR VARIANTS ====================
export const NAVBAR_VARIANTS: Record<string, { name: string; description: string; config: NavbarVariantConfig }> = {
  "navbar-default": {
    name: "Logo Left + Standard Links",
    description: "Classic layout with logo on left, navigation links centered/right, CTA button",
    config: { style: "logo-left", sticky: true, transparent: false, showSearch: true, showCta: true, ctaLabel: "Student Portal", ctaLink: "/login", menuAnimation: "fade", mobileBreakpoint: "lg", layout: "contained", height: "default", showThemeToggle: true, showLanguageToggle: false },
  },
  "navbar-centered-logo": {
    name: "Centered Logo + Side Links",
    description: "Logo centered at top, navigation links on both sides below it",
    config: { style: "centered-logo", sticky: true, transparent: false, showSearch: true, showCta: true, ctaLabel: "Apply Now", ctaLink: "/admissions", menuAnimation: "fade", mobileBreakpoint: "lg", layout: "contained", height: "default", showThemeToggle: true, showLanguageToggle: false },
  },
  "navbar-transparent-over-hero": {
    name: "Transparent Over Hero",
    description: "Navbar sits on top of hero image with transparent background, turns solid on scroll",
    config: { style: "transparent-over-hero", sticky: true, transparent: true, showSearch: false, showCta: true, ctaLabel: "Student Portal", ctaLink: "/login", menuAnimation: "fade", mobileBreakpoint: "lg", layout: "full-width", height: "default", showThemeToggle: true, showLanguageToggle: false },
  },
  "navbar-sticky-minimal": {
    name: "Sticky Minimal Bar",
    description: "Slim, compact navbar with minimal elements, logo and essential links only",
    config: { style: "sticky-minimal", sticky: true, transparent: false, showSearch: false, showCta: true, ctaLabel: "Login", ctaLink: "/login", menuAnimation: "none", mobileBreakpoint: "md", layout: "contained", height: "compact", showThemeToggle: true, showLanguageToggle: false },
  },
  "navbar-mega-menu": {
    name: "Mega Menu Dropdown",
    description: "Full-width dropdown panels on hover showing rich link groups with icons",
    config: { style: "mega-menu", sticky: true, transparent: false, showSearch: true, showCta: true, ctaLabel: "Apply Now", ctaLink: "/admissions", menuAnimation: "scale", mobileBreakpoint: "lg", layout: "full-width", height: "default", showThemeToggle: true, showLanguageToggle: false },
  },
  "navbar-top-announcement": {
    name: "Top Announcement Strip",
    description: "Colored announcement bar above the main navbar, ideal for urgent notices",
    config: { style: "top-announcement", sticky: true, transparent: false, showSearch: true, showCta: true, ctaLabel: "Admissions Open", ctaLink: "/admissions", announcementText: "🎓 Admissions Open for 2026 — Apply Now!", announcementColor: "#fe0000", menuAnimation: "fade", mobileBreakpoint: "lg", layout: "contained", height: "default", showThemeToggle: true, showLanguageToggle: false },
  },
  "navbar-search-bar": {
    name: "Navbar with Search Bar",
    description: "Prominent search bar integrated into the navbar for quick content discovery",
    config: { style: "search-bar", sticky: true, transparent: false, showSearch: true, showCta: true, ctaLabel: "Contact", ctaLink: "/contact", menuAnimation: "fade", mobileBreakpoint: "lg", layout: "contained", height: "default", showThemeToggle: true, showLanguageToggle: false },
  },
  "navbar-dark-mode": {
    name: "Dark Mode Navbar",
    description: "Dark-themed navbar that pairs well with light hero sections for contrast",
    config: { style: "dark-mode", sticky: true, transparent: false, showSearch: true, showCta: true, ctaLabel: "Student Portal", ctaLink: "/login", menuAnimation: "fade", mobileBreakpoint: "lg", layout: "contained", height: "default", showThemeToggle: true, showLanguageToggle: false },
  },
};

// ==================== FOOTER VARIANTS ====================
export const FOOTER_VARIANTS: Record<string, { name: string; description: string; config: FooterVariantConfig }> = {
  "footer-default": {
    name: "Multi-Column Footer",
    description: "Standard 4-column footer with links, contact info, social icons, and newsletter",
    config: { style: "multi-column", columns: 4, showNewsletter: true, showSocialIcons: true, showContactInfo: true, showMap: false, layout: "contained", backgroundColor: "#1b3f63", textColor: "#ffffff", borderTop: false },
  },
  "footer-minimal": {
    name: "Minimal Single Line",
    description: "Clean, minimal footer with just copyright and essential links in one line",
    config: { style: "minimal", columns: 1, showNewsletter: false, showSocialIcons: true, showContactInfo: false, showMap: false, layout: "contained", backgroundColor: "#1b3f63", textColor: "#ffffff", borderTop: true },
  },
  "footer-newsletter": {
    name: "Newsletter Signup Focus",
    description: "Footer with prominent newsletter signup form taking up half the space",
    config: { style: "newsletter", columns: 2, showNewsletter: true, showSocialIcons: true, showContactInfo: true, showMap: false, layout: "contained", backgroundColor: "#1b3f63", textColor: "#ffffff", borderTop: false },
  },
  "footer-social-prominent": {
    name: "Social Media Prominent",
    description: "Large social media icons at the top of the footer, quick link row below",
    config: { style: "social-prominent", columns: 3, showNewsletter: false, showSocialIcons: true, showContactInfo: true, showMap: false, layout: "contained", backgroundColor: "#1b3f63", textColor: "#ffffff", borderTop: false },
  },
  "footer-cta-block": {
    name: "Quick Contact CTA Block",
    description: "Footer starts with a CTA section (phone/email/visit), then links below",
    config: { style: "cta-block", columns: 3, showNewsletter: false, showSocialIcons: true, showContactInfo: true, showMap: false, layout: "contained", backgroundColor: "#1b3f63", textColor: "#ffffff", borderTop: false },
  },
  "footer-compact": {
    name: "Compact Dark Footer",
    description: "Space-efficient footer with two columns of links and a small copyright bar",
    config: { style: "compact", columns: 2, showNewsletter: false, showSocialIcons: true, showContactInfo: true, showMap: false, layout: "contained", backgroundColor: "#1b3f63", textColor: "#ffffff", borderTop: true },
  },
  "footer-centered": {
    name: "Centered Content Footer",
    description: "All content centered — logo, social icons, links, copyright in a single column",
    config: { style: "centered", columns: 1, showNewsletter: false, showSocialIcons: true, showContactInfo: true, showMap: false, layout: "contained", backgroundColor: "#1b3f63", textColor: "#ffffff", borderTop: false },
  },
};

// ==================== HERO VARIANTS ====================
export const HERO_VARIANTS: Record<string, { name: string; description: string; config: HeroVariantConfig }> = {
  "hero-default": {
    name: "Full Image with Overlay",
    description: "Full-width background image with dark gradient overlay, text centered",
    config: { style: "full-image", overlayColor: "#1b3f63", overlayOpacity: 0.7, textAlign: "center", showStats: true, showCta: true, ctaPrimaryLabel: "Explore Programs", ctaPrimaryLink: "/programs", ctaSecondaryLabel: "Apply Now", ctaSecondaryLink: "/admissions", animationType: "fade", height: "large" },
  },
  "hero-split": {
    name: "Split Layout (Text Left / Image Right)",
    description: "Equal split of text content on left, image/graphic on right side",
    config: { style: "split-left", overlayColor: "#1b3f63", overlayOpacity: 0.5, textAlign: "left", showStats: true, showCta: true, ctaPrimaryLabel: "Get Started", ctaPrimaryLink: "/admissions", ctaSecondaryLabel: "Learn More", ctaSecondaryLink: "/about", animationType: "slide-up", height: "medium" },
  },
  "hero-video-bg": {
    name: "Video Background",
    description: "Full-width hero with looping video background and overlaid content",
    config: { style: "video-bg", overlayColor: "#000000", overlayOpacity: 0.6, textAlign: "center", showStats: false, showCta: true, ctaPrimaryLabel: "Take Virtual Tour", ctaPrimaryLink: "/virtual-tour", animationType: "fade", height: "large" },
  },
  "hero-animated-stats": {
    name: "Animated Stats Counter",
    description: "Hero with large animated counter numbers (years, students, programs) as focal point",
    config: { style: "animated-stats", overlayColor: "#1b3f63", overlayOpacity: 0.6, textAlign: "center", showStats: true, showCta: true, ctaPrimaryLabel: "Our Programs", ctaPrimaryLink: "/programs", animationType: "zoom", height: "medium" },
  },
  "hero-carousel": {
    name: "Carousel/Slider Hero",
    description: "Rotating carousel of multiple hero slides with navigation dots and arrows",
    config: { style: "carousel", overlayColor: "#1b3f63", overlayOpacity: 0.6, textAlign: "center", showStats: false, showCta: true, ctaPrimaryLabel: "Learn More", ctaPrimaryLink: "/about", animationType: "fade", height: "large" },
  },
  "hero-minimal-text": {
    name: "Minimal Text-Only Hero",
    description: "Clean hero with just headline and subtitle, no background image or large visual",
    config: { style: "minimal-text", overlayColor: "#1b3f63", overlayOpacity: 0, textAlign: "center", showStats: false, showCta: true, ctaPrimaryLabel: "Explore", ctaPrimaryLink: "/programs", animationType: "fade", height: "small" },
  },
  "hero-gradient-overlay": {
    name: "Gradient Overlay Pattern",
    description: "Geometric pattern background with gradient color overlay for modern look",
    config: { style: "gradient-overlay", overlayColor: "#1b3f63", overlayOpacity: 0.8, textAlign: "left", showStats: true, showCta: true, ctaPrimaryLabel: "Discover More", ctaPrimaryLink: "/about", animationType: "slide-up", height: "medium" },
  },
};

// ==================== DASHBOARD VARIANTS ====================
export const DASHBOARD_VARIANTS: Record<string, { name: string; description: string; config: DashboardVariantConfig }> = {
  "dashboard-default": {
    name: "Sidebar Left (Standard)",
    description: "Collapsible sidebar on the left with icon+text menu items, top bar with user menu",
    config: { style: "sidebar-left", sidebarCollapsed: false, showBreadcrumbs: true, showNotifications: true, showSearch: true, theme: "system", layout: "full-width", menuStyle: "icons-text", accentColor: "#1b3f63" },
  },
  "dashboard-sidebar-right": {
    name: "Sidebar Right",
    description: "Sidebar on the right side, useful for RTL workflows or preference",
    config: { style: "sidebar-right", sidebarCollapsed: false, showBreadcrumbs: true, showNotifications: true, showSearch: true, theme: "system", layout: "full-width", menuStyle: "icons-text", accentColor: "#1b3f63" },
  },
  "dashboard-top-nav": {
    name: "Top Navigation Only",
    description: "No sidebar — horizontal top navigation bar with dropdown menus",
    config: { style: "top-nav-only", sidebarCollapsed: true, showBreadcrumbs: true, showNotifications: true, showSearch: true, theme: "system", layout: "contained", menuStyle: "text-only", accentColor: "#1b3f63" },
  },
  "dashboard-collapsible": {
    name: "Collapsible Icon Sidebar",
    description: "Sidebar collapses to icons-only on hover, maximizing content space",
    config: { style: "icon-sidebar", sidebarCollapsed: true, showBreadcrumbs: true, showNotifications: true, showSearch: true, theme: "system", layout: "full-width", menuStyle: "icons-only", accentColor: "#1b3f63" },
  },
  "dashboard-card-grid": {
    name: "Card Grid Dashboard",
    description: "Dashboard home as a grid of colorful quick-action cards, no sidebar",
    config: { style: "card-grid", sidebarCollapsed: true, showBreadcrumbs: false, showNotifications: true, showSearch: true, theme: "light", layout: "contained", menuStyle: "icons-only", accentColor: "#fe0000" },
  },
  "dashboard-dark-theme": {
    name: "Dark Theme Dashboard",
    description: "Dark mode default dashboard with light text on dark backgrounds",
    config: { style: "dark-theme", sidebarCollapsed: false, showBreadcrumbs: true, showNotifications: true, showSearch: true, theme: "dark", layout: "full-width", menuStyle: "icons-text", accentColor: "#fe0000" },
  },
  "dashboard-bottom-nav": {
    name: "Bottom Navigation (Mobile-First)",
    description: "Bottom tab bar navigation ideal for mobile/tablet usage",
    config: { style: "bottom-nav", sidebarCollapsed: true, showBreadcrumbs: false, showNotifications: true, showSearch: false, theme: "system", layout: "full-width", menuStyle: "icons-only", accentColor: "#1b3f63" },
  },
};

// ==================== EVENTS VARIANTS ====================
export const EVENTS_VARIANTS: Record<string, { name: string; description: string; config: EventsVariantConfig }> = {
  "events-default": { name: "Grid Cards", description: "Standard grid of event cards with image, date, title", config: { style: "grid-cards", showFilters: true, showSearch: true, itemsPerRow: 3, showImage: true, showDate: true, showLocation: true, showRegistration: true, cardStyle: "elevated" } },
  "events-list": { name: "List View", description: "Chronological list of events with compact details", config: { style: "list-view", showFilters: true, showSearch: true, itemsPerRow: 1, showImage: true, showDate: true, showLocation: true, showRegistration: true, cardStyle: "bordered" } },
  "events-timeline": { name: "Timeline View", description: "Events displayed on a vertical timeline with dates", config: { style: "timeline", showFilters: true, showSearch: false, itemsPerRow: 1, showImage: false, showDate: true, showLocation: true, showRegistration: true, cardStyle: "flat" } },
  "events-calendar": { name: "Calendar View", description: "Monthly calendar grid showing events on their dates", config: { style: "calendar", showFilters: true, showSearch: false, itemsPerRow: 1, showImage: false, showDate: true, showLocation: false, showRegistration: false, cardStyle: "flat" } },
  "events-countdown": { name: "Countdown Cards", description: "Cards with prominent countdown timer for each event", config: { style: "countdown-cards", showFilters: true, showSearch: true, itemsPerRow: 3, showImage: true, showDate: true, showLocation: true, showRegistration: true, cardStyle: "gradient" } },
  "events-featured-grid": { name: "Featured + Grid", description: "Featured large event card + smaller grid below", config: { style: "featured-plus-grid", showFilters: true, showSearch: true, itemsPerRow: 3, showImage: true, showDate: true, showLocation: true, showRegistration: true, cardStyle: "elevated" } },
};

// ==================== NEWS VARIANTS ====================
export const NEWS_VARIANTS: Record<string, { name: string; description: string; config: NewsVariantConfig }> = {
  "news-default": { name: "Blog Grid", description: "Standard blog grid layout with equal cards", config: { style: "blog-grid", showFilters: true, showSearch: true, showAuthor: true, showDate: true, showExcerpt: true, itemsPerRow: 3, cardStyle: "elevated", excerptLength: 150 } },
  "news-magazine": { name: "Magazine Layout", description: "Featured large post + 2-column grid below", config: { style: "magazine", showFilters: true, showSearch: true, showAuthor: true, showDate: true, showExcerpt: true, itemsPerRow: 2, cardStyle: "elevated", excerptLength: 200 } },
  "news-list-thumbnail": { name: "List with Thumbnail", description: "Horizontal list with thumbnail left, text right", config: { style: "list-thumbnail", showFilters: true, showSearch: true, showAuthor: true, showDate: true, showExcerpt: true, itemsPerRow: 1, cardStyle: "bordered", excerptLength: 120 } },
  "news-featured-grid": { name: "Featured + Grid", description: "Hero featured post + 3-column grid below", config: { style: "featured-plus-grid", showFilters: true, showSearch: true, showAuthor: true, showDate: true, showExcerpt: true, itemsPerRow: 3, cardStyle: "elevated", excerptLength: 150 } },
  "news-minimal-list": { name: "Minimal Text List", description: "Clean list of headlines with dates only", config: { style: "minimal-list", showFilters: true, showSearch: true, showAuthor: false, showDate: true, showExcerpt: false, itemsPerRow: 1, cardStyle: "flat", excerptLength: 0 } },
  "news-category-cards": { name: "Category Color Cards", description: "Cards with colored category tags as visual anchor", config: { style: "category-cards", showFilters: true, showSearch: true, showAuthor: true, showDate: true, showExcerpt: true, itemsPerRow: 3, cardStyle: "gradient", excerptLength: 100 } },
};

// ==================== NOTICE VARIANTS ====================
export const NOTICE_VARIANTS: Record<string, { name: string; description: string; config: NoticeVariantConfig }> = {
  "notice-default": { name: "Table List", description: "Clean table format with title, date, category, download", config: { style: "table-list", showCategory: true, showPriority: true, showAttachment: true, showDate: true, itemsPerPage: 20, layout: "contained" } },
  "notice-sticky-notes": { name: "Sticky Notes", description: "Colorful sticky-note style cards pinned to a board", config: { style: "sticky-notes", showCategory: true, showPriority: true, showAttachment: false, showDate: true, itemsPerPage: 12, layout: "contained" } },
  "notice-alert-banner": { name: "Alert Banner", description: "Urgent notices shown as colored alert banners at top", config: { style: "alert-banner", showCategory: true, showPriority: true, showAttachment: false, showDate: true, itemsPerPage: 10, layout: "full-width" } },
  "notice-categorized-tabs": { name: "Categorized Tabs", description: "Notice organized by category tabs (Academic/Admin/Exam)", config: { style: "categorized-tabs", showCategory: true, showPriority: true, showAttachment: true, showDate: true, itemsPerPage: 20, layout: "contained" } },
  "notice-accordion": { name: "Accordion List", description: "Expandable accordion panels for each notice", config: { style: "accordion", showCategory: true, showPriority: true, showAttachment: true, showDate: true, itemsPerPage: 30, layout: "contained" } },
  "notice-pdf-cards": { name: "PDF Attachment Cards", description: "Cards showcasing downloadable PDF attachments", config: { style: "pdf-cards", showCategory: true, showPriority: false, showAttachment: true, showDate: true, itemsPerPage: 12, layout: "contained" } },
};

// ==================== GALLERY VARIANTS ====================
export const GALLERY_VARIANTS: Record<string, { name: string; description: string; config: GalleryVariantConfig }> = {
  "gallery-default": { name: "Lightbox Grid", description: "Grid of thumbnails that open in lightbox on click", config: { style: "lightbox-grid", columns: 4, showCaption: true, showCategory: true, lightboxEnabled: true, imageAspectRatio: "landscape", animationOnHover: "zoom" } },
  "gallery-masonry": { name: "Masonry Grid", description: "Pinterest-style masonry layout with varying heights", config: { style: "masonry", columns: 3, showCaption: true, showCategory: true, lightboxEnabled: true, imageAspectRatio: "auto", animationOnHover: "none" } },
  "gallery-category-filtered": { name: "Category Filtered", description: "Filter buttons to show/hide images by category", config: { style: "category-filtered", columns: 4, showCaption: true, showCategory: true, lightboxEnabled: true, imageAspectRatio: "square", animationOnHover: "overlay" } },
  "gallery-carousel": { name: "Carousel/Slider", description: "Full-width image carousel with navigation arrows", config: { style: "carousel", columns: 1, showCaption: true, showCategory: false, lightboxEnabled: true, imageAspectRatio: "landscape", animationOnHover: "none" } },
  "gallery-album-covers": { name: "Album Covers", description: "Images grouped into albums with cover thumbnails", config: { style: "album-covers", columns: 3, showCaption: true, showCategory: true, lightboxEnabled: true, imageAspectRatio: "portrait", animationOnHover: "tilt" } },
  "gallery-grid-overlay": { name: "Grid with Overlay", description: "Grid where hover reveals text overlay on each image", config: { style: "grid-with-overlay", columns: 3, showCaption: true, showCategory: true, lightboxEnabled: true, imageAspectRatio: "landscape", animationOnHover: "overlay" } },
};

// ==================== FACULTY VARIANTS ====================
export const FACULTY_VARIANTS: Record<string, { name: string; description: string; config: FacultyVariantConfig }> = {
  "faculty-default": { name: "Card Grid with Photo", description: "Grid of faculty cards with photo, name, qualifications", config: { style: "card-grid", showFilters: true, showSearch: true, showPhoto: true, showQualifications: true, showBio: false, itemsPerRow: 4, cardStyle: "elevated" } },
  "faculty-list-expand": { name: "List with Expand", description: "Compact list that expands to show full bio on click", config: { style: "list-expand", showFilters: true, showSearch: true, showPhoto: true, showQualifications: true, showBio: true, itemsPerRow: 1, cardStyle: "bordered" } },
  "faculty-filterable": { name: "Filterable by Department", description: "Department filter buttons with filtered card grid", config: { style: "filterable-departments", showFilters: true, showSearch: true, showPhoto: true, showQualifications: true, showBio: false, itemsPerRow: 3, cardStyle: "flat" } },
  "faculty-hover-flip": { name: "Hover Flip Cards", description: "Cards that flip on hover to show bio on back", config: { style: "hover-flip", showFilters: true, showSearch: true, showPhoto: true, showQualifications: true, showBio: true, itemsPerRow: 3, cardStyle: "elevated" } },
  "faculty-minimal-list": { name: "Minimal Text List", description: "Simple text list with name, designation, department", config: { style: "minimal-list", showFilters: true, showSearch: true, showPhoto: false, showQualifications: true, showBio: false, itemsPerRow: 1, cardStyle: "flat" } },
  "faculty-table-view": { name: "Table/Directory View", description: "Searchable table with all faculty details as rows", config: { style: "table-view", showFilters: true, showSearch: true, showPhoto: false, showQualifications: true, showBio: false, itemsPerRow: 1, cardStyle: "bordered" } },
};

// ==================== PROGRAMS VARIANTS ====================
export const PROGRAMS_VARIANTS: Record<string, { name: string; description: string; config: ProgramsVariantConfig }> = {
  "programs-default": { name: "Card per Program", description: "Distinct cards for each program with icon, description, link", config: { style: "card-per-program", showCurriculum: false, showEligibility: true, showCareerOptions: true, showDownloadButton: true, layout: "contained", cardStyle: "elevated" } },
  "programs-tabbed": { name: "Tabbed Layout", description: "Program details in tabbed interface (Overview/Curriculum/Eligibility)", config: { style: "tabbed", showCurriculum: true, showEligibility: true, showCareerOptions: true, showDownloadButton: true, layout: "contained", cardStyle: "flat" } },
  "programs-accordion": { name: "Accordion Layout", description: "Expandable accordion panels for each program detail section", config: { style: "accordion", showCurriculum: true, showEligibility: true, showCareerOptions: true, showDownloadButton: true, layout: "contained", cardStyle: "flat" } },
  "programs-comparison": { name: "Comparison Table", description: "Side-by-side table comparing all programs across criteria", config: { style: "comparison-table", showCurriculum: false, showEligibility: true, showCareerOptions: true, showDownloadButton: false, layout: "full-width", cardStyle: "bordered" } },
  "programs-timeline": { name: "Timeline Curriculum", description: "Curriculum shown as a semester-by-semester timeline", config: { style: "timeline", showCurriculum: true, showEligibility: true, showCareerOptions: true, showDownloadButton: true, layout: "contained", cardStyle: "flat" } },
  "programs-featured-cards": { name: "Featured Cards", description: "Large visual cards with program icons and gradient backgrounds", config: { style: "featured-cards", showCurriculum: false, showEligibility: false, showCareerOptions: true, showDownloadButton: true, layout: "contained", cardStyle: "gradient" } },
};

// ==================== SECTION MAP ====================
export const VARIANT_SECTIONS: Record<VariantSection, { label: string; variants: Record<string, any> }> = {
  navbar: { label: "Navbar", variants: NAVBAR_VARIANTS },
  footer: { label: "Footer", variants: FOOTER_VARIANTS },
  hero: { label: "Hero/Banner", variants: HERO_VARIANTS },
  dashboard: { label: "Dashboard Layout", variants: DASHBOARD_VARIANTS },
  events: { label: "Events Page", variants: EVENTS_VARIANTS },
  news: { label: "News Page", variants: NEWS_VARIANTS },
  notice: { label: "Notice Board", variants: NOTICE_VARIANTS },
  gallery: { label: "Gallery", variants: GALLERY_VARIANTS },
  faculty: { label: "Faculty Directory", variants: FACULTY_VARIANTS },
  programs: { label: "Programs Page", variants: PROGRAMS_VARIANTS },
};

export function getVariantConfig(section: VariantSection, slug: string): Record<string, any> | null {
  const sectionData = VARIANT_SECTIONS[section];
  if (!sectionData) return null;
  const variant = sectionData.variants[slug];
  return variant?.config || null;
}

export function getDefaultVariant(section: VariantSection): string {
  const defaults: Record<VariantSection, string> = {
    navbar: "navbar-default",
    footer: "footer-default",
    hero: "hero-default",
    dashboard: "dashboard-default",
    events: "events-default",
    news: "news-default",
    notice: "notice-default",
    gallery: "gallery-default",
    faculty: "faculty-default",
    programs: "programs-default",
  };
  return defaults[section];
}
