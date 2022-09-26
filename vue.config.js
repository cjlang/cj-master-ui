/*
 * @Author: cjlang 759403090@qq.com
 * @Date: 2022-05-18 17:40:09
 * @LastEditors: cjlang 759403090@qq.com
 * @LastEditTime: 2022-09-11 09:48:25
 * @FilePath: /cj-master-ui/vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const webpack = require('webpack')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

// 换肤插件
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')

module.exports = {
  publicPath: '/web',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: 9091,
    hotOnly: false,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      //axios跨域改造 by zhengkai.blog.csdn.net
     '/api': {
       target:'http://localhost:9090/service/', // 你请求的第三方接口
       changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
       pathRewrite:{  // 路径重写，
         '^/api': ''  // 替换target中的请求地址，也就是说/api=/target，请求target这个地址的时候直接写成/api即可。
       }
     }
   }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/assets/style/globalvar.scss";@import "~@/assets/style/globalstyle.scss";`
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    name: ' CJ-WEB',
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new ThemeColorReplacer({
        fileName: 'theme-colors.[contenthash:8].css',
        matchColors: forElementUI.getElementUISeries('#409EFF'),
        changeSelector: forElementUI.changeSelector
      })
    ]
  }
}
