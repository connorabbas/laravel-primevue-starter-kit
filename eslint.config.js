import vue from 'eslint-plugin-vue';
import {
    defineConfigWithVueTs,
    vueTsConfigs,
} from '@vue/eslint-config-typescript';
import eslint from '@eslint/js';
import globals from 'globals';

export default [
    // Global ignores
    {
        ignores: [
            'node_modules',
            'vendor',
            'dist',
            'public',
            'bootstrap/ssr',
        ],
    },
    // JavaScript files
    {
        files: ['**/*.js'],
        ...eslint.configs.recommended,
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                process: 'readonly',
                module: 'readonly',
                require: 'readonly',
                window: 'readonly',
            },
        },
    },
    // Vue and TypeScript files
    ...defineConfigWithVueTs(
        vue.configs['flat/recommended'],
        vueTsConfigs.recommended,
        {
            rules: {
                'vue/require-default-prop': 'off',
                'vue/attribute-hyphenation': 'off',
                'vue/v-on-event-hyphenation': 'off',
                'vue/multi-word-component-names': 'off',
                'vue/block-lang': 'off',
                'vue/no-v-html': 'off',
                'vue/html-indent': ['error', 4],
                '@typescript-eslint/no-explicit-any': 'off',
                indent: ['error', 4],
                semi: ['error', 'always'],
                'linebreak-style': ['error', 'unix'],
            },
        }
    ),
];
