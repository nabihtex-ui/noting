import { bigserial, pgTable, text, timestamp } from "drizzle-orm/pg-core"

// One row per click on the download button. Counting rows gives the live
// download total shown on the landing page.
export const downloadEvents = pgTable("download_events", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  platform: text("platform").notNull().default("windows"),
  userId: text("user_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})
