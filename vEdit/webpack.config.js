var webpack = require('webpack');

module.exports = {
    context: __dirname + "/src",
    entry: {
        main: './main.js'
    },
    output: {
        path: '/home/hard/Project/game/web/static/',
        filename: 'vEdit.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.html']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: [ 'es2015']
            }
        }]
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};
