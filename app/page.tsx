import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { DiscordSidebar } from "@/components/discord-sidebar"
import { FeedbackMarquee } from "@/components/feedback-marquee"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/auth"
import { getWidget, getFeedback } from "@/lib/discord"

export const dynamic = "force-dynamic"

const HOME_FEEDBACK_LIMIT = 10

export default async function HomePage() {
  const [user, widget, feedback] = await Promise.all([getCurrentUser(), getWidget(), getFeedback()])
  const downloadUrl = process.env.DOWNLOAD_URL || "#"
  const latestFeedback = feedback.items.slice(0, HOME_FEEDBACK_LIMIT)

  return (
    <div className="min-h-screen">
      <SiteHeader user={user} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-10">
            <HeroSection downloadUrl={downloadUrl} />

            <section className="flex flex-col gap-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-bold tracking-tight">آراء المستخدمين</h2>
                  <p className="text-sm text-muted-foreground">أحدث الآراء اللي كتبها المجتمع عندنا</p>
                </div>
                <Link href="/feedback">
                  <Button variant="outline" size="lg" className="h-10 gap-2 px-4">
                    كل الفيدباك
                    <ArrowLeft className="size-4" />
                  </Button>
                </Link>
              </div>

              <FeedbackMarquee items={latestFeedback} />
            </section>
          </div>
          <DiscordSidebar widget={widget} />
        </div>
      </main>
    </div>
  )
}
