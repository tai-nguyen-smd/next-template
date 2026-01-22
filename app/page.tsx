import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Typography } from "@/components/ui/typography";
import { useTranslations } from "next-intl";

// Color palette data
const colorPalette = {
  primary: [
    { name: "Neon Yellow", hex: "#F4FF79", token: "brand-primary" },
  ],
  secondary: [
    { name: "Pale Blue Grey", hex: "#C2D7DB", token: "secondary-blue" },
    { name: "Soft Lavender", hex: "#D8D7F6", token: "secondary-lavender" },
    { name: "Cool Grey", hex: "#C0C0C0", token: "secondary-grey" },
  ],
  tertiary: [
    { name: "Light Grey", hex: "#F9F9F9", token: "tertiary-light" },
    { name: "Neutral Grey", hex: "#F0F0F0", token: "tertiary-neutral" },
    { name: "Dark Grey", hex: "#717171", token: "tertiary-dark" },
    { name: "Charcoal", hex: "#292929", token: "tertiary-charcoal" },
  ],
  neutral: [
    { name: "Green", hex: "#4DCB7B", token: "neutral-green" },
    { name: "Orange", hex: "#FF8E63", token: "neutral-orange" },
    { name: "Red", hex: "#DE3730", token: "neutral-red" },
    { name: "Cyan", hex: "#00AFD6", token: "neutral-cyan" },
  ],
};

// Usage examples for each color
const getUsageExamples = (token: string) => [
  `bg-${token}`,
  `text-${token}`,
  `border-${token}`,
  `bg-${token}/10`,
];

// Typography variant type
type TypographyVariant = 
  | "display-1" | "display-2" | "display-3"
  | "headline-1" | "headline-2" | "headline-3"
  | "body-1" | "body-2" | "body-3" | "body-4"
  | "button-1" | "button-2"
  | "label-1" | "label-2" | "label-3";

// Typography data
const typographyData: {
  display: Array<{ name: string; variant: TypographyVariant; font: string; size: string; lineHeight: string }>;
  headline: Array<{ name: string; variant: TypographyVariant; font: string; size: string; lineHeight: string }>;
  body: Array<{ name: string; variant: TypographyVariant; font: string; size: string; lineHeight: string }>;
  button: Array<{ name: string; variant: TypographyVariant; font: string; size: string; lineHeight: string }>;
  label: Array<{ name: string; variant: TypographyVariant; font: string; size: string; lineHeight: string }>;
} = {
  display: [
    { name: "Display 1", variant: "display-1", font: "Public Sans", size: "56px", lineHeight: "64px" },
    { name: "Display 2", variant: "display-2", font: "Public Sans", size: "44px", lineHeight: "54px" },
    { name: "Display 3", variant: "display-3", font: "Public Sans", size: "36px", lineHeight: "24px" },
  ],
  headline: [
    { name: "Headline 1", variant: "headline-1", font: "Karla", size: "32px", lineHeight: "24px" },
    { name: "Headline 2", variant: "headline-2", font: "Karla", size: "28px", lineHeight: "36px" },
    { name: "Headline 3", variant: "headline-3", font: "Karla", size: "24px", lineHeight: "32px" },
  ],
  body: [
    { name: "Body 1", variant: "body-1", font: "Karla", size: "18px", lineHeight: "28px" },
    { name: "Body 2", variant: "body-2", font: "Karla", size: "16px", lineHeight: "24px" },
    { name: "Body 3", variant: "body-3", font: "Karla", size: "14px", lineHeight: "20px" },
    { name: "Body 4", variant: "body-4", font: "Karla", size: "12px", lineHeight: "16px" },
  ],
  button: [
    { name: "Button 1", variant: "button-1", font: "Karla", size: "16px", lineHeight: "24px" },
    { name: "Button 2", variant: "button-2", font: "Karla", size: "14px", lineHeight: "20px" },
  ],
  label: [
    { name: "Label 1", variant: "label-1", font: "Karla", size: "14px", lineHeight: "20px" },
    { name: "Label 2", variant: "label-2", font: "Karla", size: "12px", lineHeight: "26px" },
    { name: "Label 3", variant: "label-3", font: "Karla", size: "11px", lineHeight: "16px" },
  ],
};

export default function Home() {
  const t = useTranslations();
  return (
    <div className="flex flex-col p-4 gap-6 min-h-screen bg-tertiary-light font-sans dark:bg-tertiary-charcoal">
      {/* Header Section */}
      <div className="flex flex-col gap-4 max-w-7xl w-full">
        <Card className="w-full border-brand-primary border-2">
          <CardHeader>
            <CardTitle>
              <Typography variant="h1" className="text-center text-brand-primary">Mode</Typography>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ModeToggle />
          </CardContent>
        </Card>

        <Card className="w-full bg-secondary-blue/10 border-secondary-lavender">
          <CardHeader>
            <CardTitle className="text-secondary-lavender">
              {t("home-page.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant="body-1" className="text-tertiary-dark dark:text-tertiary-light">
              {t("home-page.description")}
            </Typography>
            <LanguageToggle />
          </CardContent>
        </Card>
      </div>

      {/* Color Palette Display */}
      <div className="max-w-7xl w-full space-y-8">
        {/* Primary Color */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-tertiary-charcoal dark:text-tertiary-light">
              Primary Color
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {colorPalette.primary.map((color) => (
                <div key={color.token} className="flex flex-col gap-2">
                  <div
                    className="w-full h-20 rounded-lg bg-brand-primary border-2 border-tertiary-neutral dark:border-tertiary-dark"
                  />
                  <div className="space-y-0.5">
                    <Typography variant="body-2" className="font-semibold text-tertiary-charcoal dark:text-tertiary-light text-sm">
                      {color.name}
                    </Typography>
                    <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-mono text-xs">
                      {color.hex}
                    </Typography>
                  </div>
                  <div className="space-y-1.5 pt-1.5 border-t border-tertiary-neutral dark:border-tertiary-dark">
                    <Typography variant="body-2" className="text-[10px] font-semibold text-tertiary-dark dark:text-tertiary-light uppercase">
                      Usage:
                    </Typography>
                    <div className="flex flex-wrap gap-1">
                      {getUsageExamples(color.token).map((usage) => (
                        <code
                          key={usage}
                          className="px-1.5 py-0.5 text-[10px] bg-tertiary-neutral dark:bg-tertiary-dark rounded text-tertiary-charcoal dark:text-tertiary-light font-mono"
                        >
                          {usage}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Secondary Colors */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-tertiary-charcoal dark:text-tertiary-light">
              Secondary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {colorPalette.secondary.map((color) => (
                <div key={color.token} className="flex flex-col gap-2">
                  <div
                    className="w-full h-20 rounded-lg border-2 border-tertiary-neutral dark:border-tertiary-dark"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="space-y-0.5">
                    <Typography variant="body-2" className="font-semibold text-tertiary-charcoal dark:text-tertiary-light text-sm">
                      {color.name}
                    </Typography>
                    <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-mono text-xs">
                      {color.hex}
                    </Typography>
                  </div>
                  <div className="space-y-1.5 pt-1.5 border-t border-tertiary-neutral dark:border-tertiary-dark">
                    <Typography variant="body-2" className="text-[10px] font-semibold text-tertiary-dark dark:text-tertiary-light uppercase">
                      Usage:
                    </Typography>
                    <div className="flex flex-wrap gap-1">
                      {getUsageExamples(color.token).map((usage) => (
                        <code
                          key={usage}
                          className="px-1.5 py-0.5 text-[10px] bg-tertiary-neutral dark:bg-tertiary-dark rounded text-tertiary-charcoal dark:text-tertiary-light font-mono"
                        >
                          {usage}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tertiary Colors */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-tertiary-charcoal dark:text-tertiary-light">
              Tertiary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {colorPalette.tertiary.map((color) => (
                <div key={color.token} className="flex flex-col gap-2">
                  <div
                    className="w-full h-20 rounded-lg border-2 border-tertiary-neutral dark:border-tertiary-dark"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="space-y-0.5">
                    <Typography variant="body-2" className="font-semibold text-tertiary-charcoal dark:text-tertiary-light text-sm">
                      {color.name}
                    </Typography>
                    <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-mono text-xs">
                      {color.hex}
                    </Typography>
                  </div>
                  <div className="space-y-1.5 pt-1.5 border-t border-tertiary-neutral dark:border-tertiary-dark">
                    <Typography variant="body-2" className="text-[10px] font-semibold text-tertiary-dark dark:text-tertiary-light uppercase">
                      Usage:
                    </Typography>
                    <div className="flex flex-wrap gap-1">
                      {getUsageExamples(color.token).map((usage) => (
                        <code
                          key={usage}
                          className="px-1.5 py-0.5 text-[10px] bg-tertiary-neutral dark:bg-tertiary-dark rounded text-tertiary-charcoal dark:text-tertiary-light font-mono"
                        >
                          {usage}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Neutral Colors */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-tertiary-charcoal dark:text-tertiary-light">
              Neutral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {colorPalette.neutral.map((color) => (
                <div key={color.token} className="flex flex-col gap-2">
                  <div
                    className="w-full h-20 rounded-lg border-2 border-tertiary-neutral dark:border-tertiary-dark"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="space-y-0.5">
                    <Typography variant="body-2" className="font-semibold text-tertiary-charcoal dark:text-tertiary-light text-sm">
                      {color.name}
                    </Typography>
                    <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-mono text-xs">
                      {color.hex}
                    </Typography>
                  </div>
                  <div className="space-y-1.5 pt-1.5 border-t border-tertiary-neutral dark:border-tertiary-dark">
                    <Typography variant="body-2" className="text-[10px] font-semibold text-tertiary-dark dark:text-tertiary-light uppercase">
                      Usage:
                    </Typography>
                    <div className="flex flex-wrap gap-1">
                      {getUsageExamples(color.token).map((usage) => (
                        <code
                          key={usage}
                          className="px-1.5 py-0.5 text-[10px] bg-tertiary-neutral dark:bg-tertiary-dark rounded text-tertiary-charcoal dark:text-tertiary-light font-mono"
                        >
                          {usage}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Typography Display */}
      <div className="max-w-7xl w-full space-y-8">
        {/* Display Typography */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-tertiary-charcoal dark:text-tertiary-light">
              Display (Font: Public Sans)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-semibold mb-4">
                    Font
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-semibold mb-4">
                    Regular
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-semibold mb-4">
                    Semibold
                  </Typography>
                </div>
              </div>
              {typographyData.display.map((type) => (
                <div key={type.variant} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div>
                    <Typography variant="body-2" className="font-semibold text-tertiary-charcoal dark:text-tertiary-light mb-1">
                      {type.name}
                    </Typography>
                    <Typography variant="body-3" className="text-tertiary-dark dark:text-tertiary-light font-mono text-xs">
                      Font size/ line high: {type.size}/{type.lineHeight}
                    </Typography>
                  </div>
                  <div className="border border-tertiary-neutral dark:border-tertiary-dark rounded-lg p-4 bg-tertiary-light dark:bg-tertiary-dark">
                    <Typography variant={type.variant} weight="regular">
                      {type.name}
                    </Typography>
                  </div>
                  <div className="border border-tertiary-neutral dark:border-tertiary-dark rounded-lg p-4 bg-tertiary-light dark:bg-tertiary-dark">
                    <Typography variant={type.variant} weight="semibold">
                      {type.name}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Headline Typography */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-tertiary-charcoal dark:text-tertiary-light">
              Headline (Font: Karla)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-semibold mb-4">
                    Font
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-semibold mb-4">
                    Regular
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-semibold mb-4">
                    Semibold
                  </Typography>
                </div>
              </div>
              {typographyData.headline.map((type) => (
                <div key={type.variant} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div>
                    <Typography variant="body-2" className="font-semibold text-tertiary-charcoal dark:text-tertiary-light mb-1">
                      {type.name}
                    </Typography>
                    <Typography variant="body-3" className="text-tertiary-dark dark:text-tertiary-light font-mono text-xs">
                      Font size/ line high: {type.size}/{type.lineHeight}
                    </Typography>
                  </div>
                  <div className="border border-tertiary-neutral dark:border-tertiary-dark rounded-lg p-4 bg-tertiary-light dark:bg-tertiary-dark">
                    <Typography variant={type.variant} weight="regular">
                      {type.name}
                    </Typography>
                  </div>
                  <div className="border border-tertiary-neutral dark:border-tertiary-dark rounded-lg p-4 bg-tertiary-light dark:bg-tertiary-dark">
                    <Typography variant={type.variant} weight="semibold">
                      {type.name}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Body Typography */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-tertiary-charcoal dark:text-tertiary-light">
              Body (Font: Karla)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-semibold mb-4">
                    Font
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-semibold mb-4">
                    Regular
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-semibold mb-4">
                    Semibold
                  </Typography>
                </div>
              </div>
              {typographyData.body.map((type) => (
                <div key={type.variant} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div>
                    <Typography variant="body-2" className="font-semibold text-tertiary-charcoal dark:text-tertiary-light mb-1">
                      {type.name}
                    </Typography>
                    <Typography variant="body-3" className="text-tertiary-dark dark:text-tertiary-light font-mono text-xs">
                      Font size/ line high: {type.size}/{type.lineHeight}
                    </Typography>
                  </div>
                  <div className="border border-tertiary-neutral dark:border-tertiary-dark rounded-lg p-4 bg-tertiary-light dark:bg-tertiary-dark">
                    <Typography variant={type.variant} weight="regular">
                      {type.name}
                    </Typography>
                  </div>
                  <div className="border border-tertiary-neutral dark:border-tertiary-dark rounded-lg p-4 bg-tertiary-light dark:bg-tertiary-dark">
                    <Typography variant={type.variant} weight="semibold">
                      {type.name}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Button Typography */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-tertiary-charcoal dark:text-tertiary-light">
              Button (Font: Karla)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-semibold mb-4">
                    Font
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-semibold mb-4">
                    Regular
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-semibold mb-4">
                    Semibold
                  </Typography>
                </div>
              </div>
              {typographyData.button.map((type) => (
                <div key={type.variant} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div>
                    <Typography variant="body-2" className="font-semibold text-tertiary-charcoal dark:text-tertiary-light mb-1">
                      {type.name}
                    </Typography>
                    <Typography variant="body-3" className="text-tertiary-dark dark:text-tertiary-light font-mono text-xs">
                      Font size/ line high: {type.size}/{type.lineHeight}
                    </Typography>
                  </div>
                  <div className="border border-tertiary-neutral dark:border-tertiary-dark rounded-lg p-4 bg-tertiary-light dark:bg-tertiary-dark">
                    <Typography variant={type.variant} weight="regular">
                      {type.name}
                    </Typography>
                  </div>
                  <div className="border border-tertiary-neutral dark:border-tertiary-dark rounded-lg p-4 bg-tertiary-light dark:bg-tertiary-dark">
                    <Typography variant={type.variant} weight="semibold">
                      {type.name}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Label Typography */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-tertiary-charcoal dark:text-tertiary-light">
              Label (Font: Karla)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-semibold mb-4">
                    Font
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-semibold mb-4">
                    Regular
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="body-2" className="text-tertiary-dark dark:text-tertiary-light font-semibold mb-4">
                    Semibold
                  </Typography>
                </div>
              </div>
              {typographyData.label.map((type) => (
                <div key={type.variant} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div>
                    <Typography variant="body-2" className="font-semibold text-tertiary-charcoal dark:text-tertiary-light mb-1">
                      {type.name}
                    </Typography>
                    <Typography variant="body-3" className="text-tertiary-dark dark:text-tertiary-light font-mono text-xs">
                      Font size/ line high: {type.size}/{type.lineHeight}
                    </Typography>
                  </div>
                  <div className="border border-tertiary-neutral dark:border-tertiary-dark rounded-lg p-4 bg-tertiary-light dark:bg-tertiary-dark">
                    <Typography variant={type.variant} weight="regular">
                      {type.name}
                    </Typography>
                  </div>
                  <div className="border border-tertiary-neutral dark:border-tertiary-dark rounded-lg p-4 bg-tertiary-light dark:bg-tertiary-dark">
                    <Typography variant={type.variant} weight="semibold">
                      {type.name}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
