import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { DiscordSidebar } from "@/components/discord-sidebar"
import { getCurrentUser } from "@/lib/auth"
import { getWidget } from "@/lib/discord"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [user, widget] = await Promise.all([getCurrentUser(), getWidget()])
  const downloadUrl = process.env.DOWNLOAD_URL || "#"

  return (
    <div className="min-h-screen">
      <SiteHeader user={user} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <HeroSection downloadUrl={downloadUrl} />
          </div>
          <DiscordSidebar widget={widget} />
        </div>
      </main>
    </div>
  )
}
