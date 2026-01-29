'use client';

import {
  BarChart,
  DollarSign,
  FileArchive,
  FileCheck,
  FileHeadphone,
  FileText,
  LucideAppWindow,
  User,
  Users,
} from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
export function NavMain() {
  const pathname = usePathname();

  function isActive(pathname: string, href: string) {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  }
  const items = useMemo(() => {
    return [
      { key: 'dashboard', href: '/dashboard', icon: BarChart, label: 'Dashboard' },
      {
        key: 'firm-management',
        href: '/firm-management',
        icon: User,
        label: 'Firm Management',
      },
      {
        key: 'reports-cmar-internal',
        href: '/reports-cmar-internal',
        icon: FileHeadphone,
        label: 'Reports',
      },
      {
        key: 'investor-mandate',
        href: '/investor-mandate',
        icon: Users,
        label: 'Investors',
      },
      { key: 'register', href: '/register', icon: FileText, label: 'Register' },
      {
        key: 'transaction',
        href: '/transaction',
        icon: DollarSign,
        label: 'Transaction',
      },
      {
        key: 'reconciliation',
        href: '/reconciliation',
        icon: FileArchive,
        label: 'Reconciliation',
      },
      {
        key: 'audit-trail',
        href: '/audit-trail',
        icon: FileCheck,
        label: 'Audit Trail',
      },
      {
        key: 'workspace',
        href: '/workspace',
        icon: LucideAppWindow,
        label: 'Workspace',
      },
    ];
  }, []);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>

      <SidebarMenu>
        {items.map(item => {
          const active = isActive(pathname, item.href);

          return (
            <SidebarMenuItem key={item.key}>
              <SidebarMenuButton
                asChild
                isActive={active}
                tooltip={item.label as string}
                className={cn(
                  'data-[active=true]:bg-primary data-[active=true]:text-primary-foreground',
                  'border-l-4 border-transparent data-[active=true]:border-amber-700'
                )}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
