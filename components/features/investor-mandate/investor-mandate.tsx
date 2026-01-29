import { PageHeader } from '@/components/features/layout/page-header';
import { Button } from '@/components/ui/button';

export function InvestorMandate() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <PageHeader
        title="Investors"
        description="Manage investor mandates and information"
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button>Add Investor</Button>
          </>
        }
      />
    </div>
  );
}
