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
            },
            keyframes: {
                'loop-scroll': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-85%)' },
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
            },
            aspectRatio: {
                auto: 'auto',
                square: '1 / 1',
                video: '16 / 9',
                vertical: '9 / 16',
                photo: '1 / 1.25',
                'photo-long': '1 / 1.5',
            },
        },
        transitionProperty: {
            top: 'top',
        },
        backgroundSize: {
            full: '100%',
        },
    },
    plugins: [],
};
