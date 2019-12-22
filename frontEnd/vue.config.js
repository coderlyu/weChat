const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  assetsDir: 'static',
  lintOnSave: true,
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 9527,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://47.106.68.248:3000', // 请求地址
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 请求地址
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('@/components'))
      .set('view', resolve('@/views'))
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
