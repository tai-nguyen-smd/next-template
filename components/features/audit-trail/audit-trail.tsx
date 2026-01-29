import { PageHeader } from '@/components/features/layout/page-header';
import { Button } from '@/components/ui/button';

export function AuditTrail() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <PageHeader
        title="Audit Trail"
        description="View system activity and audit logs"
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button variant="outline">Filter</Button>
          </>
        }
      />
    </div>
  );
}
