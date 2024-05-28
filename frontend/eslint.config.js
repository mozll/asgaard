import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'

export default [
    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReactConfig,
    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            'react/react-in-jsx-scope': 'off',
        },
        ignores: ['dist/**/*'],
    },
]
