import './globals.css';

import type { Metadata } from 'next';

import HomeLayout from '@/components/home/home-layout/home-layout';
import { baseUrl } from '@/config';

const title = 'GraphiQL | ApiFinder';
const description =
  'GraphiQL is a playground/IDE for graphQL requests';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [
      {
        url: `${baseUrl}/main-graph.png`,
      },
    ],
  },
};

export default HomeLayout;
