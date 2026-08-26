import { SiteHeader } from "@/components/site-header"
import { DiscordSidebar } from "@/components/discord-sidebar"
import { FeedbackList } from "@/components/feedback-list"
import { FeedbackForm } from "@/components/feedback-form"
import { getCurrentUser } from "@/lib/auth"
import { getWidget, getFeedback, getUserLastFeedbackAt } from "@/lib/discord"

export const dynamic = "force-dynamic"

const COOLDOWN_MS = 6 * 60 * 60 * 1000

export default async function FeedbackPage() {
  const [user, widget, feedback] = await Promise.all([getCurrentUser(), getWidget(), getFeedback()])

  let cooldownRemainingSeconds = 0
  if (user) {
    const lastAt = await getUserLastFeedbackAt(user.id)
    if (lastAt) {
      const remainingMs = COOLDOWN_MS - (Date.now() - lastAt)
      if (remainingMs > 0) cooldownRemainingSeconds = Math.ceil(remainingMs / 1000)
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader user={user} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-8">
            <header className="flex flex-col gap-2">
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Feedback</h1>
              <p className="text-muted-foreground">
                Everything posted in the Discord feedback channel shows up here in real time.
                Write your review and it'll be posted to the server.
              </p>
            </header>

            <FeedbackForm user={user} cooldownRemainingSeconds={cooldownRemainingSeconds} />
            <FeedbackList items={feedback.items} error={feedback.error} />
          </div>
          <DiscordSidebar widget={widget} />
        </div>
      </main>
    </div>
  )
}
