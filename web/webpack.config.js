var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    context: __dirname + "/src",
    entry: {
        app: './app.js'
    },
    output: {
        path: __dirname + '/build/js',
        filename: '[name].js'
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
                presets: ['react', 'es2015']
            }
        },{
            test: /\.scss$/,
            loader: 'style!css!autoprefixer!sass'
        },{
            test: /\.css$/,
            loader: 'style!css'
        }]
    },
    plugins: [
        commonsPlugin,
        new webpack.NoErrorsPlugin()
    ]
};
