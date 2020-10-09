const path = require('path')

module.exports = {
  title: 'shan-hai-jing',
  description: '山海经',
  theme: 'vuepress-theme-book',
  themeConfig: {
    // logo: '/logo.png',
    searchPlaceholder: 'Search...',
    lastUpdated: 'Last Updated',
    editLinks: true,
    sidebar: 'auto',
    nav: [
      { text: 'Home', link: '/' },
      // {
      //   text: 'Github',
      //   link:
      //     'https://github.com/cyrilf/vuepress-theme-book/tree/master/packages/vuepress-theme-book',
      // },
      // {
      //   text: 'Default Theme Config',
      //   link: 'https://vuepress.vuejs.org/theme/default-theme-config.html',
      // },
    ],
    sidebar: [{ path: '/design/', text: 'Design' }],
  },
  plugins: [],
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, '../assets'),
      },
    },
  },
}
