const subDomain = 'apifinder-api';
const domain = 'badges.bio';

const baseConfig = {
  subDomain,
  domain,
  baseUrl: `https://apifinder.badges.bio`,
  API_TOKEN_PRIVATE: process.env.API_TOKEN_PRIVATE,
  API_TOKEN_PUBLIC: process.env.NEXT_PUBLIC_API_TOKEN_PUBLIC,
  searchToken: '',
  revalidationToken: '',
  yandexMetricaId: '',
  codegenUrl: `https://${subDomain}.${domain}`,
  publicFetchUrl: `https://${subDomain}.${domain}`,
  fetchUrl: `https://${subDomain}.${domain}`,
};

const devConfig = {};
const prodConfig = {
  fetchUrl: process.env.PROD_FETCH_URL_PRIVATE,
};

export const config = {
  ...baseConfig,
  ...(process.env.NODE_ENV === 'development'
    ? devConfig
    : prodConfig),
};

export const myConfig = config;
export const publicFetchUrl = `https://${subDomain}.${domain}`;
export const apiToken = process.env.API_TOKEN_PRIVATE;
export const fetchUrl = config.fetchUrl;
export const isTest = process.env.IS_TEST === 'true' || false;
export const baseUrl = config.baseUrl;
