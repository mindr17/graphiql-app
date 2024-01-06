const subDomain = 'apifinder-api';
const domain = 'badges.bio';

const baseConfig = {
  subDomain,
  domain,
  fetchUrl: `https://${subDomain}.${domain}`,
};

const devConfig = {};
const prodConfig = {
  fetchUrl: process.env.FETCH_URL,
};

export const config = {
  ...baseConfig,
  ...(process.env.NODE_ENV === 'development'
    ? devConfig
    : prodConfig),
};

export const fetchUrl = config.fetchUrl;
export const baseUrl = `https://apifinder.badges.bio`;
export const apiToken = process.env.API_TOKEN;
