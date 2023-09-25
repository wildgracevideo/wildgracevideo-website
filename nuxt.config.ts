// https://nuxt.com/docs/api/configuration/nuxt-config
const SITE_URL = process.env.URL || 'http://localhost:3000';
const APP_ICON = SITE_URL + '/app-icon.png';
const WEBSITE_ICON = SITE_URL + '/logo2.png';
const GA_MEASUREMENT_ID = "G-9KDTSVFRRW";

export default defineNuxtConfig({
  runtimeConfig: {
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
        { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
        { rel: 'preconnect', href: 'https://www.google-analytics.com' },
      ],
      script: [
        { src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`, async: true }
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
  image: {
    domains: ['https://i.ytimg.com'],
  },
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  sitemap: {
    xslTips: process.env.NODE_ENV !== 'production',
    exclude: ['/get-started'],
    xsl: false, 
  },
  routeRules: {
    '/': { sitemap: { images: [{ loc: '/logo1.webp', title: 'Wild Grace Videography logo', caption: 'Company logo for Wild Grace Videography, a Denver, Colorado-based video production company.' }] } },
    '/about': { sitemap: { images: [
        { loc: '/Carly1.webp', title: 'Carly Kreiger photo', caption: 'Photo of Carly Kreiger, the founder of Wild Grace Videography, a Denver, Colorado-based video production company.' },
        { loc: '/logo1.webp', title: 'Wild Grace Videography logo', caption: 'Company logo for Wild Grace Videography, a Denver, Colorado-based video production company.' }
      ] 
    } },
    '/portfolio': { sitemap: { images: [{ loc: '/logo1.webp', title: 'Wild Grace Videography logo', caption: 'Company logo for Wild Grace Videography, a Denver, Colorado-based video production company.' }] } },
  },
  modules: [
    '@nuxt/image', 'nuxt-schema-org', 'nuxt-simple-robots', 'nuxt-simple-sitemap'
  ],
});
