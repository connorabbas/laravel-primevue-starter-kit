// https://eslint.org/docs/latest/use/configure/
// https://eslint.vuejs.org/user-guide/
// https://typescript-eslint.io/rules/?=recommended

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
    { ignores: ['*.d.ts', '**/coverage', '**/dist', 'vendor/**', 'public/build/**'] },
    {
        files: ['**/*.js'],
        ...eslint.configs.recommended,
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                process: 'readonly',
                module: 'readonly',
                require: 'readonly',
                Ziggy: 'readonly',
                window: 'readonly',
            },
        },
    },
    {
        files: ['**/*.{ts,vue}'],
        extends: [
            eslint.configs.recommended,
            ...typescriptEslint.configs.recommended,
            ...eslintPluginVue.configs['flat/recommended'],
        ],
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
            'vue/require-default-prop': 'off',
            'vue/attribute-hyphenation': 'off',
            'vue/multi-word-component-names': 'off',
            'vue/block-lang': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    eslintConfigPrettier
);
