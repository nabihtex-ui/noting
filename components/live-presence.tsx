"use client"

import { useEffect, useMemo } from "react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then((r) => r.json())

export function useLivePresence(initial = 0) {
  const visitorId = useMemo(() => {
    if (typeof window === "undefined") return ""
    const key = "nyova-visitor-id"
    const existing = window.sessionStorage.getItem(key)
    if (existing) return existing
    const id = `${crypto.randomUUID()}-${Date.now()}`
    window.sessionStorage.setItem(key, id)
    return id
  }, [])
  const { data, mutate } = useSWR<{ online: number }>("/api/presence", fetcher, {
    fallbackData: { online: initial },
    refreshInterval: 15000,
    revalidateOnFocus: true,
  })

  useEffect(() => {
    if (!visitorId) return
    const send = () => fetch("/api/presence", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ visitorId }) }).then(() => mutate()).catch(() => undefined)
    send()
    const timer = window.setInterval(send, 15000)
    const leave = () => { navigator.sendBeacon("/api/presence", JSON.stringify({ visitorId })) }
    window.addEventListener("pagehide", leave)
    return () => { window.clearInterval(timer); window.removeEventListener("pagehide", leave) }
  }, [visitorId, mutate])

  return data?.online ?? initial
}
