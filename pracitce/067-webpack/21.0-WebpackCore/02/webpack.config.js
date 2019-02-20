module.exports = {
    entry: {
        home: './js/home.js',
        signup: './js/signup',
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist',
    }
}