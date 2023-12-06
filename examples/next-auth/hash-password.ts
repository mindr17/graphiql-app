import { compare, hash } from 'bcrypt';

import { Maybe } from '@/src/graphql/private/gql/graphql';

export const hashValue = async (value: string) => {
  const saltRounds = 3;
  const myHash = await hash(value, saltRounds);

  return myHash;
};

export const compareValue = async (
  value: string | undefined,
  hash: Maybe<string> | undefined
) => {
  if (value && hash) {
    const match = await compare(value, hash);

    return match;
  }

  return false;
};
