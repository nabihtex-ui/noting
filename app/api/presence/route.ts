import { NextResponse } from "next/server"
import { getOnlineCount, heartbeat, removeVisitor } from "@/lib/presence"

export const dynamic = "force-dynamic"

export async function GET() {
  return NextResponse.json({ online: await getOnlineCount() }, { headers: { "cache-control": "no-store" } })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body || typeof body.visitorId !== "string" || body.visitorId.length < 16 || body.visitorId.length > 80) {
    return NextResponse.json({ error: "Invalid visitor id" }, { status: 400 })
  }
  await heartbeat(body.visitorId)
  return NextResponse.json({ online: await getOnlineCount() }, { headers: { "cache-control": "no-store" } })
}

export async function DELETE(request: Request) {
  const body = await request.json().catch(() => null)
  if (body?.visitorId) await removeVisitor(String(body.visitorId))
  return NextResponse.json({ ok: true })
}
