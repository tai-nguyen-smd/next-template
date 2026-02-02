'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { AlertMessage } from '@/components/custom/alert-message/alert-message';

export function MFASuccessScreen() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardContent className="flex flex-col items-center gap-4">
        {/* Success Icon */}
        <div className="flex size-16 items-center justify-center rounded-full bg-green-500">
          <Check className="size-8 text-white" strokeWidth={3} />
        </div>

        {/* Heading */}
        <div className="text-center">
          <Typography variant="h3" color="default" weight="bold" align="center">
            Register Successfully
          </Typography>
        </div>

        {/* Description */}
        <AlertMessage
          message="Your Saafehouse account has been successfully created!"
          variant="success"
        />

        {/* Sign In Button */}
        <Button asChild variant="default" className="w-full">
          <Link href="/auth/login">Sign In</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
