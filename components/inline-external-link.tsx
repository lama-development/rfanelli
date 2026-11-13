import type { ReactNode } from "react"
import { ExternalLink } from "lucide-react"

export function InlineExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-link">
      {children}{"\u00a0"}
      <ExternalLink className="inline-external-icon" aria-hidden="true" />
    </a>
  )
}
