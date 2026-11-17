import type { ReactNode } from "react"
import { ExternalLink } from "lucide-react"
import { inlineLinkClass } from "@/lib/site-styles"

export function InlineExternalLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={inlineLinkClass}
    >
      {children}
      {"\u00a0"}
      <ExternalLink
        className="inline-block size-[0.85em] stroke-[1.75] align-[-0.08em]"
        aria-hidden="true"
      />
    </a>
  )
}
