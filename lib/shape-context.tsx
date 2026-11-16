"use client"

import { createContext, useContext, useEffect, type ReactNode } from "react"

type ShapeVariant = "pill" | "rounded" | "sharp"

interface ShapeClasses {
  /** The variant these classes belong to — handy for conditionals. */
  variant: ShapeVariant
  item: string
  bg: string
  focusRing: string
  mergedBg: string
  container: string
  button: string
  input: string
  // Numeric counterparts of `bg` / `mergedBg`, in px. Needed where individual
  // corners are animated (e.g. the selected-background merge/split animation),
  // which requires per-corner numeric border-radii rather than a class.
  bgRadius: number
  /** Numeric counterpart of `container`. Popup shells use a 4px inset, so
   *  containerRadius = bgRadius + 4 keeps their curves concentric. */
  containerRadius: number
  mergedRadius: number
}

/**
 * Radius for a surface inset inside another rounded surface.
 *
 * `inset` is the interior spacing (usually parent padding); pass the parent's
 * border separately as `borderWidth`. Together they form the visible
 * edge-to-edge distance. Clamping at zero prevents an invalid negative radius.
 */
function nestedRadius(outerRadius: number, inset: number, borderWidth = 0) {
  return Math.max(0, outerRadius - inset - borderWidth)
}

const shapeMap: Record<ShapeVariant, ShapeClasses> = {
  pill: {
    variant: "pill",
    item: "rounded-[20px]",
    bg: "rounded-[20px]",
    // +2px over `item` because the focus ring sits 2px outside the element
    // (top/left -2, width/height +4); this keeps the corners concentric so a
    // pill element gets a pill ring (matches the rounded-mode 8px→10px bump).
    focusRing: "rounded-[22px]",
    mergedBg: "rounded-2xl",
    container: "rounded-3xl",
    button: "rounded-[20px]",
    input: "rounded-[20px]",
    bgRadius: 20,
    containerRadius: 24,
    mergedRadius: 16,
  },
  rounded: {
    variant: "rounded",
    item: "rounded-lg",
    bg: "rounded-lg",
    focusRing: "rounded-[10px]",
    mergedBg: "rounded-lg",
    container: "rounded-xl",
    button: "rounded-lg",
    input: "rounded-lg",
    bgRadius: 8,
    containerRadius: 12,
    mergedRadius: 8,
  },
  // Sharp keeps a 1px radius rather than 0 so corners still anti-alias softly.
  // Containers stay at 1px too: concentric radii stop mattering at this size.
  sharp: {
    variant: "sharp",
    item: "rounded-[1px]",
    bg: "rounded-[1px]",
    focusRing: "rounded-[3px]",
    mergedBg: "rounded-[1px]",
    container: "rounded-[1px]",
    button: "rounded-[1px]",
    input: "rounded-[1px]",
    bgRadius: 1,
    containerRadius: 1,
    mergedRadius: 1,
  },
}

const ShapeContext = createContext<ShapeClasses | null>(null)

// Rounded is the default on every path: the site demos render under
// <ShapeProvider defaultShape="rounded">, the shipped :focus-visible fallback
// ring assumes its 8px radius, and the preset generators only emit a provider
// for pill. A consumer with no provider gets the corners the docs show.
function useShape(): ShapeClasses {
  const ctx = useContext(ShapeContext)
  if (!ctx) return shapeMap.rounded
  return ctx
}

// Popup surfaces (menus, select and combobox lists) cap at rounded: pill
// corners distort their padding at this scale and skew the corner shadows.
// Sharp carries over, so a sharp UI gets sharp menus.
function usePopupShape(): ShapeClasses {
  return useShape().variant === "sharp" ? shapeMap.sharp : shapeMap.rounded
}

function ShapeProvider({
  children,
  defaultShape = "rounded",
}: {
  children: ReactNode
  defaultShape?: ShapeVariant
}) {
  const classes = shapeMap[defaultShape]
  // Publish the corner radii for CSS surfaces and portalled components.
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--shape-input-radius",
      classes.bgRadius + "px"
    )
    document.documentElement.style.setProperty(
      "--shape-container-radius",
      classes.containerRadius + "px"
    )
  }, [classes])
  return (
    <ShapeContext.Provider value={classes}>{children}</ShapeContext.Provider>
  )
}

export { ShapeProvider, useShape, usePopupShape, nestedRadius }
export type { ShapeVariant }
