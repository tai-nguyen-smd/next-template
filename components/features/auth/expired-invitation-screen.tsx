'use client';

import Link from 'next/link';
import { InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { AlertMessage } from '@/components/custom/alert-message/alert-message';

export function ExpiredInvitationScreen() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardContent className="flex flex-col items-center gap-3">
        {/* Success Icon */}
        <div className="flex size-10 items-center justify-center rounded-full">
          <InfoIcon className="text-primary-foreground/60 size-8" strokeWidth={3} />
        </div>

        {/* Heading */}
        <div className="text-center">
          <Typography variant="h3" color="default" weight="bold" align="center">
            Invitation Expired
          </Typography>
        </div>

        {/* Description */}
        <AlertMessage
          message="The registration link you used has expired or is no longer valid. Please contact the administrator to request a new link."
          variant="warning"
        />

        {/* Contact Administrator Button */}
        <Button asChild variant="default" className="w-full">
          <Link href="mailto:admin@saafehouse.com">Contact Administrator</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
