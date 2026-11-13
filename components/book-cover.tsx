import Image from "next/image"
import type { Book } from "@/lib/books"

export function BookCover({
  book,
  preload = false,
  sizes = "(max-width: 640px) 65vw, (max-width: 900px) 33vw, 300px",
}: {
  book: Pick<Book, "title" | "cover">
  preload?: boolean
  sizes?: string
}) {
  return (
    <Image
      src={book.cover.src}
      width={book.cover.width}
      height={book.cover.height}
      alt={`Copertina di ${book.title}`}
      className="book-cover"
      sizes={sizes}
      preload={preload}
    />
  )
}
