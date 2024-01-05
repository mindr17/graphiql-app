import { apiToken, config } from '@/config';

export const getUserFromApi = async (
  email: string | null | undefined
) => {
  if (!email) return null;

  try {
    const url = `${config.fetchUrl}/items/users?filter[email][_eq]=${email}&fields=id,email,password_hash`;
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
    return null;
  }
};
