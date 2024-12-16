// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-lodash',
    '@vueuse/nuxt',
    'nuxt-swiper',
  ],
  tailwindcss: {
    cssPath: [
      '~/assets/css/main.css',
      {
        injectPosition: 'last',
      },
    ],
    configPath: 'tailwind.config.js',
    viewer: false,
  },
  future: {
    compatibilityVersion: 4,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-Hant',
      },
      titleTemplate: '%s - 來羽うみSupport',
      meta: [
        { name: 'robots', content: 'noindex, nofollow'},
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'keywords', name: 'keywords', content: '' },
        // { hid: 'description', name: 'description', content: '' },
        // { hid: 'og:site_name', property: 'og:site_name', content: '君華御品' },
        // { hid: 'og:image', property: 'og:image', content: 'https://junhua-royal-66800619506.asia-east1.run.app/og-image.jpg' },
        // { hid: 'og:title', property: 'og:title', content: '君華御品' },
        // { hid: 'og:description', property: 'og:description', content: '' },
        // { name: 'apple-mobile-web-app-title', content: '君華御品', },
      ],
      link:[
        // { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96', },
        // { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg', },
        // { rel: 'shortcut icon', href: '/favicon.ico', },
        // { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png', },
        // { rel: 'manifest', href: '/site.webmanifest', },
      ],
      script: [],
    }
  },
})
