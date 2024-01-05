import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authConfig } from './auth-config';

export const protectFromUnauthorized = async () => {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.email) redirect('/');

  return;
};
