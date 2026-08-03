"use client"

import { useMemo } from "react"

export function KnowledgeGarden() {
  const fireflies = useMemo(() => Array.from({ length: 20 }, (_: unknown, i) => ({
    x: 10 + Math.random() * 80,
    y: 40 + Math.random() * 50,
    size: 2 + Math.random() * 4,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 5
  })), [])

  const books = useMemo(() => Array.from({ length: 4 }, (_: unknown, i) => ({
    x: 30 + Math.random() * 30,
    y: 20 + Math.random() * 40,
    scale: 0.5 + Math.random() * 0.4,
    duration: 4 + Math.random() * 3,
    delay: Math.random() * 2
  })), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-40">
      
      <svg className="absolute bottom-0 w-full min-w-[1440px] min-h-[900px]" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
        <defs>
          <radialGradient id="garden-lantern-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5c9c4" stopOpacity="1" />
            <stop offset="20%" stopColor="#fe0000" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fe0000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Mountains Backdrop */}
        <path d="M0 550 L200 450 L400 550 L600 430 L800 550 L1000 420 L1200 550 L1440 460 L1440 900 L0 900 Z" fill="#1b3f63" opacity="0.5" />
        <path d="M0 600 L300 500 L550 620 L800 520 L1050 650 L1300 530 L1440 620 L1440 900 L0 900 Z" fill="#000000" opacity="0.7" />

        {/* Winding Pathway */}
        <path d="M600 650 Q750 700 650 780 T800 900 L500 900 Q400 850 500 780 T550 650 Z" fill="#1b3f63" opacity="0.8" />

        {/* Foreground Bushes */}
        <path d="M-50 950 C-20 850 80 820 150 880 C200 830 300 850 350 900 C400 820 500 840 550 950 Z" fill="#000000" />
        <path d="M850 950 C900 820 1000 800 1050 880 C1100 820 1200 840 1250 900 C1300 800 1450 820 1500 950 Z" fill="#000000" />

        {/* Stone Bench */}
        <rect x="750" y="800" width="120" height="15" rx="5" fill="#000000" />
        <rect x="765" y="815" width="20" height="30" fill="#000000" />
        <rect x="835" y="815" width="20" height="30" fill="#000000" />

        {/* Majestic Tree of Knowledge */}
        <path d="M950 900 C930 800 930 700 950 600 C920 550 850 520 780 500 C870 520 930 550 960 590 C960 550 940 450 900 380 C960 440 980 520 980 570 C1000 500 1020 400 1060 330 C1040 430 1020 520 1000 570 C1040 550 1120 520 1180 480 C1110 520 1050 560 1020 600 C1040 700 1050 800 1020 900 Z" fill="#000000" />
        <circle cx="950" cy="450" r="180" fill="#000000" opacity="0.9" filter="blur(15px)" />
        <circle cx="850" cy="500" r="130" fill="#000000" opacity="0.9" filter="blur(10px)" />
        <circle cx="1080" cy="420" r="140" fill="#000000" opacity="0.9" filter="blur(10px)" />
        
        {/* Tree Leaves Silhouette Details */}
        <path d="M800 450 C750 400 850 350 900 400 C950 320 1050 350 1050 420 C1150 400 1200 500 1100 550 C1150 600 1050 650 1000 600 C950 650 850 650 850 580 C750 580 750 480 800 450 Z" fill="#000000" opacity="0.8" />
        <path d="M850 380 C820 330 920 300 950 350 C1000 280 1080 320 1080 380 C1150 360 1180 450 1100 500 C1130 550 1050 580 1000 540 C950 580 880 580 880 520 C800 520 800 420 850 380 Z" fill="#000000" />

        {/* Lanterns */}
        <g transform="translate(820, 520)">
          <line x1="10" y1="0" x2="10" y2="40" stroke="#000000" strokeWidth="2" />
          <circle cx="10" cy="55" r="40" fill="url(#garden-lantern-glow)" />
          <path d="M0 35 L20 35 L15 55 L5 55 Z" fill="#f5c9c4" />
          <path d="M-2 30 L22 30 L20 35 L0 35 Z" fill="#000000" />
          <path d="M3 55 L17 55 L15 60 L5 60 Z" fill="#000000" />
        </g>
        
        <g transform="translate(1080, 480)">
          <line x1="10" y1="0" x2="10" y2="60" stroke="#000000" strokeWidth="2" />
          <circle cx="10" cy="75" r="50" fill="url(#garden-lantern-glow)" />
          <path d="M0 55 L20 55 L15 75 L5 75 Z" fill="#f5c9c4" />
          <path d="M-2 50 L22 50 L20 55 L0 55 Z" fill="#000000" />
          <path d="M3 75 L17 75 L15 80 L5 80 Z" fill="#000000" />
        </g>
      </svg>
      
      {/* Animated Fireflies */}
      {fireflies.map((f, i) => (
        <div
          key={`firefly-${i}`}
          className="absolute rounded-full bg-[#fe0000]"
          style={{
            top: `${f.y}vh`,
            left: `${f.x}vw`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            boxShadow: '0 0 10px 2px rgba(254, 0, 0, 0.6)',
            animation: `garden-pulse ${f.duration}s ease-in-out infinite alternate, garden-float-subtle ${f.duration * 1.5}s ease-in-out infinite alternate`,
            animationDelay: `${f.delay}s`
          }}
        />
      ))}

      {/* Floating Books */}
      {books.map((b, i) => (
        <div
          key={`book-${i}`}
          className="absolute"
          style={{
            top: `${b.y}vh`,
            left: `${b.x}vw`,
            transform: `scale(${b.scale})`,
            animation: `garden-float-book ${b.duration}s ease-in-out infinite`,
            animationDelay: `${b.delay}s`
          }}
        >
          <svg width="60" height="40" viewBox="0 0 60 40">
            <path d="M30 35 C20 35 5 25 0 15 C5 5 20 15 30 20 C40 15 55 5 60 15 C55 25 40 35 30 35 Z" fill="#dce5f0" opacity="0.3" filter="blur(2px)" />
            <path d="M30 32 C20 32 5 22 0 12 C5 2 20 12 30 17 C40 12 55 2 60 12 C55 22 40 32 30 32 Z" fill="#e8b4ac" opacity="0.5" />
            <path d="M30 29 C22 29 8 19 3 9 C8 1 22 11 30 14 C38 11 52 1 57 9 C52 19 38 29 30 29 Z" fill="#f5c9c4" opacity="0.8" />
            <path d="M30 14 L30 35" stroke="#f5c9c4" strokeWidth="2" opacity="0.8" />
          </svg>
        </div>
      ))}
      
      <style>{`
        @keyframes garden-pulse {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes garden-float-subtle {
          0% { transform: translate(0, 0); }
          33% { transform: translate(15px, -15px); }
          66% { transform: translate(-10px, -20px); }
          100% { transform: translate(-15px, 10px); }
        }
        @keyframes garden-float-book {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
      `}</style>
    </div>
  )
}