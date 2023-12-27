'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

import LocalesProvider from '@/components/providers/locales-provider';

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  return (
    <LocalesProvider>
      <SessionProvider>
        <NextThemesProvider
          attribute='class'
          defaultTheme='dark'
          themes={['light', 'dark', 'modern']}
        >
          <NextUIProvider navigate={router.push}>
            {children}
          </NextUIProvider>
        </NextThemesProvider>
      </SessionProvider>
    </LocalesProvider>
  );
};

export default Providers;
