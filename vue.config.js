
// // 是否为生产环境
// const isProduction = process.env.NODE_ENV !== 'development'
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: 7777,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        // target: 'http://120.92.79.156',
        target: 'http://47.94.216.220',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "http://localhost:8080/api"//自定义
        }
      }
    }
  },
  configureWebpack: {
    externals:  {
      'vue': 'Vue',
      'element-ui': 'ELEMENT',
      'vue-router': 'VueRouter'
    }
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload');
    config.output.filename('js/[name].[hash].js').end();
    // config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)//增加这行代码
  }
}
