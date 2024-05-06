/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
        },
        extend: {
            fontWeight: {
                thin: 300,
                normal: 400,
                medium: 500,
                semibold: 600,
                bold: 700,
                extrabold: 800,
                black: 900,
                light: 300,
            },
            colors: {
                qDark100: '#07051D',
                qDark200: '#202032',
                qDark300: '#383748',
                qDark400: '#515160',
                qPrimary100: '#36C591',
                qPrimary200: '#57CC9D',
                qPrimary300: '#71D3A9',
                qPrimary400: '#88D9B5',
                qSecondary100: '#FFA64D',
                qSecondary200: '#FFB061',
                qSecondary300: '#FFBA75',
                qSecondary400: '#FFC489',
                qError100: '#FF7A7A',
                qError200: '#FF8A88',
                qError300: '#FF9996',
                qError400: '#FFA8A4',
                positiveGreen: '#88d9b5',
            },
        },
    },
    plugins: [],
}
