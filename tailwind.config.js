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
        },
        transitionProperty: {
            top: 'top',
        },
    },
    plugins: [],
};
