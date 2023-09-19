// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    url: process.env.URL || 'http://localhost:3000'
  },
  app: {
    head: {
      title: 'Wild Grace Videography',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    '/': { sitemap: { images: [{ loc: '/logo1.webp', title: 'Wild Grace Videography logo', caption: 'Company logo for Wild Grace Videography, a Denver based videography company.' }] } },
    '/about': { sitemap: { images: [{ loc: '/Carly1.webp', title: 'Carly Kreiger photo', caption: 'Photo of Carly Kregier, the founder of Wild Grace Videography.' }] } },
  },
  modules: [
    'nuxt-simple-sitemap', 'nuxt-simple-robots'
  ]
})
