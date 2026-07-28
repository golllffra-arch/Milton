"use client"

import { usePathname } from "next/navigation"

import { CampusSunrise } from "@/components/scenes/CampusSunrise"
import { KnowledgeGarden } from "@/components/scenes/KnowledgeGarden"
import { PathwaysToSuccess } from "@/components/scenes/PathwaysToSuccess"
import { NewBeginnings } from "@/components/scenes/NewBeginnings"
import { BridgeToMilton } from "@/components/scenes/BridgeToMilton"
import { ScholarsSanctuary } from "@/components/scenes/ScholarsSanctuary"
import { CampusVibes } from "@/components/scenes/CampusVibes"
import { FutureHorizon } from "@/components/scenes/FutureHorizon"
import { MorningHerald } from "@/components/scenes/MorningHerald"
import { CampusMemories } from "@/components/scenes/CampusMemories"
import { CampusPanorama } from "@/components/scenes/CampusPanorama"
import { MinimalCampus } from "@/components/scenes/MinimalCampus"

function getRootPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean)
  return segments.length === 0 ? "/" : `/${segments[0]}`
}

export function PageBackground() {
  const pathname = usePathname()
  const rootPath = getRootPath(pathname)

  switch (rootPath) {
    case "/":
      return <CampusSunrise />
    case "/about":
      return <KnowledgeGarden />
    case "/programs":
      return <PathwaysToSuccess />
    case "/admissions":
      return <NewBeginnings />
    case "/contact":
      return <BridgeToMilton />
    case "/faculty":
      return <ScholarsSanctuary />
    case "/student-life":
      return <CampusVibes />
    case "/career-center":
      return <FutureHorizon />
    case "/news":
      return <MorningHerald />
    case "/gallery":
      return <CampusMemories />
    case "/virtual-tour":
      return <CampusPanorama />
    case "/downloads":
    case "/privacy":
    case "/login":
    default:
      return <MinimalCampus />
  }
}
