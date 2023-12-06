import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';

import { config } from '@/src/config';
import {
  checkUser,
  fetchUserFavorites,
  fetchUserReviews,
} from '@/src/helpers/authServerHelpers';
import { createEmail } from '@/src/helpers/createEmail';
import { compareValue } from '@/src/helpers/hash-password';
import {
  checkExistUser,
  createUser,
} from '@/src/helpers/nextAuthHelpers';
import { mailOptions, transporter } from '@/src/helpers/nodemailer';
import { adapter } from '@/src/lib/firestore';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { from },
      }) {
        const result = await transporter.sendMail({
          ...mailOptions,
          subject: from,
          to: email,
          html: createEmail({
            url: url.replace('%2Fsign-in%', '%'),
            host: config.domain,
          }),
        });
        const failed = result.rejected
          .concat(result.pending)
          .filter(Boolean);

        if (failed.length) {
          throw new Error(
            `Email(s) (${failed.join(', ')}) could not be sent`
          );
        }
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', required: true },
        password: {
          label: 'password',
          type: 'password',
          required: true,
        },
      },
      async authorize(credentials) {
        const user = await checkUser(credentials?.email);

        if (!user) {
          throw new Error('Invalid email');
        }

        const isPasswordEqual = await compareValue(
          credentials?.password,
          user.password
        );

        if (!isPasswordEqual) {
          throw new Error('Invalid password');
        }

        if (!user) {
          throw new Error('Invalid email or password');
        }

        return user as User;
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile || !account) return false;

      const provider = account.provider;
      const email = profile.email;
      const name = profile.name;
      const image = profile.image;

      if (!email || !name) return false;

      const userExists = await checkExistUser(email);

      if (userExists) return true;

      if (provider === 'google') {
        createUser(email, name, image);
      }

      if (provider === 'email') {
        createUser(email, name);
      }

      return true;
    },
    async session({ session, token }) {
      const favorites = await fetchUserFavorites(session.user?.email);
      const reviews = await fetchUserReviews(session.user?.email);

      if (session) {
        session = Object.assign(
          {},
          session,
          { access_token: token.jti },
          { favorites },
          { reviews }
        );
      }

      return session;
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
  },

  adapter,
};

const authHandler = NextAuth(authOptions);

export default async function handler(...params: unknown[]) {
  await authHandler(...params);
}
