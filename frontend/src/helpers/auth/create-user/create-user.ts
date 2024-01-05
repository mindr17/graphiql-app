import { UserTemplate } from '../types';
import { getPasswordHash } from './get-password-hash';
import { writeUser } from './write-user';

export async function createUser(user: UserTemplate) {
  const { email, password } = user;

  const passwordHash = await getPasswordHash(password);

  const newUser = { email, password_hash: passwordHash };

  try {
    await writeUser(newUser);
  } catch (e) {
    return false;
  }

  return true;
}
