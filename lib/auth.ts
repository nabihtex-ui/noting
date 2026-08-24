import "server-only"
import { cookies } from "next/headers"
import { verifySession, type SessionUser } from "@/lib/session"

export const SESSION_COOKIE = "nyova_session"

export async function getCurrentUser(): Promise<SessionUser | null> {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  return verifySession(token)
}
