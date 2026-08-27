import "server-only"
import { count } from "drizzle-orm"
import { db } from "@/lib/db"
import { downloadEvents } from "@/lib/db/schema"

// Total number of download-button clicks recorded so far.
export async function getDownloadCount(): Promise<number> {
  try {
    const [row] = await db.select({ value: count() }).from(downloadEvents)
    return Number(row?.value ?? 0)
  } catch (error) {
    console.log("[v0] getDownloadCount failed:", error)
    return 0
  }
}

// Records a single download click. userId is optional — anonymous visitors can
// download too, we just won't attribute the row to anyone.
export async function recordDownload(userId: string | null): Promise<number> {
  try {
    await db.insert(downloadEvents).values({ platform: "windows", userId })
  } catch (error) {
    console.log("[v0] recordDownload failed:", error)
  }
  return getDownloadCount()
}
