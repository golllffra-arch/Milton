"use client"

import { useMemo } from "react"

export function ScholarsSanctuary() {
  const particles = useMemo(() => Array.from({ length: 30 }, (_: unknown, i) => ({
    x: Math.random() * 1440,
    y: Math.random() * 900,
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 5,
    size: Math.random() * 3 + 1
  })), [])

  const clouds = useMemo(() => Array.from({ length: 3 }, (_: unknown, i) => ({
    y: Math.random() * 200 + 50,
    delay: Math.random() * 20,
    duration: Math.random() * 40 + 40,
    scale: Math.random() * 0.5 + 0.5
  })), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ opacity: 0.4 }}>
      {/* 1. Gradient background */}
      <div 
        className="absolute inset-0" 
        style={{ background: "linear-gradient(to bottom, #134e4a 0%, #166534 35%, #ca8a04 70%, #d97706 100%)" }} 
      />
      
      {/* 2. SVG scene layers */}
      <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
        {/* Animated Clouds */}
        {clouds.map((c, i) => (
          <g 
            key={`cloud-${i}`}
            className="scholar-cloud"
            style={{
              '--start-y': `${c.y}px`,
              '--scale': c.scale,
              animation: `scholar-drift ${c.duration}s infinite linear ${c.delay}s`
            } as React.CSSProperties}
          >
            <path d="M0,30 Q20,10 50,20 Q80,-10 110,20 Q140,0 160,30 Q180,60 140,60 L20,60 Q-20,60 0,30 Z" fill="#fef08a" opacity="0.15"/>
          </g>
        ))}

        {/* Back Hills */}
        <path d="M0,650 Q250,550 500,600 T1000,550 T1440,620 L1440,900 L0,900 Z" fill="#064e3b" opacity="0.5" />
        {/* Mid Hills */}
        <path d="M0,700 Q300,620 700,680 T1440,650 L1440,900 L0,900 Z" fill="#022c22" opacity="0.6" />
        
        {/* Library Silhouette Building */}
        <path d="M350,750 L350,300 L720,200 L1090,300 L1090,750 Z" fill="#0f172a" opacity="0.9"/>
        <path d="M400,350 L400,750 M480,330 L480,750 M560,300 L560,750 M640,280 L640,750 M720,270 L720,750 M800,280 L800,750 M880,300 L880,750 M960,330 L960,750 M1040,350 L1040,750" stroke="#fef08a" strokeWidth="6" opacity="0.15"/>
        {/* Library Arched Windows */}
        {[430, 510, 590, 670, 750, 830, 910, 990].map((x, i) => (
          <path key={`window-${i}`} d={`M${x},380 Q${x+20},340 ${x+40},380 L${x+40},700 L${x},700 Z`} fill="#fcd34d" opacity="0.1" />
        ))}
        {/* Building pillars */}
        {[350, 420, 500, 580, 660, 740, 820, 900, 980, 1060].map((x, i) => (
          <rect key={`pillar-${i}`} x={x-10} y="320" width="20" height="430" fill="#020617" />
        ))}

        {/* Ivy/Vines climbing building */}
        <path d="M350,700 Q370,650 340,600 T360,500 T340,400" fill="none" stroke="#064e3b" strokeWidth="8" strokeLinecap="round"/>
        <path d="M1090,700 Q1070,680 1100,600 T1080,520 T1100,450" fill="none" stroke="#064e3b" strokeWidth="10" strokeLinecap="round"/>
        {/* Leaf dots on vines */}
        {Array.from({length: 40}).map((_: unknown, i) => (
          <circle key={`ivy1-${i}`} cx={345 + Math.random()*20 - 10} cy={400 + i*8} r={Math.random()*4+2} fill="#14532d" opacity="0.8"/>
        ))}
        {Array.from({length: 40}).map((_: unknown, i) => (
          <circle key={`ivy2-${i}`} cx={1085 + Math.random()*20 - 10} cy={450 + i*7} r={Math.random()*4+2} fill="#14532d" opacity="0.8"/>
        ))}

        {/* Book Stacks Foreground */}
        <g transform="translate(100, 700)">
          <rect x="0" y="50" width="120" height="30" rx="3" fill="#020617"/>
          <rect x="10" y="25" width="100" height="25" rx="3" fill="#0f172a" transform="rotate(-5)"/>
          <rect x="-5" y="0" width="130" height="25" rx="3" fill="#1e293b"/>
          <rect x="20" y="-30" width="90" height="30" rx="3" fill="#0f172a" transform="rotate(8)"/>
        </g>
        <g transform="translate(1150, 650)">
          <rect x="10" y="100" width="150" height="35" rx="3" fill="#020617"/>
          <rect x="0" y="65" width="160" height="35" rx="3" fill="#1e293b"/>
          <rect x="20" y="40" width="130" height="25" rx="3" fill="#0f172a"/>
          <rect x="15" y="0" width="140" height="40" rx="3" fill="#020617" transform="rotate(-3)"/>
        </g>

        {/* Center Open Book & Quill */}
        <g transform="translate(720, 800)">
          {/* Glowing aura */}
          <ellipse cx="0" cy="0" rx="150" ry="50" fill="#fef08a" opacity="0.1" className="scholar-glow" />
          
          {/* Pages left */}
          <path d="M0,0 Q-100,-20 -200,0 L-200,20 Q-100,0 0,20 Z" fill="#e2e8f0" opacity="0.8"/>
          <path d="M0,-5 Q-100,-25 -190,-5 L-190,5 Q-100,-15 0,5 Z" fill="#f8fafc" opacity="0.9"/>
          
          {/* Pages right */}
          <path d="M0,0 Q100,-20 200,0 L200,20 Q100,0 0,20 Z" fill="#cbd5e1" opacity="0.8"/>
          <path d="M0,-5 Q100,-25 190,-5 L190,5 Q100,-15 0,5 Z" fill="#f1f5f9" opacity="0.9"/>
          
          {/* Spine */}
          <path d="M-10,20 Q0,30 10,20 L10,25 Q0,35 -10,25 Z" fill="#020617" />
          
          {/* Quill */}
          <g transform="translate(80, -20) rotate(35)">
            <path d="M0,0 Q10,30 50,80 Q30,60 10,80 Q20,40 0,0 Z" fill="#020617" opacity="0.9"/>
            <path d="M0,0 L-20,-40" stroke="#020617" strokeWidth="3" />
          </g>
        </g>

        {/* Telescope Accent */}
        <g transform="translate(250, 680) rotate(-15)">
          <polygon points="0,0 15,0 25,60 -10,60" fill="#0f172a" />
          <polygon points="25,60 -10,60 30,100 -15,100" fill="#020617" />
          <line x1="10" y1="50" x2="-20" y2="120" stroke="#020617" strokeWidth="4" />
          <line x1="10" y1="50" x2="40" y2="120" stroke="#020617" strokeWidth="4" />
        </g>

        {/* Animated Particles (Wisdom/Magic) */}
        {particles.map((p, i) => (
          <circle 
            key={`particle-${i}`}
            className="scholar-particle"
            cx="0" cy="0" r={p.size}
            fill="#fef08a"
            style={{
              '--start-x': `${p.x}px`,
              '--start-y': `${p.y}px`,
              animation: `scholar-float ${p.duration}s infinite ease-in-out ${p.delay}s`
            } as React.CSSProperties}
          />
        ))}
      </svg>
      
      <style>{`
        @keyframes scholar-drift {
          0% { transform: translate(-200px, var(--start-y)) scale(var(--scale)); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(1640px, calc(var(--start-y) - 50px)) scale(var(--scale)); opacity: 0; }
        }
        @keyframes scholar-float {
          0% { 
            transform: translate(var(--start-x), var(--start-y));
            opacity: 0;
          }
          50% { 
            opacity: 0.8;
            transform: translate(calc(var(--start-x) + 20px), calc(var(--start-y) - 100px));
          }
          100% { 
            transform: translate(calc(var(--start-x) - 20px), calc(var(--start-y) - 200px));
            opacity: 0;
          }
        }
        @keyframes scholar-glow-pulse {
          0%, 100% { opacity: 0.05; transform: scale(0.9); }
          50% { opacity: 0.15; transform: scale(1.1); transform-origin: center; }
        }
        .scholar-glow {
          animation: scholar-glow-pulse 6s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}
