import Image from "next/image"
import Link from "next/link"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DiscordIcon } from "@/components/discord-icon"
import type { SessionUser } from "@/lib/session"

export function SiteHeader({ user }: { user: SessionUser | null }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/nyova-icon.png" alt="" width={32} height={32} className="h-8 w-8 rounded-lg object-cover ring-1 ring-border/60" />
          <span className="font-display text-xl font-bold tracking-tight">Nyova</span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <Link href="/feedback">
            <Button variant="ghost" size="lg" className="h-10 px-4">
              الفيدباك
            </Button>
          </Link>

          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card py-1 pr-1 pl-3">
                <Image
                  src={user.avatarUrl || "/placeholder.svg"}
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full object-cover"
                  unoptimized
                />
                <span className="max-w-28 truncate text-sm font-medium">
                  {user.globalName || user.username}
                </span>
              </div>
              <form action="/api/auth/logout" method="post">
                <Button type="submit" variant="ghost" size="icon-lg" className="h-10 w-10" aria-label="تسجيل الخروج">
                  <LogOut className="size-4" />
                </Button>
              </form>
            </div>
          ) : (
            <Link href="/api/auth/login">
              <Button size="lg" className="h-10 gap-2 bg-primary px-4 hover:bg-primary/90">
                <DiscordIcon className="size-4" />
                تسجيل الدخول
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
