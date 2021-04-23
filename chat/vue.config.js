module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views',
      },
    },
  },
  publicPath: "./",
  //解决跨域问题
  // devServer: {
  //   open: true,
  //     proxy: {
  //       '/api': {
  //         target: 'http://localhost:5000',
  //         changeOrigin: true,
  //         pathRewrite: {
  //           // '^/api':''
  //         }
  //       }
  //     },
  // },
  
}
