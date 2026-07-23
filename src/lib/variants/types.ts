export type VariantSection =
  | "navbar"
  | "footer"
  | "hero"
  | "dashboard"
  | "events"
  | "news"
  | "notice"
  | "gallery"
  | "faculty"
  | "programs";

export interface VariantConfig {
  id: string;
  section: VariantSection;
  name: string;
  slug: string;
  thumbnail?: string;
  description?: string;
  isBuiltIn: boolean;
  config: Record<string, any>;
}

export interface NavbarVariantConfig {
  style: "centered-logo" | "logo-left" | "transparent-over-hero" | "sticky-minimal" | "mega-menu" | "top-announcement" | "search-bar" | "two-row" | "hamburger-center" | "dark-mode";
  sticky: boolean;
  transparent: boolean;
  showSearch: boolean;
  showCta: boolean;
  ctaLabel: string;
  ctaLink: string;
  announcementText?: string;
  announcementColor?: string;
  menuAnimation: "none" | "fade" | "slide" | "scale";
  mobileBreakpoint: "sm" | "md" | "lg";
  layout: "full-width" | "contained";
  height: "compact" | "default" | "large";
  showThemeToggle: boolean;
  showLanguageToggle: boolean;
}

export interface FooterVariantConfig {
  style: "multi-column" | "minimal" | "newsletter" | "map-embed" | "social-prominent" | "dark" | "cta-block" | "centered" | "split" | "compact";
  columns: number;
  showNewsletter: boolean;
  showSocialIcons: boolean;
  showContactInfo: boolean;
  showMap: boolean;
  layout: "full-width" | "contained";
  backgroundColor: string;
  textColor: string;
  borderTop: boolean;
}

export interface HeroVariantConfig {
  style: "full-image" | "split-left" | "split-right" | "video-bg" | "animated-stats" | "carousel" | "gradient-overlay" | "minimal-text" | "pattern-bg" | "floating-elements";
  overlayColor: string;
  overlayOpacity: number;
  textAlign: "left" | "center" | "right";
  showStats: boolean;
  showCta: boolean;
  ctaPrimaryLabel: string;
  ctaPrimaryLink: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryLink?: string;
  animationType: "none" | "fade" | "slide-up" | "zoom";
  height: "small" | "medium" | "large" | "fullscreen";
}

export interface DashboardVariantConfig {
  style: "sidebar-left" | "sidebar-right" | "top-nav-only" | "collapsible-sidebar" | "card-grid" | "icon-sidebar" | "dark-theme" | "colorful" | "minimal" | "bottom-nav";
  sidebarCollapsed: boolean;
  showBreadcrumbs: boolean;
  showNotifications: boolean;
  showSearch: boolean;
  theme: "light" | "dark" | "system";
  layout: "full-width" | "contained";
  menuStyle: "icons-text" | "icons-only" | "text-only";
  accentColor: string;
}

export interface EventsVariantConfig {
  style: "grid-cards" | "list-view" | "timeline" | "calendar" | "countdown-cards" | "masonry" | "rsvp-prominent" | "table-list" | "featured-plus-grid" | "compact-list";
  showFilters: boolean;
  showSearch: boolean;
  itemsPerRow: 1 | 2 | 3 | 4;
  showImage: boolean;
  showDate: boolean;
  showLocation: boolean;
  showRegistration: boolean;
  cardStyle: "elevated" | "bordered" | "flat" | "gradient";
}

export interface NewsVariantConfig {
  style: "blog-grid" | "magazine" | "list-thumbnail" | "featured-plus-grid" | "minimal-list" | "category-cards" | "masonry" | "compact-list" | "card-with-author" | "timeline";
  showFilters: boolean;
  showSearch: boolean;
  showAuthor: boolean;
  showDate: boolean;
  showExcerpt: boolean;
  itemsPerRow: 1 | 2 | 3 | 4;
  cardStyle: "elevated" | "bordered" | "flat" | "gradient";
  excerptLength: number;
}

export interface NoticeVariantConfig {
  style: "table-list" | "sticky-notes" | "alert-banner" | "categorized-tabs" | "accordion" | "pdf-cards" | "ticker-tape" | "priority-cards" | "minimal-list" | "board-style";
  showCategory: boolean;
  showPriority: boolean;
  showAttachment: boolean;
  showDate: boolean;
  itemsPerPage: number;
  layout: "full-width" | "contained";
}

export interface GalleryVariantConfig {
  style: "masonry" | "lightbox-grid" | "category-filtered" | "carousel" | "pinterest-style" | "before-after" | "album-covers" | "slideshow" | "grid-with-overlay" | "compact-thumbnails";
  columns: 1 | 2 | 3 | 4 | 5;
  showCaption: boolean;
  showCategory: boolean;
  lightboxEnabled: boolean;
  imageAspectRatio: "square" | "portrait" | "landscape" | "auto";
  animationOnHover: "none" | "zoom" | "tilt" | "overlay";
}

export interface FacultyVariantConfig {
  style: "card-grid" | "list-expand" | "filterable-departments" | "hover-flip" | "minimal-list" | "profile-modal" | "table-view" | "directory-with-search" | "card-with-social" | "grid-compact";
  showFilters: boolean;
  showSearch: boolean;
  showPhoto: boolean;
  showQualifications: boolean;
  showBio: boolean;
  itemsPerRow: 1 | 2 | 3 | 4;
  cardStyle: "elevated" | "bordered" | "flat" | "gradient";
}

export interface ProgramsVariantConfig {
  style: "tabbed" | "accordion" | "comparison-table" | "card-per-program" | "timeline" | "featured-cards" | "list-with-icons" | "sidebar-nav" | "carousel-cards" | "grid-with-details";
  showCurriculum: boolean;
  showEligibility: boolean;
  showCareerOptions: boolean;
  showDownloadButton: boolean;
  layout: "full-width" | "contained";
  cardStyle: "elevated" | "bordered" | "flat" | "gradient";
}

export type AllVariantConfigs =
  | NavbarVariantConfig
  | FooterVariantConfig
  | HeroVariantConfig
  | DashboardVariantConfig
  | EventsVariantConfig
  | NewsVariantConfig
  | NoticeVariantConfig
  | GalleryVariantConfig
  | FacultyVariantConfig
  | ProgramsVariantConfig;

export interface BlockStyleSettings {
  backgroundColor?: string;
  textColor?: string;
  paddingY?: "none" | "small" | "medium" | "large";
  paddingX?: "none" | "small" | "medium" | "large";
  textAlign?: "left" | "center" | "right";
  maxWidth?: "narrow" | "medium" | "wide" | "full";
  backgroundImage?: string;
  backgroundOverlay?: string;
  borderTop?: boolean;
  borderBottom?: boolean;
  borderRadius?: "none" | "small" | "medium" | "large";
  shadow?: "none" | "small" | "medium" | "large";
  customCss?: string;
}

export type BlockType =
  | "hero"
  | "text"
  | "image"
  | "gallery"
  | "video"
  | "stats"
  | "cardGrid"
  | "testimonial"
  | "cta"
  | "form"
  | "faq"
  | "map"
  | "customHtml"
  | "divider";

export interface PageBlock {
  id: string;
  pageId: string;
  blockType: BlockType;
  content: Record<string, any>;
  displayOrder: number;
  isVisible: boolean;
  styleSettings: BlockStyleSettings;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  socialImageUrl?: string;
  isPublished: boolean;
  language: string;
  blocks: PageBlock[];
  createdAt: string;
  updatedAt: string;
}
