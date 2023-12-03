const subDomain = 'apifinder-api';
const domain = 'badges.bio';

const baseConfig = {
  subDomain,
  domain,
  baseUrl: `https://${domain}`,
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
  fetchUrl: `http://172.19.0.1:8055`,
};

export const config = {
  ...baseConfig,
  ...(process.env.NODE_ENV === 'development'
    ? devConfig
    : prodConfig),
};

export const myConfig = config;
