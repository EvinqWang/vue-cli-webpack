// px转rem配置
const postcssCustomProperties = require('postcss-custom-properties');

module.exports = () => ({
    plugins: [
        postcssCustomProperties({
            preserve: false,
            // importFrom: 'src/jvui/style/theme.css',
        }),
    ],
});
