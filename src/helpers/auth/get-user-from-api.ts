import { apiToken, fetchUrl } from '@/config';

import { ApiUser } from './types';

export const getUserFromApi = async (
  email: string
): Promise<ApiUser | undefined> => {
  if (!email) return;

  try {
    const url = `${fetchUrl}/items/users?filter[email][_eq]=${email}&fields=id,email,password_hash`;
    const options: RequestInit = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
    };
    const resultJson = await fetch(url, options);
    const result = await resultJson.json();
    const user = result.data[0];

    return user;
  } catch (error) {
    return;
  }
};
