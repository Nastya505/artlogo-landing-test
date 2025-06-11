// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Artlogo - Professional Logo Design & Digital Signatures',
      meta: [
        { name: 'description', content: 'Create stunning professional logos and digital signatures. Multipurpose design that represents you perfectly. Used by thousands of professionals worldwide.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
      ],
      script: [
        {
          innerHTML: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M8P667PL');
          `,
          type: 'text/javascript',
        },
      ],
      noscript: [
        {
          innerHTML: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M8P667PL"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `,
        },
      ],
    },
  },
  
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  srcDir: 'src',
  
  css: ['~/assets/css/main.css', 'element-plus/dist/index.css','@artlogo-co/ui-kit/dist/style.css'  ],
  vite: {
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@artlogo-co/ui-kit/scss/element-plus-theme.scss" as *;',
        },
      },
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
})
