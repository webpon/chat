const CompressionPlugin = require("compression-webpack-plugin");
// 压缩 css 
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩 js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const IS_PROD = process.env.NODE_ENV === "production";
module.exports = {
    publicPath: "./",
    //去除生产环境的productionSourceMap
    productionSourceMap: !IS_PROD,
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
              @import '~@/styles/var.scss';
              @import '~@/styles/mixins.scss';
            `,
            },
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                assets: '@/assets',
                common: '@/common',
                components: '@/components',
                network: '@/network',
                views: '@/views',
                plugins: '@/plugins',
            },
        },
        plugins: IS_PROD ? [
            /* 压缩文件，并生产gzip文件 */
            new CompressionPlugin({
                // filename: '[path][base].gz', // 生成的文件名
                algorithm: 'gzip', // 类型
                test: new RegExp('\\.(js|css)$'), // 匹配规则
                threshold: 1024, // 字节数 只处理比这个大的资源
                minRatio: 0.8, // 压缩率 只有比这个小的才会处理
                deleteOriginalAssets: true // 删除原文件
            }),
        ] : [],
        // 看这里：把chunk-vendors.js进行分包，提升资源加载速度，很有必要
        optimization: IS_PROD ? {
            minimize: true,
            minimizer: [
                // 自定义js优化配置，将会覆盖默认配置
                new UglifyJsPlugin({
                    exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
                    cache: true,
                    parallel: true, // 开启并行压缩，充分利用cpu
                    sourceMap: false,
                    extractComments: false, // 移除注释
                    uglifyOptions: {
                        compress: {
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log'],
                            unused: true,
                            drop_debugger: true
                        },
                        warnings: false,
                        output: {
                            comments: false
                        }
                    }
                }),
                // 用于优化css文件
                new OptimizeCssAssetsPlugin({
                    assetNameRegExp: /\.css$/g,
                    cssProcessorOptions: {
                        safe: true,
                        autoprefixer: { disable: true }, // 这里是个大坑，稍后会提到
                        mergeLonghand: false,
                        discardComments: {
                            removeAll: true // 移除注释
                        }
                    },
                    canPrint: true
                })
            ],
            /**
             * 异步代码文件清单，可以提高浏览器缓存功能
             * runtimeChunk可选值有：true或'multiple'或'single'
             * true或'multiple'会有每个入口对应的chunk。不过一般情况下
             * 考虑到要模块初始化，设置为single就够多数情况下使用啦。
             * 详情见官网：https://webpack.docschina.org/configuration/optimization/#optimizationruntimechunk
             * */
            runtimeChunk: 'single',
            /**
             * 以前是CommonsChunkPlugin，现在换成optimization.splitChunks。普通项目下方的配置就足够用啦
             * 详情见官网：https://webpack.docschina.org/configuration/optimization/#optimizationsplitchunks
             * */
            /* tree shaking */
            usedExports: true,
            splitChunks: {
                chunks: 'all', // 可选值：all，async 和 initial。all功能最强大，所以咱们就使用all
                maxInitialRequests: Infinity, // 最大并行请求数，为了以防万一，设置无穷大即可
                minSize: 100000, // 引入的模块大于20kb才做代码分割，官方默认20000，这里不用修改了
                maxSize: 100000, // 若引入的模块大于60kb，则告诉webpack尝试再进行拆分
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/, // 使用正则匹配node_modules中引入的模块
                        priority: -10, // 优先级值越大优先级越高，默认-10，不用修改
                        name(module) { // 设定分包以后的文件模块名字，按照包名字替换拼接一下
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                            return `npm.${packageName.replace('@', '')}`
                        },
                    },
                    // 将多处引用的依赖抽离
                    common: {
                        name: "chunk-common",
                        chunks: "initial",
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 10,
                        priority: 1,
                        reuseExistingChunk: true,
                        enforce: true
                    }
                },
            }
        } : {},
        // key: Value, key为导入的包名，value为CDN全局的变量
        externals: IS_PROD ? {
            'vue': 'Vue',
            'ant-design-vue': 'antd',
            'vuex': 'Vuex',
            'vue-router': 'VueRouter',
            'axios': 'axios',
        } : {}
    },
    //解决跨域问题
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                pathRewrite: {
                    // '^/api':''
                }
            },
            '/oss': {
                target: 'http://127.0.0.1:19000',
                changeOrigin: true,
                '^/oss': ''
            }
        },
    },
}
