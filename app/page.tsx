import { ModeToggle } from "@/components/ui/mode-toggle";
import { Typography } from "@/components/ui/typography";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Typography variant="h1" >Mode</Typography>
      <ModeToggle />
    </div>
  );
}
