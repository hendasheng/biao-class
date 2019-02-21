module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
        publicPath: './dist/',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            }
        ],
    },
};