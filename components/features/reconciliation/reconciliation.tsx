import { PageHeader } from '@/components/features/layout/page-header';
import { Button } from '@/components/ui/button';

export function Reconciliation() {
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
    </div>
  );
}
