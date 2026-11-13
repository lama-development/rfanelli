import Link from "next/link"
import { AuthorLink } from "@/components/author-link"
import { AuthorTheme } from "@/components/author-theme"
import { AuthorSocials } from "@/components/author-socials"
import { CopyrightYear } from "@/components/copyright-year"
export function AuthorHeader() {
  return (
    <>
      <a href="#contenuto" className="skip-link">
        Vai al contenuto
      </a>
      <header className="author-header">
        <AuthorLink href="/" className="author-wordmark">
          Rosanna Fanelli
        </AuthorLink>
        <nav aria-label="Navigazione principale">
          <AuthorLink href="/libri">I libri</AuthorLink>
          <AuthorLink href="/#autrice">L’autrice</AuthorLink>
        </nav>
      </header>
    </>
  )
}
export function AuthorFooter() {
  const initialYear = Number(
    new Intl.DateTimeFormat("it-IT", {
      year: "numeric",
      timeZone: "Europe/Rome",
    }).format(new Date())
  )
  return (
    <footer className="author-footer">
      <span className="typeset footer-copyright">
        © <CopyrightYear initialYear={initialYear} />{" "}
        <Link href="/">Rosanna Fanelli</Link>
      </span>
      <AuthorSocials />
      <AuthorTheme />
    </footer>
  )
}
