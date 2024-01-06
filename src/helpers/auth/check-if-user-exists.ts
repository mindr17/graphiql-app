import { apiToken, fetchUrl } from '@/config';

export const checkIfUserExists = async (
  email: string
): Promise<boolean> => {
  const url = `${fetchUrl}/items/users?filter[email][_eq]=${email}&fields=email`;
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
  try {
    const result = await fetch(url, options);
    const { data } = await result.json();

    if (!data || data.length < 1) return false;

    return true;
  } catch (e) {
    console.error(e);

    return false;
  }
};
