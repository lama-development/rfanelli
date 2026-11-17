import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { typeClass } from "@/lib/type-scale"

export function Prose({
  as: Tag = "div",
  className,
  ...props
}: ComponentProps<"div"> & { as?: "div" | "span" }) {
  return (
    <Tag
      className={cn(
        typeClass("body"),
        "wrap-break-word whitespace-normal text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:decoration-current/35 [&_a]:underline-offset-[0.2em] [&_a]:transition-[text-decoration-color] [&_a]:duration-80 [&_a]:ease-out [&_a:hover]:decoration-current [&_p]:m-0 [&_p]:[text-wrap-style:auto] [&_p+p]:mt-3",
        className
      )}
      {...props}
    />
  )
}
