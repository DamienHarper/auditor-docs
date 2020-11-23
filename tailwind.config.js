const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
    purge: [
        './docs/**/*.md',
        './template/*.twig',
        './template/js/*.js',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',

            black: '#000',
            white: '#fff',

            amber: colors.amber,
            blue: colors.blue,
            cyan: colors.cyan,
            emerald: colors.emerald,
            fuchsia: colors.fuchsia,
            gray: colors.coolGray,
            green: colors.green,
            indigo: colors.indigo,
            'light-blue': colors.lightBlue,
            lime: colors.lime,
            orange: {
                ...colors.orange,
                1000: '#4a2008',
            },
            pink: {
                ...colors.pink,
                1000: '#460d25',
            },
            purple: colors.purple,
            red: colors.red,
            rose: colors.rose,
            teal: colors.teal,
            violet: colors.violet,
            yellow: colors.yellow,

            code: {
                punctuation: '#A1E8FF',
                tag: '#D58FFF',
                'attr-name': '#4BD0FB',
                'attr-value': '#A2F679',
                string: '#A2F679',
                highlight: 'rgba(134, 239, 172, 0.25)',
            },
        },
        extend: {
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        maxWidth: 'none',
                        color: theme('colors.gray.500'),
                        '> :first-child': { marginTop: '-' },
                        '> :last-child': { marginBottom: '-' },
                        '&:first-child > :first-child': {
                            marginTop: '0',
                        },
                        '&:last-child > :last-child': {
                            marginBottom: '0',
                        },
                        'h1, h2': {
                            letterSpacing: '-0.025em',
                        },
                        'h2, h3': {
                            'scroll-margin-block': `${(70 + 40) / 16}rem`,
                        },
                        'ul > li': {
                            paddingLeft: '1.5em',
                        },
                        'ul > li::before': {
                            width: '0.75em',
                            height: '0.125em',
                            top: 'calc(0.875em - 0.0625em)',
                            left: 0,
                            borderRadius: 0,
                            backgroundColor: theme('colors.gray.300'),
                        },
                        a: {
                            color: theme('colors.cyan.700'),
                            fontWeight: theme('fontWeight.medium'),
                            textDecoration: 'none',
                            boxShadow: theme('boxShadow.link'),
                        },
                        'a code': {
                            color: 'inherit',
                            fontWeight: 'inherit',
                        },
                        strong: {
                            color: theme('colors.gray.900'),
                            fontWeight: theme('fontWeight.medium'),
                        },
                        'a strong': {
                            color: 'inherit',
                            fontWeight: 'inherit',
                        },
                        code: {
                            fontWeight: '400',
                            color: theme('colors.violet.600'),
                        },
                        'code::before': {
                            // content: 'none',
                        },
                        'code::after': {
                            // content: 'none',
                        },
                        pre: {
                            backgroundColor: '-',
                            color: theme('colors.white'),
                            borderRadius: 0,
                            marginTop: 0,
                            marginBottom: 0,
                        },
                        table: {
                            fontSize: theme('fontSize.sm')[0],
                            lineHeight: theme('fontSize.sm')[1].lineHeight,
                        },
                        thead: {
                            color: theme('colors.gray.600'),
                            borderBottomColor: theme('colors.gray.200'),
                        },
                        'thead th': {
                            paddingTop: 0,
                            fontWeight: theme('fontWeight.semibold'),
                        },
                        'tbody tr': {
                            borderBottomColor: theme('colors.gray.200'),
                        },
                        'tbody tr:last-child': {
                            borderBottomWidth: '1px',
                        },
                        'tbody code': {
                            fontSize: theme('fontSize.xs')[0],
                        },
                    },
                },
            }),
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
                mono: ['Menlo', ...defaultTheme.fontFamily.mono],
                source: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
                'ubuntu-mono': ['Ubuntu Mono', ...defaultTheme.fontFamily.mono],
                system: defaultTheme.fontFamily.sans,
                flow: 'Flow',
            },
            spacing: {
                18: '4.5rem',
                '15px': '0.9375rem',
                '23px': '1.4375rem',
                full: '100%',
            },
            width: {
                xl: '36rem',
            },
            maxWidth: {
                '4.5xl': '60rem',
                '8xl': '90rem',
            },
            maxHeight: (theme) => ({
                sm: '30rem',
                '(screen-18)': `calc(100vh - ${theme('spacing.18')})`,
            }),
        },
    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
    ],
};