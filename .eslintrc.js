module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.tsx', '*.ts', '*.jsx', '*.js'],
      parser: '@typescript-eslint/parser',
      extends: [
        'prettier',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:import/errors',
        'plugin:import/warnings',
        'next',
      ],
      env: {
        browser: true,
        es6: true,
        jest: true,
        node: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      plugins: [
        '@typescript-eslint',
        'react',
        'prettier',
        'react-hooks',
        'import',
        'simple-import-sort',
      ],
      rules: {
        'prettier/prettier': [
          'warn',
          {
            endOfLine: 'auto',
          },
        ],
        'react/jsx-sort-props': 'warn',
        'simple-import-sort/imports': 'warn',
        'simple-import-sort/exports': 'error',
        'import/no-unresolved': [2, { commonjs: true, amd: true }],
        'import/named': 2,
        'import/namespace': 2,
        'import/default': 2,
        'import/export': 2,
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'comma-dangle': ['warn', 'only-multiline'],
        'react/prop-types': 'off',
        'react/display-name': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-var-reqiures': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
      },
      settings: {
        react: {
          pragma: 'React',
          version: 'detect',
        },
      },
    },
    // {
    //   files: ['./src/graphql/private/operations/**/*.graphql'],
    //   parserOptions: {
    //     skipGraphQLConfig: true,
    //     schema: 'schema.json',
    //     operations: './src/graphql/private/operations/**/*.graphql',
    //   },
    //   parser: '@graphql-eslint/eslint-plugin',
    //   plugins: ['@graphql-eslint'],
    //   extends: ['plugin:@graphql-eslint/operations-all'],
    //   rules: {
    //     '@graphql-eslint/alphabetize': [
    //       'warn',
    //       { selections: ['OperationDefinition'] },
    //     ],
    //     '@graphql-eslint/require-description': [
    //       'error',
    //       { FieldDefinition: true },
    //     ],
    //     '@graphql-eslint/no-duplicate-fields': 'error',
    //     '@graphql-eslint/require-id-when-available': 'off',
    //     '@graphql-eslint/naming-convention': [
    //       'off',
    //       {
    //         OperationDefinition: {
    //           style: 'PascalCase',
    //           forbiddenPrefixes: [
    //             'Query',
    //             'Mutation',
    //             'Subscription',
    //             'Get',
    //           ],
    //           forbiddenSuffixes: [
    //             'Query',
    //             'Mutation',
    //             'Subscription',
    //           ],
    //         },
    //       },
    //     ],
    //   },
    // },
    // {
    //   files: ['./src/graphql/public/operations/**/*.graphql'],
    //   parserOptions: {
    //     skipGraphQLConfig: true,
    //     schema: 'schema1.json',
    //     operations: './src/graphql/public/operations/**/*.graphql',
    //   },
    //   parser: '@graphql-eslint/eslint-plugin',
    //   plugins: ['@graphql-eslint'],
    //   extends: ['plugin:@graphql-eslint/operations-all'],
    //   rules: {
    //     '@graphql-eslint/alphabetize': [
    //       'warn',
    //       { selections: ['OperationDefinition'] },
    //     ],
    //     '@graphql-eslint/require-description': [
    //       'error',
    //       { FieldDefinition: true },
    //     ],
    //     '@graphql-eslint/no-duplicate-fields': 'error',
    //     '@graphql-eslint/require-id-when-available': 'off',
    //     '@graphql-eslint/naming-convention': [
    //       'off',
    //       {
    //         OperationDefinition: {
    //           style: 'PascalCase',
    //           forbiddenPrefixes: [
    //             'Query',
    //             'Mutation',
    //             'Subscription',
    //             'Get',
    //           ],
    //           forbiddenSuffixes: [
    //             'Query',
    //             'Mutation',
    //             'Subscription',
    //           ],
    //         },
    //       },
    //     ],
    //   },
    // },
  ],
};
