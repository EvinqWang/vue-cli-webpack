module.exports = {
    plugins: [
        ['./build/babel/babel-plugin-enum-to-object.js', {
            // reflect: true // 默认值 代表需要反射值
            reflect: true // 代表不需要反射值
        }]
    ],
    presets: [
        '@vue/cli-plugin-babel/preset'
    ]
}
