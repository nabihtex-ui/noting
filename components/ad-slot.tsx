"use client"

import { useEffect, useRef } from "react"

type AdSlotProps = {
  slot: string
  label?: string
  className?: string
}

// Renders one Google AdSense display ad unit. `slot` is the ad-unit ID you
// get from AdSense (Ads -> By ad unit -> Display ads -> Create ad unit),
// not the client ID from the site-wide script in layout.tsx.
export function AdSlot({ slot, label = "Advertisement", className = "" }: AdSlotProps) {
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    pushed.current = true
    try {
      // @ts-expect-error injected by the AdSense script in layout.tsx
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.log("[ads] adsbygoogle push failed:", error)
    }
  }, [])

  return (
    <aside aria-label={label} className={`w-full overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1993476341545713"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  )
}