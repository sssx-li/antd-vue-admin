"use strict";
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// const name = 'Vue-template-demo' // page title

// const port = process.env.port || process.env.npm_config_port || 9528; // dev port
const port = 3000; // dev port
module.exports = {
  publicPath: "/", // 部署应用包时的基本 URL
  outputDir: "dist", // 生产环境构建文件的目录
  assetsDir: "static", // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  lintOnSave: process.env.NODE_ENV === "development", // 保存自动格式化
  productionSourceMap: false, // 生产环境管是否开启source map， false可以优化构建速度
  devServer: {
    port: 3000,
    open: true,
    overlay: {
      // 浏览器是否全屏展示警告/错误
      warnings: false,
      errors: true,
    },
    /* proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `https://astrorelay-dev.goodcloud.xyz`, // 开发服务器
        changeOrigin: true,
      },
    }, */
    before: require('./mock/mock-server') //before方法：能够在其他所有的中间件之前执行自定义的中间件
  },
  configureWebpack: {
    // name: name, // 在webpack的name字段中提供应用程序的标题，这样就可以在index.html中访问它来注入正确的标题。
    resolve: {
      alias: {
        // 创建 import 或 require 的别名
        "@": resolve("src"),
      },
    },
  },
  chainWebpack(config) {
    // 它可以提高第一屏的速度，建议开启预加载
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // 忽略runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial",
      },
    ]);

    // 当有很多页面时，会产生很多无意义的请求，删掉 (prefetch 跟 preload 不同，它的作用是告诉浏览器未来可能会使用到的某个资源，浏览器就会在闲时去加载对应的资源)
    config.plugins.delete("prefetch");

    // set svg-sprite-loader  （把项目中的svg图片做成精灵图）
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons")) // 不让 url-loader 处理该文件夹
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();

    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        // script-ext-html-webpack-plugin 通过为脚本提供不同的部署选项来增强html-webpack-plugin功能，包括“异步”，“预加载”，“预取”，“延迟”，“模块”，自定义属性和内联。
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // 'runtime'必须与runtimeChunk名称相同。默认是 `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        // 代码分割
        chunks: "all", // async异步代码分割 initial同步代码分割 all同步异步分割都开启
        cacheGroups: {
          // 缓存组，将所有加载模块放在缓存里面一起分割打包
          libs: {
            name: "chunk-libs", // 缓存组里面的filename，覆盖默认命名
            test: /[\\/]node_modules[\\/]/,
            priority: 10, // 优先级，先打包到哪个组里面，值越大，优先级越高
            chunks: "initial", // 只打包最初依赖的第三方
          },
          elementUI: {
            name: "chunk-elementUI", // 将elementUI拆分为单个包
            priority: 20, // 优先级需要大于libs和app，否则它将被打包到libs或app中
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // 为了适应cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // 可以自定义规则
            minChunks: 3, //  最低应用次数
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk 把runtime部分的代码抽离出来单独打包
      // 形如import('abc').then(res=>{})这种异步加载的代码，在webpack中即为运行时代码。异步加载路由即为runtime代码
      // runtimeChunk作用是为了线上更新版本时，充分利用浏览器缓存，使用户感知的影响到最低。
      // 优化持久化缓存的, runtime 指的是 webpack 的运行环境(具体作用就是模块解析, 加载) 和 模块信息清单, 模块信息清单在每次有模块变更(hash 变更)时都会变更, 所以我们想把这部分代码单独打包出来, 配合后端缓存策略, 这样就不会因为某个模块的变更导致包含模块信息的模块(通常会被包含在最后一个 bundle 中)缓存失效. optimization.runtimeChunk 就是告诉 webpack 是否要把这部分单独打包出来.
      config.optimization.runtimeChunk("single");
    });
  },
};
