import vue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

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
                'vue/no-v-html': 'off',
                'vue/html-indent': ['error', 4],
                '@typescript-eslint/no-explicit-any': 'off',
                indent: ['error', 4],
                semi: ['error', 'never'],
                'linebreak-style': ['error', 'unix'],
            },
        },
    ),
]
