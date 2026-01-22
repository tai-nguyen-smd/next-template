"use client"

import { Languages, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useChangeLocale } from "@/hooks/use-change-locale"


const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "fr", name: "French", nativeName: "Français" },
] as const

export function LanguageToggle() {
  const locale =
    typeof document !== "undefined"
      ? document.body.dataset.locale ?? "en"
      : "en"

  const changeLocale = useChangeLocale()

  const handleLanguageChange = (newLocale: string) => {
    changeLocale(newLocale)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="cursor-pointer"
          >
            <span className="flex items-center gap-2 w-full">
              {language.nativeName}
              {locale === language.code && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
