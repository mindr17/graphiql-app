import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoggleProvider from 'next-auth/providers/google';

const users = [
  {
    id: '1',
    email: 'de17eon@gmail.com',
    name: 'Leni',
    password: '12345',
    role: 'admin',
  },
];

export const authConfig: AuthOptions = {
  providers: [
    GoggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
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
        if (!credentials?.email || !credentials.password) return null;

        const currentUser = users.find(
          (user) => user.email === credentials.email
        );

        if (!currentUser) return null;

        const isPasswordCorrect =
          currentUser.password === credentials.password;

        if (isPasswordCorrect) {
          const { password, ...userWithoutPass } = currentUser;

          return userWithoutPass as User;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
