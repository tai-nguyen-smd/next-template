"use client"

import { useEffect, useState } from "react"

export function useChangeLocale() {
  const [pendingLocale, setPendingLocale] = useState<string | null>(null)

  useEffect(() => {
    if (!pendingLocale) return

    document.cookie = `NEXT_LOCALE=${pendingLocale}; path=/; max-age=31536000`
    window.location.reload()
  }, [pendingLocale])

  return setPendingLocale
}
