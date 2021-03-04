const path = require('path');
module.exports = {
  // 基本路径
  publicPath: "/",
  // 输出文件目录
  outputDir: "dist",
	// 静态资源目录
	assetsDir: "static",
  indexPath: "index.html",
  // 生成hash文件名
  filenameHashing: true,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@':path.resolve('./src')
      }
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {}
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // webpack-dev-server 相关配置
  devServer: {
		hot: true,
    open: true, //配置自动启动浏览器
    // host: "localhost",
    // port: 8080, // 当前vue项目 端口号
    https: false,
    // proxy: null, // 设置代理
    // proxy: 'http://123.206.33.109:8081',          // 配置跨域处理,只有一个代理
    // proxy: {
    //   // 配置多个代理
    //   "/api": {
    //     target: "http://localhost:8081",//这里改成你自己的后端api端口地址，记得每次修改，都需要重新build
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       // 路径重写，
    //       "^/apb": "" // 替换target中的请求地址
    //     }
    //   },
    //   "/images": {
    //     target: "http://localhost:8081",
    //     ws: true,
    //     changeOrigin: true
    //   },
    // },
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};