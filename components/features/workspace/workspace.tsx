import { PageHeader } from '@/components/features/layout/page-header';
import { Button } from '@/components/ui/button';

export function Workspace() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <PageHeader
        title="Workspace"
        description="Manage your workspace and projects"
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button>New Workspace</Button>
          </>
        }
      />
    </div>
  );
}
