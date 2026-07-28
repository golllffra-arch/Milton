"use client"

import { motion } from "framer-motion"

const PETAL_COUNT = 10

export default function Petals({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden ${className}`}
    >
      {Array.from({ length: PETAL_COUNT }).map((_: unknown, i: number) => {
        const left = (i * 97) % 100
        const delay = (i * 1.7) % 9
        const dur = 14 + ((i * 3) % 10)
        const size = 8 + ((i * 5) % 10)
        return (
          <motion.span
            key={i}
            initial={{ y: "-10%", x: 0, rotate: 0, opacity: 0 }}
            animate={{
              y: "120%",
              x: [0, 20, -10, 0],
              rotate: 360,
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: dur,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              position: "absolute",
              borderRadius: "0 60% 0 60%",
              background: "linear-gradient(135deg, var(--sakura), var(--gold))",
            }}
          />
        )
      })}
    </div>
  )
}
