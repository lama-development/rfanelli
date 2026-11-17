"use client"

import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
  forwardRef,
  type ReactNode,
  type ComponentProps,
} from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu } from "@base-ui/react/menu"
import {
  DropdownContext,
  useControllableOpen,
  type MenuItemRenderOptions,
} from "@/components/ui/menu-item"
import { cn } from "@/lib/utils"
import { spring, exitFallbackMs } from "@/lib/springs"
import { useFluidHover, isOwnEvent } from "@/hooks/use-fluid-hover"
import {
  useMergeSplitBlocks,
  useSelectionRuns,
  SelectionBackgrounds,
} from "@/hooks/use-merge-split"
import { usePopupShape } from "@/lib/shape-context"
import { SizeProvider, type SizeVariant } from "@/lib/size-context"
import { Elevated } from "@/lib/elevated"
import {
  popupMotionClass,
  popupScrollAreaClass,
  popupViewportClass,
  isDisabledRow,
} from "@/lib/popup"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FluidHoverHighlight } from "@/components/fluid-hover-highlight"

// ---------------------------------------------------------------------------
// DropdownMenu (popup root)
//
// Built on Base UI's Menu primitive, which owns the trigger wiring,
// positioning (collision flipping, anchor tracking), dismissal (outside
// press, focus-out, Escape), roving highlight, typeahead, and close-on-select.
// This layer keeps the fluid-hover overlays and the spring open/close
// animation (Base UI's unmount held back through actionsRef, see
// usePopupExit).
// ---------------------------------------------------------------------------

interface DropdownMenuActions {
  unmount: () => void
  close: () => void
}

// Base UI unmounts a closing popup once the animations it can detect on the
// popup element end. It misses the Motion exit spring, which it cuts.
// A close that calls preventUnmountOnClose() in onOpenChange stays mounted
// until the content calls actionsRef.unmount(). A close made by setting
// `open` never reaches onOpenChange, so the root stays open until that close
// is replayed through actionsRef.close(), which does.
function usePopupExit(open: boolean, setOpen: (open: boolean) => void) {
  const actionsRef = useRef<DropdownMenuActions | null>(null)
  const [rootOpen, setRootOpen] = useState(open)
  if (open && !rootOpen) setRootOpen(true)
  useLayoutEffect(() => {
    if (open || !rootOpen) return
    // The root fills actionsRef before this effect runs; without it, close
    // straight away rather than stay open.
    if (actionsRef.current) actionsRef.current.close()
    else setRootOpen(false)
  }, [open, rootOpen])
  const onOpenChange = (
    next: boolean,
    details: { preventUnmountOnClose: () => void }
  ) => {
    if (!next) {
      details.preventUnmountOnClose()
      setRootOpen(false)
    }
    // A replayed close finds `open` already false: nothing to report.
    if (next !== open) setOpen(next)
  }
  return { actionsRef, rootOpen: open || rootOpen, onOpenChange }
}

interface DropdownMenuContextValue {
  open: boolean
  actionsRef: React.RefObject<DropdownMenuActions | null>
  /** The menu opened from hovering an openOnHover trigger. */
  openedByHoverRef?: React.RefObject<boolean>
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null)

function useDropdownMenuContext() {
  const ctx = useContext(DropdownMenuContext)
  if (!ctx)
    throw new Error(
      "DropdownMenu compound components must be inside <DropdownMenu>"
    )
  return ctx
}

interface DropdownMenuProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  /** Pins trigger-side content and the portalled popup rows to one step of
   *  the size ladder (default 36px, compact 28px — see /docs/sizes).
   *  Omitted, they follow the surrounding SizeProvider. */
  size?: SizeVariant
}

function DropdownMenu({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  size,
}: DropdownMenuProps) {
  const [open, setOpen] = useControllableOpen(
    openProp,
    defaultOpen,
    onOpenChange
  )
  const {
    actionsRef,
    rootOpen,
    onOpenChange: exitOnOpenChange,
  } = usePopupExit(open, setOpen)
  // Whether the last open came from hovering an openOnHover trigger: such a
  // menu leaves focus where it was instead of moving it to its first row.
  const openedByHoverRef = useRef(false)
  const handleOpenChange = (
    next: boolean,
    details: { preventUnmountOnClose: () => void; reason?: string }
  ) => {
    if (next) openedByHoverRef.current = details.reason === "trigger-hover"
    exitOnOpenChange(next, details)
  }

  const ctx = useMemo(
    () => ({ open, actionsRef, openedByHoverRef }),
    [open, actionsRef, openedByHoverRef]
  )

  // A size prop pins the whole compound (trigger content + portalled popup —
  // React context crosses portals) to one ladder step.
  const root = (
    <DropdownMenuContext.Provider value={ctx}>
      <Menu.Root
        open={rootOpen}
        onOpenChange={handleOpenChange}
        actionsRef={actionsRef}
        disabled={disabled}
        // Non-modal: the page keeps scrolling and the Positioner tracks the
        // anchor, so the popup follows its trigger instead of detaching.
        modal={false}
      >
        {children}
      </Menu.Root>
    </DropdownMenuContext.Provider>
  )

  return size ? <SizeProvider size={size}>{root}</SizeProvider> : root
}

DropdownMenu.displayName = "DropdownMenu"

const DropdownTrigger = Menu.Trigger

// ---------------------------------------------------------------------------
// DropdownContent (popup panel)
//
// Portal > Positioner > Popup carrying the exact inline-panel visuals:
// Elevated surface, fluid-hover overlays, animated selected background,
// and animated focus ring. Children are wrapped in a Menu.RadioGroup so
// radio-style MenuItems (boolean `checked`) get correct aria-checked from
// `checkedIndex`.
// ---------------------------------------------------------------------------

type MenuPositionerProps = ComponentProps<typeof Menu.Positioner>

type LitBy = "open" | "pointer" | "keyboard"

interface DropdownContentProps {
  children: ReactNode
  className?: string
  /** Index of the checked item. Drives the animated selected background and
   *  the radio-group value announced to assistive tech. */
  checkedIndex?: number
  /** Multiple selection: the checked rows. Rows become checkbox items that
   *  keep the menu open when toggled, and contiguous runs share one merged
   *  background (see CheckboxGroup). */
  checkedIndices?: number[]
  side?: MenuPositionerProps["side"]
  align?: MenuPositionerProps["align"]
  sideOffset?: number
  /** Shift along the trigger edge, in px. */
  alignOffset?: number
  /** Keeps the popup inside this element's box rather than the window's
   *  (a table's, a panel's): it shifts or flips to stay within. */
  collisionBoundary?: Element | null
  /** Space kept from the boundary's edges, in px. @default 0 */
  collisionPadding?: number
}

const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  (
    {
      className,
      children,
      checkedIndex,
      checkedIndices,
      side = "bottom",
      align = "start",
      sideOffset = 6,
      alignOffset = 0,
      collisionBoundary,
      collisionPadding,
    },
    ref
  ) => {
    const shape = usePopupShape()
    const { open, actionsRef, openedByHoverRef } = useDropdownMenuContext()
    const containerRef = useRef<HTMLDivElement>(null)

    const hover = useFluidHover(containerRef, { isItemDisabled: isDisabledRow })
    const {
      activeStore,
      setActiveIndex,
      itemRects,
      handlers,
      registerItem,
      remeasure,
    } = hover

    // Focus the first enabled row after Base UI positions the popup.
    useEffect(() => {
      // A hover-opened menu is a preview: focus stays where the reader left it.
      if (!open || openedByHoverRef?.current) return
      let inner: number | undefined
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => {
          const container = containerRef.current
          if (
            !container ||
            (container.contains(document.activeElement) &&
              document.activeElement !== container)
          )
            return
          const first = container.querySelector<HTMLElement>(
            '[role="menuitem"]:not([aria-disabled="true"]), [role="menuitemradio"]:not([aria-disabled="true"]), [role="menuitemcheckbox"]:not([aria-disabled="true"])'
          )
          first?.focus()
        })
      })
      return () => {
        cancelAnimationFrame(outer)
        if (inner !== undefined) cancelAnimationFrame(inner)
      }
    }, [open, openedByHoverRef])

    // Release Base UI's deferred unmount once the exit tween has played.
    // onAnimationComplete on the motion.div is the primary signal; this
    // timeout is a fallback for throttled/background tabs where rAF-driven
    // animation callbacks can stall. The popup exits with spring.fast, so the
    // fallback tracks that tier's exit duration plus a safety buffer.
    useEffect(() => {
      if (open) return
      const id = setTimeout(
        () => actionsRef.current?.unmount(),
        exitFallbackMs(spring.fast)
      )
      return () => clearTimeout(id)
    }, [open, actionsRef])

    // The popup keeps its rows registered between opens, so their rects
    // were taken while it was hidden: re-measure once it is open and laid out.
    useEffect(() => {
      if (!open) return
      remeasure()
    }, [open, remeasure])

    const multiple = checkedIndices != null
    const checkedRect =
      !multiple && checkedIndex != null ? itemRects[checkedIndex] : null
    // What lights the highlight: the open itself (its first-row focus), the
    // pointer, or the keyboard. A highlight that appears from nothing fades
    // in at `from` and glides to its row. That suits the pointer entering the
    // list (it rises from the checked row toward the cursor), not a row lit
    // by the open or by arrowing in from the search field: those would slide
    // over from the checked row, so they fade in where they are.
    // Track what activated the highlight so pointer entry glides from the selection.
    const [litBy, setLitBy] = useState<LitBy>("open")
    const [litByOpen, setLitByOpen] = useState(open)
    if (litByOpen !== open) {
      setLitByOpen(open)
      if (open) setLitBy("open")
    }
    const markLitBy = (by: LitBy) => {
      setLitBy(by)
    }
    // Multiple: one merged block per contiguous run of checked rows.
    const runs = useSelectionRuns(checkedIndices ?? [])
    const blocks = useMergeSplitBlocks(
      runs,
      open ? itemRects : [],
      shape.bgRadius
    )
    // Inside the popup, Base UI's Menu.Item / Menu.RadioItem own the role,
    // aria-checked, tabIndex, roving highlight, typeahead, and Enter/Space/
    // click activation. The row's handler goes on the primitive as onClick:
    // Enter/Space call that prop directly and dispatch no DOM click, so an
    // onClick on the render div would only hear the mouse. The render div
    // carries the Fluid Functionalism visuals and the fluid-hover registration.
    const renderMenuItem = useCallback(
      ({
        radio,
        checkbox,
        checked,
        value,
        disabled,
        label,
        closeOnClick,
        onActivate,
        element,
        children,
      }: MenuItemRenderOptions) =>
        checkbox ? (
          // onActivate toggles the consumer state; the primitive only owns
          // the role, aria-checked, and keyboard activation.
          <Menu.CheckboxItem
            checked={!!checked}
            disabled={disabled}
            label={label}
            closeOnClick={closeOnClick}
            onClick={onActivate}
            render={element}
          >
            {children}
          </Menu.CheckboxItem>
        ) : radio ? (
          <Menu.RadioItem
            value={value}
            disabled={disabled}
            label={label}
            closeOnClick={closeOnClick}
            onClick={onActivate}
            render={element}
          >
            {children}
          </Menu.RadioItem>
        ) : (
          <Menu.Item
            disabled={disabled}
            label={label}
            closeOnClick={closeOnClick}
            onClick={onActivate}
            render={element}
          >
            {children}
          </Menu.Item>
        ),
      []
    )

    const contentCtx = useMemo(
      () => ({
        registerItem,
        activeStore,
        checkedIndex,
        multiple,
        checkedIndices,
        inMenu: true,
        renderMenuItem,
      }),
      [
        registerItem,
        activeStore,
        checkedIndex,
        multiple,
        checkedIndices,
        renderMenuItem,
      ]
    )

    return (
      <Menu.Portal>
        <Menu.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          collisionBoundary={collisionBoundary ?? undefined}
          collisionPadding={collisionPadding}
          className="z-(--z-popover,60) outline-none"
        >
          <motion.div
            className={popupMotionClass}
            initial={{ opacity: 0, y: "var(--popup-enter-y)", scaleY: 0.96 }}
            animate={
              open
                ? { opacity: 1, y: 0, scaleY: 1 }
                : { opacity: 0, y: "var(--popup-enter-y)", scaleY: 0.96 }
            }
            transition={open ? spring.fast : spring.fast.exit}
            // The close held Base UI's unmount (preventUnmountOnClose); release it once
            // the exit spring has finished so the close animation fully plays.
            onAnimationComplete={() => {
              if (!open) actionsRef.current?.unmount()
            }}
          >
            <DropdownContext.Provider value={contentCtx}>
              <Menu.Popup
                render={<Elevated offset={2} shadowLevel={3} ref={ref} />}
                onKeyDownCapture={(e) => {
                  if (!isOwnEvent(e)) return
                  markLitBy("keyboard")
                }}
                onMouseEnter={(e) => {
                  if (!isOwnEvent(e)) return
                  markLitBy("pointer")
                  handlers.onMouseEnter()
                }}
                onMouseMove={(e) => {
                  if (!isOwnEvent(e)) return
                  markLitBy("pointer")
                  handlers.onMouseMove(e)
                }}
                onClick={handlers.onClick}
                onMouseLeave={(e) => {
                  if (!isOwnEvent(e)) return
                  handlers.onMouseLeave()
                }}
                onFocus={(e) => {
                  if (!isOwnEvent(e)) return
                  // A hover-opened menu is a preview, but Base UI's popup
                  // focuses itself on open (no prop turns that off). Focus
                  // arriving from outside the popup goes back where it came
                  // from, or nowhere; Base UI keeps the menu open either way.
                  if (openedByHoverRef?.current) {
                    const from = e.relatedTarget as HTMLElement | null
                    if (!from || !e.currentTarget.contains(from)) {
                      if (from) from.focus({ preventScroll: true })
                      else (e.target as HTMLElement).blur()
                      return
                    }
                  }
                  const indexAttr = (e.target as HTMLElement)
                    .closest("[data-fluid-hover-index]")
                    ?.getAttribute("data-fluid-hover-index")
                  // Keyboard navigation moves the hover background only — no
                  // ring: in a menu the highlighted row is the focus indicator.
                  if (indexAttr != null) {
                    setActiveIndex(Number(indexAttr))
                  } else if (e.target !== e.currentTarget) {
                    // Focus moved to a non-row inside the popup, such as the
                    // search field: no row is highlighted any more. The field
                    // is a stop like a row, it just draws no background. The
                    // popup focusing itself (pointer leaving a row) doesn't
                    // count.
                    setActiveIndex(null)
                  }
                }}
                onBlur={(e) => {
                  if (!isOwnEvent(e)) return
                  // The popup itself takes focus when the pointer leaves a row; only a
                  // departure from the whole popup ends the hover session.
                  if (e.currentTarget.contains(e.relatedTarget as Node)) return
                  setActiveIndex(null)
                }}
                className={cn(
                  `flex max-h-[min(480px,var(--available-height))] w-72 max-w-full min-w-(--anchor-width) flex-col overflow-hidden ${shape.container} outline-none select-none`,
                  className
                )}
              >
                {/* The list scrolls inside a ScrollArea; this wrapper is the rows'
                    offsetParent, so the overlays scroll with them. */}
                <ScrollArea
                  className={popupScrollAreaClass}
                  viewportClassName={cn(popupViewportClass, "scroll-fade")}
                >
                  <div
                    ref={containerRef}
                    className="relative flex flex-col p-1"
                  >
                    {/* Selected backgrounds — merged runs in multiple mode */}
                    {multiple && <SelectionBackgrounds blocks={blocks} />}

                    {/* Selected background */}
                    <AnimatePresence>
                      {checkedRect && (
                        <motion.div
                          className={`absolute ${shape.bg} pointer-events-none bg-active`}
                          initial={false}
                          animate={{
                            top: checkedRect.top,
                            left: checkedRect.left,
                            width: checkedRect.width,
                            height: checkedRect.height,
                            opacity: 1,
                          }}
                          exit={{
                            opacity: 0,
                            transition: spring.moderate.exit,
                          }}
                          transition={{
                            ...spring.moderate,
                            opacity: { duration: 0.08 },
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Hover background */}
                    <FluidHoverHighlight
                      hover={hover}
                      from={litBy === "pointer" ? checkedRect : null}
                      className={shape.bg}
                    />

                    {/* display: contents keeps items direct flex children of the
                    wrapper so fluid hover measurement and gap layout still work,
                    while the group provides the radio value context. */}
                    <Menu.RadioGroup
                      value={checkedIndex ?? null}
                      className="contents"
                    >
                      {children}
                    </Menu.RadioGroup>
                  </div>
                </ScrollArea>
              </Menu.Popup>
            </DropdownContext.Provider>
          </motion.div>
        </Menu.Positioner>
      </Menu.Portal>
    )
  }
)

DropdownContent.displayName = "DropdownContent"

export { DropdownMenu, DropdownTrigger, DropdownContent }
