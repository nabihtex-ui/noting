"use client"

import { animate, useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"

type CounterProps = {
  value: number
  /** Digits after the decimal point, e.g. 1 for an average rating. */
  decimals?: number
  suffix?: string
  className?: string
}

const formatter = (decimals: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

// Counts up from zero to `value` the first time it scrolls into view.
export function Counter({ value, decimals = 0, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, {
      duration: Math.min(2, 0.6 + Math.log10(Math.max(value, 1)) * 0.45),
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    })
    return () => controls.stop()
  }, [inView, value, reduce])

  return (
    <span ref={ref} className={className}>
      {formatter(decimals).format(display)}
      {suffix}
    </span>
  )
}
