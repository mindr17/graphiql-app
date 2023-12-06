const alwaysUseProdBackend = true;

const configTemplate = {
  "baseConfig": {
    readerToken: '',
  },
  "devConfig": {
  },
  "prodConfig": {
  },
};

const getConfigType = () => {
  if (alwaysUseProdBackend) return 'prodConfig';

  return (process.env.NODE_ENV === 'development')
    ? 'devConfig'
    : 'prodConfig';
};

const configType = getConfigType();

export const config = {
  ...configTemplate['baseConfig'],
  ...configTemplate[configType],
};
