module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:vuejs-accessibility/recommended',
        'plugin:vue/vue3-recommended',
        '@vue/typescript/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier',
        'plugin:drizzle/recommended',
    ],
    settings: {
        'import/resolver': {
            typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
        },
    },
    rules: {
        'no-console': 'off',
        'sort-imports': [
            'error',
            { ignoreCase: true, ignoreDeclarationSort: true },
        ],
        'vuejs-accessibility/label-has-for': [
            2,
            {
                required: {
                    every: ['id'],
                },
                allowChildren: false,
            },
        ],
        'import/order': [
            1,
            {
                groups: [
                    'external',
                    'builtin',
                    'internal',
                    'sibling',
                    'parent',
                    'index',
                ],
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            { varsIgnorePattern: '_', argsIgnorePattern: '_' },
        ],
        'vue/no-multiple-template-root': 'off',
        'vue/no-v-html': 'off',
        'vue/multi-word-component-names': 'off',
    },
};
