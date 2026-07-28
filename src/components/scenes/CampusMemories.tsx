"use client"

import { useMemo } from "react"

interface Frame {
  id: number
  x: number
  y: number
  duration: number
  delay: number
  rotation: number
}

interface Sparkle {
  id: number
  x: number
  y: number
  duration: number
  delay: number
}

interface Bokeh {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

interface Butterfly {
  id: number
  x: number
  y: number
  duration: number
  delay: number
}

export function CampusMemories() {
  const frames = useMemo<Frame[]>(() => Array.from({ length: 5 }, (_, i) => ({
    id: i,
    x: 10 + i * 18 + Math.random() * 5,
    y: 20 + Math.random() * 40,
    duration: 6 + Math.random() * 4,
    delay: Math.random() * 3,
    rotation: -15 + Math.random() * 30,
  })), [])

  const sparkles = useMemo<Sparkle[]>(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 80,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 2,
  })), [])

  const bokeh = useMemo<Bokeh[]>(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 50 + Math.random() * 100,
    duration: 10 + Math.random() * 10,
    delay: Math.random() * 5,
  })), [])

  const butterflies = useMemo<Butterfly[]>(() => Array.from({ length: 4 }, (_, i) => ({
    id: i,
    x: Math.random() * 80,
    y: 40 + Math.random() * 40,
    duration: 15 + Math.random() * 10,
    delay: i * 2,
  })), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-40" 
        style={{ background: "linear-gradient(to bottom, #1a0533 0%, #4c1d95 30%, #be185d 60%, #ec4899 80%, #e9d5ff 100%)" }} 
      />

      <svg className="absolute bottom-0 w-full opacity-60" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="memory-mountain-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4c1d95" />
            <stop offset="100%" stopColor="#2e1065" />
          </linearGradient>
          <linearGradient id="memory-mountain-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#be185d" />
            <stop offset="100%" stopColor="#831843" />
          </linearGradient>
          <linearGradient id="memory-tree" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#831843" />
            <stop offset="100%" stopColor="#4c0519" />
          </linearGradient>
        </defs>

        {/* Backdrop Mountains */}
        <path d="M0,500 Q200,350 450,450 T900,380 T1440,550 L1440,900 L0,900 Z" fill="url(#memory-mountain-1)" />
        <path d="M-50,600 Q300,500 600,650 T1200,550 T1500,700 L1500,900 L-50,900 Z" fill="url(#memory-mountain-2)" />

        {/* Tree on the Right */}
        <g transform="translate(1200, 900)">
          <path d="M-20,0 Q-30,-200 -10,-400 Q10,-550 -50,-650 Q0,-600 20,-450 Q50,-550 150,-600 Q80,-500 40,-350 Q50,-200 40,0 Z" fill="url(#memory-tree)" />
          {/* Hanging frames */}
          <line x1="-30" y1="-600" x2="-30" y2="-500" stroke="#e9d5ff" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
          <rect x="-50" y="-500" width="40" height="50" fill="none" stroke="#e9d5ff" strokeWidth="3" opacity="0.6" transform="rotate(5 -30 -500)" />
          
          <line x1="80" y1="-550" x2="80" y2="-450" stroke="#e9d5ff" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
          <rect x="60" y="-450" width="40" height="30" fill="none" stroke="#e9d5ff" strokeWidth="3" opacity="0.6" transform="rotate(-10 80 -450)" />
        </g>

        {/* Camera Silhouette */}
        <g transform="translate(150, 750) rotate(-5)" opacity="0.7">
          <rect x="0" y="20" width="80" height="50" rx="5" fill="#4c0519" />
          <rect x="15" y="10" width="20" height="10" rx="2" fill="#4c0519" />
          <circle cx="40" cy="45" r="20" fill="#be185d" />
          <circle cx="40" cy="45" r="15" fill="#4c0519" />
          <circle cx="45" cy="40" r="4" fill="#e9d5ff" opacity="0.5" />
          <rect x="65" y="25" width="10" height="10" rx="2" fill="#831843" />
        </g>

        {/* Filmstrip along edge */}
        <g opacity="0.2">
          <path d="M-20,300 Q200,400 400,200 T800,250 T1200,100 T1500,200 L1500,280 T1200,180 T800,330 T400,280 T-20,380 Z" fill="#1a0533" />
          {/* Add some strip holes */}
          {[...Array(30)].map((_, i) => (
            <rect key={i} x={i * 50} y={250 + Math.sin(i*0.5)*50} width="10" height="15" fill="#e9d5ff" transform={`rotate(${Math.cos(i*0.5)*20} ${i*50} ${250 + Math.sin(i*0.5)*50})`} />
          ))}
        </g>
      </svg>

      {/* Bokeh */}
      {bokeh.map(b => (
        <div
          key={`bokeh-${b.id}`}
          className="absolute rounded-full memory-float-bokeh"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            background: 'radial-gradient(circle, rgba(233,213,255,0.15) 0%, rgba(233,213,255,0) 70%)',
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {/* Floating Photo Frames */}
      {frames.map(f => (
        <div
          key={`frame-${f.id}`}
          className="absolute memory-float-frame"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            transform: `rotate(${f.rotation}deg)`,
          }}
        >
          <div className="w-24 h-32 border-4 border-pink-200/40 bg-white/5 shadow-lg backdrop-blur-sm p-2 flex flex-col justify-between">
            <div className="w-full h-2/3 bg-white/10" />
            <div className="w-1/2 h-2 bg-white/20 mt-2 mx-auto" />
          </div>
        </div>
      ))}

      {/* Sparkles */}
      {sparkles.map(s => (
        <div
          key={`sparkle-${s.id}`}
          className="absolute memory-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" opacity="0.6">
            <path d="M8,0 Q8,8 16,8 Q8,8 8,16 Q8,8 0,8 Q8,8 8,0 Z" fill="#fbcfe8" />
          </svg>
        </div>
      ))}

      {/* Butterflies */}
      {butterflies.map(b => (
        <div
          key={`butterfly-${b.id}`}
          className="absolute memory-fly-butterfly"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <div className="memory-flap-wings">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" opacity="0.7">
              <path d="M12,12 Q6,0 2,8 Q4,16 12,12 Z" fill="#f472b6" />
              <path d="M12,12 Q18,0 22,8 Q20,16 12,12 Z" fill="#f472b6" />
              <path d="M12,12 Q8,20 4,18 Q8,12 12,12 Z" fill="#be185d" />
              <path d="M12,12 Q16,20 20,18 Q16,12 12,12 Z" fill="#be185d" />
            </svg>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes memory-float-frame {
          0%, 100% { transform: translateY(0) rotate(var(--tw-rotate)); }
          50% { transform: translateY(-30px) rotate(calc(var(--tw-rotate) + 5deg)); }
        }
        @keyframes memory-float-bokeh {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.2); }
        }
        @keyframes memory-twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes memory-fly-butterfly {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.7; }
          25% { transform: translate(50px, -50px) rotate(10deg); }
          50% { transform: translate(100px, 0px) rotate(-10deg); }
          75% { transform: translate(150px, -70px) rotate(15deg); }
          90% { opacity: 0.7; }
          100% { transform: translate(200px, -20px) rotate(0deg); opacity: 0; }
        }
        @keyframes memory-flap {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(0.3); }
        }
        .memory-flap-wings {
          animation: memory-flap 0.3s infinite;
          transform-origin: center;
        }
      `}</style>
    </div>
  )
}
