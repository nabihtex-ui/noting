import { StarRating } from "@/components/star-rating"
import { timeAgo } from "@/lib/time"
import type { FeedbackError, FeedbackItem } from "@/lib/discord"

const ERROR_MESSAGES: Record<FeedbackError, string> = {
  config: "لسه إعدادات ربط الديسكورد (البوت والروم) متضبطتش على السيرفر.",
  no_access: "البوت مش عضو في السيرفر أو معندوش صلاحية يشوف روم الفيدباك.",
  unknown: "حصل خطأ إحنا مش قادرين نجيب الفيدباك دلوقتي، حاول تاني كمان شوية.",
}

function FeedbackCard({ item }: { item: FeedbackItem }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/40">
      <div className="flex items-center gap-3">
        {item.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.avatarUrl || "/placeholder.svg"} alt="" className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
            {item.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{item.name}</p>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">{timeAgo(item.timestamp)}</span>
      </div>

      <StarRating value={item.rating} size={15} />

      <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{item.content}</p>
    </div>
  )
}

export function FeedbackList({
  items,
  error,
}: {
  items: FeedbackItem[]
  error?: FeedbackError | null
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/60 bg-card/40 p-10 text-center">
        <p className="text-sm text-muted-foreground">
          {error ? ERROR_MESSAGES[error] : "لسه مفيش فيدباك. كن أول واحد يشاركنا رأيه!"}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <FeedbackCard key={item.id} item={item} />
      ))}
    </div>
  )
}
