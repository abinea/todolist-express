import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// 详细Vite配置查看 https://vitejs.dev/config/
export default defineConfig({
  /**
   * 在生产环境的基本公共路径。
   * @default '/'
   */
  base: '',
  /**
    * 构建输出目录。如果目录存在，它将在构建之前被删除。
    * @default 'dist'
    */
  outDir: 'dist',

  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
  },
  server: {
    open: true,
    // host: "127.0.0.1",
    // 端口号 默认3000 如被占用则延续+1直到找到空闲端口
    port: 8080,
    // 是否开启 https
    https: false,
    proxy: {
      '/list': {
        target: 'http://172.31.100.160:3333',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    /**
     * 打包后静态资源 js/css/image 存放目录
     * @default 'assets'
     */
    // assetsDir: '',
  },
})

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = 3000 // dev port

const name = 'vue Admin Template' // page title


// module.exports = {

 // 是否自动在浏览器打开
// open: true,

  // 服务端渲染
  // ssr: false,

   // 引入第三方的配置
/* optimizeDeps: {
 include: ['moment', 'axios'],
}, */


// module.exports = {
//   publicPath: '/',
//   outputDir: 'dist',
//   assetsDir: 'static',
//   lintOnSave: process.env.NODE_ENV === 'development',
//   productionSourceMap: false,
//   devServer: {
//     port: port,
//     open: true,
//     overlay: {
//       warnings: false,
//       errors: true
//     },
//     proxy: {
//       '/tyapi': {
//         // target: 'http://121.4.185.167/',
//         target: 'https://szuswzx.com/',
//         ws: true,
//         changeOrigin: true,
//         secure: false,
//         pathRewrite: {
//           // '^/tyapi': '/api'

//           //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
//           // pathRewrite: {
//           //   '^/api': '/api'
//           // }
//           // 重写之后url为 http://192.168.1.16:8085/api/xxxx
//         }
//       },
//       '/tyupload': {
//         target: 'https://szuswzx.com',
//         ws: true,
//         changeOrigin: true,
//         secure: false,
//         pathRewrite: {
//           "^/tyupload": "/ty/tyupload"
//         }
//       }
//     },
//   },

//   configureWebpack: {
//     // provide the app's title in webpack's name field, so that
//     // it can be accessed in index.html to inject the correct title.
//     name: name,
//     resolve: {
//       alias: {

//       }
//     }
//   },
//   chainWebpack(config) {
//     // it can improve the speed of the first screen, it is recommended to turn on preload
//     config.plugin('preload').tap(() => [{
//       rel: 'preload',
//       // to ignore runtime.js
//       // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
//       fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
//       include: 'initial'
//     }])

//     // when there are many pages, it will cause too many meaningless requests
//     config.plugins.delete('prefetch')

//     // set svg-sprite-loader
//     config.module
//       .rule('svg')
//       .exclude.add(resolve('src/icons'))
//       .end()
//     config.module
//       .rule('icons')
//       .test(/\.svg$/)
//       .include.add(resolve('src/icons'))
//       .end()
//       .use('svg-sprite-loader')
//       .loader('svg-sprite-loader')
//       .options({
//         symbolId: 'icon-[name]'
//       })
//       .end()

//     config
//       .when(process.env.NODE_ENV !== 'development',
//         config => {
//           config
//             .plugin('ScriptExtHtmlWebpackPlugin')
//             .after('html')
//             .use('script-ext-html-webpack-plugin', [{
//               // `runtime` must same as runtimeChunk name. default is `runtime`
//               inline: /runtime\..*\.js$/
//             }])
//             .end()
//           config
//             .optimization.splitChunks({
//               chunks: 'all',
//               cacheGroups: {
//                 libs: {
//                   name: 'chunk-libs',
//                   test: /[\\/]node_modules[\\/]/,
//                   priority: 10,
//                   chunks: 'initial' // only package third parties that are initially dependent
//                 },
//                 elementUI: {
//                   name: 'chunk-elementUI', // split elementUI into a single package
//                   priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
//                   test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
//                 },
//                 commons: {
//                   name: 'chunk-commons',
//                   test: resolve('src/components'), // can customize your rules
//                   minChunks: 3, //  minimum common number
//                   priority: 5,
//                   reuseExistingChunk: true
//                 }
//               }
//             })
//           // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
//           config.optimization.runtimeChunk('single')
//         }
//       )
//   }
// }
