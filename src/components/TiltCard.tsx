"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function TiltCard({
  children,
  className = "",
  glare = true,
  maxTilt = 10,
}: {
  children: React.ReactNode
  className?: string
  glare?: boolean
  maxTilt?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 200,
    damping: 20,
  })
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"])
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"])

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className={`relative ${className}`}
    >
      {children}
      {glare && !reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.35), transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  )
}
