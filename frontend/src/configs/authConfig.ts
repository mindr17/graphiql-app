import type { AuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

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
