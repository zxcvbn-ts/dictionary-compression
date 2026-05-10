import { defineConfig, globalIgnores } from 'eslint/config'
import tsParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import compatPlugin from 'eslint-plugin-compat'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import prettierConfig from './prettier.mjs'

export default defineConfig([
  globalIgnores(['**/node_modules', '**/dist', '**/idea']),
  js.configs.recommended,
  compatPlugin.configs['flat/recommended'],
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        project: true,
        __tsconfigRootDir: import.meta.dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },

    rules: {
      'arrow-body-style': 'off',
      'prettier/prettier': ['error', prettierConfig],
      'semi': ['error', 'never'],

      'no-console': [
        'error',
        {
          allow: ['info', 'warn', 'error'],
        },
      ],

      'max-lines-per-function': [
        'error',
        {
          max: 100,
          skipComments: true,
          skipBlankLines: true,
        },
      ],

      'max-nested-callbacks': [
        'warn',
        {
          max: 3,
        },
      ],

      'max-statements': [
        'warn',
        {
          max: 14,
        },
        {
          ignoreTopLevelFunctions: false,
        },
      ],

      'complexity': [
        'warn',
        {
          max: 8,
        },
      ],

      'max-depth': [
        'warn',
        {
          max: 4,
        },
      ],

      'max-params': [
        'warn',
        {
          max: 3,
        },
      ],

      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],

      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'error',
      'class-methods-use-this': 0,

      'prefer-destructuring': [
        'error',
        {
          array: false,
          object: true,
        },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowNever: true,
        },
      ],
    },
  },
  {
    files: [
      '**/*.spec.ts',
      '**/*.config.ts',
      '**/*.config.js',
      '**/test/**/*.ts',
    ],

    rules: {
      'max-lines-per-function': 'off',
      'max-statements': 'off',
      'max-nested-callbacks': 'off',
      'complexity': 'off',
      'max-params': 'off',
      // this is off because native node test framework returns for describes and its promises
      '@typescript-eslint/no-floating-promises': 'off',
      // doesn't matter in tests
      'compat/compat': 'off',
    },
  },
  {
    files: ['./scripts/rollup.config.mjs', './scripts/jsonPlugin.mjs'],

    rules: {
      'compat/compat': 'off',
      'max-statements': 'off',
    },
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
])
