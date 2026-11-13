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
        className="bottom-drawer-backdrop"
        style={motionVariables}
      />
      <Drawer.Viewport className="bottom-drawer-viewport">
        <Drawer.Popup
          ref={ref}
          className={cn(surfaceClasses(level), "bottom-drawer", className)}
          style={{ ...motionVariables, ...style }}
          {...props}
        >
          <SurfaceProvider value={level}>
            <div className="bottom-drawer-grab" aria-hidden="true">
              <span className="bottom-drawer-handle" />
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
const BottomDrawerClose = Drawer.Close
const BottomDrawerTitle = Drawer.Title
const BottomDrawerDescription = Drawer.Description
const BottomDrawerBody = Drawer.Content

export {
  BottomDrawer,
  BottomDrawerTrigger,
  BottomDrawerContent,
  BottomDrawerClose,
  BottomDrawerTitle,
  BottomDrawerDescription,
  BottomDrawerBody,
}
