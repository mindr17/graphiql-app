import { apiToken, config } from '@/config';

export interface MyUser {
  email: string;
  password_hash: string;
}

export const createUserHelper = async (
  user: MyUser
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

    console.log('res: ', res);

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    if (res && res.ok) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};
