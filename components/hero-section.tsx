import Image from "next/image"
import Link from "next/link"
import { Download, MessageSquareText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection({ downloadUrl, downloadAvailable }: { downloadUrl: string; downloadAvailable: boolean }) {
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
          <span className={`h-1.5 w-1.5 rounded-full ${downloadAvailable ? "bg-emerald-500" : "bg-red-500"}`} />
          {downloadAvailable ? "Latest version available" : "Download unavailable right now"}
        </span>

        <h1 className="font-display text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          Get <span className="text-primary">Nyova</span> and start now
        </h1>

        <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          A fast, secure app that's always up to date. Download the latest version, share your
          feedback, and join our community on Discord.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={downloadAvailable ? downloadUrl : undefined}
            target={downloadUrl === "#" ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-disabled={!downloadAvailable}
            title={downloadAvailable ? undefined : "The file isn't uploaded yet"}
          >
            <Button
              size="lg"
              disabled={!downloadAvailable}
              className="h-12 gap-2 bg-primary px-6 text-base hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
            >
              <Download className="size-5" />
              Download
            </Button>
          </a>
          <Link href="/feedback">
            <Button size="lg" variant="outline" className="h-12 gap-2 px-6 text-base">
              <MessageSquareText className="size-5" />
              See feedback
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
