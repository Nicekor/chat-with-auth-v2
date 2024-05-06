import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    'http://localhost:8080/v1/graphql': {
      headers: {
        'x-hasura-admin-secret': 'change_me_please',
      },
    },
  },
  documents: ['operations/**/*.graphql'],
  generates: {
    'components/types.generated.ts': { plugins: ['typescript'] },
    'components/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'types.generated.ts',
      },
      plugins: ['typescript-operations', 'typed-document-node'],
    },
  },
}

export default config
