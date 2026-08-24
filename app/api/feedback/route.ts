import { NextResponse } from "next/server"
import { getFeedback, getUserLastFeedbackAt, postFeedback } from "@/lib/discord"
import { getCurrentUser } from "@/lib/auth"

const COOLDOWN_MS = 6 * 60 * 60 * 1000 // 6 hours

export async function GET() {
  const { items, error } = await getFeedback()
  return NextResponse.json({ items, error })
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  let body: { content?: string; rating?: number }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 })
  }

  const content = (body.content ?? "").trim()
  const rating = Number(body.rating)

  if (content.length < 3 || content.length > 500) {
    return NextResponse.json({ error: "invalid_content" }, { status: 400 })
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "invalid_rating" }, { status: 400 })
  }

  const lastAt = await getUserLastFeedbackAt(user.id)
  if (lastAt) {
    const remainingMs = COOLDOWN_MS - (Date.now() - lastAt)
    if (remainingMs > 0) {
      return NextResponse.json(
        { error: "cooldown", remainingSeconds: Math.ceil(remainingMs / 1000) },
        { status: 429 },
      )
    }
  }

  const ok = await postFeedback({
    name: user.globalName || user.username,
    avatarUrl: user.avatarUrl,
    content,
    rating,
    userId: user.id,
  })

  if (!ok) {
    return NextResponse.json({ error: "webhook_failed" }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
