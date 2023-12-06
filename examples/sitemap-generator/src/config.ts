const alwaysUseProdBackend = true;

const configTemplate = {
  "baseConfig": {
    readerToken: 'Px52qffm9qbMY4WsyjZIvp3mS55Fg61d',
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
  token: '596c1cd00176daec78be1f5e6c2f8a8be23e974350c7b59b22c96176f6c2b564db58fd1099e49b80028dd924da94336c9596f89640b5326ee3df0a96be135517ef34c0d7bccf64f2a58aa32f3fe04ca1b9a3b4e313c067acf7dbd6d17ca00b0df6e82f2f5233f13436a59355a4fbac0f00948e9f903208b0c57d17f49b87460e',
  ogUploader: 'odfKiV0PeWY1es3m25MDpVl1VmHGIIUN',
};
