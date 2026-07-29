import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import styles from "../styles/AnimeBackground.module.css";

/**
 * Anime-style animated layered background
 *
 * Usage:
 * - Place <AnimeBackground /> near root (layout/_app) so it appears across all pages.
 * - Swap or add SVG layers inside the component for your artwork.
 */

export default function AnimeBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  // framer motion values for subtle parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const parallaxX = useTransform(mx, (v) => `${v / 30}px`);
  const parallaxY = useTransform(my, (v) => `${v / 30}px`);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const el = containerRef.current;
    if (!el) return;

    // mouse move parallax
    function onMove(e: MouseEvent) {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX - innerWidth / 2;
      const y = e.clientY - innerHeight / 2;
      animate(mx, x, { duration: 0.6 });
      animate(my, y, { duration: 0.6 });
    }

    // small scroll parallax
    function onScroll() {
      const y = window.scrollY;
      // subtle transform mapped to motion values
      animate(my, (y - window.innerHeight / 2) / 6, { duration: 0.6 });
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isClient, mx, my]);

  return (
    <div ref={containerRef} className={styles.container} aria-hidden="true">
      {/* Sky gradient / distant glow */}
      <motion.div
        className={styles.layer}
        style={{ translateX: parallaxX, translateY: parallaxY }}
      >
        <svg className={styles.svgFull} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="gradSky" x1="0" x2="1">
              <stop offset="0%" stopColor="#2b0a64" />
              <stop offset="45%" stopColor="#5f2b9d" />
              <stop offset="100%" stopColor="#ffb07a" />
            </linearGradient>
            <linearGradient id="gradMount" x1="0" x2="1">
              <stop offset="0%" stopColor="#3f2a7a" />
              <stop offset="100%" stopColor="#ff8c5b" />
            </linearGradient>
          </defs>

          <rect width="100%" height="100%" fill="url(#gradSky)" />

          {/* big mountain shape (illustrative placeholder) */}
          <g transform="translate(300,120) scale(1.1)">
            <path d="M0,400 L220,80 L450,400 Z" fill="url(#gradMount)" className={styles.mountain} />
            <path d="M260,400 L450,120 L720,400 Z" fill="#7b4aa6" opacity="0.9" />
          </g>
        </svg>
      </motion.div>

      {/* Mid ground: water / valley */}
      <motion.div
        className={`${styles.layer} ${styles.mid}`}
        style={{ translateX: useTransform(mx, (v) => `${v / 60}px`) }}
      >
        <svg className={styles.svgFull} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <g transform="translate(0,540)">
            <path d="M0,200 Q400,120 800,200 T1600,200 L1600,600 L0,600 Z" fill="#2f1b48" opacity="0.7" />
            <path d="M0,240 Q400,160 800,240 T1600,240 L1600,600 L0,600 Z" fill="#3a1f58" opacity="0.5" />
          </g>
        </svg>
      </motion.div>

      {/* Foreground elements: grasses / character silhouette */}
      <motion.div
        className={`${styles.layer} ${styles.front}`}
        style={{
          translateX: useTransform(mx, (v) => `${v / 12}px`),
          translateY: useTransform(my, (v) => `${v / 40}px`),
        }}
      >
        <svg className={styles.svgFull} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          {/* drifting clouds (animated via CSS) */}
          <g className={styles.clouds}>
            <g className={styles.cloud} transform="translate(1100,120) scale(1.0)">
              <ellipse cx="0" cy="0" rx="110" ry="40" fill="#fff" opacity="0.9"></ellipse>
              <ellipse cx="60" cy="-10" rx="60" ry="28" fill="#fff" opacity="0.9"></ellipse>
              <ellipse cx="-60" cy="-10" rx="60" ry="28" fill="#fff" opacity="0.9"></ellipse>
            </g>
            <g className={styles.cloud} transform="translate(200,80) scale(0.9)">
              <ellipse cx="0" cy="0" rx="90" ry="34" fill="#fff" opacity="0.88"></ellipse>
              <ellipse cx="40" cy="-8" rx="48" ry="22" fill="#fff" opacity="0.88"></ellipse>
            </g>
          </g>

          {/* birds (simple shapes, anim via CSS) */}
          <g className={styles.birds} transform="translate(900,220) scale(0.9)">
            <path className={styles.bird} d="M0,0 q18,-10 36,0 q-18,-6 -36,0" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path className={styles.bird} d="M60,10 q18,-10 36,0 q-18,-6 -36,0" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* foreground grass / silhouette */}
          <g transform="translate(1100,520) scale(1)">
            <path d="M0,0 C40,-70 120,-70 200,0 L200,140 L0,140 Z" fill="#081225" opacity="0.95" />
            {/* faint character silhouette render — replace with your own SVG layer */}
            <g transform="translate(-60,-80)">
              <rect x="60" y="30" width="30" height="60" rx="8" fill="#102033" />
              <path d="M50,25 q40,-40 80,0" fill="#101424" />
            </g>
          </g>
        </svg>
      </motion.div>

      {/* subtle vignette / overlay to match anime feel */}
      <div className={styles.overlay} />
    </div>
  );
}