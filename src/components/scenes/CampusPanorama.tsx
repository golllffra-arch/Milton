"use client"

import { useMemo } from "react"

interface Dot {
  id: number
  x: number
  y: number
  delay: number
}

interface Star {
  id: number
  x: number
  y: number
  delay: number
}

interface Marker {
  id: number
  x: number
  y: number
  delay: number
}

export function CampusPanorama() {
  const dots = useMemo<Dot[]>(() => Array.from({ length: 15 }, (_: unknown, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    y: 60 + Math.random() * 30,
    delay: Math.random() * 4,
  })), [])

  const stars = useMemo<Star[]>(() => Array.from({ length: 40 }, (_: unknown, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 40,
    delay: Math.random() * 3,
  })), [])

  const markers = useMemo<Marker[]>(() => [
    { id: 1, x: 25, y: 75, delay: 0 },
    { id: 2, x: 50, y: 65, delay: 1.5 },
    { id: 3, x: 75, y: 80, delay: 3 },
  ], [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-60" 
        style={{ background: "linear-gradient(to bottom, #0f172a 0%, #1e293b 40%, #6b21a8 70%, #06b6d4 100%)" }} 
      />

      <svg className="absolute bottom-0 w-full opacity-70" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="pano-ground" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#312e81" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="pano-building" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4c1d95" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
          <radialGradient id="pano-beam" cx="50%" cy="100%" r="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Northern Lights / Aurora */}
        <g className="pano-aurora" opacity="0.3">
          <path d="M-100,300 Q200,200 500,350 T1100,250 T1600,400 L1600,100 L-100,100 Z" fill="#2dd4bf" filter="blur(20px)" />
          <path d="M-100,200 Q300,300 700,200 T1300,350 T1600,200 L1600,0 L-100,0 Z" fill="#c084fc" filter="blur(30px)" />
        </g>

        {/* Background Hills */}
        <path d="M0,600 Q300,550 700,600 T1440,580 L1440,900 L0,900 Z" fill="#1e1b4b" />
        
        {/* Ground */}
        <path d="M0,700 L1440,700 L1440,900 L0,900 Z" fill="url(#pano-ground)" />
        
        {/* Grid Lines */}
        <g stroke="#06b6d4" strokeWidth="1" opacity="0.15">
          {[...Array(20)].map((_: unknown, i) => (
            <line key={`h-${i}`} x1="0" y1={700 + i*15} x2="1440" y2={700 + i*15} />
          ))}
          {[...Array(40)].map((_: unknown, i) => (
            <line key={`v-${i}`} x1={i*40} y1="700" x2={i*60 - 400} y2="900" />
          ))}
        </g>

        {/* Buildings (Campus Panorama) */}
        <g fill="url(#pano-building)">
          <rect x="200" y="550" width="150" height="150" />
          <polygon points="200,550 275,500 350,550" fill="#3b0764" />
          
          <rect x="380" y="450" width="100" height="250" />
          <polygon points="380,450 430,400 480,450" fill="#3b0764" />
          
          <rect x="520" y="600" width="200" height="100" />
          
          <rect x="750" y="400" width="120" height="300" />
          <rect x="900" y="500" width="150" height="200" />
          <polygon points="900,500 975,450 1050,500" fill="#3b0764" />
          
          <rect x="1100" y="580" width="180" height="120" />
        </g>

        {/* Windows */}
        <g fill="#22d3ee" opacity="0.6">
          <rect x="220" y="580" width="20" height="20" />
          <rect x="260" y="580" width="20" height="20" />
          <rect x="300" y="580" width="20" height="20" />
          
          <rect x="400" y="480" width="20" height="40" />
          <rect x="440" y="480" width="20" height="40" />
          <rect x="400" y="550" width="20" height="40" />
          <rect x="440" y="550" width="20" height="40" />

          <rect x="780" y="450" width="20" height="20" />
          <rect x="820" y="450" width="20" height="20" />
          <rect x="780" y="500" width="20" height="20" />
          <rect x="820" y="500" width="20" height="20" />
          <rect x="780" y="550" width="20" height="20" />
          <rect x="820" y="550" width="20" height="20" />
        </g>

        {/* Compass Rose */}
        <g transform="translate(1300, 150)" opacity="0.4" stroke="#06b6d4">
          <circle cx="0" cy="0" r="50" fill="none" strokeWidth="2" />
          <circle cx="0" cy="0" r="40" fill="none" strokeWidth="1" strokeDasharray="4" />
          <polygon points="0,-60 10,-10 60,0 10,10 0,60 -10,10 -60,0 -10,-10" fill="none" strokeWidth="2" />
          <text x="-4" y="-70" fill="#06b6d4" stroke="none" fontSize="14" fontFamily="sans-serif">N</text>
        </g>

        {/* Drone Silhouette */}
        <g transform="translate(150, 200)" className="pano-hover-drone" opacity="0.7">
          <rect x="-20" y="-5" width="40" height="10" rx="4" fill="#0f172a" />
          <circle cx="0" cy="8" r="6" fill="#1e293b" />
          <circle cx="0" cy="8" r="2" fill="#22d3ee" />
          <line x1="-25" y1="-5" x2="-35" y2="-15" stroke="#0f172a" strokeWidth="3" />
          <line x1="25" y1="-5" x2="35" y2="-15" stroke="#0f172a" strokeWidth="3" />
          <line x1="-45" y1="-15" x2="-25" y2="-15" stroke="#1e293b" strokeWidth="2" />
          <line x1="25" y1="-15" x2="45" y2="-15" stroke="#1e293b" strokeWidth="2" />
        </g>

        {/* Scanning Beam */}
        <polygon 
          points="810,400 300,900 1320,900" 
          fill="url(#pano-beam)" 
          className="pano-scan-beam"
          style={{ transformOrigin: '810px 400px' }}
        />
      </svg>

      {/* Stars */}
      {stars.map(s => (
        <div
          key={`star-${s.id}`}
          className="absolute rounded-full bg-white pano-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: '2px',
            height: '2px',
            animationDuration: '3s',
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Pulsing Location Dots */}
      {dots.map(d => (
        <div
          key={`dot-${d.id}`}
          className="absolute rounded-full bg-cyan-400 pano-pulse-dot"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: '6px',
            height: '6px',
            animationDuration: '2s',
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}

      {/* Pin Markers */}
      {markers.map(m => (
        <div
          key={`marker-${m.id}`}
          className="absolute pano-drop-marker"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            animationDelay: `${m.delay}s`,
          }}
        >
          <svg width="30" height="40" viewBox="0 0 30 40" fill="none" opacity="0.8">
            <path d="M15,0 C6.7,0 0,6.7 0,15 C0,26.2 15,40 15,40 C15,40 30,26.2 30,15 C30,6.7 23.3,0 15,0 Z" fill="#06b6d4" />
            <circle cx="15" cy="15" r="7" fill="#0f172a" />
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes pano-twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.8; }
        }
        @keyframes pano-pulse-dot {
          0% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.7); }
          70% { transform: scale(1.5); opacity: 0; box-shadow: 0 0 0 10px rgba(34, 211, 238, 0); }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes pano-aurora-wave {
          0%, 100% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(-50px) scaleY(1.2); }
        }
        .pano-aurora path {
          animation: pano-aurora-wave 15s ease-in-out infinite alternate;
        }
        @keyframes pano-scan {
          0%, 100% { transform: rotate(-30deg); }
          50% { transform: rotate(30deg); }
        }
        .pano-scan-beam {
          animation: pano-scan 8s ease-in-out infinite;
        }
        @keyframes pano-hover {
          0%, 100% { transform: translate(150px, 200px) rotate(0deg); }
          25% { transform: translate(160px, 190px) rotate(2deg); }
          75% { transform: translate(140px, 210px) rotate(-2deg); }
        }
        .pano-hover-drone {
          animation: pano-hover 6s ease-in-out infinite;
        }
        @keyframes pano-drop-bounce {
          0% { transform: translateY(-100px); opacity: 0; }
          60% { transform: translateY(10px); opacity: 1; }
          80% { transform: translateY(-5px); }
          100% { transform: translateY(0); opacity: 1; }
        }
        .pano-drop-marker {
          opacity: 0;
          animation: pano-drop-bounce 1s forwards;
        }
      `}</style>
    </div>
  )
}
