import Image from "next/image"
import Link from "next/link"
import { Download, MessageSquareText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection({ downloadUrl }: { downloadUrl: string }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 sm:p-12">
      {/* Signature glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-[100px]"
      />

      <div className="relative flex flex-col items-center text-center">
        <Image
          src="/nyova-icon.png"
          alt="Nyova"
          width={96}
          height={96}
          className="mb-6 h-24 w-24 rounded-2xl object-cover shadow-[0_0_35px_rgba(88,101,242,0.45)] ring-1 ring-border/60"
          priority
        />

        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          الإصدار متاح الآن
        </span>

        <h1 className="font-display text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          حمّل <span className="text-primary">Nyova</span> وابدأ دلوقتي
        </h1>

        <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          برنامج سريع، آمن، ومحدّث باستمرار. حمّل النسخة الأحدث، وشاركنا رأيك، وانضم لمجتمعنا على
          ديسكورد.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a href={downloadUrl} target={downloadUrl === "#" ? undefined : "_blank"} rel="noopener noreferrer">
            <Button size="lg" className="h-12 gap-2 bg-primary px-6 text-base hover:bg-primary/90">
              <Download className="size-5" />
              تحميل البرنامج
            </Button>
          </a>
          <Link href="/feedback">
            <Button size="lg" variant="outline" className="h-12 gap-2 px-6 text-base">
              <MessageSquareText className="size-5" />
              شوف الفيدباك
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
