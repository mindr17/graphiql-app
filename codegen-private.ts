import 'dotenv/config';

import type { CodegenConfig } from '@graphql-codegen/cli';

import { myConfig } from './src/config';

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [`${myConfig.codegenUrl}/graphql`]: {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN_PRIVATE}`,
      },
    },
  },
  documents: 'src/graphql/private/operations/**/*.graphql',
  generates: {
    'schema.json': {
      plugins: ['introspection'],
    },
    './src/graphql/private/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
