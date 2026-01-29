'use client';

import { Bell, Check } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type Notification = {
  id: string;
  title: string;
  description?: string;
  href?: string;
  read?: boolean;
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New investor registered',
    description: 'John Doe just signed up',
    href: '/investors/123',
  },
  {
    id: '2',
    title: 'Report is ready',
    description: 'CMAR report generated',
    href: '/reports/456',
  },
  {
    id: '3',
    title: 'Transaction failed',
    description: 'TX-39291 needs attention',
    href: '/transaction/39291',
  },
];

export function AppNotification() {
  const router = useRouter();
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNavigate = (n: Notification) => {
    if (!n.read) markAsRead(n.id);
    if (n.href) router.push(n.href);
  };

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn('relative')}
          aria-label="Notifications"
        >
          <Bell className="size-5" />

          {unreadCount > 0 && (
            <Badge
              className={cn(
                'absolute -top-1 -right-1',
                'h-4 min-w-4 px-1 text-[10px]',
                'sm:h-5 sm:min-w-5 sm:text-xs'
              )}
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      {/* Content */}
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className={cn(
          // Mobile: almost full width
          'w-[calc(100vw-1rem)] max-w-none',
          // Desktop
          'sm:w-72 sm:max-w-72',
          'p-0'
        )}
      >
        {/* Header */}
        <DropdownMenuLabel className="px-4 py-3 text-sm font-semibold">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Empty state */}
        {notifications.length === 0 && (
          <div className="text-muted-foreground px-4 py-8 text-center text-sm">
            No notifications
          </div>
        )}

        {notifications.map(n => (
          <DropdownMenuItem
            key={n.id}
            className={cn(
              'group relative flex flex-col gap-1',
              'px-4 py-4 sm:py-3',
              'focus:bg-muted',
              !n.read && 'bg-muted/50'
            )}
          >
            <div className="flex w-full items-start justify-between gap-3">
              {/* Text */}
              <div className="flex flex-col gap-0.5">
                <span className="text-sm leading-snug font-medium">{n.title}</span>

                {n.description && (
                  <span className="text-muted-foreground text-xs">
                    {n.description}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-1">
                {/* Navigate button */}
                {n.href && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs"
                    onClick={e => {
                      e.stopPropagation();
                      if (!n.read) markAsRead(n.id);
                      router.push(n.href);
                    }}
                  >
                    Open
                  </Button>
                )}

                {/* Mark as read */}
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn('h-8 w-8', n.read && 'opacity-0')}
                  onClick={e => {
                    e.stopPropagation();
                    markAsRead(n.id);
                  }}
                  aria-label="Mark as read"
                >
                  <Check className="size-4" />
                </Button>
              </div>
            </div>
          </DropdownMenuItem>
        ))}

        {/* Footer */}
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-muted-foreground justify-center py-3 text-sm"
              onClick={markAllAsRead}
            >
              Mark all as read
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
