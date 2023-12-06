import type { CodegenConfig } from '@graphql-codegen/cli';
import { config as myConfig } from './src/config';

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [`${myConfig.fetchUrl}/graphql`]: {
      headers: {
        Authorization: `Bearer ${myConfig.readerToken}`,
      }
    }
  },
  generates: {
    'introspection.json': {
      plugins: ['introspection'],
      // config: {
      //   minify: true
      // },
    },
  },
};

export default config;
