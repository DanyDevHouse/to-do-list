export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'to-do-list',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['element-ui/lib/theme-chalk/index.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/element-ui'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyDzb3u-hxaCPf-Td3jRLGwdQN90WXc-NV4",
          authDomain: "todolist-f4e1f.firebaseapp.com",
          databaseURL: "https://todolist-f4e1f-default-rtdb.europe-west1.firebasedatabase.app",
          projectId: "todolist-f4e1f",
          storageBucket: "todolist-f4e1f.appspot.com",
          messagingSenderId: "419061936933",
          appId: "1:419061936933:web:dccc27e865f508d3d260cc",
          measurementId: "G-PXSVRK74HB"
        },
        services: {
          auth: true // Just as example. Can be any other service.
        }
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
}
