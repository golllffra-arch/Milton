"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"

function getRootPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean)
  return segments.length === 0 ? "/" : `/${segments[0]}`
}

const styleMap: Record<string, string> = {
  "/": "landscape",
  "/programs": "geometric",
  "/about": "geometric",
  "/contact": "waves",
  "/services": "geometric",
  "/admissions": "rays",
  "/faculty": "geometric",
  "/gallery": "particles",
  "/news": "rays",
  "/student-life": "particles",
  "/career-center": "geometric",
  "/virtual-tour": "waves",
  "/downloads": "minimal",
  "/privacy": "minimal",
  "/login": "minimal",
}

function pseudo(n: number): number {
  return (n * 7919 + 1) / 7919
}

function LandscapeBackground() {
  const clouds: { left: string; top: string; delay: string; duration: string; opacity: string }[] = useMemo(() =>
    Array.from({ length: 5 }, (_: unknown, i) => ({
      left: `${10 + i * 18}%`,
      top: `${8 + (i % 3) * 10}%`,
      delay: `${i * 3}s`,
      duration: `${25 + i * 5}s`,
      opacity: `${0.15 + i * 0.08}`,
    })), [])

  const birds: { top: string; delay: string; duration: string; scale: string }[] = useMemo(() =>
    Array.from({ length: 7 }, (_: unknown, i) => ({
      top: `${15 + i * 5}%`,
      delay: `${i * 2.5}s`,
      duration: `${14 + (i % 3) * 4}s`,
      scale: `${0.4 + i * 0.08}`,
    })), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right top, #1a0533, #2d1a5e, #3d2a7a, #5c3d8a, #7a4d8f, #a0607a, #c47a60, #d99945, #e3b84a, #e6d060, #eae080, #f0f0a0)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(15,5,30,0.6) 0%, transparent 40%, transparent 60%, rgba(100,50,120,0.15) 100%)",
        }}
      />
      {clouds.map((c, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: c.left,
            top: c.top,
            width: `${120 + i * 40}px`,
            height: `${40 + i * 12}px`,
            background: `radial-gradient(ellipse, rgba(220,200,230,${c.opacity}) 0%, transparent 70%)`,
            animation: `bg-drift ${c.duration} ${c.delay} linear infinite`,
          }}
        />
      ))}
      <svg className="absolute bottom-0 left-0 w-2/4 h-2/4 opacity-40" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax meet">
        <polygon points="0,300 80,120 130,200 180,80 250,160 320,50 400,140 400,300" fill="rgba(45,20,70,0.5)" />
        <polygon points="0,300 80,120 130,200 180,80 250,160 320,50 400,140 400,300" fill="rgba(60,30,80,0.3)" transform="translate(0,15) scale(1,0.95)" />
        <polygon points="60,300 120,170 180,230 220,130 280,190 340,90 400,170 400,300" fill="rgba(90,40,70,0.25)" />
      </svg>
      <svg className="absolute bottom-[15%] left-[10%] w-[15%] h-[8%] opacity-30" viewBox="0 0 200 60" preserveAspectRatio="xMidYMax meet">
        <ellipse cx="100" cy="50" rx="100" ry="10" fill="rgba(220,180,130,0.3)" />
        {[0,1,2,3,4].map((j: number) => (
          <ellipse key={j} cx={30 + j * 35} cy={48} rx={12 + (j % 2) * 6} ry={3} fill="rgba(220,180,130,0.2)" />
        ))}
      </svg>
      <svg className="absolute bottom-0 left-0 w-full h-[15%] opacity-40" viewBox="0 0 400 60" preserveAspectRatio="xMidYMax meet">
        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map((j: number) => (
          <line key={j} x1={j * 22} y1={50 - (j % 3) * 8} x2={j * 22} y2={60} stroke="rgba(180,140,110,0.5)" strokeWidth="1.5" />
        ))}
      </svg>
      {birds.map((b, i) => (
        <svg
          key={i}
          className="absolute"
          style={{
            top: b.top,
            left: "-5%",
            width: `${30 + i * 4}px`,
            height: `${12 + i * 2}px`,
            animation: `bg-fly ${b.duration} ${b.delay} linear infinite`,
          }}
          viewBox="0 0 30 12"
        >
          <path d="M0,12 L8,4 L15,10 L22,4 L30,12" fill="none" stroke="rgba(255,240,230,0.6)" strokeWidth="1.5" />
        </svg>
      ))}
      <style>{`
        @keyframes bg-drift {
          0% { transform: translateX(0); }
          50% { transform: translateX(30px); }
          100% { transform: translateX(0); }
        }
        @keyframes bg-fly {
          0% { transform: translateX(0); }
          100% { transform: translateX(110vw); }
        }
      `}</style>
    </div>
  )
}

function GeometricBackground() {
  const lines: { top: string; left: string; width: string; delay: string; color: string }[] = useMemo(() =>
    Array.from({ length: 4 }, (_: unknown, i) => ({
      top: `${20 + i * 18}%`,
      left: `${5 + i * 22}%`,
      width: `${80 + (i % 3) * 40}px`,
      delay: `${i * 2}s`,
      color: "rgba(100,130,200,0.06)",
    })), [])

  const shapes: { top: string; left: string; size: string; delay: string; duration: string; color: string }[] = useMemo(() =>
    Array.from({ length: 8 }, (_: unknown, i) => ({
      top: `${10 + (i * 11) % 80}%`,
      left: `${5 + (i * 13) % 85}%`,
      size: `${30 + (i % 4) * 20}px`,
      delay: `${i * 1.5}s`,
      duration: `${12 + (i % 3) * 6}s`,
      color: i % 2 === 0 ? "rgba(100,130,200,0.12)" : "rgba(140,100,180,0.10)",
    })), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #152040 30%, #1a2a50 60%, #0f1a30 100%)",
        }}
      />
      {lines.map((l, i) => (
        <div
          key={i}
          className="absolute h-px"
          style={{
            top: l.top,
            left: l.left,
            width: l.width,
            background: `linear-gradient(90deg, transparent, ${l.color}, transparent)`,
            animation: `bg-pulse 4s ${l.delay} ease-in-out infinite`,
          }}
        />
      ))}
      {shapes.map((s, i) => (
        <div
          key={i}
          className="absolute border"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            borderColor: s.color,
            borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "0" : "30%",
            animation: `bg-float ${s.duration} ${s.delay} ease-in-out infinite`,
          }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(200,220,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,220,255,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <style>{`
        @keyframes bg-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bg-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function WaveBackground() {
  const orbs: { top: string; left: string; size: string; delay: string; duration: string; color: string }[] = useMemo(() =>
    Array.from({ length: 6 }, (_: unknown, i) => ({
      top: `${15 + i * 14}%`,
      left: `${10 + (i * 17) % 75}%`,
      size: `${60 + (i % 3) * 40}px`,
      delay: `${i * 2}s`,
      duration: `${10 + (i % 2) * 6}s`,
      color: i % 2 === 0 ? "rgba(255,150,100,0.08)" : "rgba(200,100,180,0.06)",
    })), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #1a0a20 0%, #2d1540 25%, #4a2060 50%, #2d1540 75%, #1a0a20 100%)",
        }}
      />
      <svg className="absolute bottom-0 w-full h-[40%] opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
        {[0,1,2].map((j: number) => (
          <path
            key={j}
            d={`M0,${160 - j * 40} C360,${60 + j * 20} 720,${240 - j * 30} 1080,${80 + j * 10} L1440,${120 - j * 20} L1440,320 L0,320 Z`}
            fill={j === 0 ? "rgba(180,100,200,0.15)" : j === 1 ? "rgba(220,120,160,0.10)" : "rgba(255,160,100,0.08)"}
            style={{ animation: `bg-wave ${8 + j * 3}s ${j * 1.5}s ease-in-out infinite` }}
          />
        ))}
      </svg>
      {orbs.map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: o.top,
            left: o.left,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            animation: `bg-orb ${o.duration} ${o.delay} ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes bg-wave {
          0%, 100% { transform: translateX(0) scaleY(1); }
          25% { transform: translateX(-20px) scaleY(1.05); }
          75% { transform: translateX(20px) scaleY(0.95); }
        }
        @keyframes bg-orb {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-30px) scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function ParticleBackground() {
  const particles: { top: string; left: string; size: string; delay: string; duration: string; color: string }[] = useMemo(() =>
    Array.from({ length: 20 }, (_: unknown, i) => ({
      top: `${10 + (i * 7) % 80}%`,
      left: `${5 + (i * 11) % 85}%`,
      size: `${2 + (i % 4) * 2}px`,
      delay: `${((i * 0.7) % 5).toFixed(1)}s`,
      duration: `${6 + (i % 5) * 3}s`,
      color: i % 3 === 0 ? "rgba(255,200,100,0.5)" : i % 3 === 1 ? "rgba(200,150,255,0.4)" : "rgba(255,120,150,0.3)",
    })), [])

  const glows: { top: string; left: string; size: string; delay: string; color: string }[] = useMemo(() =>
    Array.from({ length: 3 }, (_: unknown, i) => ({
      top: `${20 + i * 25}%`,
      left: `${15 + i * 30}%`,
      size: `${120 + i * 80}px`,
      delay: `${i * 3}s`,
      color: i === 0 ? "rgba(200,100,255,0.06)" : i === 1 ? "rgba(255,150,100,0.05)" : "rgba(100,200,255,0.04)",
    })), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0a0515 0%, #1a0a2e 30%, #2d1040 60%, #150a20 100%)",
        }}
      />
      {glows.map((g, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: g.top,
            left: g.left,
            width: g.size,
            height: g.size,
            background: `radial-gradient(circle, ${g.color} 0%, transparent 70%)`,
            animation: `bg-glow 8s ${g.delay} ease-in-out infinite`,
          }}
        />
      ))}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `bg-particle ${p.duration} ${p.delay} linear infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes bg-glow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes bg-particle {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(0, -60px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

function RaysBackground() {
  const rays: { left: string; delay: string; duration: string; opacity: string }[] = useMemo(() =>
    Array.from({ length: 6 }, (_: unknown, i) => ({
      left: `${5 + i * 16}%`,
      delay: `${i * 1.2}s`,
      duration: `${5 + (i % 3) * 2}s`,
      opacity: `${0.03 + i * 0.015}`,
    })), [])

  const sparkles: { top: string; left: string; size: string; delay: string; duration: string }[] = useMemo(() =>
    Array.from({ length: 12 }, (_: unknown, i) => ({
      top: `${10 + (i * 8) % 75}%`,
      left: `${5 + (i * 11) % 85}%`,
      size: `${2 + (i % 3) * 2}px`,
      delay: `${(i * 0.8).toFixed(1)}s`,
      duration: `${4 + (i % 4) * 2}s`,
    })), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0f0518 0%, #1a0a30 20%, #2d1545 40%, #4a2060 60%, #2d1540 80%, #1a0a25 100%)",
        }}
      />
      {rays.map((r, i) => (
        <div
          key={i}
          className="absolute top-0 w-[2px] h-full"
          style={{
            left: r.left,
            background: `linear-gradient(180deg, transparent 0%, rgba(255,200,100,${r.opacity}) 40%, rgba(255,200,100,${r.opacity}) 60%, transparent 100%)`,
            animation: `bg-ray ${r.duration} ${r.delay} ease-in-out infinite`,
          }}
        />
      ))}
      {sparkles.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            backgroundColor: "rgba(255,220,150,0.6)",
            animation: `bg-sparkle ${s.duration} ${s.delay} ease-in-out infinite`,
          }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, rgba(255,200,100,0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(200,100,255,0.2) 0%, transparent 50%)",
        }}
      />
      <style>{`
        @keyframes bg-ray {
          0%, 100% { transform: scaleY(0.6); opacity: 0.3; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes bg-sparkle {
          0%, 100% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.5); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function MinimalBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0f0f15 0%, #1a1a24 50%, #0f0f15 100%)",
        }}
      />
      <div
        className="absolute top-[15%] left-[20%] w-[60%] h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(200,200,220,0.08), transparent)",
          animation: "bg-pulse 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[25%] right-[15%] w-[40%] h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(200,200,220,0.06), transparent)",
          animation: "bg-pulse 6s 3s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[40%] left-[10%] w-[6px] h-[6px] rounded-full"
        style={{
          backgroundColor: "rgba(200,200,220,0.08)",
          animation: "bg-sparkle 5s 1s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[60%] right-[20%] w-[4px] h-[4px] rounded-full"
        style={{
          backgroundColor: "rgba(200,200,220,0.06)",
          animation: "bg-sparkle 5s 3s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[25%] right-[30%] w-[5px] h-[5px] rounded-full"
        style={{
          backgroundColor: "rgba(200,200,220,0.05)",
          animation: "bg-sparkle 5s 2s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes bg-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes bg-sparkle {
          0%, 100% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.5); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export function PageBackground() {
  const pathname = usePathname()
  const rootPath = getRootPath(pathname)
  const style = styleMap[rootPath] || "minimal"

  switch (style) {
    case "landscape":
      return <LandscapeBackground />
    case "geometric":
      return <GeometricBackground />
    case "waves":
      return <WaveBackground />
    case "particles":
      return <ParticleBackground />
    case "rays":
      return <RaysBackground />
    default:
      return <MinimalBackground />
  }
}
