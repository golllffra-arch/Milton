"use client"

import { useMemo } from "react"

interface Dot {
  id: number
  x: number
  y: number
  delay: number
}

interface Star {
  id: number
  x: number
  y: number
  delay: number
}

export function MinimalCampus() {
  const dots = useMemo<Dot[]>(() => Array.from({ length: 3 }, (_: unknown, i) => ({
    id: i,
    x: 30 + i * 20,
    y: 70 + Math.random() * 10,
    delay: i * 1.5,
  })), [])

  const stars = useMemo<Star[]>(() => Array.from({ length: 10 }, (_: unknown, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 50,
    delay: Math.random() * 5,
  })), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0f0f15]">
      <div 
        className="absolute inset-0 opacity-20" 
        style={{ background: "radial-gradient(circle at 50% 50%, #1a1a24 0%, #0f0f15 80%)" }} 
      />

      <svg className="absolute bottom-0 w-full opacity-[0.06]" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
        {/* Faint Horizontal Gradient Line */}
        <defs>
          <linearGradient id="minimal-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <line x1="0" y1="750" x2="1440" y2="750" stroke="url(#minimal-line-grad)" strokeWidth="1" />

        {/* Minimal Thin-Line Building Outline */}
        <g stroke="#ffffff" strokeWidth="1" fill="none">
          {/* Main Block */}
          <rect x="520" y="550" width="400" height="200" />
          
          {/* Roof */}
          <polygon points="500,550 720,450 940,550" />
          
          {/* Columns/Details */}
          <line x1="600" y1="550" x2="600" y2="750" />
          <line x1="680" y1="550" x2="680" y2="750" />
          <line x1="760" y1="550" x2="760" y2="750" />
          <line x1="840" y1="550" x2="840" y2="750" />

          {/* Steps */}
          <rect x="650" y="750" width="140" height="10" />
          <rect x="630" y="760" width="180" height="10" />
          <rect x="600" y="770" width="240" height="10" />
          
          {/* Windows (simple outlines) */}
          <rect x="540" y="580" width="40" height="60" />
          <rect x="540" y="660" width="40" height="60" />
          
          <rect x="860" y="580" width="40" height="60" />
          <rect x="860" y="660" width="40" height="60" />
        </g>
      </svg>

      {/* Tiny stars */}
      {stars.map(s => (
        <div
          key={`star-${s.id}`}
          className="absolute rounded-full bg-white minimal-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: '1px',
            height: '1px',
            opacity: 0.05,
            animationDuration: '4s',
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Pulsing Dots */}
      {dots.map(d => (
        <div
          key={`dot-${d.id}`}
          className="absolute rounded-full bg-white minimal-pulse"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: '4px',
            height: '4px',
            opacity: 0.08,
            animationDuration: '3s',
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes minimal-twinkle {
          0%, 100% { opacity: 0.02; transform: scale(0.8); }
          50% { opacity: 0.1; transform: scale(1.2); }
        }
        @keyframes minimal-pulse {
          0% { transform: scale(1); opacity: 0.08; box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1); }
          70% { transform: scale(1.5); opacity: 0; box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  )
}