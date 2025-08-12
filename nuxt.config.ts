// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    [
      '@nuxtjs/tailwindcss',
      {
        configPath: 'tailwind.config.js',
      },
    ],
  ],
  css: ['@/assets/css/main.css'],
  devtools: { enabled: true },
  app: {
    head: {
      title: '뉴스피릿 미술 공모전 관리자',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ],
      htmlAttrs: {
        lang: 'ko'
      },
    },
  },
})
