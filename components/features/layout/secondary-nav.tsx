'use client';

import * as React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { TabsContent } from '@/components/ui/tabs';

type SecondaryTabItem = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

type SecondaryTabsProps = {
  value: string;
  onValueChange: (value: string) => void;
  items: SecondaryTabItem[];
  children: React.ReactNode;
  className?: string;
};

export function SecondaryTabs({
  value,
  onValueChange,
  items,
  children,
  className,
}: SecondaryTabsProps) {
  return (
    <Tabs
      orientation="horizontal"
      value={value}
      onValueChange={onValueChange}
      className={cn(className)}
    >
      {/* LEFT: secondary nav */}
      <TabsList className="h-full flex-col">
        {items.map(item => (
          <TabsTrigger key={item.value} value={item.value} disabled={item.disabled}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* RIGHT: content */}
      <TabsContent value={value}>{children}</TabsContent>
    </Tabs>
  );
}
