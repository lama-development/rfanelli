import { LocalizedText } from "@/components/localized-text"
import { author, common, home, navigation, bookContent } from "@/i18n/it"
import { formatMessage } from "@/i18n/format"
import Link from "next/link"
import { BookCover } from "@/components/book-cover"
import { AuthorLink } from "@/components/author-link"
import { InlineExternalLink } from "@/components/inline-external-link"
import { books, publishers } from "@/lib/books"
import { bookArtClass } from "@/lib/site-styles"
import { Prose } from "@/components/prose"

export default function Home() {
  return (
    <main id="contenuto">
      <section
        className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-end gap-10 pt-20 pb-22 mobile:grid-cols-1 mobile:justify-items-center mobile:gap-6 mobile:py-10 mobile:text-center"
        aria-labelledby="author-name"
      >
        <div className="relative w-fit max-w-full pe-6 mobile:pe-0">
          <svg
            className="pointer-events-none absolute -inset-e-1 -top-7 h-auto w-14 -rotate-16 text-primary mobile:-inset-e-6 mobile:-top-5 mobile:w-10"
            viewBox="0 0 80 72"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <g className="fill-current/6">
              <path d="M39 40C33 21 14 5 8 14C0 28 16 44 38 45Z" />
              <path d="M41 40C47 21 66 5 72 14C80 28 64 44 42 45Z" />
              <path d="M38 44C24 37 13 46 19 58C26 70 38 56 39 45Z" />
              <path d="M42 44C56 37 67 46 61 58C54 70 42 56 41 45Z" />
            </g>
            <path d="M40 33C38 39 38 49 40 55C42 49 42 39 40 33Z" />
            <path d="M39 34C38 29 36 26 33 25M41 34C42 29 44 26 47 25" />
            <path d="M35 39L16 21M45 39L64 21M35 47L24 56M45 47L56 56" />
          </svg>
          <h1
            id="author-name"
            className="text-display tracking-[-0.04em] [--fs-display:clamp(4rem,9vw,7rem)] [--lh-display:0.98] mobile:[--fs-display:clamp(3.5rem,16vw,5rem)]"
          >
            <span className="block">{author.givenName}</span>{" "}
            <span className="ms-[0.6em] block mobile:ms-0">
              {author.familyName}
            </span>
          </h1>
        </div>
        <div className="flex max-w-[34ch] flex-col gap-5 pb-1.25 text-pretty text-muted-foreground mobile:max-w-[30ch] mobile:gap-4 mobile:pb-0">
          <p className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] leading-tight text-foreground mobile:max-w-[22ch] mobile:self-center mobile:text-balance">
            <LocalizedText
              message={home.lead}
              values={{ break: <br className="mobile:hidden" /> }}
            />
          </p>
          <p>{home.introduction}</p>
        </div>
      </section>
      <section
        id="libri"
        className="border-t border-border pt-8 mobile:pt-6"
        aria-labelledby="books-title"
      >
        <div className="mb-6 flex items-baseline justify-between gap-5 mobile:mb-5">
          <h2 id="books-title" className="text-title">
            {navigation.books}
          </h2>
          <AuthorLink href="/libri" icon="next">
            {navigation.allBooks}
          </AuthorLink>
        </div>
        <div className="grid grid-cols-3 gap-7 tablet:gap-4.5 mobile:grid-cols-1 mobile:gap-9.5">
          {books.slice(0, 3).map((book, index) => (
            <article className="flex min-w-0 flex-col" key={book.slug}>
              <Link
                href={`/libri/${book.slug}`}
                className={bookArtClass(index)}
                aria-label={formatMessage(common.discoverTitle, {
                  title: book.title,
                })}
              >
                <BookCover book={book} highPriority={index === 0} />
              </Link>
              <div className="flex flex-1 flex-col items-start pt-6">
                <h3 className="text-subtitle">
                  <Link href={`/libri/${book.slug}`}>{book.title}</Link>
                </h3>
                <p className="mt-3 w-full flex-1 text-body leading-[1.6] text-muted-foreground">
                  {book.cardDescription}
                </p>
                <AuthorLink
                  href={`/libri/${book.slug}`}
                  variant="primary"
                  className="mt-5"
                >
                  {common.discoverBook}
                </AuthorLink>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section
        id="autrice"
        className="mt-19 grid grid-cols-2 gap-10 border-t border-border pt-14 pb-18 mobile:mt-13 mobile:grid-cols-1 mobile:gap-6 mobile:pt-9 mobile:pb-11"
        aria-labelledby="about-title"
      >
        <h2 id="about-title" className="text-display">
          {navigation.about}
        </h2>
        <Prose className="[&_p]:max-w-110">
          <p>{home.biography.introduction}</p>
          <p>
            <LocalizedText
              message={home.biography.beginnings}
              values={{
                tanit: (
                  <InlineExternalLink href="https://www.libreriauniversitaria.it/segno-tanit-caneparo-mauro-susalibri/libro/9788897933526">
                    <i>{home.referencedBooks.tanit}</i>
                  </InlineExternalLink>
                ),
                orlando: (
                  <InlineExternalLink href="https://www.libreriauniversitaria.it/ricordi-orlando-brescia-generoso-asinochilegge/libro/9788894290479">
                    <i>{home.referencedBooks.orlando}</i>
                  </InlineExternalLink>
                ),
              }}
            />
          </p>
          <p>
            <LocalizedText
              message={home.biography.books}
              values={{
                previ: (
                  <Link href="/libri/il-previ-va-masa">
                    <i>{bookContent["il-previ-va-masa"].title}</i>
                  </Link>
                ),
                publisher: publishers.baimaRonchetti.name,
                abate: (
                  <Link href="/libri/il-richiamo-dell-abate">
                    <i>{bookContent["il-richiamo-dell-abate"].title}</i>
                  </Link>
                ),
                geode: (
                  <Link href="/libri/geode">
                    <i>{bookContent.geode.title}</i>
                  </Link>
                ),
              }}
            />
          </p>
        </Prose>
      </section>
    </main>
  )
}
