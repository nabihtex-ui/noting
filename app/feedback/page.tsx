import { SiteHeader } from "@/components/site-header"
import { DiscordSidebar } from "@/components/discord-sidebar"
import { FeedbackList } from "@/components/feedback-list"
import { FeedbackForm } from "@/components/feedback-form"
import { getCurrentUser } from "@/lib/auth"
import { getWidget, getFeedback } from "@/lib/discord"

export const dynamic = "force-dynamic"

export default async function FeedbackPage() {
  const [user, widget, feedback] = await Promise.all([getCurrentUser(), getWidget(), getFeedback()])

  return (
    <div className="min-h-screen">
      <SiteHeader user={user} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-8">
            <header className="flex flex-col gap-2">
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">الفيدباك</h1>
              <p className="text-muted-foreground">
                كل الآراء المكتوبة في روم الديسكورد بتظهر هنا مباشرة. اكتب رأيك وهيتنشر في السيرفر.
              </p>
            </header>

            <FeedbackForm user={user} />
            <FeedbackList items={feedback.items} error={feedback.error} />
          </div>
          <DiscordSidebar widget={widget} />
        </div>
      </main>
    </div>
  )
}
