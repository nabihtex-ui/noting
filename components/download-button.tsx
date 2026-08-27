"use client"

import { Check, Download } from "lucide-react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"

type DownloadButtonProps = {
  downloadUrl: string
  downloadAvailable: boolean
  initialCount: number
  onCounted?: (total: number) => void
}

// The page's signature control: magnetic pull toward the cursor, a sweeping
// shine, and a click that records the download in the database before the
// browser starts the file transfer.
export function DownloadButton({
  downloadUrl,
  downloadAvailable,
  initialCount,
  onCounted,
}: DownloadButtonProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const [justClicked, setJustClicked] = useState(false)

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const x = useSpring(px, { stiffness: 260, damping: 22 })
  const y = useSpring(py, { stiffness: 260, damping: 22 })
  const glowX = useTransform(x, (v) => `calc(50% + ${v * 3}px)`)

  const handleMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set(((event.clientX - rect.left) / rect.width - 0.5) * 14)
    py.set(((event.clientY - rect.top) / rect.height - 0.5) * 10)
  }

  const handleLeave = () => {
    px.set(0)
    py.set(0)
  }

  const handleClick = useCallback(() => {
    if (!downloadAvailable) return
    setJustClicked(true)
    window.setTimeout(() => setJustClicked(false), 1800)
    // Fire-and-forget: the file download must not wait on our counter.
    fetch("/api/downloads", { method: "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.total === "number") onCounted?.(data.total)
      })
      .catch((error) => console.log("[v0] download count failed:", error))
  }, [downloadAvailable, onCounted])

  return (
    <motion.a
      ref={ref}
      href={downloadAvailable ? downloadUrl : undefined}
      download={downloadAvailable ? "Nyova.zip" : undefined}
      target={downloadUrl === "#" ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-disabled={!downloadAvailable}
      title={downloadAvailable ? undefined : "The file isn't uploaded yet"}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onClick={handleClick}
      style={reduce ? undefined : { x, y }}
      whileTap={reduce || !downloadAvailable ? undefined : { scale: 0.97 }}
      className={`group relative inline-flex h-14 items-center justify-center gap-2.5 overflow-hidden rounded-full px-8 font-display text-base font-semibold tracking-tight transition-shadow duration-300 ${
        downloadAvailable
          ? "bg-primary text-primary-foreground shadow-[0_10px_40px_-12px_color-mix(in_oklab,var(--primary)_90%,transparent)] hover:shadow-[0_18px_55px_-12px_color-mix(in_oklab,var(--primary)_100%,transparent)]"
          : "pointer-events-none cursor-not-allowed bg-muted text-muted-foreground opacity-60"
      }`}
    >
      {/* Sweeping shine, only while the button is live */}
      {downloadAvailable && (
        <span
          aria-hidden="true"
          className="animate-shine absolute inset-y-0 -left-1/2 w-1/3 bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,white_35%,transparent),transparent)]"
        />
      )}
      {/* Cursor-tracking inner glow */}
      {downloadAvailable && !reduce && (
        <motion.span
          aria-hidden="true"
          style={{ left: glowX }}
          className="absolute top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color-mix(in_oklab,white_28%,transparent)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        />
      )}

      <span className="relative flex items-center gap-2.5">
        {justClicked ? (
          <Check className="size-5" />
        ) : (
          <Download className="size-5 transition-transform duration-300 group-hover:translate-y-0.5" />
        )}
        {justClicked ? "Downloading" : "Download for Windows"}
      </span>
    </motion.a>
  )
}
