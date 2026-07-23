"use client"
import React from "react"
import {
  NAVBAR_VARIANTS, FOOTER_VARIANTS, HERO_VARIANTS,
  DASHBOARD_VARIANTS, EVENTS_VARIANTS, NEWS_VARIANTS,
  NOTICE_VARIANTS, GALLERY_VARIANTS, FACULTY_VARIANTS, PROGRAMS_VARIANTS,
  getDefaultVariant
} from "./registry"
import type {
  VariantSection, NavbarVariantConfig, FooterVariantConfig, HeroVariantConfig,
  DashboardVariantConfig, EventsVariantConfig, NewsVariantConfig,
  NoticeVariantConfig, GalleryVariantConfig, FacultyVariantConfig, ProgramsVariantConfig
} from "./types"

// Dynamically resolve a variant config by section + slug
export function getVariant(section: VariantSection, slug: string) {
  const maps: Record<string, Record<string, any>> = {
    navbar: NAVBAR_VARIANTS,
    footer: FOOTER_VARIANTS,
    hero: HERO_VARIANTS,
    dashboard: DASHBOARD_VARIANTS,
    events: EVENTS_VARIANTS,
    news: NEWS_VARIANTS,
    notice: NOTICE_VARIANTS,
    gallery: GALLERY_VARIANTS,
    faculty: FACULTY_VARIANTS,
    programs: PROGRAMS_VARIANTS,
  }
  const map = maps[section]
  if (!map) return null
  return map[slug] || map[getDefaultVariant(section)]
}

// Render variant label as a nice badge
export function getVariantName(section: VariantSection, slug: string): string {
  const v = getVariant(section, slug)
  return v?.name || "Default"
}

// Helper to apply style from variant config as CSS vars
export function useVariantStyles(config: Record<string, any>): React.CSSProperties {
  const styles: Record<string, any> = {}
  if (config.backgroundColor) styles.backgroundColor = config.backgroundColor
  if (config.textColor) styles.color = config.textColor
  if (config.overlayColor) styles["--overlay-color"] = config.overlayColor
  if (config.overlayOpacity) styles["--overlay-opacity"] = String(config.overlayOpacity)
  return styles as React.CSSProperties
}
