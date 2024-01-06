import { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { bcryptCompare } from '../bcrypt-compare';
import { getUserFromApi } from '../get-user-from-api';
import { ApiUser } from '../types';

export const credentialsProvider = Credentials({
  credentials: {
    email: { label: 'email', type: 'email', required: true },
    password: {
      label: 'password',
      type: 'password',
      required: true,
    },
  },
  async authorize(credentials): Promise<User | null> {
    if (!credentials) return null;

    const { email: emailInput, password: passwordInput } =
      credentials;

    const apiUser: ApiUser | undefined =
      await getUserFromApi(emailInput);

    if (!apiUser) {
      throw new Error('Email not registered!');
    }

    const {
      id: apiUserId,
      email: apiUserEmail,
      password_hash: apiUserPasswordHash,
    } = apiUser;
    const isPasswordCorrect = await bcryptCompare(
      passwordInput,
      apiUserPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error('Password is not correct!');
    }

    const user: User = {
      id: apiUserId,
      email: apiUserEmail,
    };

    return user;
  },
});
