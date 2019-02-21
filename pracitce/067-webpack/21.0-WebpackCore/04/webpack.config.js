module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/, // 如果是 .css 文件
                use: ['style-loader', 'css-loader'] // 则执行 css-loader / style-loader，从右到左执行
            }
        ]
    }
}