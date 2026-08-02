"use client"

import { useMemo } from "react"

export function CampusSunrise() {
  const birds = useMemo(() => Array.from({ length: 8 }, (_: unknown, i) => ({
    y: 100 + Math.random() * 200,
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 10,
    scale: 0.4 + Math.random() * 0.4
  })), [])

  const clouds = useMemo(() => Array.from({ length: 5 }, (_: unknown, i) => ({
    y: 50 + Math.random() * 150,
    delay: Math.random() * 20,
    duration: 80 + Math.random() * 40,
    scale: 0.8 + Math.random() * 0.6,
    opacity: 0.15 + Math.random() * 0.15
  })), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-40">
      
      <svg className="absolute bottom-0 w-full min-w-[1440px] min-h-[900px]" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
        <defs>
          <radialGradient id="campus-sun-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5c9c4" stopOpacity="1" />
            <stop offset="30%" stopColor="#d93a2b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#b82e21" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Sun */}
        <circle cx="720" cy="550" r="180" fill="url(#campus-sun-glow)" />
        
        {/* Mountains - Far */}
        <path d="M0 600 L120 480 L280 580 L450 420 L600 580 L750 450 L900 560 L1080 390 L1250 580 L1350 490 L1440 600 L1440 900 L0 900 Z" fill="#1b3a5c" opacity="0.6" />
        
        {/* Mountains - Mid */}
        <path d="M0 650 L220 520 L380 620 L550 460 L700 640 L850 490 L1000 640 L1150 490 L1300 620 L1440 520 L1440 900 L0 900 Z" fill="#12283f" opacity="0.8" />
        
        {/* Mountains - Near */}
        <path d="M0 720 L320 570 L480 690 L650 590 L800 720 L950 570 L1100 690 L1250 590 L1440 670 L1440 900 L0 900 Z" fill="#0b1522" />
        
        {/* Campus Buildings */}
        <path d="M250 750 L250 630 L320 630 L320 600 L380 600 L380 630 L450 630 L450 750 Z" fill="#0b1522" />
        <path d="M480 750 L480 560 L540 510 L600 560 L600 750 Z" fill="#0b1522" />
        <path d="M630 750 L630 580 L770 580 L770 750 Z" fill="#0b1522" />
        <path d="M660 580 C660 520 740 520 740 580 Z" fill="#0b1522" />
        <path d="M820 750 L820 610 L940 610 L940 640 L1020 640 L1020 750 Z" fill="#0b1522" />
        <path d="M1060 750 L1060 650 L1180 650 L1180 750 Z" fill="#0b1522" />

        {/* Trees Left */}
        <path d="M-20 750 C10 680 70 630 120 680 C160 650 200 700 180 750 Z" fill="#0b1522" />
        <path d="M80 750 C60 710 120 660 160 710 C190 680 230 720 210 750 Z" fill="#0b1522" />
        
        {/* Trees Right */}
        <path d="M1250 750 C1230 690 1290 640 1340 690 C1380 660 1420 710 1400 750 Z" fill="#0b1522" />
        <path d="M1320 750 C1300 710 1360 660 1400 710 C1430 680 1460 720 1440 750 Z" fill="#0b1522" />
        
        {/* Pond/Water Reflection */}
        <path d="M0 750 L1440 750 L1440 900 L0 900 Z" fill="#0b1522" />
        <path d="M0 750 L1440 750 L1440 900 L0 900 Z" fill="url(#campus-sun-glow)" opacity="0.2" transform="scale(1, -1) translate(0, -1500)" />
        
        {/* Water shimmer lines */}
        <g opacity="0.4">
          <line x1="580" y1="770" x2="860" y2="770" stroke="#e8b4ac" strokeWidth="1.5" />
          <line x1="630" y1="785" x2="810" y2="785" stroke="#e8b4ac" strokeWidth="1.5" />
          <line x1="550" y1="800" x2="890" y2="800" stroke="#e8b4ac" strokeWidth="1.5" />
          <line x1="610" y1="815" x2="830" y2="815" stroke="#e8b4ac" strokeWidth="1.5" />
          <line x1="520" y1="830" x2="920" y2="830" stroke="#e8b4ac" strokeWidth="1.5" />
          <line x1="650" y1="845" x2="790" y2="845" stroke="#e8b4ac" strokeWidth="1.5" />
          <line x1="480" y1="860" x2="960" y2="860" stroke="#e8b4ac" strokeWidth="1.5" />
          <line x1="680" y1="875" x2="760" y2="875" stroke="#e8b4ac" strokeWidth="1.5" />
        </g>
      </svg>
      
      {/* Animated Clouds */}
      {clouds.map((c, i) => (
        <div 
          key={`cloud-${i}`} 
          className="absolute"
          style={{
            top: `${c.y}px`,
            left: '-300px',
            opacity: c.opacity,
            transform: `scale(${c.scale})`,
            animation: `campus-drift ${c.duration}s linear infinite`,
            animationDelay: `${c.delay}s`
          }}
        >
          <svg width="300" height="150" viewBox="0 0 300 150">
            <ellipse cx="150" cy="75" rx="120" ry="45" fill="white" filter="blur(15px)" />
            <ellipse cx="195" cy="60" rx="75" ry="37" fill="white" filter="blur(15px)" />
            <ellipse cx="105" cy="67" rx="90" ry="37" fill="white" filter="blur(15px)" />
          </svg>
        </div>
      ))}
      
      {/* Animated Birds */}
      {birds.map((b, i) => (
        <div 
          key={`bird-${i}`} 
          className="absolute"
          style={{
            top: `${b.y}px`,
            left: '-100px',
            animation: `campus-fly ${b.duration}s linear infinite`,
            animationDelay: `${b.delay}s`
          }}
        >
          <div style={{ transform: `scale(${b.scale})` }}>
            <svg width="40" height="25" viewBox="0 0 40 25">
              <path d="M0,12 Q10,0 20,12 Q30,0 40,12 Q30,6 20,18 Q10,6 0,12 Z" fill="#0b1522" />
            </svg>
          </div>
        </div>
      ))}
      
      <style>{`
        @keyframes campus-drift {
          0% { transform: translateX(-10vw) scale(var(--tw-scale-x, 1)); }
          100% { transform: translateX(120vw) scale(var(--tw-scale-x, 1)); }
        }
        @keyframes campus-fly {
          0% { transform: translate(-100px, 0); }
          25% { transform: translate(25vw, -30px); }
          50% { transform: translate(50vw, 15px); }
          75% { transform: translate(75vw, -15px); }
          100% { transform: translate(110vw, 0); }
        }
      `}</style>
    </div>
  )
}