
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://120.92.79.156',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "http://localhost:8080/api"//自定义
        }
      }
    }
  }
}
