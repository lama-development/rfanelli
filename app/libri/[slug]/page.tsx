import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BookCover } from "@/components/book-cover"
import { AuthorLink } from "@/components/author-link"
import { InlineExternalLink } from "@/components/inline-external-link"
import { IsbnCopy } from "@/components/isbn-copy"
import { BookPurchase } from "@/components/book-purchase"
import { books, bookAuthors } from "@/lib/books"
import { typeClass } from "@/lib/type-scale"

type Props = { params: Promise<{ slug: string }> }
export const dynamicParams = false
export function generateStaticParams() {
  return books.map(({ slug }) => ({ slug }))
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const book = books.find((book) => book.slug === slug)
  return book ? { title: book.title, description: book.description } : {}
}
export default async function BookPage({ params }: Props) {
  const { slug } = await params
  const book = books.find((book) => book.slug === slug)
  if (!book) notFound()
  const nextBook = books[(books.indexOf(book) + 1) % books.length]
  return (
    <main id="contenuto" className="book-page">
      <AuthorLink href="/libri" icon="back" className="back-link">
        Tutti i libri
      </AuthorLink>
      <article className="book-detail">
        <div className={`detail-art book-art book-art-${books.indexOf(book)}`}>
          <BookCover book={book} preload />
        </div>
        <div className="detail-copy">
          <h1>{book.title}</h1>
          <p className={`${typeClass("body")} mt-4 text-muted-foreground`}>
            {book.subtitle}
          </p>
          <dl className="book-facts">
            {[
              ["Autori", bookAuthors],
              ["Editore", book.publisher ?? "-"],
              ["Genere", book.category ?? "-"],
              ["Pagine", book.pages ?? "-"],
              ["ISBN", book.isbn ?? "-"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  {label === "Editore" && book.publisher && book.publisherUrl ? (
                    <InlineExternalLink
                      href={book.publisherUrl}
                    >
                      {book.publisher}
                    </InlineExternalLink>
                  ) : label === "ISBN" && book.isbn ? (
                    <IsbnCopy isbn={book.isbn} />
                  ) : value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="purchase-area">
            {book.purchaseOptions?.length ? (
              <BookPurchase title={book.title} options={book.purchaseOptions} />
            ) : book.purchaseUrl ? (
              <AuthorLink
                href={book.purchaseUrl}
                external
                icon="external"
                variant="primary"
              >
                Acquista il libro
              </AuthorLink>
            ) : null}
          </div>
        </div>
      </article>
      {book.synopsis && (
        <section className="book-synopsis" aria-labelledby="synopsis-title">
          <h2 id="synopsis-title">Dentro il libro</h2>
          <div className="typeset">
            <p>{book.synopsis}</p>
          </div>
        </section>
      )}
      <div className="next-book">
        <span>Leggi anche</span>
        <AuthorLink href={`/libri/${nextBook.slug}`} icon="next">
          {nextBook.title}
        </AuthorLink>
      </div>
    </main>
  )
}
