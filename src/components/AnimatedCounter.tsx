"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  duration = 1.4,
}: {
  value: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { duration, bounce: 0 })

  useEffect(() => {
    if (inView) motionVal.set(value)
  }, [inView, value, motionVal])

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString()}${suffix}`
      }
    })
    return unsub
  }, [spring, prefix, suffix])

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span
        ref={ref}
        className="font-display text-4xl font-semibold tabular-nums text-[var(--ink)] sm:text-5xl"
      >
        {prefix}0{suffix}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink)]/60">
        {label}
      </span>
    </div>
  )
}
