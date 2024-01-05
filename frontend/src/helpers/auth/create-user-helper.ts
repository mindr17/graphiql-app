import { config } from '@/config';

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
  } catch (error) {
    return false;
  }

  return false;
};
