import "server-only"
import { sql } from "drizzle-orm"
import { db } from "@/lib/db"

const ACTIVE_WINDOW_SECONDS = 60

export async function heartbeat(visitorId: string) {
  await db.execute(sql`INSERT INTO site_visitors (id, last_seen) VALUES (${visitorId}, NOW()) ON CONFLICT (id) DO UPDATE SET last_seen = NOW()`)
}

export async function getOnlineCount() {
  const result = await db.execute(sql`SELECT COUNT(*)::int AS count FROM site_visitors WHERE last_seen > NOW() - INTERVAL '${sql.raw(String(ACTIVE_WINDOW_SECONDS))} seconds'`)
  return Number(result.rows[0]?.count ?? 0)
}

export async function removeVisitor(visitorId: string) {
  await db.execute(sql`DELETE FROM site_visitors WHERE id = ${visitorId}`)
}
