type TypeScaleVariant = "default" | "compact"

type TypeScaleRole =
  "display" | "title" | "subtitle" | "body" | "caption" | "micro"

// Class strings per role and step (size + leading). Arbitrary values over the CSS variables,
// with the px values as fallbacks, so a component renders the right size even
// where the `type-scale` tokens were never installed, and stock
// tailwind-merge reads them as font-size / line-height (a bare `text-caption`
// would be taken for a color and dropped next to `text-muted-foreground`).
// Literal strings on purpose: Tailwind only generates classes it can read in
// source. Keep the fallbacks aligned with the CSS type tokens.
const typeClasses = {
  default: {
    display:
      "text-(length:--fs-display,28px) leading-(--lh-display,34px)",
    title: "text-(length:--fs-title,16px) leading-(--lh-title,22px)",
    subtitle:
      "text-(length:--fs-subtitle,14px) leading-(--lh-subtitle,20px)",
    body: "text-(length:--fs-body,13px) leading-(--lh-body,20px)",
    caption:
      "text-(length:--fs-caption,12px) leading-(--lh-caption,16px)",
    micro: "text-(length:--fs-micro,11px) leading-(--lh-micro,14px)",
  },
  compact: {
    display:
      "text-(length:--fs-display-compact,24px) leading-(--lh-display-compact,30px)",
    title:
      "text-(length:--fs-title-compact,15px) leading-(--lh-title-compact,20px)",
    subtitle:
      "text-(length:--fs-subtitle-compact,13px) leading-(--lh-subtitle-compact,18px)",
    body: "text-(length:--fs-body-compact,12px) leading-(--lh-body-compact,18px)",
    caption:
      "text-(length:--fs-caption-compact,11px) leading-(--lh-caption-compact,14px)",
    micro:
      "text-(length:--fs-micro-compact,10px) leading-(--lh-micro-compact,12px)",
  },
} as const satisfies Record<TypeScaleVariant, Record<TypeScaleRole, string>>

/** The class string for one role at one step (size + leading). */
function typeClass(
  role: TypeScaleRole,
  variant: TypeScaleVariant = "default"
): string {
  return typeClasses[variant][role]
}

/** Editable fields add this after their role. iOS Safari zooms the page into
 *  a focused field set under 16px, so touch screens get 16px. It sets the
 *  size only: the role's leading and the field's fixed height stay, and
 *  desktop keeps the role. `useSize().field` is body plus this. */
const fieldTouchClass = "pointer-coarse:text-[16px]"

export { typeClasses, typeClass, fieldTouchClass }
export type { TypeScaleRole }
