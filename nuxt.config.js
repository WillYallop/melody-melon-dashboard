
export default {
  mode: 'universal',
  target: 'static',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { 
    color: '#3DA389', 
    height: '3px',
    throttle: 0
  },
  css: [

  ],
  plugins: [

  ],
  components: true,
  buildModules: [

  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['faChevronDown', 'faChevronUp', 'faChevronRight', 'faChevronLeft', 'faSearch', 'faHeadphones', 'faCog', 'faPlus', 'faStar', 'faMoon', 'faSun', 'faAd', 'faMusic', 'faBars', 'faTimes']
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['faSpotify']
        }
      ]
    }],
  ],
  axios: {
    baseURL: 'https://api.melodymelon.com/v1'
  },  
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/user/signin', method: 'post', propertyName: 'token' },
          user: { url: '/user', method: 'get', propertyName: 'data' },
          logout: false
        },
        autoFetchUser: true
      }
    },
    // Options
    redirect: false,
    resetOnError: true
  },
  router: {
    middleware: ['auth']
  },
  pwa: { 
    workbox: {}, 
    meta: { 
      theme_color: '#ffffff', 
      lang: 'en', 
      nativeUI: true,
      description: "Create Spotify Ad campaigns.",
    }, 
    icon: {},
    manifest: { 
      name: 'Melody Melon Campaigns', 
      lang: 'en', 
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#ffffff'
    } 
  },
  build: {

  },
  env: {
    API_URL: 'https://api.melodymelon.com/v1'

  },
  server: {     
    port: process.env.PORT || 8000,
    host: '0.0.0.0',  
  }
}
