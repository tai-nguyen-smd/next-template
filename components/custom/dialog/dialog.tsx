'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';

const dialogContentVariants = cva('flex max-h-[90dvh] flex-col gap-4 p-4', {
  variants: {
    size: {
      sm: 'sm:max-w-[480px]',
      md: 'sm:max-w-[640px]',
      lg: 'sm:max-w-[800px]',
      xl: 'sm:max-w-[1000px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const dialogBodyVariants = cva('flex-1', {
  variants: {
    scrollable: {
      true: 'overflow-y-auto',
      false: '',
    },
  },
  defaultVariants: {
    scrollable: true,
  },
});

export interface AppDialogProps
  extends
    VariantProps<typeof dialogContentVariants>,
    VariantProps<typeof dialogBodyVariants> {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: React.ReactNode | string;
  description?: React.ReactNode | string;
  titleIcon?: React.ReactNode;

  customWidth?: number;

  footer?: React.ReactNode;

  className?: string;
  bodyClassName?: string;

  children: React.ReactNode;
}

export function AppDialog({
  open,
  onOpenChange,
  title,
  description,
  titleIcon,
  size,
  customWidth,
  scrollable,
  footer,
  className,
  bodyClassName,
  children,
}: AppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        style={customWidth ? { maxWidth: customWidth } : undefined}
        className={cn(dialogContentVariants({ size }), className)}
        aria-describedby={typeof title === 'string' ? title : undefined}
        aria-labelledby={typeof title === 'string' ? title : undefined}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            {titleIcon}
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className={cn(dialogBodyVariants({ scrollable }), bodyClassName)}>
          {children}
        </div>

        {footer && (
          <>
            <DialogFooter>{footer}</DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
