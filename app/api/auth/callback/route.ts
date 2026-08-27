import { NextResponse, type NextRequest } from "next/server"
import { getAvatarUrl } from "@/lib/discord"
import { signSession, type SessionUser } from "@/lib/session"
import { SESSION_COOKIE } from "@/lib/auth"

function getOrigin(req: NextRequest): string {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host")
  const proto = req.headers.get("x-forwarded-proto") ?? "https"
  return `${proto}://${host}`
}

export async function GET(req: NextRequest) {
  const origin = getOrigin(req)
  const code = req.nextUrl.searchParams.get("code")

  if (!code) {
    return NextResponse.redirect(`${origin}/?error=missing_code`)
  }

  const clientId = process.env.DISCORD_CLIENT_ID!
  const clientSecret = process.env.DISCORD_CLIENT_SECRET!
  const redirectUri = `${origin}/api/auth/callback`

  // Exchange the code for an access token.
  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  })

  if (!tokenRes.ok) {
    console.log("[v0] token exchange failed:", tokenRes.status, await tokenRes.text())
    return NextResponse.redirect(`${origin}/?error=token_exchange`)
  }

  const { access_token } = await tokenRes.json()

  // Fetch the user's profile.
  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${access_token}` },
  })

  if (!userRes.ok) {
    console.log("[v0] user fetch failed:", userRes.status)
    return NextResponse.redirect(`${origin}/?error=user_fetch`)
  }

  const u = await userRes.json()
  const user: SessionUser = {
    id: u.id,
    username: u.username,
    globalName: u.global_name ?? null,
    avatar: u.avatar ?? null,
    avatarUrl: getAvatarUrl(u.id, u.avatar ?? null),
  }

  const token = await signSession(user)
  const res = NextResponse.redirect(`${origin}/`)
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}
