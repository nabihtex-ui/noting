import { Quote } from "lucide-react"
import { StarRating } from "@/components/star-rating"
import { timeAgo } from "@/lib/time"
import type { FeedbackError, FeedbackItem } from "@/lib/discord"

const ERROR_MESSAGES: Record<FeedbackError, string> = {
  config: "Discord isn't fully configured on the server yet (bot token or channel missing).",
  no_access: "The bot isn't in the server, or doesn't have permission to read the feedback channel.",
  unknown: "Something went wrong loading feedback right now — please try again shortly.",
}

function FeedbackCard({ item }: { item: FeedbackItem }) {
  return (
    <div className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_8px_30px_-12px_rgba(88,101,242,0.35)]">
      <Quote className="pointer-events-none absolute -right-2 -top-2 size-16 rotate-12 text-primary/[0.06] transition-colors group-hover:text-primary/10" />

      <div className="relative flex items-center gap-3">
        {item.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.avatarUrl || "/placeholder.svg"}
            alt=""
            className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-border/60"
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary ring-2 ring-border/60">
            {item.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{item.name}</p>
          <StarRating value={item.rating} size={12} />
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">{timeAgo(item.timestamp)}</span>
      </div>

      <p className="relative text-sm leading-relaxed text-muted-foreground text-pretty">{item.content}</p>
    </div>
  )
}

export function FeedbackList({
  items,
  error,
  columns = 3,
}: {
  items: FeedbackItem[]
  error?: FeedbackError | null
  columns?: 2 | 3
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/60 bg-card/40 p-10 text-center">
        <p className="text-sm text-muted-foreground">
          {error ? ERROR_MESSAGES[error] : "No feedback yet. Be the first to share yours!"}
        </p>
      </div>
    )
  }

  return (
    <div
      className={
        columns === 2
          ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
          : "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      }
    >
      {items.map((item) => (
        <FeedbackCard key={item.id} item={item} />
      ))}
    </div>
  )
}
