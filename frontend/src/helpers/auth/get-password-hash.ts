import { hash } from 'bcrypt';

export const hashValue = async (value: string): Promise<string> => {
  const saltRounds = 3;
  const myHash = await hash(value, saltRounds);

  return myHash;
};
