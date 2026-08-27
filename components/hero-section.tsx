"use client"

import Image from "next/image"
import Link from "next/link"
import { MessageSquareText, ShieldCheck, Sparkles } from "lucide-react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"
import { useState, type PointerEvent as ReactPointerEvent } from "react"
import { DownloadButton } from "@/components/download-button"
import { useLivePresence } from "@/components/live-presence"
import { Counter } from "@/components/motion/counter"

type HeroSectionProps = {
  downloadUrl: string
  downloadAvailable: boolean
  downloadCount: number
  memberCount: number
}

const EASE = [0.22, 1, 0.36, 1] as const

export function HeroSection({
  downloadUrl,
  downloadAvailable,
  downloadCount,
  memberCount,
}: HeroSectionProps) {
  const reduce = useReducedMotion()
  const liveOnline = useLivePresence(memberCount)
  const [total, setTotal] = useState(downloadCount)

  // 3D tilt for the whole hero card, driven by pointer position.
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  const mx = useMotionValue(50)
  const my = useMotionValue(0)
  const highlight = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 68%)`

  const handleMove = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const nx = (event.clientX - rect.left) / rect.width
    const ny = (event.clientY - rect.top) / rect.height
    mx.set(nx * 100)
    my.set(ny * 100)
    if (reduce) return
    ry.set((nx - 0.5) * 7)
    rx.set((0.5 - ny) * 5)
  }

  const handleLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.section
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1400 }}
      className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-12"
    >
      {/* Pointer-reactive highlight */}
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: highlight }} />

      {/* Status-tinted bloom + top hairline */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-32 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full blur-[120px] transition-colors duration-1000 ${
          downloadAvailable ? "bg-primary/25" : "bg-destructive/20"
        }`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />

      <div className="relative flex flex-col items-center text-center">
        {/* App mark with pulsing rings */}
        <motion.div
          className="relative mb-7"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span
            aria-hidden="true"
            className="animate-ring-pulse absolute inset-0 -z-10 rounded-[1.6rem] border border-primary/40"
          />
          <span
            aria-hidden="true"
            className="animate-ring-pulse absolute inset-0 -z-10 rounded-[1.6rem] border border-accent/30"
            style={{ animationDelay: "1.5s" }}
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 rounded-[1.6rem] bg-primary/45 blur-2xl" />
          <div className="animate-float">
            <Image
              src="/nyova-icon.png"
              alt="Nyova"
              width={104}
              height={104}
              className="h-24 w-24 rounded-[1.6rem] object-cover ring-1 ring-border sm:h-26 sm:w-26"
              priority
            />
          </div>
        </motion.div>

        {/* Live status pill */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            {downloadAvailable && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            )}
            <span
              className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                downloadAvailable ? "bg-accent" : "bg-destructive"
              }`}
            />
          </span>
          {downloadAvailable ? "Latest version available" : "Update in progress"}
          <span aria-hidden="true" className="h-3 w-px bg-border" />
          <span className="tabular-nums text-foreground">
            <Counter value={liveOnline} /> online
          </span>
        </motion.span>

        {/* Headline, revealed word by word */}
        <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-6xl">
          {["Get", "Nyova", "and", "start", "right", "now"].map((word, i) => (
            <motion.span
              key={word + i}
              className={`mr-[0.28em] inline-block ${word === "Nyova" ? "text-gradient" : ""}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22, filter: "blur(8px)" }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: EASE }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground"
        >
          A fast, secure app that stays up to date on its own. Grab the latest build, tell us what
          you think, and hang out with the community on Discord.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.68, ease: EASE }}
          className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
        >
          <DownloadButton
            downloadUrl={downloadUrl}
            downloadAvailable={downloadAvailable}
            initialCount={total}
            onCounted={setTotal}
          />
          <Link
            href="/feedback"
            className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-border bg-card/50 px-7 font-display text-base font-semibold tracking-tight backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card"
          >
            <MessageSquareText className="size-5 transition-transform duration-300 group-hover:-rotate-6" />
            See feedback
          </Link>
        </motion.div>

        {/* Live download tally + trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-7 flex flex-col items-center gap-3 text-xs text-muted-foreground sm:flex-row sm:gap-5"
        >
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-primary" />
            <strong className="font-semibold tabular-nums text-foreground">
              <Counter value={total} />
            </strong>
            downloads so far
          </span>
          <span aria-hidden="true" className="hidden h-3 w-px bg-border sm:block" />
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-accent" />
            Signed build, no bundled extras
          </span>
        </motion.div>
      </div>
    </motion.section>
  )
}
