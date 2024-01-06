const subDomain = 'apifinder-api';
const domain = 'badges.bio';

const baseConfig = {
  subDomain,
  domain,
  baseUrl: `https://apifinder.badges.bio`,
  apiToken: process.env.API_TOKEN,
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
export const fetchUrl = config.fetchUrl;
export const baseUrl = config.baseUrl;
export const apiToken = config.apiToken;
