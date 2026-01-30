'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

type PageHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  backHref?: string;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  description,
  badge,
  backHref,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-4 px-4 py-4 md:px-6 md:py-6', className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        {/* Left */}
        <div className="flex min-w-0 flex-row gap-1">
          {backHref && (
            <Button asChild variant="ghost" size="icon" className="-ml-1 h-8 w-8">
              <Link href={backHref} aria-label="Go back">
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
          )}

          <div className="items-left flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <Typography variant="h2" truncate weight="bold">
                {title}
              </Typography>

              {badge && <div className="shrink-0">{badge}</div>}
            </div>

            {description && (
              <Typography variant="p" color="muted" weight="medium">
                {description}
              </Typography>
            )}
          </div>
        </div>

        {/* Right actions */}
        {actions && (
          <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
