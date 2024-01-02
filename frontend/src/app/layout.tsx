import './globals.css';

import type { Metadata } from 'next';
import { Montserrat, Source_Sans_3 } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';
import * as React from 'react';

import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import Providers from '@/utils/providers';

const montserrat = Montserrat({ subsets: ['latin'] });
const source_sans = Source_Sans_3({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GraphiQL | ApiFinder',
  description: 'GraphiQL is a playground/IDE for graphQL requests',
};

const RootLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${source_sans.className} ${montserrat.className}`}
      >
        <Providers>
          <div className='layout'>
            <Header />
            <main className='container dark'>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
