"use client"

import { useMemo } from "react"

export function FutureHorizon() {
  const cars = useMemo(() => Array.from({ length: 15 }, (_: unknown, i) => ({
    delay: Math.random() * 15,
    duration: Math.random() * 8 + 4,
    type: i % 2 === 0 ? 'headlight' : 'taillight'
  })), [])

  const caps = useMemo(() => Array.from({ length: 5 }, (_: unknown, i) => ({
    x: Math.random() * 400 + 200,
    y: Math.random() * 200 + 300,
    delay: Math.random() * 8,
    duration: Math.random() * 6 + 4
  })), [])

  const stars = useMemo(() => Array.from({ length: 40 }, () => ({
    x: Math.random() * 1440,
    y: Math.random() * 400,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.1
  })), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ opacity: 0.5 }}>
      {/* 1. Gradient background */}
      <div 
        className="absolute inset-0" 
        style={{ background: "linear-gradient(to bottom, #0c1445 0%, #1e40af 35%, #0891b2 70%, #f97316 100%)" }} 
      />
      
      {/* 2. SVG scene layers */}
      <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
        {/* Constellation/Network dots in sky */}
        {stars.map((s, i) => (
          <circle key={`star-${i}`} cx={s.x} cy={s.y} r={s.size} fill="#ffffff" opacity={s.opacity} />
        ))}
        {/* Network lines connecting some stars */}
        <path d="M100,150 L250,100 L400,200 L550,120 L700,220 L850,150 L1000,250 L1200,100" fill="none" stroke="#cbd5e1" strokeWidth="1" opacity="0.2" strokeDasharray="5,5"/>
        <path d="M150,300 L300,200 L450,350 L600,250 L800,320 L1050,200 L1300,300" fill="none" stroke="#cbd5e1" strokeWidth="1" opacity="0.2" strokeDasharray="5,5"/>

        {/* Distant Hills */}
        <path d="M0,600 Q300,550 720,620 T1440,580 L1440,900 L0,900 Z" fill="#0f172a" opacity="0.4" />

        {/* City Skyline Silhouette */}
        <g fill="#020617" opacity="0.8">
          <rect x="150" y="450" width="80" height="250" />
          <polygon points="150,450 190,400 230,450" />
          
          <rect x="250" y="350" width="60" height="350" />
          <rect x="270" y="280" width="20" height="70" />
          
          <rect x="330" y="500" width="100" height="200" />
          
          <rect x="450" y="300" width="90" height="400" />
          <polygon points="450,300 540,250 540,300" />
          
          <rect x="560" y="480" width="120" height="220" />
          
          <rect x="700" y="250" width="80" height="450" />
          <rect x="720" y="150" width="40" height="100" />
          <line x1="740" y1="50" x2="740" y2="150" stroke="#020617" strokeWidth="4" />
          
          <rect x="800" y="400" width="110" height="300" />
          <rect x="930" y="320" width="70" height="380" />
          
          <rect x="1020" y="450" width="100" height="250" />
          
          <rect x="1140" y="380" width="80" height="320" />
          <polygon points="1140,380 1180,330 1220,380" />
          
          <rect x="1240" y="520" width="120" height="180" />
        </g>

        {/* City Window Lights */}
        {Array.from({length: 30}).map((_: unknown, i) => (
          <rect key={`win-${i}`} 
            x={160 + (i*45) % 1100} 
            y={350 + (i*37) % 300} 
            width="8" height="12" 
            fill="#fcd34d" opacity="0.4" 
          />
        ))}

        {/* Foreground Hills */}
        <path d="M0,700 Q400,600 800,750 T1440,680 L1440,900 L0,900 Z" fill="#020617" opacity="0.9" />

        {/* Highway winding to the city */}
        <path d="M-100,900 Q400,850 700,700 T740,600" fill="none" stroke="#1e293b" strokeWidth="80" strokeLinecap="round"/>
        <path d="M-100,900 Q400,850 700,700 T740,600" fill="none" stroke="#fcd34d" strokeWidth="4" strokeDasharray="20,20" opacity="0.3" strokeLinecap="round"/>

        {/* Animated Car Lights */}
        {cars.map((c, i) => (
          <circle 
            key={`car-${i}`}
            cx="0" cy="0" r="4"
            fill={c.type === 'headlight' ? "#fef08a" : "#ef4444"}
            className="future-car"
            style={{
              animation: c.type === 'headlight' 
                ? `future-drive-in ${c.duration}s infinite linear ${c.delay}s`
                : `future-drive-out ${c.duration}s infinite linear ${c.delay}s`,
              offsetPath: 'path("M-100,900 Q400,850 700,700 T740,600")',
            } as React.CSSProperties}
          />
        ))}

        {/* Briefcase Accent Foreground */}
        <g transform="translate(1100, 780)">
          <rect x="0" y="20" width="80" height="50" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
          <path d="M25,20 L25,10 Q40,0 55,10 L55,20" fill="none" stroke="#334155" strokeWidth="4"/>
          <rect x="35" y="15" width="10" height="10" fill="#cbd5e1" />
          <line x1="0" y1="40" x2="80" y2="40" stroke="#334155" strokeWidth="2"/>
        </g>

        {/* Animated Rocket */}
        <g className="future-rocket">
          {/* Exhaust trail */}
          <path d="M120,600 Q100,700 50,850" fill="none" stroke="url(#rocket-trail)" strokeWidth="8" opacity="0.6"/>
          <g transform="translate(120, 600) rotate(15)">
            <polygon points="-15,20 0,-30 15,20" fill="#e2e8f0" />
            <polygon points="-15,20 -25,40 -10,30" fill="#94a3b8" />
            <polygon points="15,20 25,40 10,30" fill="#94a3b8" />
            <polygon points="-8,20 0,40 8,20" fill="#f97316" className="future-flame"/>
            <circle cx="0" cy="5" r="5" fill="#0ea5e9" />
          </g>
        </g>
        
        <defs>
          <linearGradient id="rocket-trail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Animated Graduation Caps */}
        {caps.map((cap, i) => (
          <g 
            key={`cap-${i}`}
            className="future-cap"
            style={{
              '--start-x': `${cap.x}px`,
              '--start-y': `${cap.y}px`,
              animation: `future-toss ${cap.duration}s infinite ease-in-out ${cap.delay}s`
            } as React.CSSProperties}
          >
            <polygon points="0,-10 30,0 0,10 -30,0" fill="#020617" />
            <path d="M-15,5 L-15,15 Q0,25 15,15 L15,5 Z" fill="#0f172a" />
            <line x1="0" y1="0" x2="25" y2="15" stroke="#fcd34d" strokeWidth="2" />
            <circle cx="25" cy="15" r="3" fill="#fcd34d" />
          </g>
        ))}
      </svg>
      
      <style>{`
        @keyframes future-drive-in {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes future-drive-out {
          0% { offset-distance: 100%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { offset-distance: 0%; opacity: 0; }
        }
        @keyframes future-toss {
          0% { 
            transform: translate(var(--start-x), calc(var(--start-y) + 150px)) scale(0.5) rotate(-20deg);
            opacity: 0;
          }
          40% { 
            opacity: 1;
            transform: translate(calc(var(--start-x) + 20px), var(--start-y)) scale(1) rotate(10deg);
          }
          60% { 
            opacity: 1;
            transform: translate(calc(var(--start-x) + 30px), calc(var(--start-y) - 10px)) scale(1) rotate(20deg);
          }
          100% { 
            transform: translate(calc(var(--start-x) + 60px), calc(var(--start-y) + 200px)) scale(0.5) rotate(45deg);
            opacity: 0;
          }
        }
        @keyframes future-rocket-launch {
          0% { transform: translate(-100px, 200px); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(300px, -600px); opacity: 0; }
        }
        .future-rocket {
          animation: future-rocket-launch 12s infinite ease-in;
        }
        @keyframes future-flame-flicker {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.3); }
        }
        .future-flame {
          animation: future-flame-flicker 0.1s infinite;
          transform-origin: top;
        }
      `}</style>
    </div>
  )
}
