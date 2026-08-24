import "server-only"

// Lightweight signed-cookie session (no database).
// We sign the payload with HMAC-SHA256 using DISCORD_CLIENT_SECRET as the key,
// since a dedicated SESSION_SECRET was not provided.

export type SessionUser = {
  id: string
  username: string
  globalName: string | null
  avatar: string | null
  avatarUrl: string
}

const SECRET = process.env.DISCORD_CLIENT_SECRET ?? "nyova-fallback-secret"

const encoder = new TextEncoder()

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = ""
  for (const b of bytes) binary += String.fromCharCode(b)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function base64UrlDecode(str: string): Uint8Array {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(str.length / 4) * 4, "=")
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", encoder.encode(SECRET), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ])
}

export async function signSession(user: SessionUser): Promise<string> {
  const payload = base64UrlEncode(encoder.encode(JSON.stringify(user)))
  const key = await getKey()
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload))
  const sigStr = base64UrlEncode(new Uint8Array(sig))
  return `${payload}.${sigStr}`
}

export async function verifySession(token: string | undefined): Promise<SessionUser | null> {
  if (!token) return null
  const parts = token.split(".")
  if (parts.length !== 2) return null
  const [payload, sigStr] = parts
  try {
    const key = await getKey()
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlDecode(sigStr),
      encoder.encode(payload),
    )
    if (!valid) return null
    const json = new TextDecoder().decode(base64UrlDecode(payload))
    return JSON.parse(json) as SessionUser
  } catch {
    return null
  }
}
