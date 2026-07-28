"use client"

import { useMemo } from "react"

export function CampusVibes() {
  const notes = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    x: Math.random() * 400 + 100,
    y: Math.random() * 200 + 500,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 5,
    type: i % 2 === 0 ? 'single' : 'double'
  })), [])

  const confetti = useMemo(() => Array.from({ length: 25 }, (_, i) => {
    const colors = ['#f43f5e', '#fbbf24', '#38bdf8', '#a78bfa', '#34d399']
    return {
      x: Math.random() * 1440,
      startY: -50,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360
    }
  }), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ opacity: 0.4 }}>
      {/* 1. Gradient background */}
      <div 
        className="absolute inset-0" 
        style={{ background: "linear-gradient(to bottom, #831843 0%, #db2777 30%, #f43f5e 60%, #fbbf24 100%)" }} 
      />
      
      {/* 2. SVG scene layers */}
      <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
        {/* Sun/Glow */}
        <circle cx="1200" cy="500" r="150" fill="#fef08a" opacity="0.2" className="vibes-sun" />
        
        {/* Background Trees */}
        {[100, 300, 500, 800, 1100, 1300].map((x, i) => (
          <g key={`bg-tree-${i}`} transform={`translate(${x}, 550) scale(${Math.random() * 0.4 + 0.6})`}>
            <rect x="-10" y="0" width="20" height="150" fill="#4c0519" opacity="0.6"/>
            <circle cx="0" cy="-20" r="60" fill="#881337" opacity="0.5"/>
            <circle cx="-30" cy="10" r="40" fill="#881337" opacity="0.5"/>
            <circle cx="30" cy="10" r="40" fill="#881337" opacity="0.5"/>
          </g>
        ))}

        {/* Campus Buildings / Quad */}
        <path d="M50,600 L50,350 L250,300 L450,350 L450,600 Z" fill="#2e1065" opacity="0.7"/>
        <path d="M900,600 L900,250 L1150,250 L1150,600 Z" fill="#2e1065" opacity="0.7"/>
        {/* Building windows */}
        {Array.from({length: 12}).map((_, i) => (
          <rect key={`win1-${i}`} x={100 + (i%3)*80} y={380 + Math.floor(i/3)*50} width="30" height="30" fill="#fbbf24" opacity="0.3"/>
        ))}
        {Array.from({length: 15}).map((_, i) => (
          <rect key={`win2-${i}`} x={940 + (i%3)*70} y={300 + Math.floor(i/3)*60} width="35" height="40" fill="#fbbf24" opacity="0.3"/>
        ))}

        {/* Sports Field Mid-ground */}
        <ellipse cx="720" cy="700" rx="500" ry="100" fill="#be123c" opacity="0.4" />
        <ellipse cx="720" cy="700" rx="480" ry="90" fill="none" stroke="#fecdd3" strokeWidth="4" opacity="0.3" />
        <line x1="720" y1="600" x2="720" y2="800" stroke="#fecdd3" strokeWidth="4" opacity="0.3" />
        <circle cx="720" cy="700" r="30" fill="none" stroke="#fecdd3" strokeWidth="4" opacity="0.3" />

        {/* Basketball Hoop */}
        <g transform="translate(300, 650)">
          <rect x="-3" y="-120" width="6" height="120" fill="#0f172a" />
          <rect x="-25" y="-140" width="50" height="40" fill="#0f172a" />
          <rect x="-15" y="-130" width="30" height="20" fill="#334155" />
          <path d="M-10,-110 L10,-110 L5,-80 L-5,-80 Z" fill="none" stroke="#0f172a" strokeWidth="2"/>
        </g>

        {/* Waving Flag */}
        <g transform="translate(1300, 500)">
          <rect x="-3" y="-150" width="6" height="250" fill="#0f172a" />
          <path d="M0,-140 Q40,-160 80,-140 Q120,-120 160,-140 L160,-80 Q120,-60 80,-80 Q40,-100 0,-80 Z" fill="#b91c1c" className="vibes-flag"/>
        </g>

        {/* Foreground Trees */}
        {[200, 600, 1000, 1350].map((x, i) => (
          <g key={`fg-tree-${i}`} transform={`translate(${x}, 750) scale(${Math.random() * 0.3 + 0.8})`}>
            <path d="M-10,150 Q0,0 0,-50 Q0,0 10,150 Z" fill="#0f172a" />
            <circle cx="0" cy="-60" r="70" fill="#020617" opacity="0.9"/>
            <circle cx="-40" cy="-20" r="50" fill="#020617" opacity="0.9"/>
            <circle cx="40" cy="-20" r="50" fill="#020617" opacity="0.9"/>
          </g>
        ))}

        {/* Student Silhouettes */}
        <g fill="#020617">
          {/* Sitting under tree */}
          <circle cx="150" cy="780" r="10" />
          <path d="M140,790 L160,790 L155,820 L145,820 Z" />
          {/* Walking couple */}
          <g transform="translate(500, 720)">
            <circle cx="0" cy="-20" r="8" />
            <path d="M-5,-10 L5,-10 L10,30 L-10,30 Z" />
            <circle cx="20" cy="-18" r="7" />
            <path d="M15,-10 L25,-10 L28,30 L12,30 Z" />
          </g>
          {/* Playing/Running */}
          <g transform="translate(850, 680)">
            <circle cx="10" cy="-25" r="9" />
            <path d="M0,-15 L15,-15 L25,20 L5,20 Z" />
            <path d="M5,-10 L-15,-5" stroke="#020617" strokeWidth="4"/>
            <circle cx="-25" cy="-5" r="5" /> {/* ball */}
          </g>
        </g>

        {/* Animated Musical Notes */}
        {notes.map((n, i) => (
          <g 
            key={`note-${i}`}
            className="vibes-note"
            style={{
              '--start-x': `${n.x}px`,
              '--start-y': `${n.y}px`,
              animation: `vibes-float-up ${n.duration}s infinite ease-in-out ${n.delay}s`
            } as React.CSSProperties}
            fill="#0f172a"
          >
            {n.type === 'single' ? (
              <path d="M0,20 A8,6 0 1,1 -16,20 A8,6 0 1,1 0,20 M0,20 L0,-10 L15,-5" />
            ) : (
              <path d="M0,20 A8,6 0 1,1 -16,20 A8,6 0 1,1 0,20 M0,20 L0,-10 L20,-15 L20,15 A8,6 0 1,1 4,15 A8,6 0 1,1 20,15 M0,-10 L20,-15 L20,-5 L0,0 Z" />
            )}
          </g>
        ))}

        {/* Animated Confetti */}
        {confetti.map((c, i) => (
          <rect 
            key={`confetti-${i}`}
            width="8" height="12"
            fill={c.color}
            className="vibes-confetti"
            style={{
              '--start-x': `${c.x}px`,
              '--rot': `${c.rotation}deg`,
              animation: `vibes-fall ${c.duration}s infinite linear ${c.delay}s`
            } as React.CSSProperties}
          />
        ))}
      </svg>
      
      <style>{`
        @keyframes vibes-float-up {
          0% { 
            transform: translate(var(--start-x), var(--start-y)) scale(0.5);
            opacity: 0;
          }
          50% { 
            opacity: 0.8;
            transform: translate(calc(var(--start-x) + 30px), calc(var(--start-y) - 80px)) scale(1) rotate(15deg);
          }
          100% { 
            transform: translate(calc(var(--start-x) - 20px), calc(var(--start-y) - 180px)) scale(1.5) rotate(-15deg);
            opacity: 0;
          }
        }
        @keyframes vibes-fall {
          0% { 
            transform: translate(var(--start-x), -50px) rotate(var(--rot)); 
            opacity: 0;
          }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { 
            transform: translate(calc(var(--start-x) + 100px), 950px) rotate(calc(var(--rot) + 720deg));
            opacity: 0;
          }
        }
        @keyframes vibes-flag-wave {
          0%, 100% { d: path("M0,-140 Q40,-160 80,-140 Q120,-120 160,-140 L160,-80 Q120,-60 80,-80 Q40,-100 0,-80 Z"); }
          50% { d: path("M0,-140 Q40,-120 80,-140 Q120,-160 160,-140 L160,-80 Q120,-100 80,-80 Q40,-60 0,-80 Z"); }
        }
        .vibes-flag {
          animation: vibes-flag-wave 3s infinite ease-in-out;
        }
        @keyframes vibes-sun-pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.3; transform-origin: 1200px 500px; }
        }
        .vibes-sun {
          animation: vibes-sun-pulse 8s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}
