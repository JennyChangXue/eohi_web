module.exports = {
  productionSourceMap: false,
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: { // 配置跨域
      '/manage': {
        target: process.env.VUE_APP_BASE_URL,
        // secure: false,  // 如果是https接口，需要配置这个参数
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/manage': '/manage'
        }
      }
    }
  }
};
