import { Download, MessageSquareText, Star, Users } from "lucide-react"
import { Counter } from "@/components/motion/counter"
import { RevealGroup, RevealItem } from "@/components/motion/reveal"

type StatsStripProps = {
  downloads: number
  feedbackCount: number
  averageRating: number
  membersOnline: number
}

export function StatsStrip({
  downloads,
  feedbackCount,
  averageRating,
  membersOnline,
}: StatsStripProps) {
  const stats = [
    { icon: Download, label: "Downloads", value: downloads, decimals: 0, suffix: "" },
    { icon: MessageSquareText, label: "Reviews", value: feedbackCount, decimals: 0, suffix: "" },
    { icon: Star, label: "Average rating", value: averageRating, decimals: 1, suffix: " / 5" },
    { icon: Users, label: "Online now", value: membersOnline, decimals: 0, suffix: "" },
  ]

  return (
    <RevealGroup className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map(({ icon: Icon, label, value, decimals, suffix }) => (
        <RevealItem key={label}>
          <div className="group glass relative h-full overflow-hidden rounded-2xl p-4 transition-colors duration-300 hover:border-primary/40">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/15 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="relative flex flex-col gap-2">
              <Icon className="size-4 text-primary transition-transform duration-300 group-hover:scale-110" />
              <p className="font-display text-2xl font-bold tabular-nums tracking-tight sm:text-3xl">
                <Counter value={value} decimals={decimals} suffix={suffix} />
              </p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}
