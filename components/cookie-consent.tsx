"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const CONSENT_KEY = "nyova-cookie-consent"

type Consent = "granted" | "denied"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function updateConsent(consent: Consent) {
  window.gtag?.("consent", "update", {
    ad_storage: consent,
    ad_user_data: consent,
    ad_personalization: consent,
    analytics_storage: consent,
  })
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY) as Consent | null
    if (saved === "granted" || saved === "denied") {
      updateConsent(saved)
      return
    }
    // No choice recorded yet — show the banner. Consent Mode already
    // defaults to "denied" via the inline script in layout.tsx, so ads
    // stay non-personalized until the visitor makes a choice.
    setVisible(true)
  }, [])

  function choose(consent: Consent) {
    localStorage.setItem(CONSENT_KEY, consent)
    updateConsent(consent)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm leading-6 text-muted-foreground">
          We use essential cookies to keep you signed in, and Google AdSense may use cookies to show
          ads. You can accept or decline non-essential cookies. See our{" "}
          <Link href="/policy" className="text-primary underline underline-offset-4">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => choose("denied")}
            className="rounded-full border border-border/60 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Decline
          </button>
          <button
            onClick={() => choose("granted")}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
