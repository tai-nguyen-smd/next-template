'use client';

import Link from 'next/link';
import { ShieldX, Home, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function Error403() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="bg-destructive/10 mx-auto mb-4 flex size-16 items-center justify-center rounded-full">
            <ShieldX className="text-destructive size-8" />
          </div>
          <CardTitle className="text-4xl font-bold">403</CardTitle>
          <CardDescription className="text-lg">Forbidden</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            You don&apos;t have permission to access this resource.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-2">
          <Button asChild variant="default">
            <Link href="/">
              <Home className="mr-2 size-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 size-4" />
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
