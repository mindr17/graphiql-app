import { checkIfUserExists } from '../check-if-user-exists';
import { UserTemplate } from '../types';
import { getPasswordHash } from './get-password-hash';
import { writeUser } from './write-user';

export const signUp = async (
  user: UserTemplate
): Promise<boolean> => {
  const { email, password } = user;

  if (!email) return false;

  try {
    const userExists = await checkIfUserExists(email);

    if (userExists) return true;

    const passwordHash = await getPasswordHash(password);
    const newUser = { email, password_hash: passwordHash };
    const res = await writeUser(newUser);

    if (res) return true;

    return false;
  } catch (e) {
    console.error(e);

    return false;
  }
};
