import type { Metadata } from "next"
import { AuthorLink } from "@/components/author-link"
import { notFoundPage } from "@/i18n/it"

export const metadata: Metadata = {
  title: notFoundPage.title,
  description: notFoundPage.description,
}

export default function NotFound() {
  return (
    <main
      id="contenuto"
      className="flex min-h-svh flex-col items-center justify-center py-14 text-center"
    >
      <h1 className="max-w-[16ch] text-display tracking-[-0.04em] text-balance [--fs-display:clamp(3.5rem,8vw,7rem)] [--lh-display:1]">
        {notFoundPage.title}
      </h1>
      <p className="mt-5 max-w-[42ch] text-pretty text-muted-foreground">
        {notFoundPage.description}
      </p>
      <div className="mt-8">
        <AuthorLink href="/" variant="primary">
          {notFoundPage.home}
        </AuthorLink>
      </div>
    </main>
  )
}
