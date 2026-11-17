import Image from "next/image"
import type { Book } from "@/lib/books"
import { cn } from "@/lib/utils"
import { common } from "@/i18n/it"
import { formatMessage } from "@/i18n/format"

export function BookCover({
  book,
  highPriority = false,
  sizes,
  variant = "default",
}: {
  book: Pick<Book, "title" | "cover">
  highPriority?: boolean
  sizes?: string
  variant?: "default" | "catalog" | "detail"
}) {
  const ratio = book.cover.width / book.cover.height
  // Match the artwork's available width and height after its padding.
  // Each cover has a different ratio; the artwork often constrains its height.
  const coverSizes =
    variant === "catalog"
      ? `(max-width: 640px) ${Math.ceil(Math.min(68, 96 * ratio))}px, ${Math.ceil(Math.min(112, 160 * ratio))}px`
      : variant === "detail"
        ? `(max-width: 640px) min(calc(100vw - 120px), ${Math.ceil(364 * ratio)}px), (max-width: 900px) ${Math.ceil(Math.min(216, 336 * ratio))}px, ${Math.ceil(360 * ratio)}px`
        : `(max-width: 640px) min(calc(100vw - 120px), ${Math.ceil(304 * ratio)}px), (max-width: 900px) min(calc((100vw - 248px) / 3), ${Math.ceil(248 * ratio)}px), min(calc((100vw - 356px) / 3), ${Math.ceil(284 * ratio)}px)`

  return (
    <Image
      src={book.cover.src}
      width={book.cover.width}
      height={book.cover.height}
      style={{ aspectRatio: `${book.cover.width} / ${book.cover.height}` }}
      alt={formatMessage(common.coverAlt, { title: book.title })}
      className={cn(
        "h-auto max-h-full w-auto max-w-full rounded-sm object-contain [box-shadow:var(--cover-shadow)]",
        // Fit the widest cover without changing any book's aspect ratio.
        variant === "catalog"
          ? "mobile:h-24"
          : "mobile:h-[min(100%,calc((100vw-120px)*790/560))]"
      )}
      sizes={sizes ?? coverSizes}
      loading={highPriority ? "eager" : "lazy"}
      fetchPriority={highPriority ? "high" : undefined}
    />
  )
}
