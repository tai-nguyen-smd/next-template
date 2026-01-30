import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function AuthCard({
  children,
  title,
  description,
  className,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="flex flex-col items-center gap-4 text-xl">
          <Image src="/images/logo.png" alt="Logo" width={220} height={32} />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={cn('flex flex-col gap-5', className)}>
        {children}
      </CardContent>
    </Card>
  );
}
