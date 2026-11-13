"use client"

import type { SVGProps } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipGroup } from "@/components/ui/tooltip"

// Brand marks are separate from Lucide's interface icon set.
function Linkedin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
function Instagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Replace these placeholders with Rosanna's profiles and email address.
const socials = [
  {
    label: "LinkedIn",
    href: "https://example.com/?social=linkedin",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://example.com/?social=instagram",
    icon: Instagram,
  },
  { label: "Email", href: "mailto:rosanna@example.com", icon: Mail },
]

export function AuthorSocials() {
  return (
    <nav className="author-socials" aria-label="Social e contatti">
      <TooltipGroup>
        {socials.map(({ label, href, icon: Icon }) => (
          <Tooltip key={label} content={label}>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="social-link fluid-hit-target"
            >
              <a
                href={href}
                aria-label={label}
                target={href.startsWith("https:") ? "_blank" : undefined}
                rel={
                  href.startsWith("https:") ? "noopener noreferrer" : undefined
                }
              >
                <Icon
                  width={16}
                  height={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </a>
            </Button>
          </Tooltip>
        ))}
      </TooltipGroup>
    </nav>
  )
}
