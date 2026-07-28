"use client"

import { useState, useEffect, useRef, useCallback } from "react"

const gradients = [
  "linear-gradient(to right top, #f40000, #e70048, #c30070, #902986, #573b86, #3d3d7e, #263d72, #143a64, #133861, #12365d, #11355a, #103357)",
  "linear-gradient(to right top, #295174, #353f5d, #342f45, #2c212e, #1e161b, #262226, #302e31, #3b3b3b, #676767, #979797, #cacaca, #ffffff)",
  "linear-gradient(to right top, #b7bdc5, #a9b0b9, #9ca4ae, #8e97a2, #818b97, #737a86, #666a75, #585a64, #45434a, #312e31, #1c1a1b, #000000)",
]

export function AnimatedBackground() {
  const [visible, setVisible] = useState(0)
  const [prevVisible, setPrevVisible] = useState<number | null>(null)
  const idxRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const advance = useCallback(() => {
    const next = (idxRef.current + 1) % gradients.length
    setPrevVisible(idxRef.current)
    idxRef.current = next
    setVisible(next)
    timeoutRef.current = setTimeout(() => setPrevVisible(null), 2000)
  }, [])

  useEffect(() => {
    const id = setInterval(advance, 8000)
    return () => {
      clearInterval(id)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [advance])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {gradients.map((g, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-\[2000ms\] ease-in-out"
          style={{}
          style={{
            backgroundImage: g,
            opacity:
              i === visible ? 1
              : i === prevVisible ? 0
              : 0,
          }}
        />
      ))}
    </div>
  )
}
