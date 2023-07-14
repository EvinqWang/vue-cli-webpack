
class ReduceEnumWebpackPlugin {
    constructor(options) {
        this.options = options;
    }
    // 每个plugin实例必须有apply方法，接收compiler实例
    apply(compiler) {
        // compilation => 此次打包的上下文
        compiler.hooks.emit.tap('ReduceEnumWebpackPlugin', (compilation) => {
            // 遍历资源文息，其中assetName为每个资源的名称，value为文件内容
            for (const assetName in compilation.assets) {
                if (assetName.endsWith('.js')) {
                    // 每个资源的值
                    const content = compilation.assets[assetName].source()
                    if (content && content.replace == undefined) {
                        console.log("content.replace == undefined>>>>>>>>>>>>>");
                    }
                    const newContent = content.replace(/(\w)\[(\1\.(\w+)=(-?\d+|\d+e\d))\]="\3"/g, '$2').replace(/(\w)\[(\1\[("\w*")?\]=(-?\d+|\d+e\d))\]=\3/g, '$2')
                    // 覆盖原始对象
                    compilation.assets[assetName] = {
                        source: () => newContent,
                        size: () => newContent.length,
                    }
                }
            }
        })
    }
}

module.exports = {
    productionSourceMap: false,
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.ts',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    },
    configureWebpack: {
        plugins: [
            // new ReduceEnumWebpackPlugin()
        ]
    },
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => {
                // 修改它的选项...
                return options
            })
    }
}