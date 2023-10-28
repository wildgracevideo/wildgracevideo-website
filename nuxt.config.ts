// https://nuxt.com/docs/api/configuration/nuxt-config
const SITE_URL = process.env.URL || 'http://localhost:3000';
const APP_ICON = SITE_URL + '/app-icon.png';
const WEBSITE_ICON = SITE_URL + '/logo2.png';
const GA_MEASUREMENT_ID = "G-9KDTSVFRRW";
const RECAPTCHA_SITE_KEY = '6LcqgVMoAAAAABLWZCEs3MtuslhHwadUEiMlRCFV';


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
    public: {
      siteUrl: SITE_URL,
      wesbiteIcon: WEBSITE_ICON,
      gaMeasurementId: GA_MEASUREMENT_ID,
    }
  },
  site: {
    url: SITE_URL,
  },
  app: {
    head: {
      title: 'Wild Grace Videography',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
      ],
      link: [
        { rel: 'canonical', href: SITE_URL },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: APP_ICON },
        { rel: 'preconnect', href: 'https://d22668h9qdy3zj.cloudfront.net' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://www.google.com' },
      ],
      script: [
        { src: `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`, async: true },
      ]
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  css: [
    '~/assets/css/main.css'
  ],
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  sitemap: {
    xslTips: process.env.NODE_ENV !== 'production',
    exclude: ['/get-started'],
    xsl: false, 
  },
  routeRules: {
    '/': { sitemap: { 
      images: [
        { loc: '/logo1.webp', title: 'Wild Grace Videography logo', caption: 'Company logo for Wild Grace Videography, a Denver, Colorado-based video production company.' }
      ], 
      videos: [
        { 
          title: 'Wild Grace Videography Reel', 
          'thumbnail_loc':  SITE_URL + '/logo1.webp',
          description: 'Video reel showcasing the work of Wild Grace Videography, a Denver, Colorado-based video production company.',
          'content_loc': 'https://d22668h9qdy3zj.cloudfront.net/wgv-reel.webm',
          'player_loc': SITE_URL,
          duration: 92,
          requiresSubscription: false,
          live: false,
          publicationDate: '2023-09-26T19:20:30+07:00.'
        }
      ]
    }},
    '/about': { sitemap: { images: [
        { loc: '/Carly1.webp', title: 'Carly Kreiger photo', caption: 'Photo of Carly Kreiger, the founder of Wild Grace Videography, a Denver, Colorado-based video production company.' },
        { loc: '/logo1.webp', title: 'Wild Grace Videography logo', caption: 'Company logo for Wild Grace Videography, a Denver, Colorado-based video production company.' }
      ] 
    } },
    '/portfolio': { sitemap: { images: [{ loc: '/logo1.webp', title: 'Wild Grace Videography logo', caption: 'Company logo for Wild Grace Videography, a Denver, Colorado-based video production company.' }] } },
  },
  robots: {
    disallow: ['/_nuxt/*', '/_nuxt', '/_ipx', '/_ipx/*', '/admin', '/admin/*', '/api', '/api/*'],
  },
  auth: {        
    baseURL: SITE_URL,
    provider: {
      type: 'authjs'
    }
  },
  modules: [
    '@sidebase/nuxt-auth', '@nuxt/image', 'nuxt-schema-org', 'nuxt-simple-robots', 'nuxt-simple-sitemap'
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.app?.head?.script?.push({ src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`, async: true });
  config.app?.head?.link?.push({ rel: 'preconnect', href: 'https://www.googletagmanager.com' });
  config.app?.head?.link?.push({ rel: 'preconnect', href: 'https://www.google-analytics.com' });
}

export default defineNuxtConfig(config);
