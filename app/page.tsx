import Link from "next/link"
import { BookCover } from "@/components/book-cover"
import { AuthorLink } from "@/components/author-link"
import { InlineExternalLink } from "@/components/inline-external-link"
import { books, publishers } from "@/lib/books"

export default function Home() {
  return (
    <main id="contenuto" className="author-home">
      <section className="author-intro" aria-labelledby="author-name">
        <h1 id="author-name">
          Rosanna
          <br />
          Fanelli
        </h1>
        <div className="intro-copy">
          <p>
            Le opere di Rosanna Fanelli,
            <br className="desktop-break" /> scritte insieme a Mauro Caneparo.
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
