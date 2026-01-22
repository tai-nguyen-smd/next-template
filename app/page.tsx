import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Typography } from "@/components/ui/typography";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  return (
    <div className="flex flex-col p-4 gap-4 min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <Typography variant="h1" className="text-center">Mode</Typography>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ModeToggle />
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            {t("home-page.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Typography variant="body-1">
            {t("home-page.description")}
          </Typography>
          <LanguageToggle />
        </CardContent>
      </Card>
    </div>
  );
}
