import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      // DISPLAY - Font: Public Sans
      "display-1": "font-public-sans text-[56px] leading-[64px]",
      "display-2": "font-public-sans text-[44px] leading-[54px]",
      "display-3": "font-public-sans text-[36px] leading-[24px]",

      // HEADLINE - Font: Karla
      "headline-1": "font-karla text-[32px] leading-[24px]",
      "headline-2": "font-karla text-[28px] leading-[36px]",
      "headline-3": "font-karla text-[24px] leading-[32px]",
      
      // Legacy headline variants (for backward compatibility)
      "h1": "font-karla text-[32px] leading-[24px]",
      "h2": "font-karla text-[28px] leading-[36px]",
      "h3": "font-karla text-[24px] leading-[32px]",

      // BODY - Font: Karla
      "body-1": "font-karla text-[18px] leading-[28px]",
      "body-2": "font-karla text-[16px] leading-[24px]",
      "body-3": "font-karla text-[14px] leading-[20px]",
      "body-4": "font-karla text-[12px] leading-[16px]",

      // BUTTON - Font: Karla
      "button-1": "font-karla text-[16px] leading-[24px]",
      "button-2": "font-karla text-[14px] leading-[20px]",

      // LABEL - Font: Karla
      "label-1": "font-karla text-[14px] leading-[20px]",
      "label-2": "font-karla text-[12px] leading-[26px]",
      "label-3": "font-karla text-[11px] leading-[16px]",
    },
    weight: {
      regular: "font-normal",
      semibold: "font-semibold",
      medium: "font-medium",
    },
  },
  defaultVariants: {
    variant: "body-2",
    weight: "regular",
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
  weight,
  className,
  ...props
}: TypographyProps) {
  // Auto-set weight for certain variants if not provided
  const autoWeight = React.useMemo(() => {
    if (weight) return weight;
    
    // Headlines default to semibold
    if (variant?.startsWith("headline-") || variant === "h1" || variant === "h2" || variant === "h3") {
      return "semibold";
    }
    
    // Buttons and labels default to medium
    if (variant?.startsWith("button-") || variant?.startsWith("label-")) {
      return "medium";
    }
    
    return "regular";
  }, [variant, weight]);

  return (
    <Component
      className={cn(typographyVariants({ variant, weight: autoWeight }), className)}
      {...props}
    />
  )
}
