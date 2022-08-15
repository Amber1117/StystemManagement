const { defineConfig } = require('@vue/cli-service')

// webpack.config.js
// const AutoImport = require('unplugin-auto-import/webpack')
// const Components = require('unplugin-vue-components/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  //打包文件
  outputDir: './build',
  // publicPath: './',//修改资源路径
  configureWebpack: {
    resolve: {
      //文件别名
      alias: {
        components: '@/components'
      }
    },
    // plugins: [
    //   AutoImport({
    //     resolvers: [ElementPlusResolver()],
    //   }),
    //   Components({
    //     resolvers: [ElementPlusResolver()],
    //   }),
    // ]
  }
})
