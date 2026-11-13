"use client"

import { useSyncExternalStore } from "react"

const formatter = new Intl.DateTimeFormat("it-IT", {
  year: "numeric",
  timeZone: "Europe/Rome",
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
