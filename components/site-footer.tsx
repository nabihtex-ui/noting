import Image from "next/image"
import Link from "next/link"
import { DiscordIcon } from "@/components/discord-icon"

export function SiteFooter({ inviteUrl }: { inviteUrl: string | null }) {
  return (
    <footer className="relative mt-16 border-t border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/nyova-icon.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-xl object-cover ring-1 ring-border"
          />
          <div className="flex flex-col">
            <span className="font-display text-base font-bold tracking-tight">Nyova</span>
            <span className="text-xs text-muted-foreground">
              Built with the community, one release at a time.
            </span>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/feedback"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Feedback
          </Link>
          <Link
            href="/policy"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            سياسة الخصوصية
          </Link>
          <Link
            href="/tos"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            شروط الاستخدام
          </Link>
          {inviteUrl && (
            <a
              href={inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <DiscordIcon className="size-4" />
              Discord
            </a>
          )}
        </nav>

        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Nyova. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
