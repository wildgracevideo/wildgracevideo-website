// https://nuxt.com/docs/api/configuration/nuxt-config
const SITE_URL = process.env.URL || 'http://localhost:3000';
const APP_ICON = SITE_URL + '/app-icon.png';
const WEBSITE_ICON = 'logo2.png';
const GA_MEASUREMENT_ID = "G-9KDTSVFRRW";


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
    formsFromEmail: 'info@wildgracevideography.com',
    formsToEmail: 'carly@wildgracevideography.com',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeReelIdeasPriceId: process.env.STRIPE_REEL_IDEAS_PRICE_ID,
    sendGridApiKey: process.env.SENDGRID_API_KEY,
    reelIdeasTemplateId: process.env.REEL_IDEAS_TEMPLATE_ID,
    omnisendApiKey: process.env.OMNISEND_API_KEY,
    sendgridWebhookSigningKey: process.env.SENDGRID_WEBHOOK_SIGNING_KEY,
    public: {
      siteUrl: SITE_URL,
      wesbiteIcon: WEBSITE_ICON,
      gaMeasurementId: GA_MEASUREMENT_ID,
      recaptchaSiteKey: '6LcqgVMoAAAAABLWZCEs3MtuslhHwadUEiMlRCFV',
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
        { rel: 'preconnect', href: 'https://www.google.com' },
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
    exclude: ['/get-started', '/privacy-policy', '/terms', '/purchase-success'],
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
          thumbnail_loc: SITE_URL + '/logo1.webp',
          description: 'Video reel showcasing the work of Wild Grace Videography, a Denver, Colorado-based video production company.',
          content_loc: 'https://d22668h9qdy3zj.cloudfront.net/wgv-reel.webm',
          player_loc: SITE_URL,
          duration: 92,
          requires_subscription: false,
          live: false,
          publication_date: '2023-09-26T19:20:30+07:00.'
        }
      ]
    }},
    '/about': { sitemap: { images: [
        { loc: '/Carly1.webp', title: 'Carly Kreiger photo', caption: 'Photo of Carly Kreiger, the founder of Wild Grace Videography, a Denver, Colorado-based video production company.' },
        { loc: '/logo1.webp', title: 'Wild Grace Videography logo', caption: 'Company logo for Wild Grace Videography, a Denver, Colorado-based video production company.' }
      ] 
    } },
    '/portfolio': { sitemap: { images: [{ loc: '/logo1.webp', title: 'Wild Grace Videography logo', caption: 'Company logo for Wild Grace Videography, a Denver, Colorado-based video production company.' }] } },
    '/30-day-video-transformation': { sitemap: { images: [
      { loc: '/37-reel-ideas.webp', title: '30-Day Video Transformation logo', caption: 'Boost Your Social Media Presence with 37 Engaging Reel Ideas and a Content Planner. Share Your Journey, Build Trust, and Watch Your Audience Grow in 30 Days.' },
    ]}},
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
