import "server-only"

const API = "https://discord.com/api/v10"

export function getAvatarUrl(id: string, avatar: string | null): string {
  if (!avatar) {
    // Default avatar based on the new username system.
    const index = (BigInt(id) >> BigInt(22)) % BigInt(6)
    return `https://cdn.discordapp.com/embed/avatars/${index}.png`
  }
  const ext = avatar.startsWith("a_") ? "gif" : "png"
  return `https://cdn.discordapp.com/avatars/${id}/${avatar}.${ext}?size=128`
}

export type FeedbackItem = {
  id: string
  name: string
  avatarUrl: string
  content: string
  rating: number
  timestamp: string
}

export type WidgetMember = {
  id: string
  username: string
  status: string
  avatarUrl: string | null
  activity: string | null
}

export type WidgetData = {
  name: string
  instantInvite: string | null
  presenceCount: number
  members: WidgetMember[]
}

export type FeedbackError = "config" | "no_access" | "unknown"

export type FeedbackResult = {
  items: FeedbackItem[]
  error: FeedbackError | null
}

async function fetchRawMessages(): Promise<{ messages: any[] | null; error: FeedbackError | null }> {
  const token = process.env.DISCORD_BOT_TOKEN
  const channelId = process.env.DISCORD_FEEDBACK_CHANNEL_ID
  if (!token || !channelId) return { messages: null, error: "config" }

  const res = await fetch(`${API}/channels/${channelId}/messages?limit=100`, {
    headers: { Authorization: `Bot ${token}` },
    cache: "no-store",
  })

  if (!res.ok) {
    console.log("[v0] fetchRawMessages failed:", res.status, await res.text())
    const error: FeedbackError = res.status === 403 || res.status === 401 ? "no_access" : "unknown"
    return { messages: null, error }
  }

  return { messages: await res.json(), error: null }
}

// Reads feedback messages posted by our webhook from the configured channel.
// Only messages that carry the hidden "uid:" marker (added automatically
// when someone submits feedback through the site) are shown — anything
// posted straight into the Discord channel by hand is ignored. Per user,
// only the most recent submission is kept, so one person can't fill up
// the list with duplicate cards.
export async function getFeedback(): Promise<FeedbackResult> {
  const { messages, error } = await fetchRawMessages()
  if (!messages) return { items: [], error }

  const seenUserIds = new Set<string>()
  const items: FeedbackItem[] = []

  for (const msg of messages) {
    const embed = Array.isArray(msg.embeds) ? msg.embeds[0] : undefined
    if (!embed || !embed.description) continue

    const footerText: string | undefined = embed.footer?.text
    const uidMatch = footerText?.match(/uid:(\d+)$/)
    if (!uidMatch) continue // not posted through the site's feedback form

    // Messages come back newest-first, so the first time we see a user's id
    // is their latest feedback; skip any older ones from the same person.
    const dedupeKey = uidMatch[1]
    if (seenUserIds.has(dedupeKey)) continue
    seenUserIds.add(dedupeKey)

    const name = embed.author?.name ?? msg.author?.username ?? "Anonymous"
    const avatarUrl =
      embed.author?.icon_url ??
      (msg.author?.avatar ? getAvatarUrl(msg.author.id, msg.author.avatar) : "")

    const ratingField = Array.isArray(embed.fields)
      ? embed.fields.find((f: any) => typeof f.value === "string" && f.value.includes("★"))
      : undefined
    const rating = ratingField ? (ratingField.value.match(/★/g) || []).length : 5

    items.push({
      id: msg.id,
      name,
      avatarUrl,
      content: embed.description,
      rating,
      timestamp: msg.timestamp,
    })
  }

  return { items, error: null }
}

// Looks through the recent feedback messages for the last one posted by this
// Discord user (matched via a hidden marker in the embed footer), used to
// enforce the submission cooldown without needing a database.
export async function getUserLastFeedbackAt(userId: string): Promise<number | null> {
  const { messages } = await fetchRawMessages()
  if (!messages) return null

  let latest: number | null = null
  for (const msg of messages) {
    const embed = Array.isArray(msg.embeds) ? msg.embeds[0] : undefined
    const footerText: string | undefined = embed?.footer?.text
    if (!footerText || !footerText.endsWith(`uid:${userId}`)) continue
    const ts = new Date(msg.timestamp).getTime()
    if (Number.isFinite(ts) && (latest === null || ts > latest)) latest = ts
  }
  return latest
}

// Posts a feedback message via the configured webhook.
export async function postFeedback(params: {
  name: string
  avatarUrl: string
  content: string
  rating: number
  userId: string
}): Promise<boolean> {
  const webhook = process.env.DISCORD_WEBHOOK_URL
  if (!webhook) return false

  const stars = "★".repeat(params.rating) + "☆".repeat(5 - params.rating)

  const body = {
    username: params.name,
    avatar_url: params.avatarUrl,
    embeds: [
      {
        author: { name: params.name, icon_url: params.avatarUrl },
        description: params.content,
        color: 0x3b82f6,
        fields: [{ name: "Rating", value: stars, inline: true }],
        footer: { text: `Nyova • uid:${params.userId}` },
        timestamp: new Date().toISOString(),
      },
    ],
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    console.log("[v0] postFeedback failed:", res.status, await res.text())
    return false
  }
  return true
}

// Fetches the guild widget (online members + invite link).
export async function getWidget(): Promise<WidgetData | null> {
  const guildId = process.env.DISCORD_GUILD_ID
  if (!guildId) return null

  const res = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`, {
    cache: "no-store",
  })

  if (!res.ok) {
    console.log("[v0] getWidget failed:", res.status)
    return null
  }

  const data = await res.json()
  const members: WidgetMember[] = (data.members || []).map((m: any) => ({
    id: m.id,
    username: m.username,
    status: m.status,
    avatarUrl: m.avatar_url ?? null,
    activity: m.game?.name ?? null,
  }))

  return {
    name: data.name,
    instantInvite: data.instant_invite ?? null,
    presenceCount: data.presence_count ?? members.length,
    members,
  }
}
