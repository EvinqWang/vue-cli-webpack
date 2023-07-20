// 用来分析页面速度
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const merge = require("webpack-merge");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { ReduceEnumWebpackPlugin } = require('./build/plugin/ReduceEnumWebpackPlugin.js ');
// const MiniCssExtractPluginLoader = MiniCssExtractPlugin.loader;

// const path = require('path');
// let resolve = dir => path.join(__dirname, '..', dir);
// const publicPath = '/';
const smp = new SpeedMeasurePlugin();

const threadLoader = require('thread-loader');
const threadLoaderOptionsCss = {
    workerParallelJobs: 50,
    poolParallelJobs: 50,
    name: 'css-threadloader',
};
threadLoader.warmup(threadLoaderOptionsCss, ['css-loader', 'postcss-loader', 'sass-loader']);

module.exports = {
    productionSourceMap: false,
    // pages: {
    //     index: {
    //         // page 的入口
    //         entry: "src/main.ts",
    //         // 模板来源
    //         template: "public/index.html",
    //         // 在 dist/index.html 的输出
    //         filename: "index.html",
    //         // 当使用 title 选项时，
    //         // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //         title: "Index Page",
    //         // 在这个页面中包含的块，默认情况下会包含
    //         // 提取出来的通用 chunk 和 vendor chunk。
    //         build: {
    //             release: "RELEASE",
    //             environment: process.env.NODE_ENV || 'unknown',
    //             buildEnv: process.env.BUILD_ENV || 'local',
    //         },
    //     },
    // },
    configureWebpack: merge(
        smp.wrap({
            plugins: [
                new BundleAnalyzerPlugin({
                    statsFilename: "stats.json",
                    generateStatsFile: true,
                }),
            ].filter(Boolean),
        }),
        {
            // plugins: [
            //     // TODO待落地, 枚举简化。 
            //     new ReduceEnumWebpackPlugin(),
            // ],
        }
    ),

    chainWebpack: (config) => {
        // let miniCssExtractPlugin = new MiniCssExtractPlugin({
        //     filename: 'assets/[name].[hash:8].css',
        //     chunkFilename: 'assets/[name].[hash:8].css',
        // });
        // config.plugin('extract-css').use(miniCssExtractPlugin);
        
        // 解决webp相对路径引入问题
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => {
                return {
                    ...options,
                    transformAssetUrls: { img: ['src', 'lazysrc'] },
                };
            });
        
        // 多线程ts检查
        config.plugin('fork-ts-checker').tap(args => {
            args[0].workers = 4;
            args[0].memoryLimit = 4096;
            return args;
        });

        // 丑化压缩代码
        // TODO待落地 
        // config.plugin('UglifyJsPlugin').use(UglifyJsPlugin, [
        //     {
        //         uglifyOptions: {
        //             compress: true,
        //         },
        //     },
        // ]);

        // 配置压缩index.html 
        // TODO待落地 
        config.plugin('html').tap(args => {
            args[0].template = 'public/index.html'
            args[0].entry = "src/main.ts",
            args[0].filename = "index.html",
            args[0].title = "Index Page",
            args[0].build = {
                release: "RELEASE",
                environment: process.env.NODE_ENV || 'unknown',
                buildEnv: process.env.BUILD_ENV || 'local',
            },
            args[0].minify =  {
                removeComments: true, // 是否删除注释
                removeRedundantAttributes:true, // 是否删除多余（默认）属性
                removeEmptyAttributes:true,  // 是否删除空属性
                collapseWhitespace:false,  // 折叠空格
                removeStyleLinkTypeAttributes:true, // 比如link中的type="text/css"
                minifyCSS:true, // 是否压缩style标签内的css
                minifyJS:{  // 压缩JS选项，可参考Terser配置
                    mangle:{
                        toplevel: true
                    }
                }
            }
            return args
        })
        
        // 样式文件处理
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => {
            config.module
                .rule('css')
                .oneOf(type)
                .use('thread-loader')
                .loader('thread-loader')
                .options({ ...threadLoaderOptionsCss })
                .before('css-loader')
                .end();
        });
    },
};
