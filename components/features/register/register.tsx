import { PageHeader } from '@/components/features/layout/page-header';
import { Button } from '@/components/ui/button';

export function Register() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <PageHeader
        title="Register"
        description="Register new entries and documents"
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button>New Entry</Button>
          </>
        }
      />
    </div>
  );
}
