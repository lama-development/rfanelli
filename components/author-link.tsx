"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { hitTargetClass } from "@/lib/site-styles"
import { cn } from "@/lib/utils"

// Construct the slotted link inside the client boundary so Button always
// receives an element, including when the server streams its children.
export function AuthorLink({
  href,
  children,
  external = false,
  icon,
  variant = "ghost",
  className,
}: {
  href: string
  children: ReactNode
  external?: boolean
  icon?: "back" | "next" | "out" | "external"
  variant?: "ghost" | "primary" | "secondary"
  className?: string
}) {
  return (
    <Button
      variant={variant}
      leadingIcon={icon === "back" ? ArrowLeft : undefined}
      trailingIcon={
        icon === "next"
          ? ArrowRight
          : icon === "external"
            ? ExternalLink
            : icon === "out"
              ? ArrowUpRight
              : undefined
      }
      asChild
      className={cn(hitTargetClass, className)}
    >
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <Link href={href}>{children}</Link>
      )}
    </Button>
  )
}
