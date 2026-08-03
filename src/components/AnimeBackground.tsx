"use client"

import React from 'react';
import { usePathname } from "next/navigation"

const PROGRAM_PAGES = ["/programs/bca", "/programs/bbm", "/programs/bbs", "/programs/basw"]

const AnimeBackground: React.FC = () => {
  const pathname = usePathname()
  if (PROGRAM_PAGES.includes(pathname)) return null

  return (
    <div className="anime-bg-outer" aria-hidden>
      <div className="anime-layer gradient"></div>

      <div className="anime-layer mountains">
        <svg viewBox="0 0 1200 420" preserveAspectRatio="none" className="mountain-svg">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#e8b4ac" />
              <stop offset="100%" stopColor="#1b3f63" />
            </linearGradient>
          </defs>
          <path d="M0,300 C150,200 350,380 600,320 C850,260 1050,330 1200,280 L1200 420 L0 420 Z" fill="url(#g1)" className="mountain-fill" />
        </svg>
      </div>

      <div className="anime-layer clouds">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>

      <div className="anime-layer sun">
        <div className="sun-core" />
      </div>

      <div className="anime-layer foreground-grass">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="grass-svg">
          <path d="M0,60 C150,10 350,110 600,60 C850,10 1050,100 1200,60 L1200 120 L0 120 Z" fill="#1b3f63" opacity="0.9" />
        </svg>
      </div>

      <div className="anime-layer petals" aria-hidden>
        {Array.from({ length: 12 }).map((_: unknown, i) => (
          <span key={i} className={`petal petal-${(i % 6) + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default AnimeBackground;
