'use client';
import { AppDialog } from '@/components/custom/dialog/dialog';
import { PageHeader } from '@/components/features/layout/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Typography } from '@/components/ui/typography';
import { useState } from 'react';

export function Register() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <PageHeader
          title="Register"
          description="Register new entries and documents"
          backHref="/dashboard"
          badge={<Badge variant="outline">New</Badge>}
          actions={
            <>
              <Button variant="outline">Export</Button>
              <Button onClick={() => setOpen(true)}>New Entry</Button>
            </>
          }
        />
      </div>
      <AppDialog
        open={open}
        onOpenChange={setOpen}
        title="Register"
        size="sm"
        onCancel={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        footer={
          <div className="flex gap-2">
            <Checkbox />
            <Typography variant="span" as="label">
              By clicking OK, you agree to the terms and conditions.
            </Typography>
          </div>
        }
      >
        <div>
          <Typography variant="h3">Register</Typography>
        </div>
      </AppDialog>
    </>
  );
}
