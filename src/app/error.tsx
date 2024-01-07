'use client';

import { useEffect } from 'react';

import ErrorBoundary from '@/components/error-boundary/error-boundary';

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorBoundary onReset={reset} />;
};

export default Error;
