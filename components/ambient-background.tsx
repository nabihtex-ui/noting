"use client"

import { useEffect, useRef } from "react"

// Fixed, non-interactive backdrop: two slow drifting aurora blooms, a faint
// grid, and a spotlight that follows the pointer. Everything is driven by CSS
// custom properties written on a ref so pointer movement never re-renders React.
export function AmbientBackground() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = spotlightRef.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(hover: none)").matches) return

    let frame = 0
    const onMove = (event: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        el.style.setProperty("--x", `${event.clientX}px`)
        el.style.setProperty("--y", `${event.clientY}px`)
        el.style.opacity = "1"
      })
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base wash */}
      <div className="absolute inset-0 bg-background" />

      {/* Drifting aurora blooms */}
      <div className="animate-aurora absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full bg-primary/22 blur-[140px]" />
      <div
        className="animate-aurora absolute -right-40 top-1/3 h-[32rem] w-[32rem] rounded-full bg-accent/16 blur-[130px]"
        style={{ animationDelay: "-9s", animationDuration: "32s" }}
      />
      <div
        className="animate-aurora absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-primary/12 blur-[120px]"
        style={{ animationDelay: "-17s", animationDuration: "38s" }}
      />

      {/* Fine grid, masked so it fades toward the edges */}
      <div
        className="absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(120%_90%_at_50%_0%,black,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--foreground) 5%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 5%, transparent) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
        }}
      />

      {/* Pointer spotlight */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(340px circle at var(--x, 50%) var(--y, 20%), color-mix(in oklab, var(--primary) 16%, transparent), transparent 70%)",
        }}
      />

      {/* Vignette to keep focus centred */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_35%,var(--background)_100%)]" />
    </div>
  )
}
