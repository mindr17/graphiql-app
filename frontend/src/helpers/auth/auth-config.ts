import type { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { bcryptCompare } from './bcrypt-compare';
import { checkIfUserExists } from './check-if-user-exists';
import { getUserFromApi } from './get-user-from-api';

export const authConfig: AuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: {
          label: 'password',
          type: 'password',
          required: true,
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password: passwordInput } = credentials;

        const apiUser = await getUserFromApi(email);

        if (!apiUser) {
          throw new Error('Invalid email');
        }

        const { password_hash: apiUserPasswordHash } = apiUser;

        const isPasswordCorrect = await bcryptCompare(
          passwordInput,
          apiUserPasswordHash
        );

        if (!isPasswordCorrect) {
          throw new Error('Invalid password');
        }

        return apiUser;
      },
    }),
  ],
  callbacks: {
    async signIn(signInProps) {
      console.log('signInProps: ', signInProps);
      const { account, user } = signInProps;

      if (!account || !user) return false;

      const { email } = user;

      const userExists = await checkIfUserExists(email);

      console.log('userExists: ', userExists);
      if (userExists) return true;

      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
        };
      }

      return token;
    },
    async session(sessionProps) {
      const { session: oldSession, token } = sessionProps;

      if (!oldSession) return oldSession;

      const newSession = {
        ...oldSession,
        access_token: token.jti,
      };

      return newSession;
    },
  },
  pages: {
    signIn: '/sign-in',
  },
};
