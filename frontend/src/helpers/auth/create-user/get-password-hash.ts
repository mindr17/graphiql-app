import { hash } from 'bcrypt';

export const getPasswordHash = async (
  password: string
): Promise<string> => {
  const saltRounds = 3;
  const passwordHash = await hash(password, saltRounds);

  return passwordHash;
};
