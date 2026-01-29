import { FirmSwitcher } from '@/components/features/layout/firm-switcher';
import { AppNotification } from '@/components/features/layout/app-notification';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default async function AppHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b">
      {/* Left */}
      <div className="flex shrink-0 items-center gap-1 px-2 md:gap-2 md:px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <FirmSwitcher />
      </div>

      {/* Right */}
      <div className="flex flex-1 items-center justify-end gap-2 pr-2 md:pr-4">
        <AppNotification />
      </div>
    </header>
  );
}
