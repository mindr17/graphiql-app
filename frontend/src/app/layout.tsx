import './globals.css';

import { Link } from '@nextui-org/react';
import type { Metadata } from 'next';
import { Montserrat, Source_Sans_3 } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';

import ThemeSwitcher from '@/components/theme-switcher';
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
    <html lang='en'>
      <body
        className={`${source_sans.className} ${montserrat.className}`}
      >
        <Providers>
          <header className='py-6'>
            <nav className='container flex items-center justify-between'>
              <ul className='flex gap-2'>
                <li>
                  <Link href='/'>Home</Link>
                </li>
                <li>
                  <Link href='/client-profile'>Client Profile</Link>
                </li>
                <li>
                  <Link href='/backend-profile'>Backend Profile</Link>
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

export default RootLayout;
