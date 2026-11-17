"use client"

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react"
import { Drawer } from "@base-ui/react/drawer"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/springs"
import { SurfaceProvider, useSurface } from "@/lib/surface-context"
import { surfaceClasses } from "@/lib/surface-classes"
import { typeClass } from "@/lib/type-scale"

// Drawer owns the drag transform and CSS transition lifecycle. Keep Motion off
// this element, and derive its release/exit timings from the shared Fluid tiers.
const motionVariables = {
  "--drawer-enter-duration": `${spring.moderate.duration}s`,
  "--drawer-exit-duration": `${spring.moderate.exit.duration}s`,
} as CSSProperties

type BottomDrawerContentProps = Omit<
  ComponentPropsWithoutRef<typeof Drawer.Popup>,
  "className" | "style"
> & {
  className?: string
  style?: CSSProperties
}

const BottomDrawerContent = forwardRef<
  HTMLDivElement,
  BottomDrawerContentProps
>(({ children, className, style, ...props }, ref) => {
  const level = Math.min(useSurface() + 4, 8)
  return (
    <Drawer.Portal>
      <Drawer.Backdrop
        className="fixed inset-0 z-(--z-overlay) bg-(--scrim) opacity-[calc(1-var(--drawer-swipe-progress,0))] transition-opacity duration-(--drawer-enter-duration) ease-out data-ending-style:opacity-0 data-ending-style:duration-(--drawer-exit-duration) data-starting-style:opacity-0 [&:has(+_[data-slot=drawer-viewport]_[data-swiping])]:transition-none"
        style={motionVariables}
      />
      <Drawer.Viewport
        data-slot="drawer-viewport"
        className="fixed inset-0 isolate z-(--z-modal) flex items-end justify-center"
      >
        <Drawer.Popup
          ref={ref}
          className={cn(
            surfaceClasses(level),
            typeClass("body"),
            "group/drawer relative flex max-h-[calc(100dvh-max(12px,env(safe-area-inset-top)))] w-full max-w-none transform-[translateY(var(--drawer-swipe-movement-y,0px))] flex-col overflow-hidden p-0 text-foreground opacity-100 outline-none [transition:transform_var(--drawer-enter-duration)_cubic-bezier(0.2,0,0,1),opacity_var(--drawer-enter-duration)_ease-out] data-ending-style:transform-[translateY(100%)] data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-exit-duration)*var(--drawer-swipe-strength,1))] data-starting-style:transform-[translateY(100%)] data-starting-style:opacity-0 data-swiping:transition-none data-swiping:select-none motion-reduce:transform-none! motion-reduce:transition-opacity",
            className
          )}
          style={{ ...motionVariables, ...style }}
          {...props}
        >
          <SurfaceProvider value={level}>
            <div
              className="mx-auto flex w-40 flex-[0_0_44px] cursor-grab touch-none items-center justify-center select-none group-data-swiping/drawer:cursor-grabbing"
              aria-hidden="true"
            >
              <span className="h-1 w-10 rounded-[9999px] bg-muted-foreground" />
            </div>
            {children}
          </SurfaceProvider>
        </Drawer.Popup>
      </Drawer.Viewport>
    </Drawer.Portal>
  )
})
BottomDrawerContent.displayName = "BottomDrawerContent"

const BottomDrawer = Drawer.Root
const BottomDrawerTrigger = Drawer.Trigger
const BottomDrawerTitle = Drawer.Title
const BottomDrawerDescription = Drawer.Description
const BottomDrawerBody = Drawer.Content

export {
  BottomDrawer,
  BottomDrawerTrigger,
  BottomDrawerContent,
  BottomDrawerTitle,
  BottomDrawerDescription,
  BottomDrawerBody,
}
