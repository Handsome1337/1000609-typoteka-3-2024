import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import prettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    ignores: ['**/build/**']
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.nodeBuiltin },
      parserOptions: {
        project: './tsconfig.json'
      },
      sourceType: 'module'
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error'
    },
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/quotes': ['error', 'single'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false
        }
      ],
      'max-params': ['error', 4]
    }
  },
  {
    files: ['*.config.js'],
    ...tseslint.configs.disableTypeChecked,
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off'
    }
  }
);
