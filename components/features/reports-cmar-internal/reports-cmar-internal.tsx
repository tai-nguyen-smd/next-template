import { PageHeader } from '@/components/features/layout/page-header';
import { Button } from '@/components/ui/button';

export function ReportsCmarInternal() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <PageHeader
        title="Reports"
        description="View and manage your reports"
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button>Generate Report</Button>
          </>
        }
      />
    </div>
  );
}
