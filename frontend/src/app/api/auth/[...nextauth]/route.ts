import NextAuth from 'next-auth';

import { googleAuthConfig } from '../../../../../configs/auth';

const handler = NextAuth(googleAuthConfig);

export { handler as GET, handler as POST };
