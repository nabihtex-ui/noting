"use client"

import { Gauge, Lock, RefreshCw, Sparkles } from "lucide-react"
import { motion, useMotionTemplate, useMotionValue } from "motion/react"
import type { LucideIcon } from "lucide-react"
import type { PointerEvent as ReactPointerEvent } from "react"
import { RevealGroup, RevealItem } from "@/components/motion/reveal"

const FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Gauge,
    title: "Starts instantly",
    body: "Lightweight build that opens in under a second and stays out of your way while it runs.",
  },
  {
    icon: RefreshCw,
    title: "Updates itself",
    body: "New versions install quietly in the background, so you are always on the latest build.",
  },
  {
    icon: Lock,
    title: "Private by default",
    body: "No trackers and no bundled extras. Your data stays on your machine unless you share it.",
  },
  {
    icon: Sparkles,
    title: "Shaped by feedback",
    body: "Every review posted here lands straight in our Discord and drives what we build next.",
  },
]

// Card that lights up a soft spotlight under the cursor as it moves across it.
function FeatureCard({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${mx}px ${my}px, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)`

  const handleMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set(event.clientX - rect.left)
    my.set(event.clientY - rect.top)
  }

  return (
    <div
      onPointerMove={handleMove}
      className="group glass relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
    >
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative flex flex-col gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <Icon className="size-5" />
        </span>
        <h3 className="font-display text-lg font-bold tracking-tight">{title}</h3>
        <p className="text-sm leading-relaxed text-pretty text-muted-foreground">{body}</p>
      </div>
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section className="flex flex-col gap-6">
      <RevealGroup className="flex flex-col gap-1.5">
        <RevealItem>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Built to stay out of the way
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="text-sm text-muted-foreground">
            Four things we refuse to compromise on in every release.
          </p>
        </RevealItem>
      </RevealGroup>

      <RevealGroup className="grid gap-3 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <RevealItem key={feature.title} className="h-full">
            <FeatureCard {...feature} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
