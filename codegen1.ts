import type { CodegenConfig } from '@graphql-codegen/cli';

import { myConfig } from './src/config';

const config1: CodegenConfig = {
  overwrite: true,
  schema: {
    [`${myConfig.codegenUrl}/graphql`]: {
      headers: {
        Authorization: `Bearer ${myConfig.searchToken}`,
      },
    },
  },
  documents: 'src/graphql/public/operations/**/*.graphql',
  generates: {
    'schema1.json': {
      plugins: ['introspection'],
    },
    './src/graphql/public/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config1;
