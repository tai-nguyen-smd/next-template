import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const typographyVariants = cva('text-foreground', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-base font-semibold tracking-tight',

      p: 'text-sm leading-7',
      lead: 'text-xl text-muted-foreground',
      blockquote: 'mt-6 border-l-2 pl-6 italic text-muted-foreground',
      span: 'text-sm inline-block',
    },

    color: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
    },

    weight: {
      default: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },

    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
  },

  defaultVariants: {
    variant: 'p',
    color: 'default',
    weight: 'default',
  },
});

const tagMap: Record<
  NonNullable<VariantProps<typeof typographyVariants>['variant']>,
  React.ElementType
> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  lead: 'p',
  blockquote: 'blockquote',
  span: 'span',
};

export type TypographyProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariants> & {
    as?: React.ElementType;
    truncate?: boolean;
    noWrap?: boolean;
  };

export function Typography({
  variant,
  color,
  weight,
  align,
  as,
  truncate,
  noWrap,
  className,
  ...props
}: TypographyProps) {
  const Comp = as ?? tagMap[variant ?? 'p'];

  return (
    <Comp
      className={cn(
        typographyVariants({ variant, color, weight, align }),
        truncate && 'truncate',
        noWrap && 'whitespace-nowrap',
        className
      )}
      {...props}
    />
  );
}
