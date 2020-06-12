module.exports = {
  title: 'feiker 的小站',
  description: '记录开发问题',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '前端', link: '/fe' },
      { text: '算法', link: '/algorithm' },
      { text: '笔记', link: '/note' },
    ],
  },
  plugins: [
    ['@vuepress/back-to-top'], // 返回顶部
    ['@vuepress/nprogress'], // 加载进度条
  ],
};
