import Link from "next/link"
import { BookCover } from "@/components/book-cover"
import { AuthorLink } from "@/components/author-link"
import { InlineExternalLink } from "@/components/inline-external-link"
import { books, publishers } from "@/lib/books"

export default function Home() {
  return (
    <main id="contenuto" className="author-home">
      <section className="author-intro" aria-labelledby="author-name">
        <div className="intro-heading">
          <svg
            className="intro-butterfly"
            viewBox="0 0 80 72"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <g className="butterfly-wings">
              <path d="M39 40C33 21 14 5 8 14C0 28 16 44 38 45Z" />
              <path d="M41 40C47 21 66 5 72 14C80 28 64 44 42 45Z" />
              <path d="M38 44C24 37 13 46 19 58C26 70 38 56 39 45Z" />
              <path d="M42 44C56 37 67 46 61 58C54 70 42 56 41 45Z" />
            </g>
            <path d="M40 33C38 39 38 49 40 55C42 49 42 39 40 33Z" />
            <path d="M39 34C38 29 36 26 33 25M41 34C42 29 44 26 47 25" />
            <path d="M35 39L16 21M45 39L64 21M35 47L24 56M45 47L56 56" />
          </svg>
          <h1 id="author-name">
            <span>Rosanna</span>{" "}
            <span>Fanelli</span>
          </h1>
        </div>
        <div className="intro-copy">
          <p className="intro-lead">
            Tra storia, memoria
            <br /> e immaginazione.
          </p>
          <p>
            Le opere di Rosanna Fanelli,
            scritte insieme a Mauro Caneparo.
          </p>
        </div>
      </section>
      <section
        id="libri"
        className="books-section"
        aria-labelledby="books-title"
      >
        <div className="section-heading">
          <h2 id="books-title">I libri</h2>
          <AuthorLink href="/libri" icon="next">
            Tutti i libri
          </AuthorLink>
        </div>
        <div className="book-grid">
          {books.slice(0, 3).map((book, index) => (
            <article className="book-entry" key={book.slug}>
              <Link
                href={`/libri/${book.slug}`}
                className={`book-art book-art-${index}`}
                aria-label={`Scopri ${book.title}`}
              >
                <BookCover book={book} preload={index === 0} />
              </Link>
              <div className="book-caption">
                <h3>
                  <Link href={`/libri/${book.slug}`}>{book.title}</Link>
                </h3>
                <p>{book.cardDescription}</p>
                <AuthorLink
                  href={`/libri/${book.slug}`}
                  variant="primary"
                  className="book-more"
                >
                  Scopri il libro
                </AuthorLink>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section
        id="autrice"
        className="author-about"
        aria-labelledby="about-title"
      >
        <h2 id="about-title">L’autrice</h2>
        <div className="typeset">
          <p>
            Rosanna Fanelli è nata a Bari e risiede a Novara. È insegnante alla
            scuola primaria da vent’anni.
          </p>
          <p>
            Nel 2017 inizia la collaborazione con Mauro Caneparo con lavoro di
            editing per il romanzo{" "}
            <InlineExternalLink
              href="https://www.libreriauniversitaria.it/segno-tanit-caneparo-mauro-susalibri/libro/9788897933526"
            >
              <i>Il segno di Tanit</i>
            </InlineExternalLink>{" "}
            e la biografia{" "}
            <InlineExternalLink
              href="https://www.libreriauniversitaria.it/ricordi-orlando-brescia-generoso-asinochilegge/libro/9788894290479"
            >
              <i>Ricordi di Orlando</i>
            </InlineExternalLink>
            . A questi uniscono una serie di racconti
            presentati e premiati in diversi concorsi.
          </p>
          <p>
            Nel 2022 pubblica, sempre in collaborazione con Caneparo, il libro{" "}
            <Link href="/libri/il-previ-va-masa">
              <i>Il previ va masà</i>
            </Link>
            , edito da {publishers.baimaRonchetti.name}. Con Caneparo firma anche{" "}
            <Link href="/libri/il-richiamo-dell-abate">
              <i>Il richiamo dell’abate</i>
            </Link>{" "}
            e il romanzo{" "}
            <Link href="/libri/geode">
              <i>Geode</i>
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
