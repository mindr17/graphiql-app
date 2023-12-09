import './globals.css';

import type { Metadata } from 'next';
import { Montserrat, Source_Sans_3 } from 'next/font/google';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import ThemeSwitcher from '@/components/theme-switcher';
import Providers from '@/utils/providers';

const montserrat = Montserrat({ subsets: ['latin'] });
const source_sans = Source_Sans_3({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GraphiQL | ApiFinder',
  description: 'GraphiQL is a playground/IDE for graphQL requests',
};

export const RootLayout: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <html lang='en'>
      <body
        className={`${source_sans.className} ${montserrat.className}`}
      >
        <Providers>
          <header className='py-6'>
            <nav className='container flex items-center justify-between'>
              <ul>
                <li>
                  <Link href='/'>Home</Link>
                </li>
              </ul>
              <ThemeSwitcher />
            </nav>
          </header>
          <main className='container'>{children}</main>
        </Providers>
      </body>
    </html>
  );
};
