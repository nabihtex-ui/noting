import { NextResponse, type NextRequest } from "next/server"

function getOrigin(req: NextRequest): string {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host")
  const proto = req.headers.get("x-forwarded-proto") ?? "https"
  return `${proto}://${host}`
}

export async function GET(req: NextRequest) {
  const clientId = process.env.DISCORD_CLIENT_ID
  if (!clientId) {
    return NextResponse.json({ error: "Discord not configured" }, { status: 500 })
  }

  const redirectUri = `${getOrigin(req)}/api/auth/callback`
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "identify",
    prompt: "consent",
  })

  return NextResponse.redirect(`https://discord.com/oauth2/authorize?${params.toString()}`)
}
