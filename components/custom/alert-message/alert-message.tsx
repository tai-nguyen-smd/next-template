import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

export function AlertMessage({
  message,
  variant,
}: {
  message: string;
  variant: 'default' | 'destructive' | 'success' | 'warning' | 'info';
}) {
  const alertVariants = cva(
    'border-orange-200 bg-orange-50 text-orange-700 text-sm p-2',
    {
      variants: {
        variant: {
          default: 'border-orange-200 bg-orange-50',
          destructive: 'border-destructive bg-destructive/10 text-destructive',
          success: 'border-green-200 bg-green-50 text-green-700',
          warning: 'border-yellow-200 bg-yellow-50 text-yellow-700',
          info: 'border-blue-200 bg-blue-50 text-blue-700',
        },
      },
    }
  );
  return (
    <Alert className={alertVariants({ variant })}>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
