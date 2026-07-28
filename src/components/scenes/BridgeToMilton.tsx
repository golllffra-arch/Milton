"use client"

import { useMemo } from "react"

export function BridgeToMilton() {
  const shimmers = useMemo(() => Array.from({ length: 20 }, (_: unknown, i) => ({
    width: Math.random() * 60 + 20,
    x: Math.random() * 1440,
    y: 720 + Math.random() * 150,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2
  })), [])

  const leaves = useMemo(() => Array.from({ length: 8 }, (_: unknown, i) => ({
    x: Math.random() * 1000 + 200,
    startY: -50,
    delay: Math.random() * 10,
    duration: Math.random() * 10 + 10,
    size: Math.random() * 0.5 + 0.5
  })), [])

  const birds = useMemo(() => Array.from({ length: 5 }, (_: unknown, i) => ({
    y: Math.random() * 250 + 50,
    delay: Math.random() * 10,
    duration: Math.random() * 20 + 15,
    scale: Math.random() * 0.4 + 0.3
  })), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ opacity: 0.4 }}>
      {/* 1. Gradient background */}
      <div 
        className="absolute inset-0" 
        style={{ background: "linear-gradient(to bottom, #2d1540 0%, #9f1239 40%, #ea580c 75%, #f59e0b 100%)" }} 
      />
      
      {/* 2. SVG scene layers */}
      <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="bridge-water-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#831843" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#0f172a" stopOpacity="1"/>
          </linearGradient>
        </defs>

        {/* Back Mountains */}
        <path d="M0,500 Q150,350 350,450 T800,400 T1200,500 L1440,450 L1440,900 L0,900 Z" fill="#4c1d95" opacity="0.3" />
        {/* Front Mountains */}
        <path d="M0,580 Q200,480 500,550 T1000,450 T1350,550 L1440,500 L1440,900 L0,900 Z" fill="#312e81" opacity="0.5" />
        
        {/* Campus Buildings Far Side */}
        <path d="M150,550 L150,420 L220,420 L220,380 L260,380 L260,420 L350,420 L350,550 Z" fill="#1e1b4b" opacity="0.7"/>
        <path d="M420,560 L420,380 L490,320 L560,380 L560,560 Z" fill="#1e1b4b" opacity="0.7"/>
        <path d="M600,570 L600,460 L750,460 L750,570 Z" fill="#1e1b4b" opacity="0.7"/>
        <path d="M1050,560 L1050,400 L1090,400 L1120,350 L1150,400 L1190,400 L1190,560 Z" fill="#1e1b4b" opacity="0.7"/>
        
        {/* Water */}
        <rect x="0" y="700" width="1440" height="200" fill="url(#bridge-water-grad)" />
        
        {/* Bridge silhouette */}
        <path d="M-100,720 Q720,620 1540,720 L1540,770 Q720,670 -100,770 Z" fill="#020617" />
        {/* Bridge pillars */}
        <rect x="250" y="695" width="50" height="205" fill="#020617" />
        <rect x="700" y="670" width="50" height="230" fill="#020617" />
        <rect x="1150" y="695" width="50" height="205" fill="#020617" />
        
        {/* Bridge Railings & details */}
        {Array.from({ length: 38 }).map((_: unknown, i) => (
           <rect key={i} x={i * 40 - 20} y={690 + Math.abs(i - 19) * 1.5} width="6" height="25" fill="#0f172a" />
        ))}
        <path d="M-100,700 Q720,600 1540,700 L1540,705 Q720,605 -100,705 Z" fill="#1e293b" opacity="0.5"/>

        {/* Streetlamps */}
        {[
          {x: 280, y: 570, size: 0.9},
          {x: 720, y: 540, size: 1},
          {x: 1160, y: 570, size: 0.9}
        ].map((lamp, i) => (
          <g key={`lamp-${i}`} transform={`translate(${lamp.x}, ${lamp.y}) scale(${lamp.size})`}>
            <rect x="-2" y="0" width="4" height="130" fill="#020617" />
            <path d="M-10,0 L10,0 L5,-15 L-5,-15 Z" fill="#020617" />
            <circle cx="0" cy="-5" r="25" fill="#fcd34d" opacity="0.5" className="bridge-glow" />
            <circle cx="0" cy="-5" r="8" fill="#fef08a" />
          </g>
        ))}

        {/* Animated Water Shimmers */}
        {shimmers.map((s, i) => (
          <rect 
            key={`shimmer-${i}`}
            x={s.x} 
            y={s.y} 
            width={s.width} 
            height="3" 
            rx="1.5"
            fill="#fcd34d"
            opacity="0"
            style={{
              animation: `bridge-shimmer ${s.duration}s infinite linear ${s.delay}s`
            }}
          />
        ))}

        {/* Animated Birds */}
        {birds.map((b, i) => (
          <g 
            key={`bird-${i}`}
            className="bridge-bird"
            style={{
              '--start-y': `${b.y}px`,
              '--scale': b.scale,
              animation: `bridge-fly ${b.duration}s infinite linear ${b.delay}s`
            } as React.CSSProperties}
          >
            <path d="M0,10 Q10,0 20,10 Q10,5 0,10 M20,10 Q30,0 40,10 Q30,5 20,10" fill="none" stroke="#000" strokeWidth="4" opacity="0.6"/>
          </g>
        ))}

        {/* Animated Leaves */}
        {leaves.map((l, i) => (
          <g 
            key={`leaf-${i}`}
            className="bridge-leaf"
            style={{
              '--start-x': `${l.x}px`,
              '--size': l.size,
              animation: `bridge-leaf-fall ${l.duration}s infinite linear ${l.delay}s`,
            } as React.CSSProperties}
          >
            <path d="M0,0 C10,-10 20,0 20,10 C10,20 0,10 0,0" fill="#9a3412" opacity="0.7" />
          </g>
        ))}
      </svg>
      
      <style>{`
        @keyframes bridge-shimmer {
          0% { opacity: 0; transform: translateX(-30px); }
          50% { opacity: 0.6; transform: translateX(0px); }
          100% { opacity: 0; transform: translateX(30px); }
        }
        @keyframes bridge-fly {
          0% { transform: translate(-100px, var(--start-y)) scale(var(--scale)); }
          100% { transform: translate(1540px, calc(var(--start-y) - 150px)) scale(var(--scale)); }
        }
        @keyframes bridge-leaf-fall {
          0% { 
            transform: translate(var(--start-x), -50px) rotate(0deg) scale(var(--size)); 
            opacity: 0;
          }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { 
            transform: translate(calc(var(--start-x) + 300px), 950px) rotate(720deg) scale(var(--size));
            opacity: 0;
          }
        }
        @keyframes bridge-glow-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); transform-origin: center; }
        }
        .bridge-glow {
          animation: bridge-glow-pulse 4s infinite ease-in-out alternate;
          transform-box: fill-box;
          transform-origin: center;
        }
      `}</style>
    </div>
  )
}
