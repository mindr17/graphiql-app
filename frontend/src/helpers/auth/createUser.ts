import { User } from 'next-auth';

import { config, publicFetchUrl } from '@/config';

export const createUser = async (user: User) => {
  try {
    const { email } = user;

    const body = {
      guide_link: user,
    };

    return await fetch(publicFetchUrl, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.API_TOKEN_PRIVATE}`,
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.error('Network Error:', e);
  }
};
