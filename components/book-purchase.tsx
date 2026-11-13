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
    { format: "print", label: "Cartaceo" },
    { format: "ebook", label: "Ebook" },
  ]
    .map((group) => ({
      ...group,
      links: options.filter((option) => option.format === group.format),
    }))
    .filter((group) => group.links.length)

  const Title = mobile ? BottomDrawerTitle : DialogTitle
  const Description = mobile ? BottomDrawerDescription : DialogDescription
  const header = (
    <DialogHeader className="purchase-header">
      <Title className="purchase-title">Acquista {title}</Title>
      <Description className="purchase-description">
        Scegli il formato e il rivenditore.
      </Description>
    </DialogHeader>
  )
  const trigger = (
    <Button ref={triggerRef} variant="primary" className="fluid-hit-target">
      Acquista
    </Button>
  )
  const close = (
    <Button
      variant="ghost"
      size="icon"
      className="purchase-close"
      aria-label="Chiudi"
      data-base-ui-swipe-ignore
    >
      <X size={18} aria-hidden="true" />
    </Button>
  )
  const links = groups.map((group) => (
    <section
      key={group.format}
      className="purchase-group"
      aria-labelledby={`${id}-${group.format}`}
    >
      <h3 id={`${id}-${group.format}`} className="purchase-format">
        {group.label}
      </h3>
      <CardGroup
        orientation="inline"
        columns={2}
        separated
        className="purchase-links"
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
            className="purchase-link"
            role="listitem"
          >
            <span>{option.label ?? option.store}</span>
            <ExternalLink size={16} strokeWidth={1.5} aria-hidden="true" />
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
          className="purchase-dialog"
          data-presentation="drawer"
          finalFocus={triggerRef}
        >
          {header}
          <BottomDrawerBody
            className="purchase-drawer-body"
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
        className="purchase-dialog"
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
