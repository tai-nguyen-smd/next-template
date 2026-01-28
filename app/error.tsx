'use client';

import { useEffect } from 'react';
import { Error500 } from '@/components/custom/error/500';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return <Error500 onReset={reset} />;
}
