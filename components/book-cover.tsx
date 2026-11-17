import Image from "next/image"
import type { Book } from "@/lib/books"
import { cn } from "@/lib/utils"
import { common } from "@/i18n/it"
import { formatMessage } from "@/i18n/format"

export function BookCover({
  book,
  preload = false,
  sizes = "(max-width: 640px) 65vw, (max-width: 900px) 33vw, 300px",
  variant = "default",
}: {
  book: Pick<Book, "title" | "cover">
  preload?: boolean
  sizes?: string
  variant?: "default" | "catalog"
}) {
  return (
    <Image
      src={book.cover.src}
      width={book.cover.width}
      height={book.cover.height}
      alt={formatMessage(common.coverAlt, { title: book.title })}
      className={cn(
        "h-auto max-h-full w-auto max-w-full rounded-sm object-contain [box-shadow:var(--cover-shadow)]",
        // Fit the widest cover without changing any book's aspect ratio.
        variant === "catalog"
          ? "mobile:h-24"
          : "mobile:h-[min(100%,calc((100vw-120px)*790/560))]"
      )}
      sizes={sizes}
      preload={preload}
    />
  )
}
