"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  value: number
  onChange?: (value: number) => void
  size?: number
  className?: string
}

export function StarRating({ value, onChange, size = 16, className }: Props) {
  const [hover, setHover] = useState(0)
  const interactive = typeof onChange === "function"
  const active = hover || value

  return (
    <div className={cn("flex items-center gap-1", className)} role={interactive ? "radiogroup" : undefined}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= active
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            aria-label={`${star} of 5`}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => interactive && setHover(star)}
            onMouseLeave={() => interactive && setHover(0)}
            className={cn(
              "transition-transform",
              interactive && "cursor-pointer hover:scale-110",
              !interactive && "cursor-default",
            )}
          >
            <Star
              style={{ width: size, height: size }}
              className={cn(
                "transition-colors",
                filled ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-muted-foreground/40",
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
