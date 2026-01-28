'use client';

import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function Error500(
  { onReset }: { onReset?: () => void } = { onReset: undefined }
) {
  const handleRetry = () => {
    if (onReset) {
      onReset();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="bg-destructive/10 mx-auto mb-4 flex size-16 items-center justify-center rounded-full">
            <AlertTriangle className="text-destructive size-8" />
          </div>
          <CardTitle className="text-4xl font-bold">500</CardTitle>
          <CardDescription className="text-lg">
            Internal Server Error
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Something went wrong on our end. Please try again later.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-2">
          <Button asChild variant="default">
            <Link href="/">
              <Home className="mr-2 size-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" onClick={handleRetry}>
            <RefreshCw className="mr-2 size-4" />
            Retry
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
