'use client';
import { AppDialog } from '@/components/custom/dialog/dialog';
import { PageHeader } from '@/components/features/layout/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
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
