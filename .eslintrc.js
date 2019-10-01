module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
    },
    extends: [
      /*
        Airbnb adds a lot of rules to the mix that we don't exactly follow and it may be a bit more work than we want to enforce
        https://github.com/airbnb/javascript has a list of all the rules they have, there's a lot.
      */
      'prettier',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/recommended', // Need this or else imports will yell at you.
      'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
      'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    plugins: ['prettier', '@typescript-eslint'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    env: {
      es6: true,
      browser: true,
      node: true,
      jest: true,
    },
    rules: {
      '@typescript-eslint/array-type': 'warn',
      '@typescript-eslint/ban-types': [
        'warn',
        {
          types: {
            Array: null,
            Object: 'Use {} instead or Record<string, any>',
            String: {
              message: 'Use string instead',
              fixWith: 'string',
            },
          },
        },
      ],
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/class-name-casing': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/no-triple-slash-reference': 'off',
      '@typescript-eslint/no-use-before-define': 'warn',
      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/prefer-interface': 'off', // if this goes on it will convert types to interfaces if we want that
      'class-methods-use-this': 'off',
      'comma-dangle': ['warn', 'always-multiline'],
      eqeqeq: ['error', 'smart'],
      'func-names': ['off', 'as-needed'],
      'import/newline-after-import': 'warn',
      'import/no-duplicates': 'error',
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',
      'import/no-named-default': 'warn',
      'import/named': 'warn',
      'import/namespace': 'warn',
      'jsx-quotes': ['warn', 'prefer-double'], // prettier defaults it to double, so to reduce a fight, this affects inside jsx blocks
      'lines-between-class-members': 'off',
      'no-cond-assign': ['error', 'except-parens'],
      'no-throw-literal': 'off',
      'no-undef': 'warn',
      'no-unneeded-ternary': 'warn',
      'no-unused-expressions': 'off',
      'no-useless-concat': 'error',
      'no-useless-constructor': 'warn',
      'prefer-destructuring': 'warn',
      'prefer-template': 'error',
      quotes: [
        'warn',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],
      semi: ['error', 'always'],
      'space-before-function-paren': 'off',
      'spaced-comment': 'off',
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'es5',
          singleQuote: true,
          tabWidth: 2,
          bracketSpacing: true,
          arrowParens: 'always',
        },
      ],
    },
  };
