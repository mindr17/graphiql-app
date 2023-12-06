import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "introspection.json",
  // schema: "schema.graphql",
  documents: "src/**/*.graphql",
  generates: {
    './src/gql/': {
      preset: "client",
      plugins: []
    },
  },
};

export default config;
