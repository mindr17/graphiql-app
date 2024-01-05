import { apiToken, config } from '@/config';
import { UserToBeWritten } from '@/helpers/auth/types';

export const writeUser = async (
  user: UserToBeWritten
): Promise<boolean> => {
  const options: RequestInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify(user),
  };

  try {
    const res = await fetch(
      `${config.fetchUrl}/items/users`,
      options
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    if (res && res.ok) {
      return true;
    }
  } catch (e) {
    console.error(e);

    return false;
  }

  return false;
};
