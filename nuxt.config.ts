// https://nuxt.com/docs/api/configuration/nuxt-config
const SITE_URL = process.env.URL || 'https://www.wildgracevideo.com';
const CLOUDFRONT_URL = 'https://content.wildgracevideo.com';
const APP_ICON =
    CLOUDFRONT_URL + '/Website-Main/WildGraceProductionsAppIcon.png';
const ANDROID_SITE_MANIFEST_URL =
    CLOUDFRONT_URL + '/Website-Main/site.manifest';
const WEBSITE_ICON =
    CLOUDFRONT_URL + '/images/Website-Main/WildGraceProductionsLogo.webp';
const GA_MEASUREMENT_ID = 'G-FDBGKZY0J2';

process.env['NEXTAUTH_URL'] = process.env.DEPLOY_PRIME_URL;

let securityConfig = {};
if (process.env.NODE_ENV === 'production') {
    securityConfig = {
        headers: {
            crossOriginEmbedderPolicy: 'unsafe-none', // TODO: Look into this
            contentSecurityPolicy: {
                'default-src': ["'self'", 'https:', '*.wildgracevideo.com'],
                'connect-src': [
                    "'self'",
                    'https:',
                    '*.wildgracevideo.com',
                    'fonts.googleapis.com',
                    'connect.facebook.net',
                    'fonts.gstatic.com',
                    'github.com',
                    'api.github.com',
                    'www.googletagmanager.com',
                ],
                'style-src': [
                    "'self'",
                    "'unsafe-inline'",
                    'https:',
                    '*.wildgracevideo.com',
                    'fonts.googleapis.com',
                    'data:',
                ],
                'script-src': [
                    "'self'",
                    "'unsafe-inline'",
                    "'unsafe-eval'",
                    'https:',
                    '*.wildgracevideo.com',
                    'connect.facebook.net',
                    'blob:',
                    'https://*.wildgracevideo.com',
                    'https://www.googletagmanager.com',
                ],
                'script-src-attr': ["'unsafe-inline'"],
                'font-src': [
                    "'self'",
                    'data:',
                    'https:',
                    '*.wildgracevideo.com',
                    'fonts.gstatic.com',
                ],
                'img-src': [
                    "'self'",
                    'data:',
                    'https:',
                    '*.wildgracevideo.com',
                    'www.googletagmanager.com',
                ],
                'object-src': ["'self'", 'https:', '*.wildgracevideo.com'],
                'media-src': [
                    "'self'",
                    'https:',
                    '*.wildgracevideo.com',
                    'blob:',
                    '*.wildgracevideo.com',
                ],
            },
            permissionsPolicy: {
                fullscreen: ['self', 'https://www.wildgracevideo.com'],
            },
        },
    };
} else {
    securityConfig = {
        headers: {
            crossOriginEmbedderPolicy: 'unsafe-none',
            contentSecurityPolicy: {
                'default-src': [
                    "'self'",
                    'http://localhost:3000',
                    'http://localhost:24678',
                    'http://localhost:8081',
                    'ws:',
                    'https:',
                    '*.wildgracevideo.com',
                ],
                'style-src': [
                    "'self'",
                    "'unsafe-inline'",
                    'http://localhost:3000',
                    'https:',
                    '*.wildgracevideo.com',
                    'fonts.googleapis.com',
                    'data:',
                ],
                'script-src': [
                    "'self'",
                    "'unsafe-inline'",
                    "'unsafe-eval'",
                    'http://localhost:3000',
                    'https:',
                    'connect.facebook.net',
                    'blob:',
                    'http://localhost:3000',
                    'https://www.googletagmanager.com',
                ],
                'script-src-attr': ["'unsafe-inline'"],
                'font-src': [
                    "'self'",
                    'data:',
                    'https:',
                    '*.wildgracevideo.com',
                    'fonts.gstatic.com',
                ],
                'img-src': [
                    "'self'",
                    'localhost:3000',
                    'data:',
                    'https:',
                    '*.wildgracevideo.com',
                    'www.googletagmanager.com',
                ],
                'object-src': [
                    "'self'",
                    'http://localhost:3000',
                    'https:',
                    '*.wildgracevideo.com',
                ],
                'media-src': [
                    "'self'",
                    'http://localhost:3000',
                    'ws:',
                    'https:',
                    '*.wildgracevideo.com',
                    'blob:',
                    'http://localhost:3000',
                ],
                'upgrade-insecure-requests': false,
            },
            permissionsPolicy: {
                fullscreen: ['self', 'http://*.wildgracevideo.com'],
            },
        },
    };
}

const config = {
    runtimeConfig: {
        awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID_WGV,
        awsSecret: process.env.AWS_SECRET_KEY_ID_WGV,
        awsRegion: process.env.AWS_REGION_WGV,
        clientFromEmailAddress: process.env.CLIENT_FROM_EMAIL_ADDRESS,
        nextAuthSecret: process.env.NEXTAUTH_SECRET,
        recaptchaSecret: process.env.RECAPTCHA_SECRET_KEY,
        formsFromEmail: 'carly@wildgracevideo.com',
        formsToEmail: 'carly@wildgracevideo.com',
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
        gitProviderClientId: process.env.GITHUB_CLIENT_ID,
        gitProviderClientSecret: process.env.GITHUB_CLIENT_SECRET,
        gitProviderTokenHost:
            process.env.GIT_PROVIDER_TOKEN_HOST || 'https://github.com',
        gitProviderTokenPath:
            process.env.GIT_PROVIDER_TOKEN_PATH || '/login/oauth/access_token',
        gitProviderAuthorizePath:
            process.env.GIT_PROVIDER_AUTHORIZE_PATH || '/login/oauth/authorize',
        gitProviderScopes: process.env.GIT_PROVIDER_SCOPES || 'repo user',
        apiKey: process.env.API_KEY,
        s3MediaBucket: process.env.S3_BUCKET,
        allowedGithubUsers: (process.env.ALLOWED_GITHUB_USERS || '').split(','),
        allowedAuthRedirectHosts: [
            '^localhost:3000$',
            '^www.wildgracevideo.com$',
            '.*wildgracevideo.netlify.app$',
        ],
        public: {
            siteUrl: SITE_URL,
            websiteIcon: WEBSITE_ICON,
            recaptchaSiteKey: '6Ld2tkcpAAAAAK052jkIsYcC5L12ih2pumxlA3e8',
            cloudfrontUrl: CLOUDFRONT_URL,
            reelVideo: {
                mp4Uri: '/wgv-reel-2024-h264.mp4',
                mpegDashFolder: 'wgv-reel-2024-mpeg-dash',
                mpegDashManifestFileName: 'wgv-reel-2024-h264_dash.mpd',
                hlsUri: '/wgv-reel-2024-hls/wgv-reel-2024.m3u8',
            },
        },
    },
    colorMode: {
        preference: 'light',
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
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: CLOUDFRONT_URL + '/Website-Main/wgvp-favicon.ico',
                },
                { rel: 'apple-touch-icon', sizes: '180x180', href: APP_ICON },
                { rel: 'manifest', href: ANDROID_SITE_MANIFEST_URL },
                {
                    rel: 'preconnect',
                    href: 'https://content.wildgracevideo.com',
                    crossorigin: true,
                },
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/shaka-player@4.12.2/dist/controls.min.css',
                },
                {
                    href: 'https://cdn.jsdelivr.net',
                    rel: 'preconnect',
                    crossorigin: true,
                },
            ],
        },
    },
    security: securityConfig,
    $production: {
        scripts: {
            registry: {
                metaPixel: {
                    id: '7800015660048842',
                },
            },
        },
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
            // https://github.com/nuxt/nuxt/issues/22257#issuecomment-1667578345
            cssnano:
                process.env.NODE_ENV === 'production'
                    ? {
                          preset: [
                              'default',
                              { discardComments: { removeAll: true } },
                          ],
                      }
                    : false, // disable cssnano when not in production
        },
    },
    css: ['~/assets/css/main.css', '~/assets/gfonts/google-fonts.css'],
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
            '/links',
        ],
        xsl: false,
        sources: ['/api/__sitemap__/urls'],
        excludeAppSources: true,
    },
    routeRules: {
        '/**': { isr: 3_600 }, // 1hr
        '/admin/**': { isr: false },
        '/admin/media': { ssr: false },
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
        '/who-we-are': {
            redirect: {
                to: '/about',
                statusCode: 301,
            },
        },
        '/behind-the-scenes': {
            redirect: {
                to: '/about',
                statusCode: 301,
            },
        },
    },
    robots: {
        disallow: ['/admin', '/admin/*', '/api', '/api/*', '/links'],
    },
    content: {},
    image: {
        domains: ['content.wildgracevideo.com'],
        provider: 'cloudfrontProvider',
        providers: {
            cloudfrontProvider: {
                name: 'cloudfrontProvider',
                provider: '~/providers/cloudfront-provider.ts',
                options: {
                    baseURL: CLOUDFRONT_URL + '/images',
                },
            },
        },
    },
    gtag: {
        enabled: process.env.NODE_ENV === 'production',
        id: GA_MEASUREMENT_ID,
    },
    modules: [
        '@nuxt/content',
        '@nuxt/ui',
        '@nuxt/image',
        '@nuxt/scripts',
        'nuxt-security',
        [
            '@nuxtjs/google-fonts',
            {
                families: {
                    Cardo: {
                        wght: [400],
                    },
                    'Playfair Display': [400, 700],
                    'Cormorant Garamond': [400],
                    Cormorant: [400, 600],
                    'Rock Salt': [400],
                    Poppins: [400, 600],
                },
                inject: true,
                base64: false,
                download: true,
                outputDir: 'assets/gfonts',
                stylePath: 'google-fonts.css',
                fontsDir: 'fonts',
                fontsPath: 'assets/gfonts/fonts',
            },
        ],
        'nuxt-gtag',
        'nuxt-schema-org',
        'nuxt-simple-robots',
        '@nuxtjs/sitemap',
    ],
};

export default defineNuxtConfig(config);
