"use client"

import { useMemo } from "react"

export function NewBeginnings() {
  const petals = useMemo(() => Array.from({ length: 12 }, (_: unknown, i) => ({
    x: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 7,
    scale: 0.5 + Math.random() * 0.8
  })), [])

  const planes = useMemo(() => Array.from({ length: 5 }, (_: unknown, i) => ({
    y: 40 + Math.random() * 40,
    delay: Math.random() * 15,
    duration: 15 + Math.random() * 10,
    scale: 0.6 + Math.random() * 0.6
  })), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-40">
      
      <svg className="absolute bottom-0 w-full min-w-[1440px] min-h-[900px]" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
        <defs>
          <radialGradient id="dawn-sun-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5c9c4" stopOpacity="1" />
            <stop offset="30%" stopColor="#e8b4ac" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d93a2b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Rising Sun */}
        <circle cx="720" cy="580" r="140" fill="url(#dawn-sun-glow)" />

        {/* Soft Rolling Hills */}
        <path d="M0 650 Q200 550 450 620 T950 580 T1440 680 L1440 900 L0 900 Z" fill="#12283f" opacity="0.7" />
        <path d="M0 720 Q300 620 600 700 T1150 640 T1440 750 L1440 900 L0 900 Z" fill="#0b1522" opacity="0.85" />
        <path d="M0 800 Q350 720 720 820 T1440 780 L1440 900 L0 900 Z" fill="#0b1522" />

        {/* Campus Buildings in distance */}
        <g transform="translate(620, 560) scale(0.6)">
          <path d="M0 200 L0 80 L80 80 L80 0 L140 0 L140 80 L220 80 L220 200 Z" fill="#0b1522" />
          {/* Lit Windows */}
          <rect x="20" y="100" width="15" height="20" fill="#f5c9c4" opacity="0.8" />
          <rect x="45" y="100" width="15" height="20" fill="#f5c9c4" opacity="0.8" />
          <rect x="95" y="25" width="30" height="40" fill="#f5c9c4" opacity="0.9" />
          <rect x="160" y="100" width="15" height="20" fill="#f5c9c4" opacity="0.8" />
          <rect x="185" y="100" width="15" height="20" fill="#f5c9c4" opacity="0.8" />
          
          <rect x="20" y="140" width="15" height="20" fill="#f5c9c4" opacity="0.8" />
          <rect x="45" y="140" width="15" height="20" fill="#f5c9c4" opacity="0.8" />
          <rect x="95" y="140" width="30" height="60" fill="#f5c9c4" opacity="0.9" />
          <rect x="160" y="140" width="15" height="20" fill="#f5c9c4" opacity="0.8" />
          <rect x="185" y="140" width="15" height="20" fill="#f5c9c4" opacity="0.8" />
        </g>

        {/* Trees */}
        <path d="M150 750 C120 680 180 640 220 690 C250 660 300 710 270 760 Z" fill="#0b1522" />
        <path d="M1250 780 C1220 700 1290 650 1340 710 C1380 670 1440 730 1400 790 Z" fill="#0b1522" />

        {/* Walking Student Silhouettes */}
        <g transform="translate(450, 720) scale(0.8)">
          <circle cx="30" cy="20" r="12" fill="#0b1522" />
          <path d="M20 40 L40 40 L50 80 L35 80 L30 60 L25 80 L10 80 Z" fill="#0b1522" />
          <path d="M15 45 L5 70 L12 73 L20 55 Z" fill="#0b1522" />
          <path d="M45 45 L55 60 L48 65 L40 55 Z" fill="#0b1522" />
          <rect x="10" y="35" width="20" height="25" fill="#0b1522" />
        </g>

        <g transform="translate(520, 735) scale(0.7)">
          <circle cx="30" cy="20" r="11" fill="#0b1522" />
          <path d="M22 38 L38 38 L45 75 L33 75 L30 55 L27 75 L15 75 Z" fill="#0b1522" />
          <path d="M18 42 L8 65 L14 68 L22 52 Z" fill="#0b1522" />
          <rect x="15" y="35" width="25" height="22" fill="#0b1522" />
        </g>
        
        <g transform="translate(380, 750) scale(0.85)">
          <circle cx="30" cy="20" r="13" fill="#0b1522" />
          <path d="M18 42 L42 42 L52 85 L36 85 L30 62 L24 85 L8 85 Z" fill="#0b1522" />
          <path d="M42 45 L50 70 L43 74 L37 55 Z" fill="#0b1522" />
          <rect x="25" y="35" width="25" height="30" rx="5" fill="#0b1522" />
        </g>
      </svg>
      
      {/* Drifting Petals */}
      {petals.map((p, i) => (
        <div
          key={`petal-${i}`}
          className="absolute"
          style={{
            top: '-20px',
            left: `${p.x}vw`,
            transform: `scale(${p.scale})`,
            animation: `dawn-drift-petal ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`
          }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15">
            <path d="M0 0 C5 5 15 0 15 10 C10 15 0 15 0 0 Z" fill="#f5c9c4" opacity="0.7" />
          </svg>
        </div>
      ))}

      {/* Floating Paper Planes */}
      {planes.map((p, i) => (
        <div
          key={`plane-${i}`}
          className="absolute"
          style={{
            top: `${p.y}vh`,
            left: '-50px',
            transform: `scale(${p.scale})`,
            animation: `dawn-fly-plane ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`
          }}
        >
          <svg width="40" height="30" viewBox="0 0 40 30">
            <path d="M0 10 L40 0 L30 25 L20 15 Z" fill="#f1f2f4" opacity="0.9" />
            <path d="M40 0 L20 15 L20 25 Z" fill="#e2e5ea" opacity="0.9" />
          </svg>
        </div>
      ))}
      
      <style>{`
        @keyframes dawn-drift-petal {
          0% { transform: translateY(-5vh) translateX(0) rotate(0deg) scale(var(--tw-scale-x, 1)); }
          100% { transform: translateY(105vh) translateX(-20vw) rotate(360deg) scale(var(--tw-scale-x, 1)); }
        }
        @keyframes dawn-fly-plane {
          0% { transform: translate(-50px, 0) rotate(5deg) scale(var(--tw-scale-x, 1)); }
          25% { transform: translate(30vw, -10vh) rotate(-5deg) scale(var(--tw-scale-x, 1)); }
          50% { transform: translate(60vw, -5vh) rotate(5deg) scale(var(--tw-scale-x, 1)); }
          75% { transform: translate(90vw, -15vh) rotate(-10deg) scale(var(--tw-scale-x, 1)); }
          100% { transform: translate(120vw, -10vh) rotate(0deg) scale(var(--tw-scale-x, 1)); }
        }
      `}</style>
    </div>
  )
}