import { compare } from 'bcrypt';

export const bcryptCompare = async (
  value: string | undefined,
  hash: string | undefined
) => {
  if (value && hash) {
    const match = await compare(value, hash);

    return match;
  }

  return false;
};
