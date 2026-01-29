import { PageHeader } from '@/components/features/layout/page-header';
import { Button } from '@/components/ui/button';

export function Transaction() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <PageHeader
        title="Transaction"
        description="View and manage transactions"
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button>New Transaction</Button>
          </>
        }
      />
    </div>
  );
}
