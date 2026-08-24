import { Button } from "@/components/ui/button"
import { DiscordIcon } from "@/components/discord-icon"
import type { WidgetData, WidgetMember } from "@/lib/discord"
import { cn } from "@/lib/utils"

const STATUS_COLOR: Record<string, string> = {
  online: "bg-emerald-500",
  idle: "bg-amber-500",
  dnd: "bg-red-500",
  offline: "bg-muted-foreground/50",
}

function MemberRow({ member }: { member: WidgetMember }) {
  return (
    <div className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-sidebar-accent">
      <div className="relative shrink-0">
        {member.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.avatarUrl || "/placeholder.svg"}
            alt=""
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
            {member.username.charAt(0).toUpperCase()}
          </div>
        )}
        <span
          className={cn(
            "absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-full border-2 border-sidebar",
            STATUS_COLOR[member.status] ?? STATUS_COLOR.offline,
          )}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-sidebar-foreground">{member.username}</p>
        {member.activity && (
          <p className="truncate text-xs text-muted-foreground">{member.activity}</p>
        )}
      </div>
    </div>
  )
}

export function DiscordSidebar({ widget }: { widget: WidgetData | null }) {
  const members = widget?.members ?? []
  const online = members.filter((m) => m.status !== "offline")
  const offline = members.filter((m) => m.status === "offline")
  const inviteUrl = widget?.instantInvite ?? "https://discord.gg"

  return (
    <aside className="flex w-full flex-col gap-4 rounded-2xl border border-sidebar-border bg-sidebar p-4 lg:w-72">
      <div className="flex items-center gap-2">
        <DiscordIcon className="size-5 text-primary" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{widget?.name ?? "مجتمع Nyova"}</p>
          <p className="text-xs text-muted-foreground">{online.length} متصل الآن</p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {members.length === 0 && (
          <p className="px-2 py-4 text-center text-xs text-muted-foreground">
            لا يوجد أعضاء متصلون حاليًا، أو أن ويدجت السيرفر غير مُفعّل.
          </p>
        )}

        {online.length > 0 && (
          <>
            <p className="px-2 pt-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              متصل — {online.length}
            </p>
            {online.map((m) => (
              <MemberRow key={m.id} member={m} />
            ))}
          </>
        )}

        {offline.length > 0 && (
          <>
            <p className="px-2 pt-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              غير متصل — {offline.length}
            </p>
            {offline.map((m) => (
              <MemberRow key={m.id} member={m} />
            ))}
          </>
        )}
      </div>

      <a href={inviteUrl} target="_blank" rel="noopener noreferrer" className="mt-auto">
        <Button className="h-11 w-full gap-2 bg-primary hover:bg-primary/90">
          <DiscordIcon className="size-4" />
          انضم إلى الديسكورد
        </Button>
      </a>
    </aside>
  )
}
