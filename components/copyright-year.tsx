"use client"

import { useSyncExternalStore } from "react"
import { intlLocale, timeZone } from "@/i18n/config"

const formatter = new Intl.DateTimeFormat(intlLocale, {
  year: "numeric",
  timeZone,
})
const currentYear = () => Number(formatter.format(new Date()))

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000)
  window.addEventListener("focus", onChange)
  return () => {
    window.clearInterval(timer)
    window.removeEventListener("focus", onChange)
  }
}

export function CopyrightYear({ initialYear }: { initialYear: number }) {
  return useSyncExternalStore(subscribe, currentYear, () => initialYear)
}
