"use client"

import { useMemo } from "react"

export function PathwaysToSuccess() {
  const stars = useMemo(() => Array.from({ length: 40 }, (_: unknown, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 60,
    size: 1 + Math.random() * 2,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 5
  })), [])

  const shootingStars = useMemo(() => Array.from({ length: 3 }, (_: unknown, i) => ({
    top: 10 + Math.random() * 30,
    delay: 5 + Math.random() * 15,
    duration: 1 + Math.random() * 1
  })), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-40">
      
      {/* Twinkling Stars */}
      {stars.map((s, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.y}vh`,
            left: `${s.x}vw`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animation: `paths-twinkle ${s.duration}s ease-in-out infinite alternate`,
            animationDelay: `${s.delay}s`
          }}
        />
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((s, i) => (
        <div
          key={`shooting-star-${i}`}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            top: `${s.top}vh`,
            left: '-20%',
            width: '150px',
            transform: 'rotate(-15deg)',
            animation: `paths-shoot ${s.duration}s linear infinite`,
            animationDelay: `${s.delay}s`
          }}
        />
      ))}

      <svg className="absolute bottom-0 w-full min-w-[1440px] min-h-[900px]" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
        <defs>
          <radialGradient id="paths-moon-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="paths-lamp-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#eab308" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Crescent Moon */}
        <circle cx="1150" cy="200" r="100" fill="url(#paths-moon-glow)" />
        <path d="M1150 150 A40 40 0 1 0 1190 230 A50 50 0 1 1 1150 150 Z" fill="#bfdbfe" />

        {/* Mountains Left */}
        <path d="M0 650 L150 520 L300 680 L450 550 L650 720 L1440 720 L1440 900 L0 900 Z" fill="#081024" />
        <path d="M0 720 L200 620 L400 780 L600 650 L800 800 L1440 800 L1440 900 L0 900 Z" fill="#050a18" />

        {/* City Skyline Right */}
        <path d="M900 750 L900 680 L930 680 L930 630 L960 630 L960 690 L980 690 L980 610 L1010 610 L1010 660 L1040 660 L1040 590 L1080 590 L1080 670 L1120 670 L1120 550 L1160 550 L1160 640 L1200 640 L1200 600 L1250 600 L1250 680 L1300 680 L1300 620 L1350 620 L1350 700 L1440 700 L1440 900 L900 900 Z" fill="#060c1d" />

        {/* The Base/Ground */}
        <path d="M0 780 L1440 780 L1440 900 L0 900 Z" fill="#03060f" />

        {/* Diverging Paths */}
        {/* Left Path */}
        <path d="M680 820 Q400 780 200 720 L180 730 Q390 800 650 850 Z" fill="#1e3a5f" opacity="0.6" />
        {/* Center Path */}
        <path d="M720 820 L700 650 L740 650 L720 850 Z" fill="#1e3a5f" opacity="0.6" />
        {/* Right Path */}
        <path d="M760 820 Q1040 780 1240 720 L1260 730 Q1050 800 790 850 Z" fill="#1e3a5f" opacity="0.6" />

        {/* College Gate/Arch Silhouette */}
        <path d="M620 880 L620 750 C620 700 820 700 820 750 L820 880 L790 880 L790 760 C790 730 650 730 650 760 L650 880 Z" fill="#02040a" />
        <rect x="610" y="740" width="40" height="15" fill="#02040a" />
        <rect x="790" y="740" width="40" height="15" fill="#02040a" />
        <path d="M600 740 L660 740 L630 710 Z" fill="#02040a" />
        <path d="M780 740 L840 740 L810 710 Z" fill="#02040a" />

        {/* Lamp Posts and Glows along paths */}
        <g transform="translate(450, 750)">
          <line x1="0" y1="0" x2="0" y2="40" stroke="#02040a" strokeWidth="3" />
          <circle cx="0" cy="0" r="30" fill="url(#paths-lamp-glow)" />
          <circle cx="0" cy="0" r="5" fill="#fef08a" />
        </g>
        <g transform="translate(300, 715) scale(0.7)">
          <line x1="0" y1="0" x2="0" y2="40" stroke="#02040a" strokeWidth="3" />
          <circle cx="0" cy="0" r="30" fill="url(#paths-lamp-glow)" />
          <circle cx="0" cy="0" r="5" fill="#fef08a" />
        </g>
        
        <g transform="translate(990, 750)">
          <line x1="0" y1="0" x2="0" y2="40" stroke="#02040a" strokeWidth="3" />
          <circle cx="0" cy="0" r="30" fill="url(#paths-lamp-glow)" />
          <circle cx="0" cy="0" r="5" fill="#fef08a" />
        </g>
        <g transform="translate(1140, 715) scale(0.7)">
          <line x1="0" y1="0" x2="0" y2="40" stroke="#02040a" strokeWidth="3" />
          <circle cx="0" cy="0" r="30" fill="url(#paths-lamp-glow)" />
          <circle cx="0" cy="0" r="5" fill="#fef08a" />
        </g>
      </svg>
      
      <style>{`
        @keyframes paths-twinkle {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes paths-shoot {
          0% { transform: translateX(0) translateY(0) rotate(-15deg); opacity: 1; }
          20% { transform: translateX(120vw) translateY(30vh) rotate(-15deg); opacity: 0; }
          100% { transform: translateX(120vw) translateY(30vh) rotate(-15deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}