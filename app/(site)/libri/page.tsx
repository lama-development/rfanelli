import type { Metadata } from "next"
import { BookCatalog } from "@/components/book-catalog"
import { books } from "@/lib/books"
import { typeClass } from "@/lib/type-scale"
import { Prose } from "@/components/prose"
import { catalog, navigation } from "@/i18n/it"

export const metadata: Metadata = {
  title: navigation.allBooks,
  description: catalog.metadataDescription,
}

export default function BooksPage() {
  return (
    <main id="contenuto" className="pt-16 pb-18 mobile:pt-10 mobile:pb-11">
      <header className="mb-8 flex flex-col gap-3 mobile:mb-6">
        <h1 className={typeClass("display")}>{navigation.allBooks}</h1>
        <Prose>
          <p>{catalog.description}</p>
        </Prose>
      </header>
      <BookCatalog
        books={books.map(({ slug, title, cover, cardDescription }) => ({
          slug,
          title,
          cover,
          cardDescription,
        }))}
      />
    </main>
  )
}
