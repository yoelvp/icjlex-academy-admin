import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'quotes': [
        'warn',
        'single',
        {
          avoidEscape: true
        }
      ],
      'jsx-quotes': [
        'warn',
        'prefer-double'
      ],
      'comma-dangle': [
        'warn',
        'never'
      ],
      'padding-line-between-statements': [
        'warn',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return'
        }
      ],
      'indent': [
        'warn',
        2,
        {
          SwitchCase: 1
        }
      ],
      'arrow-parens': [
        'warn',
        'always'
      ],
      'no-multiple-empty-lines': [
        'warn',
        {
          max: 1,
          maxEOF: 1
        }
      ],
      'no-mixed-spaces-and-tabs': 2,
      'indent': [
        'warn',
        2,
        {
          SwitchCase: 1
        }
      ],
      'arrow-parens': [
        'warn',
        'always'
      ],
      'space-before-function-paren': [
        'warn',
        {
          anonymous: 'ignore',
          named: 'never'
        }
      ],
      'no-trailing-spaces': 2,
      'object-curly-spacing': [
        'warn',
        'always'
      ],
      'react-hooks/exhaustive-deps': 'off'
    }
  }
)
