import type { Metadata } from "next"
import { BookCatalog } from "@/components/book-catalog"
import { books } from "@/lib/books"
import { typeClass } from "@/lib/type-scale"

export const metadata: Metadata = {
  title: "Tutti i libri",
  description:
    "Le opere di Rosanna Fanelli e Mauro Caneparo: Geode, Il previ va masà e Il richiamo dell’abate.",
}

export default function BooksPage() {
  return (
    <main id="contenuto" className="books-catalog">
      <header className="catalog-heading">
        <h1 className={typeClass("display")}>Tutti i libri</h1>
        <div className="typeset">
          <p>Le opere di Rosanna Fanelli e Mauro Caneparo.</p>
        </div>
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
