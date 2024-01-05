import { UserTemplate } from '../types';
import { getPasswordHash } from './get-password-hash';
import { writeUser } from './write-user';

export async function createUserHelper(
  user: UserTemplate
): Promise<boolean> {
  const { email, password } = user;

  const passwordHash = await getPasswordHash(password);

  const newUser = { email, password_hash: passwordHash };

  try {
    await writeUser(newUser);
  } catch (e) {
    console.error(e);

    return false;
  }

  return true;
}
