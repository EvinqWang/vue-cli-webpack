module.exports = {
    presets: [
        // ['@vue/app'],
        ['@vue/cli-plugin-babel/preset'],
        [
            '@babel/preset-typescript',
            {
                allExtensions: true,
                isTSX: true,
            },
        ],
    ],
    plugins: [
        ['./build/babel/babel-plugin-enum-to-object', { reflect: false }],
        ['@babel/plugin-proposal-optional-chaining'],
        ['@babel/plugin-transform-typescript'],
    ],
};
