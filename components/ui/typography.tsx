import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const typographyVariants = cva("", {
  variants: {
    variant: {
      // DISPLAY
      "display-1": "font-public-sans text-[56px] leading-[64px]",
      "display-2": "font-public-sans text-[44px] leading-[54px]",
      "display-3": "font-public-sans text-[36px] leading-[42px]",

      // HEADLINE
      "h1": "font-karla text-[32px] leading-[42px] font-semibold",
      "h2": "font-karla text-[28px] leading-[36px] font-semibold",
      "h3": "font-karla text-[24px] leading-[32px] font-semibold",

      // BODY
      "body-1": "font-karla text-[18px] leading-[28px]",
      "body-2": "font-karla text-[16px] leading-[24px]",
      "body-3": "font-karla text-[14px] leading-[20px]",
      "body-4": "font-karla text-[12px] leading-[16px]",

      // BUTTON
      "button-1": "font-karla text-[16px] leading-[24px] font-medium",
      "button-2": "font-karla text-[14px] leading-[20px] font-medium",

      // LABEL
      "label-1": "font-karla text-[14px] leading-[20px] font-medium",
      "label-2": "font-karla text-[12px] leading-[16px] font-medium",
      "label-3": "font-karla text-[11px] leading-[16px] font-medium",
    },
  },
  defaultVariants: {
    variant: "body-2",
  },
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType
}

export function Typography({
  as: Component = "p",
  variant,
  className,
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  )
}
