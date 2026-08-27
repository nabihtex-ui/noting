"use client"

import { useState, type ReactNode } from "react"
import { Languages } from "lucide-react"

export type LegalSection = {
  id: string
  title: string
  body: ReactNode
}

export function BilingualLegalPage({
  titleEn,
  titleAr,
  introEn,
  introAr,
  lastUpdated,
  sectionsEn,
  sectionsAr,
}: {
  titleEn: string
  titleAr: string
  introEn?: ReactNode
  introAr?: ReactNode
  lastUpdated: string
  sectionsEn: LegalSection[]
  sectionsAr: LegalSection[]
}) {
  const [lang, setLang] = useState<"en" | "ar">("en")
  const isAr = lang === "ar"

  const title = isAr ? titleAr : titleEn
  const intro = isAr ? introAr : introEn
  const sections = isAr ? sectionsAr : sectionsEn
  const lastUpdatedLabel = isAr ? "آخر تحديث" : "Last updated"

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14" dir={isAr ? "rtl" : "ltr"}>
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setLang(isAr ? "en" : "ar")}
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <Languages className="size-3.5" />
          {isAr ? "English" : "العربية"}
        </button>
      </div>

      <header className="mb-10 flex flex-col gap-3 border-b border-border pb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <p className="text-sm text-muted-foreground">
          {lastUpdatedLabel}: {lastUpdated}
        </p>
        {intro && <p className="text-base leading-8 text-muted-foreground">{intro}</p>}
      </header>

      <nav className="mb-10 flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-4">
        {sections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-border/60 bg-secondary px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {i + 1}. {s.title}
          </a>
        ))}
      </nav>

      <div className="flex flex-col gap-10">
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <h2 className="mb-3 font-display text-xl font-bold tracking-tight sm:text-2xl">
              {i + 1}. {s.title}
            </h2>
            <div
              className={`flex flex-col gap-3 text-[15px] leading-8 text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 ${
                isAr ? "[&_li]:mr-5" : "[&_li]:ml-5"
              }`}
            >
              {s.body}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
