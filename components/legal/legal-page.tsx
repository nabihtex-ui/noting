import type { ReactNode } from "react"

export type LegalSection = {
  id: string
  title: string
  body: ReactNode
}

export function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string
  lastUpdated: string
  intro?: ReactNode
  sections: LegalSection[]
}) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14" dir="rtl">
      <header className="mb-10 flex flex-col gap-3 border-b border-border pb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <p className="text-sm text-muted-foreground">آخر تحديث: {lastUpdated}</p>
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
            <div className="flex flex-col gap-3 text-[15px] leading-8 text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_li]:mr-5 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2">
              {s.body}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
