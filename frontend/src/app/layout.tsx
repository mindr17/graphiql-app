import type { Metadata } from 'next';
import { Montserrat, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });
const source_sans = Source_Sans_3({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GraphiQL | ApiFinder',
  description: 'GraphiQL is a playground/IDE for graphQL requests',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${source_sans.className} ${montserrat.className}`}
      >
        <main className='container'>{children}</main>
      </body>
    </html>
  );
}
