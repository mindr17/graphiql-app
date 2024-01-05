import NextAuth from 'next-auth';

import { authConfig } from '@/helpers/auth/auth-config';

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
