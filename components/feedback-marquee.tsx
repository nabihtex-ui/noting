import { MessageSquareHeart } from "lucide-react"
import { StarRating } from "@/components/star-rating"
import { timeAgo } from "@/lib/time"
import type { FeedbackItem } from "@/lib/discord"

function MarqueeCard({ item }: { item: FeedbackItem }) {
  return (
    <div className="flex w-72 shrink-0 flex-col gap-2.5 rounded-2xl border border-border/60 bg-card p-4 sm:w-80">
      <div className="flex items-center gap-2.5">
        {item.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.avatarUrl || "/placeholder.svg"}
            alt=""
            className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-border/60"
          />
        ) : (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary ring-2 ring-border/60">
            {item.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{item.name}</p>
          <StarRating value={item.rating} size={11} />
        </div>
        <span className="shrink-0 text-[11px] text-muted-foreground">{timeAgo(item.timestamp)}</span>
      </div>
      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground text-pretty">{item.content}</p>
    </div>
  )
}

function buildTrack(items: FeedbackItem[]): FeedbackItem[] {
  // With very few items, repeat the block enough times so the row still
  // feels full and the seamless-loop duplication doesn't look sparse.
  const MIN_VISIBLE = 6
  const repeats = Math.max(1, Math.ceil(MIN_VISIBLE / items.length))
  const block = Array.from({ length: repeats }, () => items).flat()
  return [...block, ...block]
}

function MarqueeRow({
  items,
  direction,
  durationSeconds,
}: {
  items: FeedbackItem[]
  direction: "left" | "right"
  durationSeconds: number
}) {
  const track = buildTrack(items)
  return (
    <div className="overflow-hidden">
      <div
        className={`group-hover/marquee:[animation-play-state:paused] flex w-max gap-4 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {track.map((item, i) => (
          <MarqueeCard key={`${item.id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  )
}

export function FeedbackMarquee({ items }: { items: FeedbackItem[] }) {
  if (items.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-border/60 bg-card/40 p-10 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 animate-pulse rounded-full bg-primary/10 blur-[80px]"
        />
        <div className="relative flex flex-col items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MessageSquareHeart className="size-5" />
          </div>
          <p className="text-sm text-muted-foreground">No feedback yet. Be the first to share yours!</p>
        </div>
      </div>
    )
  }

  // Split into two rows (odd/even) so both rows show a mix of reviews.
  const rowA = items.filter((_, i) => i % 2 === 0)
  const rowB = items.filter((_, i) => i % 2 === 1)

  return (
    <div className="group/marquee relative flex flex-col gap-4 py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <MarqueeRow items={rowA} direction="left" durationSeconds={Math.max(18, rowA.length * 7)} />
      {rowB.length > 0 && (
        <MarqueeRow items={rowB} direction="right" durationSeconds={Math.max(18, rowB.length * 7)} />
      )}
    </div>
  )
}
