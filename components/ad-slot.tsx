type AdSlotProps = {
  label?: string
  className?: string
}

export function AdSlot({ label = "Advertisement", className = "" }: AdSlotProps) {
  return (
    <aside
      aria-label={label}
      className={`flex min-h-24 w-full items-center justify-center rounded-2xl border border-dashed border-border/70 bg-card/30 px-4 py-5 text-center ${className}`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/60">{label}</span>
    </aside>
  )
}
