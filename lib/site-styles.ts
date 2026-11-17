import { cn } from "@/lib/utils"

// Shared utility compositions keep repeated artwork and text treatments in sync.
export const hitTargetClass = "after:absolute after:-inset-y-1 after:inset-x-0"

export const inlineLinkClass =
  "text-foreground underline decoration-current/35 underline-offset-[0.2em] transition-[text-decoration-color] duration-80 ease-out hover:decoration-current"

const artworkSizes = {
  home: "h-88 p-8.5 tablet:h-75 tablet:p-6.5 mobile:h-95 mobile:p-9.5",
  catalog:
    "h-52 w-40 p-6 mobile:row-span-2 mobile:h-auto mobile:min-h-34 mobile:w-23 mobile:self-stretch mobile:p-3",
  detail: "h-110 p-10 tablet:h-100 tablet:p-8 mobile:h-110 mobile:p-9.5",
}

const artworkColors = [
  "[background:var(--book-art-0)]",
  "[background:var(--book-art-1)]",
  "[background:var(--book-art-2)]",
]

export function bookArtClass(
  index: number,
  size: keyof typeof artworkSizes = "home"
) {
  return cn(
    "flex items-center justify-center rounded-(--shape-container-radius,12px)",
    artworkSizes[size],
    artworkColors[index % artworkColors.length]
  )
}
