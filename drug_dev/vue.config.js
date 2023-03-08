const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true, devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost',  //跨域域名1
        pathRewrite: { '^/api': '' },  //路径重写
        ws: true,  //用于支持websocket
        changeOrigin: true  //用于控制请求头中的host值
      },
      // '/api-two': {
      //   target: 'http://localhost:3000',  //跨域域名2
      //   pathRewrite: { '^/api-two': '' },
      //   // ws: true,  //用于支持websocket
      //   // changeOrigin: true
      // },
    }
  },
})
