"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Copy, X } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Tooltip } from "@/components/ui/tooltip"
import { spring } from "@/lib/springs"
import { hitTargetClass } from "@/lib/site-styles"
import { cn } from "@/lib/utils"
import { isbn as messages } from "@/i18n/it"

export function IsbnCopy({ isbn }: { isbn: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")
  const [tooltipOpen, setTooltipOpen] = useState<boolean | undefined>()
  const visible = useRef(false)
  const visibleOnPress = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const label =
    status === "copied"
      ? messages.copied
      : status === "error"
        ? messages.error
        : messages.copy

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  async function copy() {
    const wasVisible = visibleOnPress.current
    let result: "copied" | "error" = "copied"
    try {
      await navigator.clipboard.writeText(isbn.replace(/[-\s]/g, ""))
    } catch {
      result = "error"
    }
    setStatus(result)
    setTooltipOpen(wasVisible)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setStatus("idle")
      setTooltipOpen(false)
    }, 2000)
  }

  return (
    <span className="flex h-(--lh-caption) items-center gap-1">
      <span>{isbn}</span>
      <Tooltip
        content={label}
        forceOpen={tooltipOpen}
        onOpenChange={(open) => {
          visible.current = open
        }}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon-compact"
          className={cn(hitTargetClass, "shrink-0")}
          aria-label={messages.copy}
          onPointerDown={() => {
            visibleOnPress.current = visible.current
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ")
              visibleOnPress.current = visible.current
          }}
          onClick={copy}
          onPointerEnter={() => setTooltipOpen(undefined)}
          onPointerLeave={() => setTooltipOpen(false)}
          onFocus={() => setTooltipOpen(undefined)}
          onBlur={() => setTooltipOpen(false)}
        >
          <span className="grid" aria-hidden="true">
            {(
              [
                ["idle", Copy],
                ["copied", Check],
                ["error", X],
              ] as const
            ).map(([state, Icon]) => (
              <motion.span
                key={state}
                className="col-start-1 row-start-1 flex"
                initial={false}
                animate={{ opacity: status === state ? 1 : 0 }}
                transition={status === state ? spring.fast : spring.fast.exit}
              >
                <Icon
                  size={14}
                  strokeWidth={1.5}
                  className="transition-[stroke-width] duration-80 group-hover:stroke-2"
                />
              </motion.span>
            ))}
          </span>
        </Button>
      </Tooltip>
      <span className="sr-only" role="status">
        {status === "idle" ? "" : label}
      </span>
    </span>
  )
}
