import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue',
    ],
    theme: {
        extend: {
            animation: {
                'loop-scroll': 'loop-scroll 40s linear infinite',
                'slide-up': 'slide-up 1.5s ease-out forwards',
                'slide-left': 'slide-left 1.5s ease-in forwards',
                'slide-right': 'slide-right 1.5s ease-in forwards',
            },
            keyframes: {
                'loop-scroll': {
                    from: { transform: 'translateX(60%)' },
                    to: { transform: 'translateX(-60%)' },
                },
                'slide-up': {
                    from: { transform: 'translateY(50%)', opacity: 0 },
                    to: { transform: 'translateY(0)', opacity: 1 },
                },
                'slide-left': {
                    from: { transform: 'translateX(5%)', opacity: 0 },
                    to: { transform: 'translateY(0)', opacity: 1 },
                },
                'slide-right': {
                    from: { transform: 'translateX(-5%)', opacity: 0 },
                    to: { transform: 'translateY(0)', opacity: 1 },
                },
            },
            colors: {
                'website-off-white':
                    'rgb(var(--color-website-off-white) / <alpha-value>)',
                'website-off-black':
                    'rgb(var(--color-website-off-black) / <alpha-value>)',
                'website-primary':
                    'rgb(var(--color-website-primary) / <alpha-value>)',
                'website-secondary':
                    'rgb(var(--color-website-secondary) / <alpha-value>)',
                'website-accent':
                    'rgb(var(--color-website-accent) / <alpha-value>)',
                'website-background':
                    'rgb(var(--color-website-background) / <alpha-value>)',
                'website-tertiary':
                    'rgb(var(--color-website-tertiary) / <alpha-value>)',
            },
            aspectRatio: {
                auto: 'auto',
                square: '1 / 1',
                video: '16 / 9',
                vertical: '9 / 16',
                photo: '1 / 1.25',
                'photo-long': '1 / 1.5',
            },
            brightness: {
                60: '.60',
            },
            transitionDelay: {
                400: '400ms',
                600: '600ms',
                800: '800ms',
                1200: '1200ms',
            },
            translate: {
                '1/20': '5%',
            },
            lineHeight: {
                14: '3.5rem',
            },
        },
        transitionProperty: {
            top: 'top',
        },
        backgroundSize: {
            full: '100%',
        },
    },
    plugins: [
        plugin(({ addUtilities }) => {
            addUtilities({
                '.writing-vertical': {
                    'writing-mode': 'vertical-rl',
                    '& sub': {
                        bottom: '0',
                        right: '0.25em',
                    },
                },
            });
        }),
    ],
};
