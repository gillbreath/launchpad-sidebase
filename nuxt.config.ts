// https://nuxt.com/docs/api/configuration/nuxt-config

const baseUrlAuthSuffix = '/api/auth'

export default defineNuxtConfig({
  auth: {
    baseURL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}${baseUrlAuthSuffix}` : `http://localhost:3000${baseUrlAuthSuffix}`
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@bg-dev/nuxt-naiveui',
    '@sidebase/nuxt-auth',
    '@nuxtjs/i18n'
  ],
  i18n: {
    defaultLocale: 'en',
    locales: [
      {
        name: 'English',
        code: 'en',
        file: 'en.json'
      }
    ],
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    experimental: {
      localeDetector: 'localeDetector.ts'
    }
  },
  build: {
    transpile: [
      'trpc-nuxt'
    ]
  },
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: true
  }
})
