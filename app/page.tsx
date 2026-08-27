import Link from "next/link"
import { headers } from "next/headers"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { DiscordSidebar } from "@/components/discord-sidebar"
import { FeedbackMarquee } from "@/components/feedback-marquee"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/auth"
import { getWidget, getFeedback } from "@/lib/discord"
import { checkDownloadAvailable } from "@/lib/download-status"
import { getDownloadCount } from "@/lib/downloads"
import { AdSlot } from "@/components/ad-slot"
import { StatsStrip } from "@/components/stats-strip"

export const dynamic = "force-dynamic"

const HOME_FEEDBACK_LIMIT = 10

// Resolves a relative download path (e.g. "/downloads/Nyova.zip") into an
// absolute URL so it can be checked server-side. Absolute URLs pass through untouched.
async function resolveDownloadUrl(raw: string): Promise<string> {
  if (!raw || raw === "#") return raw
  if (/^https?:\/\//i.test(raw)) return raw

  const h = await headers()
  const host = h.get("x-forwarded-host") ?? h.get("host")
  const proto = h.get("x-forwarded-proto") ?? "https"
  const path = raw.startsWith("/") ? raw : `/${raw}`
  return `${proto}://${host}${path}`
}

export default async function HomePage() {
  const downloadUrl = process.env.DOWNLOAD_URL || "#"
  const [user, widget, feedback, downloadAvailable, downloadCount] = await Promise.all([
    getCurrentUser(),
    getWidget(),
    getFeedback(),
    resolveDownloadUrl(downloadUrl).then(checkDownloadAvailable),
    getDownloadCount(),
  ])
  const latestFeedback = feedback.items.slice(0, HOME_FEEDBACK_LIMIT)
  const feedbackCount = feedback.items.length
  const averageRating =
    feedbackCount > 0
      ? feedback.items.reduce((sum, item) => sum + item.rating, 0) / feedbackCount
      : 0

  return (
    <div className="min-h-screen">
      <SiteHeader user={user} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <AdSlot slot="1111111111" className="mb-8" />
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-10">
            <HeroSection downloadUrl={downloadUrl} downloadAvailable={downloadAvailable} downloadCount={downloadCount} memberCount={0} />

            <StatsStrip
              downloads={downloadCount}
              feedbackCount={feedbackCount}
              averageRating={averageRating}
              membersOnline={widget?.presenceCount ?? 0}
            />

            <AdSlot slot="2222222222" />

            <section className="flex flex-col gap-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-bold tracking-tight">User feedback</h2>
                  <p className="text-sm text-muted-foreground">The latest reviews from our community</p>
                </div>
                <Link href="/feedback">
                  <Button variant="outline" size="lg" className="h-10 gap-2 px-4">
                    All feedback
                    <ArrowRight className="size-4" />
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