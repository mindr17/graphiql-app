'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

import { AuthProvier } from '../providers';

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvier>
      <NextUIProvider>
        <NextThemesProvider
          attribute='class'
          defaultTheme='dark'
          themes={['light', 'dark', 'modern']}
        >
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </AuthProvier>
  );
};

export default Providers;
