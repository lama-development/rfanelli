"use client"

import Link from "next/link"
import { BookCover } from "@/components/book-cover"
import { AuthorLink } from "@/components/author-link"
import {
  Card,
  CardGroup,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { typeClass } from "@/lib/type-scale"
import type { Book } from "@/lib/books"
import { bookArtClass } from "@/lib/site-styles"
import { common, navigation } from "@/i18n/it"

type CatalogBook = Pick<Book, "slug" | "title" | "cover" | "cardDescription">

export function BookCatalog({ books }: { books: CatalogBook[] }) {
  return (
    <CardGroup
      orientation="inline"
      separated
      fluidHover={false}
      className="gap-6 border-t border-border pt-3 [--catalog-inset:12px] [--catalog-radius:calc(var(--shape-container-radius,12px)+var(--catalog-inset))] mobile:[--catalog-inset:8px]"
      role="list"
      aria-label={navigation.allBooks}
    >
      {books.map((book, index) => (
        <Card
          key={book.slug}
          className="grid grid-cols-[160px_minmax(0,1fr)_auto] items-center gap-8 rounded-(--catalog-radius) p-(--catalog-inset) mobile:grid-cols-[92px_minmax(0,1fr)] mobile:gap-x-5 mobile:gap-y-3 [&~[data-slot=card]]:before:pointer-events-none [&~[data-slot=card]]:before:absolute [&~[data-slot=card]]:before:inset-x-(--catalog-inset) [&~[data-slot=card]]:before:-top-3.25 [&~[data-slot=card]]:before:h-px [&~[data-slot=card]]:before:bg-border [&~[data-slot=card]]:before:content-['']"
          role="listitem"
        >
          <Link
            href={`/libri/${book.slug}`}
            className={bookArtClass(index, "catalog")}
          >
            <BookCover
              book={book}
              highPriority={index === 0}
              variant="catalog"
            />
          </Link>
          <CardHeader className="flex min-w-0 flex-col items-start gap-2 p-0">
            <h2 className={typeClass("subtitle")}>
              <Link href={`/libri/${book.slug}`}>{book.title}</Link>
            </h2>
            <CardDescription className={`${typeClass("body")} max-w-[48ch]`}>
              {book.cardDescription}
            </CardDescription>
          </CardHeader>
          <CardFooter className="m-0 p-0 mobile:col-start-2">
            <AuthorLink href={`/libri/${book.slug}`} variant="primary">
              {common.discoverBook}
            </AuthorLink>
          </CardFooter>
        </Card>
      ))}
    </CardGroup>
  )
}
