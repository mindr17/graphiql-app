'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <NextUIProvider>
        <NextThemesProvider
          attribute='class'
          defaultTheme='dark'
          themes={['light', 'dark']}
        >
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;

// display: flex;
// flex-wrap: nowrap;
// flex-direction: column;
// justify-content: start;
// align-items: stretch;
// height: 100vh;
// width: 100%;
