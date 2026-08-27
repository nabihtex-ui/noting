import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDownloadCount, recordDownload } from "@/lib/downloads"

export const dynamic = "force-dynamic"

export async function GET() {
  const total = await getDownloadCount()
  return NextResponse.json({ total }, { headers: { "cache-control": "no-store" } })
}

export async function POST() {
  const user = await getCurrentUser()
  const total = await recordDownload(user?.id ?? null)
  return NextResponse.json({ total }, { headers: { "cache-control": "no-store" } })
}
