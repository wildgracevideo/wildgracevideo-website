// https://nuxt.com/docs/api/configuration/nuxt-config
const SITE_URL = process.env.URL || 'https://wildgracevideo.com/';
const APP_ICON = SITE_URL + '/app-icon.png';
const WEBSITE_ICON = 'logo2.png';
const GA_MEASUREMENT_ID = 'G-FDBGKZY0J2';

process.env['NEXTAUTH_URL'] = process.env.DEPLOY_PRIME_URL;

const config = {
    runtimeConfig: {
        awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID_WGV,
        awsSecret: process.env.AWS_SECRET_KEY_ID_WGV,
        awsRegion: process.env.AWS_REGION_WGV,
        clientFromEmailAddress: process.env.CLIENT_FROM_EMAIL_ADDRESS,
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        nextAuthSecret: process.env.NEXTAUTH_SECRET,
        recaptchaSecret: process.env.RECAPTCHA_SECRET_KEY,
        formsFromEmail: 'carly@wildgracevideo.com',
        formsToEmail: 'info@wildgracevideo.com',
        stripeSecretKey: process.env.STRIPE_SECRET_KEY,
        // This is needed as nuxt content is storing a live price
        stripePriceOverride:
            process.env.NODE_ENV !== 'production'
                ? process.env.STRIPE_PRICE_ID
                : '',
        stripeReelIdeasPriceId: process.env.STRIPE_REEL_IDEAS_PRICE_ID,
        sendGridApiKey: process.env.SENDGRID_API_KEY,
        omnisendApiKey: process.env.OMNISEND_API_KEY,
        sendgridWebhookSigningKey: process.env.SENDGRID_WEBHOOK_SIGNING_KEY,
        discoveryCallTemplateId: process.env.DISCOVERY_CALL_TEMPLATE_ID,
        gitProvider: process.env.GIT_PROVIDER || 'github',
        gitProviderClientId: process.env.GIT_PROVIDER_CLIENT_ID,
        gitProviderClientSecret: process.env.GIT_PROVIDER_CLIENT_SECRET,
        gitProviderTokenHost:
            process.env.GIT_PROVIDER_TOKEN_HOST || 'https://github.com',
        gitProviderTokenPath:
            process.env.GIT_PROVIDER_TOKEN_PATH || '/login/oauth/access_token',
        gitProviderAuthorizePath:
            process.env.GIT_PROVIDER_AUTHORIZE_PATH || '/login/oauth/authorize',
        gitProviderLogin: process.env.GIT_PROVIDER_LOGIN || 'wildgracevideo',
        gitProviderScopes: process.env.GIT_PROVIDER_SCOPES || 'repo user',
        secureCookies: process.env.NODE_ENV === 'production',
        apiKey: process.env.API_KEY,
        public: {
            siteUrl: SITE_URL,
            wesbiteIcon: WEBSITE_ICON,
            gaMeasurementId: GA_MEASUREMENT_ID,
            recaptchaSiteKey: '6Ld2tkcpAAAAAK052jkIsYcC5L12ih2pumxlA3e8',
            cloudfrontUrl: 'https://content.wildgracevideo.com',
        },
    },
    site: {
        url: SITE_URL,
    },
    app: {
        head: {
            title: 'Wild Grace Videography',
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                { charset: 'utf-8' },
            ],
            link: [
                { rel: 'canonical', href: SITE_URL },
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                { rel: 'apple-touch-icon', href: APP_ICON },
                {
                    rel: 'preconnect',
                    href: 'https://d22668h9qdy3zj.cloudfront.net',
                },
            ],
        },
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    css: ['~/assets/css/main.css'],
    devtools: { enabled: process.env.NODE_ENV !== 'production' },
    sitemap: {
        xslTips: process.env.NODE_ENV !== 'production',
        exclude: [
            '/get-started',
            '/privacy-policy',
            '/terms',
            '/purchase-success',
            '/admin/*',
            '/admin',
            '/api',
            '/api/*',
        ],
        xsl: false,
        sources: ['/api/__sitemap__/urls'],
    },
    routeRules: {
        '/**': { isr: 3_600 }, // 1hr
        '/admin/**': { isr: false },
        '/api/**': { isr: false },
        '/30-day-video-transformation': {
            redirect: {
                to: '/products/30-day-video-transformation',
                statusCode: 301,
            },
        },
        '/video-transformation-for-interior-designers': {
            redirect: {
                to: '/products/video-transformation-for-interior-designers',
                statusCode: 301,
            },
        },
        '/video-content-that-converts': {
            redirect: {
                to: '/services/video-content-that-converts',
                statusCode: 301,
            },
        },
        '/social-media-packages': {
            redirect: {
                to: '/services/social-media-packages',
                statusCode: 301,
            },
        },
        '/': {
            sitemap: {
                images: [
                    {
                        loc: '/logo1.webp',
                        title: 'Wild Grace Videography logo',
                        caption:
                            'Company logo for Wild Grace Videography, a Denver, Colorado-based video production company.',
                    },
                ],
                videos: [
                    {
                        title: 'Wild Grace Videography Reel',
                        thumbnail_loc: SITE_URL + '/logo1.webp',
                        description:
                            'Video reel showcasing the work of Wild Grace Videography, a Denver, Colorado-based video production company.',
                        content_loc:
                            'https://d22668h9qdy3zj.cloudfront.net/wgv-reel.webm',
                        player_loc: SITE_URL,
                        duration: 92,
                        requires_subscription: false,
                        live: false,
                        publication_date: '2023-09-26T19:20:30+07:00',
                    },
                ],
            },
        },
        '/who-we-are': {
            sitemap: {
                images: [
                    {
                        loc: '/Carly1.webp',
                        title: 'Carly Kreiger photo',
                        caption:
                            'Photo of Carly Kreiger, the founder of Wild Grace Videography, a Denver, Colorado-based video production company.',
                    },
                    {
                        loc: '/logo1.webp',
                        title: 'Wild Grace Videography logo',
                        caption:
                            'Company logo for Wild Grace Videography, a Denver, Colorado-based video production company.',
                    },
                ],
            },
        },
    },
    robots: {
        disallow: [
            '/_nuxt/*',
            '/_nuxt',
            '/_ipx',
            '/_ipx/*',
            '/admin',
            '/admin/*',
            '/api',
            '/api/*',
        ],
    },
    auth: {
        baseURL: SITE_URL,
        provider: {
            type: 'authjs',
        },
    },
    content: {},
    modules: [
        '@sidebase/nuxt-auth',
        '@nuxt/content',
        'nuxt-schema-org',
        'nuxt-simple-robots',
        '@nuxtjs/sitemap',
    ],
};

if (process.env.NODE_ENV === 'production') {
    config.app?.head?.script?.push({
        src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
        async: true,
    });
    config.app?.head?.link?.push({
        rel: 'preconnect',
        href: 'https://www.googletagmanager.com',
    });
    config.app?.head?.link?.push({
        rel: 'preconnect',
        href: 'https://www.google-analytics.com',
    });
}

export default defineNuxtConfig(config);
