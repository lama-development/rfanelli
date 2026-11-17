"use client"

import { useId, useRef, useState, useSyncExternalStore } from "react"
import { ExternalLink, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardGroup } from "@/components/ui/card"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import type { PurchaseOption } from "@/lib/books"
import { hitTargetClass } from "@/lib/site-styles"
import { typeClass } from "@/lib/type-scale"
import { cn } from "@/lib/utils"
import { common, purchase } from "@/i18n/it"
import { formatMessage } from "@/i18n/format"
import {
  BottomDrawer,
  BottomDrawerTrigger,
  BottomDrawerContent,
  BottomDrawerTitle,
  BottomDrawerDescription,
  BottomDrawerBody,
} from "@/components/ui/bottom-drawer"

const mobileQuery = "(max-width: 640px)"
function subscribeMobile(callback: () => void) {
  const query = window.matchMedia(mobileQuery)
  query.addEventListener("change", callback)
  return () => query.removeEventListener("change", callback)
}
const getMobileSnapshot = () => window.matchMedia(mobileQuery).matches
const getServerSnapshot = () => false

export function BookPurchase({
  title,
  options,
}: {
  title: string
  options: PurchaseOption[]
}) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const mobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getServerSnapshot
  )
  const id = useId()
  const groups = [
    { format: "print", label: purchase.formats.print },
    { format: "ebook", label: purchase.formats.ebook },
  ]
    .map((group) => ({
      ...group,
      links: options.filter((option) => option.format === group.format),
    }))
    .filter((group) => group.links.length)

  const Title = mobile ? BottomDrawerTitle : DialogTitle
  const Description = mobile ? BottomDrawerDescription : DialogDescription
  const header = (
    <DialogHeader
      className={
        mobile ? "mx-5 mb-6 shrink-0 gap-1.5 pr-0" : "mb-6 gap-1.5 pr-10"
      }
    >
      <Title className={cn(typeClass("subtitle"), "leading-tight")}>
        {formatMessage(purchase.title, { title })}
      </Title>
      <Description className="m-0 text-body leading-normal text-muted-foreground">
        {purchase.description}
      </Description>
    </DialogHeader>
  )
  const trigger = (
    <Button ref={triggerRef} variant="primary" className={hitTargetClass}>
      {purchase.action}
    </Button>
  )
  const close = (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-6 right-6"
      aria-label={common.close}
      data-base-ui-swipe-ignore
    >
      <X size={18} aria-hidden="true" />
    </Button>
  )
  const links = groups.map((group) => (
    <section
      key={group.format}
      className="[&+section]:mt-6"
      aria-labelledby={`${id}-${group.format}`}
    >
      <h3
        id={`${id}-${group.format}`}
        className="m-0 mb-2.5 p-0 [font-family:var(--font-sans),sans-serif]! text-body leading-[1.4] font-[550]! text-foreground"
      >
        {group.label}
      </h3>
      <CardGroup
        orientation="inline"
        columns={2}
        separated
        className="gap-2 **:data-[slot=card]:rounded-(--shape-input-radius,8px) *:data-[slot=fluid-hover-highlight]:rounded-(--shape-input-radius,8px)"
        role="list"
        aria-label={group.label}
      >
        {group.links.map((option) => (
          <Card
            key={option.url}
            href={option.url}
            external
            label={option.store}
            onClick={() => setOpen(false)}
            className={`${typeClass("body")} flex min-h-12 items-center justify-between gap-3 border border-border bg-(--surface-inset) px-3 py-2.75 leading-normal`}
            role="listitem"
          >
            <span className="min-w-0 wrap-anywhere">
              {option.label ?? option.store}
            </span>
            <ExternalLink
              className="shrink-0 text-muted-foreground"
              size={16}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Card>
        ))}
      </CardGroup>
    </section>
  ))

  if (mobile) {
    return (
      <BottomDrawer open={open} onOpenChange={setOpen} swipeDirection="down">
        <BottomDrawerTrigger render={trigger} />
        <BottomDrawerContent
          className="rounded-t-[calc(var(--shape-input-radius,8px)+20px)] rounded-b-none"
          data-presentation="drawer"
          finalFocus={triggerRef}
        >
          {header}
          <BottomDrawerBody
            className="min-h-0 overflow-y-auto overscroll-contain px-5 pb-[calc(32px+env(safe-area-inset-bottom))]"
            data-base-ui-swipe-ignore
          >
            {links}
          </BottomDrawerBody>
        </BottomDrawerContent>
      </BottomDrawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent
        className="max-h-[calc(100dvh-32px)] max-w-110 overflow-y-auto overscroll-contain rounded-2xl p-6"
        data-presentation="dialog"
        showCloseButton={false}
      >
        {header}
        <DialogClose render={close} />
        {links}
      </DialogContent>
    </Dialog>
  )
}
