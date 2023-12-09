import type { AuthOptions } from 'next-auth';
import GoggleProvider from 'next-auth/providers/google';

export const googleAuthConfig: AuthOptions = {
  providers: [
    GoggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
};
