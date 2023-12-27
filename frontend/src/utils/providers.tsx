'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import LocalesProvider from '@/components/providers/locales-provider';
import { store } from '@/store/store';

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <LocalesProvider>
        <SessionProvider>
          <NextUIProvider>
            <NextThemesProvider
              attribute='class'
              defaultTheme='dark'
              themes={['light', 'dark', 'modern']}
            >
              {children}
            </NextThemesProvider>
          </NextUIProvider>
        </SessionProvider>
      </LocalesProvider>
    </Provider>
  );
};

export default Providers;
