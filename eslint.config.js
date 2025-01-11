// https://eslint.vuejs.org/user-guide/
// https://typescript-eslint.io/rules/?=recommended

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
    { ignores: ['*.d.ts', '**/coverage', '**/dist', 'vendor/**'] },
    {
        extends: [
            eslint.configs.recommended,
            ...typescriptEslint.configs.recommended,
            ...eslintPluginVue.configs['flat/recommended'],
        ],
        files: ['**/*.{ts,js,vue}'],
        languageOptions: {
            ecmaVersion: 'latest',
            globals: {
                ...globals.browser,
                Ziggy: 'readonly',
            },
            sourceType: 'module',
            parserOptions: {
                parser: typescriptEslint.parser,
            },
        },
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/block-lang': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    eslintConfigPrettier
);
