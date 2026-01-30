'use client';
import { PageHeader } from '@/components/features/layout/page-header';
import { SecondaryTabs } from '@/components/features/layout/secondary-nav';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';

export function Reconciliation() {
  const [active, setActive] = useState('overview');
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <PageHeader
        title="Reconciliation"
        description="Reconcile accounts and transactions"
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button>Start Reconciliation</Button>
          </>
        }
      />
      <SecondaryTabs
        value={active}
        onValueChange={setActive}
        items={[
          { value: 'overview', label: 'Overview' },
          { value: 'eom', label: 'EOM Summary' },
          { value: 'daily', label: 'Daily Balance Series' },
          { value: 'seg', label: 'Segregation Tables' },
          { value: 'break', label: 'Break Aging' },
          { value: 'isem', label: 'ISEM Findings' },
          { value: 'evidence', label: 'Attached Evidence' },
          { value: 'audit', label: 'Audit Trail' },
        ]}
      >
        <TabsContent value="overview">Overview content</TabsContent>
        <TabsContent value="eom">EOM content</TabsContent>
      </SecondaryTabs>
    </div>
  );
}
