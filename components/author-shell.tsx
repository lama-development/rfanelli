import Link from "next/link"
import { AuthorLink } from "@/components/author-link"
import { AuthorTheme } from "@/components/author-theme"
import { AuthorSocials } from "@/components/author-socials"
import { CopyrightYear } from "@/components/copyright-year"
import { Prose } from "@/components/prose"
import { typeClass } from "@/lib/type-scale"
import { author, navigation } from "@/i18n/it"
import { intlLocale, timeZone } from "@/i18n/config"
import { LocalizedText } from "@/components/localized-text"
export function AuthorHeader() {
  return (
    <>
      <a
        href="#contenuto"
        className="fixed -top-25 left-4 z-100 rounded-(--shape-input-radius,8px) bg-foreground px-4 py-2.5 text-background focus:top-4"
      >
        {navigation.skipToContent}
      </a>
      <header className="flex min-h-26 items-center justify-between gap-4 border-b border-border mobile:min-h-20.5 mobile:gap-2">
        <AuthorLink
          href="/"
          className={`${typeClass("subtitle")} -mx-3 px-3 font-serif text-foreground mobile:-mx-2 mobile:px-2 mobile:text-[20px]`}
        >
          {author.name}
        </AuthorLink>
        <nav
          className="flex gap-1 mobile:gap-0 mobile:[&_a]:px-2.5"
          aria-label={navigation.mainLabel}
        >
          <AuthorLink href="/libri">{navigation.books}</AuthorLink>
          <AuthorLink href="/#autrice">{navigation.about}</AuthorLink>
        </nav>
      </header>
    </>
  )
}
export function AuthorFooter() {
  const initialYear = Number(
    new Intl.DateTimeFormat(intlLocale, {
      year: "numeric",
      timeZone,
    }).format(new Date())
  )
  return (
    <footer className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-t border-border pt-5.5 pb-7 text-caption text-muted-foreground mobile:grid-cols-[minmax(0,1fr)] mobile:justify-items-center mobile:pt-7 mobile:pb-8 mobile:text-center">
      <Prose as="span" className={typeClass("caption")}>
        <LocalizedText
          message={navigation.copyright}
          values={{
            year: <CopyrightYear initialYear={initialYear} />,
            author: <Link href="/">{author.name}</Link>,
          }}
        />
      </Prose>
      <AuthorSocials />
      <AuthorTheme />
    </footer>
  )
}
