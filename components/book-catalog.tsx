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

type CatalogBook = Pick<Book, "slug" | "title" | "cover" | "cardDescription">

export function BookCatalog({ books }: { books: CatalogBook[] }) {
  return (
    <CardGroup
      orientation="inline"
      separated
      fluidHover={false}
      className="catalog-list"
      role="list"
      aria-label="Tutti i libri"
    >
      {books.map((book, index) => (
        <Card
          key={book.slug}
          className="catalog-row"
          role="listitem"
        >
          <Link
            href={`/libri/${book.slug}`}
            className={`book-art book-art-${index % 3} catalog-art`}
          >
            <BookCover
              book={book}
              preload={index === 0}
              sizes="(max-width: 640px) 92px, 160px"
            />
          </Link>
          <CardHeader className="catalog-copy">
            <h2 className={typeClass("subtitle")}>
              <Link href={`/libri/${book.slug}`}>{book.title}</Link>
            </h2>
            <CardDescription className={typeClass("body")}>
              {book.cardDescription}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <AuthorLink href={`/libri/${book.slug}`} variant="primary">
              Scopri il libro
            </AuthorLink>
          </CardFooter>
        </Card>
      ))}
    </CardGroup>
  )
}
