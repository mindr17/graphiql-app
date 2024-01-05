import type { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { bcryptCompare } from './bcrypt-compare';
import { checkIfUserExists } from './check-if-user-exists';
import { createUser } from './create-user';
import { getUser, getUserFromApi } from './get-user-from-api';

// const users = [
//   {
//     id: '1',
//     email: 'de17eon@gmail.com',
//     name: 'Leni',
//     password: '12345678',
//     role: 'admin',
//   },
// ];

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

        const { password: apiUserPasswordHash } = apiUser;

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
      const { account, profile } = signInProps;

      if (!profile || !account) return false;

      // const { provider } = account;
      const { email, name } = profile;

      if (!email || !name) return false;

      // const userExists = await checkIfUserExists(email);

      // if (userExists) return true;

      // const inputUser = { email, password_hash };

      // createUser(inputUser);

      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          name: user.name,
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
