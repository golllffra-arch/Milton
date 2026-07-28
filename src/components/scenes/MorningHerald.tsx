"use client"

import { useMemo } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

interface Bird {
  id: number
  y: number
  duration: number
  delay: number
  scale: number
}

interface Scroll {
  id: number
  x: number
  y: number
  duration: number
  delay: number
  rotation: number
}

export function MorningHerald() {
  const particles = useMemo<Particle[]>(() => Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 60 + Math.random() * 40,
    size: 2 + Math.random() * 4,
    duration: 8 + Math.random() * 7,
    delay: Math.random() * 5,
  })), [])

  const birds = useMemo<Bird[]>(() => Array.from({ length: 3 }, (_, i) => ({
    id: i,
    y: 15 + Math.random() * 20,
    duration: 15 + Math.random() * 10,
    delay: i * 4,
    scale: 0.6 + Math.random() * 0.4,
  })), [])

  const scrolls = useMemo<Scroll[]>(() => Array.from({ length: 4 }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    y: 30 + Math.random() * 40,
    duration: 10 + Math.random() * 10,
    delay: Math.random() * 5,
    rotation: -20 + Math.random() * 40,
  })), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-40" 
        style={{ background: "linear-gradient(to top, #fbbf24 0%, #f97316 20%, #ea580c 40%, #9a3412 70%, #1c0a00 100%)" }} 
      />
      
      <svg className="absolute bottom-0 w-full opacity-60" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="herald-sun-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="herald-mountain-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7c2d12" />
            <stop offset="100%" stopColor="#431407" />
          </linearGradient>
          <linearGradient id="herald-mountain-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9a3412" />
            <stop offset="100%" stopColor="#7c2d12" />
          </linearGradient>
          <linearGradient id="herald-ground" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#450a0a" />
            <stop offset="100%" stopColor="#2e0505" />
          </linearGradient>
          <linearGradient id="herald-path" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Sun and Rays */}
        <g className="herald-sun-group">
          {[...Array(8)].map((_, i) => (
            <polygon 
              key={i}
              points="720,400 420,100 520,50" 
              fill="#fef08a" 
              opacity="0.15"
              transform={`rotate(${i * 45} 720 400)`}
            />
          ))}
          <circle cx="720" cy="400" r="100" fill="url(#herald-sun-grad)" />
        </g>

        {/* Mountains Back */}
        <path d="M0,600 Q150,450 300,550 T700,450 T1100,580 T1440,500 L1440,900 L0,900 Z" fill="url(#herald-mountain-1)" />
        
        {/* Mountains Front */}
        <path d="M-100,700 Q200,580 450,650 T950,550 T1500,680 L1500,900 L-100,900 Z" fill="url(#herald-mountain-2)" />

        {/* Rolling Hills and Path */}
        <path d="M0,750 Q300,700 700,780 T1440,720 L1440,900 L0,900 Z" fill="url(#herald-ground)" />
        <path d="M600,900 Q650,850 750,820 T800,760 Q750,740 700,750 T750,780 Q650,820 600,900" fill="url(#herald-path)" />

        {/* Trees / Bushes */}
        <path d="M200,750 Q180,700 220,680 T260,700 T240,750 Z" fill="#2e0505" />
        <path d="M1200,720 Q1180,670 1220,650 T1260,670 T1240,720 Z" fill="#2e0505" />
        <path d="M300,780 Q280,740 320,720 T360,740 T340,780 Z" fill="#431407" />
        <path d="M1100,760 Q1080,720 1120,700 T1160,720 T1140,760 Z" fill="#431407" />

        {/* Bell Tower */}
        <g transform="translate(1250, 450)">
          <rect x="0" y="50" width="60" height="400" fill="#2e0505" />
          <polygon points="-10,50 30,-20 70,50" fill="#431407" />
          <circle cx="30" cy="70" r="15" fill="#fef08a" opacity="0.8" />
          <line x1="30" y1="70" x2="30" y2="60" stroke="#431407" strokeWidth="2" />
          <line x1="30" y1="70" x2="40" y2="70" stroke="#431407" strokeWidth="2" />
          <rect x="15" y="120" width="30" height="50" rx="15" fill="#f97316" opacity="0.4" />
          <path d="M 25 130 L 35 130 L 35 150 L 25 150 Z" fill="#2e0505" />
        </g>

        {/* Megaphone Accent */}
        <g transform="translate(150, 800) rotate(-15)">
          <path d="M0,20 L30,5 L50,-20 L60,-15 L40,15 L70,30 L60,40 L30,25 Z" fill="#7c2d12" />
          <polygon points="0,20 30,5 30,35" fill="#9a3412" />
          <path d="M30,5 Q40,-5 50,0 T60,20 Q50,30 40,25 T30,35 Z" fill="#ea580c" opacity="0.7" />
        </g>
      </svg>

      {/* Floating Scrolls */}
      {scrolls.map((scroll) => (
        <div
          key={`scroll-${scroll.id}`}
          className="absolute herald-float-scroll"
          style={{
            left: `${scroll.x}%`,
            top: `${scroll.y}%`,
            animationDuration: `${scroll.duration}s`,
            animationDelay: `${scroll.delay}s`,
            transform: `rotate(${scroll.rotation}deg)`,
          }}
        >
          <svg width="40" height="30" viewBox="0 0 40 30" fill="none" opacity="0.3">
            <path d="M5,5 Q20,-5 35,5 L35,25 Q20,15 5,25 Z" fill="#fef08a" />
            <line x1="10" y1="10" x2="30" y2="10" stroke="#7c2d12" strokeWidth="1.5" />
            <line x1="10" y1="15" x2="25" y2="15" stroke="#7c2d12" strokeWidth="1.5" />
            <line x1="10" y1="20" x2="30" y2="20" stroke="#7c2d12" strokeWidth="1.5" />
          </svg>
        </div>
      ))}

      {/* Flying Birds with Messages */}
      {birds.map((bird) => (
        <div
          key={`bird-${bird.id}`}
          className="absolute herald-fly-bird"
          style={{
            top: `${bird.y}%`,
            animationDuration: `${bird.duration}s`,
            animationDelay: `${bird.delay}s`,
            transform: `scale(${bird.scale})`,
          }}
        >
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none" opacity="0.6">
            <path d="M0,20 Q15,5 30,20 Q45,5 60,20 Q45,25 30,15 Q15,25 0,20 Z" fill="#2e0505" />
            <rect x="25" y="25" width="10" height="8" fill="#fef08a" />
            <polygon points="25,25 30,30 35,25" fill="#f97316" />
          </svg>
        </div>
      ))}

      {/* Rising Warm Particles */}
      {particles.map((p) => (
        <div
          key={`particle-${p.id}`}
          className="absolute rounded-full bg-orange-400 herald-rise-particle"
          style={{
            left: `${p.x}%`,
            bottom: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0.4,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes herald-fly-bird {
          0% { left: -10%; transform: translateY(0) scale(var(--tw-scale-x)); }
          25% { transform: translateY(-15px) scale(var(--tw-scale-x)); }
          50% { transform: translateY(0) scale(var(--tw-scale-x)); }
          75% { transform: translateY(15px) scale(var(--tw-scale-x)); }
          100% { left: 110%; transform: translateY(0) scale(var(--tw-scale-x)); }
        }
        @keyframes herald-float-scroll {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(10deg); }
          66% { transform: translateY(10px) rotate(-5deg); }
        }
        @keyframes herald-rise-particle {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
        .herald-sun-group {
          animation: herald-spin-rays 60s linear infinite;
          transform-origin: 720px 400px;
        }
        @keyframes herald-spin-rays {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
