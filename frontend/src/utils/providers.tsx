'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

import LocalesProvider from '@/components/providers/locales-provider';

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <LocalesProvider>
      <SessionProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </SessionProvider>
    </LocalesProvider>
  );
};

export default Providers;
