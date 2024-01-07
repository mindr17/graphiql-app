const domain = 'badges.bio';

export const fetchUrl =
  process.env.FETCH_URL || `https://apifinder-api.${domain}`;
export const baseUrl = `https://apifinder.${domain}`;
export const apiToken = process.env.API_TOKEN;
