import type { NextAuthOptions } from 'next-auth';

import { credentialsProvider } from './providers/credentials-provider';
import { discordProvider } from './providers/discord-provider';
import { githubProvider } from './providers/github-provider';
import { googleProvider } from './providers/google-provider';
import { vkProvider } from './providers/vk-provider';

export const authConfig: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    credentialsProvider,
    googleProvider,
    githubProvider,
    vkProvider,
    discordProvider,
  ],
  callbacks: {
    async signIn(props): Promise<boolean> {
      const { account, user } = props;

      if (user && user.email) return true;

      if (!account) return false;

      const { provider } = account;

      if (provider === 'google') return true;

      if (provider === 'github') return true;

      return true;
    },
    async jwt(props) {
      const { token, user, account } = props;

      if (!account || !user) return token;

      return {
        ...token,
        accessToken: account.access_token,
      };
    },
    async session(props) {
      const { session: oldSession, token } = props;

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
