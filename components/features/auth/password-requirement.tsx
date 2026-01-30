import { CircleCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Typography } from '@/components/ui/typography';

export type PasswordRule = {
  key: string;
  label: string;
  test: (value: string) => boolean;
};

export const PASSWORD_RULES: PasswordRule[] = [
  {
    key: 'minLength',
    label: 'At least 8 characters',
    test: v => v.length >= 8,
  },
  {
    key: 'uppercase',
    label: 'Uppercase letter',
    test: v => /[A-Z]/.test(v),
  },
  {
    key: 'number',
    label: 'At least 1 number',
    test: v => /\d/.test(v),
  },
  {
    key: 'specialChar',
    label: 'Special character',
    test: v => /[^A-Za-z0-9]/.test(v),
  },
];

type PasswordRequirementsProps = {
  value?: string;
  className?: string;
};

export function PasswordRequirements({
  value = '',
  className,
}: PasswordRequirementsProps) {
  return (
    <div className={cn('space-y-1', className)}>
      {PASSWORD_RULES.map(rule => {
        const met = rule.test(value);

        return (
          <div key={rule.key} className="flex items-center gap-1">
            <CircleCheck
              className={cn(
                'h-4 w-4',
                met ? 'text-green-500' : 'text-muted-foreground'
              )}
              strokeWidth={2}
            />

            <Typography variant="span" color={met ? 'success' : 'muted'}>
              {rule.label}
            </Typography>
          </div>
        );
      })}
    </div>
  );
}
