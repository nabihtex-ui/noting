import type { Metadata } from "next"
import { Mail } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DiscordIcon } from "@/components/discord-icon"
import { getCurrentUser } from "@/lib/auth"
import { getWidget } from "@/lib/discord"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Contact — Nyova",
  description: "Get in touch with the Nyova team.",
}

// Edit these two if your contact details change.
const SUPPORT_EMAIL = "support@nyova.xyz"

export default async function ContactPage() {
  const [user, widget] = await Promise.all([getCurrentUser(), getWidget()])
  const inviteUrl = widget?.instantInvite ?? null

  return (
    <div className="min-h-screen">
      <SiteHeader user={user} />
      <main className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h1>
        <p className="mt-3 text-base leading-8 text-muted-foreground">
          Have a question, found a bug, or need help with your account? Reach out through either
          channel below and we'll get back to you.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <Mail className="size-5 text-primary" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{SUPPORT_EMAIL}</p>
            </div>
          </a>

          {inviteUrl && (
            <a
              href={inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <DiscordIcon className="size-5 text-primary" />
              <div>
                <p className="font-medium">Discord</p>
                <p className="text-sm text-muted-foreground">Join our server and ask in the community</p>
              </div>
            </a>
          )}
        </div>
      </main>
      <SiteFooter inviteUrl={inviteUrl} />
    </div>
  )
}
