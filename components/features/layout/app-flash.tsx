'use client';

import Image from 'next/image';
import Logo from '@/public/images/logo.png';
import { cn } from '@/lib/utils';

export function AppFlash() {
  return (
    <div className="bg-primary/50 flex min-h-dvh items-center justify-center">
      <div className="relative">
        {/* Logo */}
        <Image
          src={Logo}
          alt="Logo"
          width={100}
          height={100}
          className="h-12 w-auto"
          priority
        />
      </div>
    </div>
  );
}
