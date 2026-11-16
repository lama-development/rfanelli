"use client"
import { useState, useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
} from "@/components/ui/dropdown"
import { MenuItem } from "@/components/ui/menu-item"
import { Sun, Moon, Monitor } from "lucide-react"
import { Tooltip } from "@/components/ui/tooltip"
import { motion, useReducedMotion } from "motion/react"
import { spring } from "@/lib/springs"
import { useSize } from "@/lib/size-context"
const subscribe = () => () => {}
const options = [
  { value: "light", label: "Chiaro", icon: Sun },
  { value: "dark", label: "Scuro", icon: Moon },
  { value: "system", label: "Sistema", icon: Monitor },
] as const
export function AuthorTheme() {
  const [open, setOpen] = useState(false)
  const reducedMotion = useReducedMotion()
  const iconSize = useSize().icon
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
  const { theme, setTheme } = useTheme()
  const selected = mounted ? (theme ?? "system") : "system"
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === selected)
  )
  const triggerLabel = `Cambia tema: ${options[selectedIndex].label}`
  return (
    <div className="author-theme">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <Tooltip content={triggerLabel} forceOpen={open ? false : undefined}>
          <DropdownTrigger
            render={
              <Button
                variant="ghost"
                className="theme-trigger fluid-hit-target"
                aria-label={triggerLabel}
                active={open}
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className="theme-icon-stack"
                    style={{ width: iconSize, height: iconSize }}
                    aria-hidden="true"
                  >
                    {options.map(({ value, icon: Icon }) => {
                      const visible = value === selected
                      return (
                        <motion.span
                          key={value}
                          className="col-start-1 row-start-1 flex"
                          initial={false}
                          animate={{
                            opacity: visible ? 1 : 0,
                            scale: reducedMotion || visible ? 1 : 0.6,
                            filter:
                              reducedMotion || visible
                                ? "blur(0px)"
                                : "blur(4px)",
                          }}
                          transition={
                            visible
                              ? {
                                  type: "tween",
                                  duration: spring.fast.duration,
                                  ease: "easeOut",
                                }
                              : {
                                  type: "tween",
                                  ...spring.fast.exit,
                                  ease: "easeIn",
                                }
                          }
                        >
                          <Icon size={iconSize} strokeWidth={1.5} />
                        </motion.span>
                      )
                    })}
                  </span>
                  <span className="[text-box:trim-both_cap_alphabetic]">
                    {options[selectedIndex].label}
                  </span>
                </span>
              </Button>
            }
          />
        </Tooltip>
        <DropdownContent
          className="w-40"
          checkedIndex={selectedIndex}
          side="top"
          align="end"
          collisionPadding={12}
        >
          {options.map(({ value, label, icon }, index) => (
            <MenuItem
              key={value}
              index={index}
              icon={icon}
              label={label}
              className={index < options.length - 1 ? "mb-1" : undefined}
              checked={selected === value}
              onSelect={() => setTheme(value)}
            />
          ))}
        </DropdownContent>
      </DropdownMenu>
    </div>
  )
}
