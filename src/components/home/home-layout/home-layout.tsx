import { Montserrat, Source_Sans_3 } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';

import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import Providers from '@/utils/providers';

import styles from './home-layout.module.scss';

const montserrat = Montserrat({ subsets: ['latin'] });
const source_sans = Source_Sans_3({ subsets: ['latin'] });

const HomeLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${source_sans.className} ${montserrat.className}`}
      >
        <Providers>
          <div className={styles.container}>
            <Header />
            <main className={'container dark'}>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default HomeLayout;
