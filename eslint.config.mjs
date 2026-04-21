/* eslint-disable @typescript-eslint/naming-convention */
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig, globalIgnores } from 'eslint/config'
import tsParser from '@typescript-eslint/parser'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import unusedImports from 'eslint-plugin-unused-imports'
import stylistic from '@stylistic/eslint-plugin'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import { fixupConfigRules } from '@eslint/compat'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default defineConfig(
  globalIgnores(['docusaurus/**/*.js', 'typings/**/*', 'out/**/*', 'coverage/**/*', '**/.pnp.*', '.yarn/**/*']),
  [{
    extends: fixupConfigRules(compat.extends('plugin:import/recommended')),
    files: ['src/**/*.ts', 'test/**/*.ts', 'eslint.config.mjs'],

    plugins: {
      '@stylistic': stylistic,
      '@typescript-eslint': typescriptEslint,
      'unused-imports': unusedImports
    },

    languageOptions: {
      globals: {
        ...globals.node
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module',

      parserOptions: {
        project: ['tsconfig.eslint.json', 'tsconfig.utils.json']
      }
    },

    rules: {
      'import/no-unresolved': [0],

      'import/order': ['error', {
        alphabetize: {
          order: 'desc'
        }
      }],

      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/await-thenable': 'error',

      '@typescript-eslint/naming-convention': ['error', {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow'
      }, {
        selector: 'function',
        format: ['camelCase', 'PascalCase']
      }, {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow'
      }, {
        selector: 'typeLike',
        format: ['PascalCase']
      }, {
        selector: 'enumMember',
        format: ['PascalCase']
      }, {
        selector: 'import',
        format: ['camelCase', 'PascalCase']
      }],

      '@typescript-eslint/consistent-type-assertions': 'error',

      '@stylistic/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'none',
          requireLast: true
        },

        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }],

      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',

      '@stylistic/quotes': ['error', 'single', {
        avoidEscape: true
      }],

      '@stylistic/semi': ['error', 'never'],

      '@typescript-eslint/triple-slash-reference': ['error', {
        path: 'always',
        types: 'prefer-import',
        lib: 'always'
      }],

      '@stylistic/type-annotation-spacing': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      'arrow-spacing': 'error',
      'brace-style': ['error', '1tbs'],
      'block-spacing': ['error', 'always'],
      'comma-dangle': 'error',
      curly: ['error', 'multi-line'],
      'eol-last': 'error',
      eqeqeq: ['error', 'smart'],
      'func-call-spacing': ['error', 'never'],

      'id-blacklist': [
        'error',
        'any',
        'Number',
        'number',
        'String',
        'string',
        'Boolean',
        'boolean',
        'Undefined',
        'undefined'
      ],

      'id-match': 'error',

      indent: ['error', 2, {
        SwitchCase: 1
      }],

      'jsdoc/check-alignment': 'off',
      'jsdoc/check-indentation': 'off',
      'jsdoc/newline-after-description': 'off',
      'new-parens': 'error',
      'no-caller': 'error',
      'no-cond-assign': 'error',

      'no-constant-condition': ['error', {
        checkLoops: false
      }],

      'no-control-regex': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'error',
      'no-empty': 'error',
      'no-empty-character-class': 'error',
      'no-eval': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'no-fallthrough': 'error',
      'no-inner-declarations': ['error', 'functions'],
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': 'error',
      'no-redeclare': 'error',
      'no-regex-spaces': 'error',
      'no-return-await': 'error',
      'no-sparse-arrays': 'error',
      'no-throw-literal': 'error',

      'no-trailing-spaces': ['error', {
        ignoreComments: true
      }],

      'no-unexpected-multiline': 'error',
      'no-unused-labels': 'error',
      'no-var': 'error',
      'object-curly-spacing': ['error', 'always'],
      'one-var': ['error', 'never'],
      radix: 'off',
      'space-before-function-paren': 'error',
      'space-in-parens': ['error', 'never'],

      'spaced-comment': ['error', 'always', {
        markers: ['/']
      }],

      'use-isnan': 'error',
      'valid-typeof': 'error'
    }
  }])
