import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BookCover } from "@/components/book-cover"
import { AuthorLink } from "@/components/author-link"
import { InlineExternalLink } from "@/components/inline-external-link"
import { IsbnCopy } from "@/components/isbn-copy"
import { BookPurchase } from "@/components/book-purchase"
import { books, bookAuthors } from "@/lib/books"
import { typeClass } from "@/lib/type-scale"
import { bookArtClass } from "@/lib/site-styles"
import { Prose } from "@/components/prose"
import { bookPage, common, navigation, purchase } from "@/i18n/it"

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
    <main
      id="contenuto"
      className="pt-7.5 [--book-column-gap:72px] [--book-media-width:360px] tablet:[--book-column-gap:36px] tablet:[--book-media-width:280px] mobile:pt-4.5"
    >
      <AuthorLink href="/libri" icon="back" className="-ml-3">
        {navigation.allBooks}
      </AuthorLink>
      <article className="grid grid-cols-[minmax(0,var(--book-media-width))_minmax(0,1fr)] items-start gap-(--book-column-gap) pt-7 pb-12 mobile:grid-cols-1 mobile:gap-7 mobile:pt-5 mobile:pb-10">
        <div className={bookArtClass(books.indexOf(book), "detail")}>
          <BookCover book={book} highPriority variant="detail" />
        </div>
        <div className="pt-5 mobile:pt-0">
          <h1 className="text-display [--fs-display:clamp(36px,4vw,50px)] [--lh-display:1.1]">
            {book.title}
          </h1>
          <p className={`${typeClass("body")} mt-4 text-muted-foreground`}>
            {book.subtitle}
          </p>
          <dl className="mt-7 border-t border-border pt-4.5 text-caption">
            {(
              [
                { key: "authors", value: bookAuthors },
                {
                  key: "publisher",
                  value: book.publisher ?? common.notAvailable,
                },
                {
                  key: "category",
                  value: book.category ?? common.notAvailable,
                },
                { key: "pages", value: book.pages ?? common.notAvailable },
                { key: "isbn", value: book.isbn ?? common.notAvailable },
              ] as const
            ).map(({ key, value }) => (
              <div
                key={key}
                className="grid grid-cols-[70px_1fr] items-center gap-4.5 py-1.5"
              >
                <dt className="text-muted-foreground">{bookPage.facts[key]}</dt>
                <dd>
                  {key === "publisher" &&
                  book.publisher &&
                  book.publisherUrl ? (
                    <InlineExternalLink href={book.publisherUrl}>
                      {book.publisher}
                    </InlineExternalLink>
                  ) : key === "isbn" && book.isbn ? (
                    <IsbnCopy isbn={book.isbn} />
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-6.5">
            {book.purchaseOptions?.length ? (
              <BookPurchase title={book.title} options={book.purchaseOptions} />
            ) : book.purchaseUrl ? (
              <AuthorLink
                href={book.purchaseUrl}
                external
                icon="external"
                variant="primary"
              >
                {purchase.externalAction}
              </AuthorLink>
            ) : null}
          </div>
        </div>
      </article>
      {book.synopsis && (
        <section
          className="grid grid-cols-[minmax(0,var(--book-media-width))_minmax(0,1fr)] gap-(--book-column-gap) border-t border-border pt-9 pb-12 mobile:grid-cols-1 mobile:gap-4 mobile:pt-7 mobile:pb-9"
          aria-labelledby="synopsis-title"
        >
          <h2 id="synopsis-title" className="text-title">
            {bookPage.synopsis}
          </h2>
          <Prose>
            <p>{book.synopsis}</p>
          </Prose>
        </section>
      )}
      <div className="flex flex-col items-end gap-2.5 border-t border-border pt-7.5 pb-14 mobile:items-start mobile:pt-6.5 mobile:pb-10">
        <span className="text-caption text-muted-foreground">
          {bookPage.readAlso}
        </span>
        <AuthorLink
          href={`/libri/${nextBook.slug}`}
          icon="next"
          className={`${typeClass("title")} max-w-full font-serif mobile:text-(length:--fs-subtitle) mobile:leading-(--lh-subtitle)`}
        >
          {nextBook.title}
        </AuthorLink>
      </div>
    </main>
  )
}
