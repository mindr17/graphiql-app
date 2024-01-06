import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authConfig } from '@/helpers/auth/auth-config';

type From = 'authorized' | 'unauthorized';

export const protectPageFrom = async (
  from: From = 'unauthorized'
) => {
  const session = await getServerSession(authConfig);
  const isLoggedIn = session && session.user?.email;

  if (from === 'unauthorized' && !isLoggedIn) {
    redirect('/sign-in');
  }

  if (from === 'authorized' && isLoggedIn) {
    redirect('/');
  }

  return;
};
