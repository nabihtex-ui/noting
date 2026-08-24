"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Send, Loader2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/star-rating"
import { DiscordIcon } from "@/components/discord-icon"
import type { SessionUser } from "@/lib/session"

function formatCountdown(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = Math.floor(totalSeconds % 60)
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":")
}

export function FeedbackForm({
  user,
  cooldownRemainingSeconds = 0,
}: {
  user: SessionUser | null
  cooldownRemainingSeconds?: number
}) {
  const router = useRouter()
  const [content, setContent] = useState("")
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cooldown, setCooldown] = useState(cooldownRemainingSeconds)

  useEffect(() => {
    setCooldown(cooldownRemainingSeconds)
  }, [cooldownRemainingSeconds])

  useEffect(() => {
    if (cooldown <= 0) return
    const interval = setInterval(() => {
      setCooldown((c) => (c > 0 ? c - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [cooldown > 0])

  if (!user) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/20 blur-[80px]"
        />
        <div className="relative flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">سجّل الدخول بالديسكورد عشان تقدر تكتب فيدباك.</p>
          <Link href="/api/auth/login">
            <Button size="lg" className="h-11 gap-2 bg-primary px-5 hover:bg-primary/90">
              <DiscordIcon className="size-4" />
              تسجيل الدخول بالديسكورد
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (content.trim().length < 3) {
      setError("اكتب رأيك أولًا (3 أحرف على الأقل).")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim(), rating }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        if (data.error === "cooldown" && typeof data.remainingSeconds === "number") {
          setCooldown(data.remainingSeconds)
        } else {
          setError(data.error === "webhook_failed" ? "فشل إرسال الفيدباك للديسكورد." : "حصل خطأ، حاول تاني.")
        }
        return
      }
      setContent("")
      setRating(5)
      router.refresh()
    } catch {
      setError("حصل خطأ في الاتصال، حاول تاني.")
    } finally {
      setLoading(false)
    }
  }

  if (cooldown > 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/15 blur-[80px]"
        />
        <div className="relative flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Clock className="size-6" />
          </div>
          <p className="text-sm font-semibold">شكرًا لرأيك الأخير!</p>
          <p className="text-sm text-muted-foreground">تقدر تكتب فيدباك جديد بعد</p>
          <p className="font-display text-2xl font-bold tracking-wide text-primary tabular-nums">
            {formatCountdown(cooldown)}
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 sm:p-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 right-0 h-40 w-40 rounded-full bg-primary/15 blur-[70px]"
      />

      <div className="relative flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">شاركنا رأيك</p>
          <StarRating value={rating} onChange={setRating} size={20} />
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={500}
          rows={4}
          placeholder="اكتب فيدباك عن البرنامج..."
          className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-3 focus:ring-ring/40"
        />

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">{content.length}/500</span>
          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="h-11 gap-2 bg-primary px-5 hover:bg-primary/90"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            إرسال الفيدباك
          </Button>
        </div>
      </div>
    </form>
  )
}
