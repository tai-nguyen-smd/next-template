import { PageHeader } from '@/components/features/layout/page-header';
import { Button } from '@/components/ui/button';

export function FirmManagement() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <PageHeader
        title="Firm Management"
        description="Manage your firm information and settings"
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button>Create Firm</Button>
          </>
        }
      />
    </div>
  );
}
