var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname + "/src",
    entry: {
        index: './index.js'
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
        },{
            test: /\.(jpg|png)$/,
            loader: "url?limit=8192",
        }]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: '../../index.html',
            template: 'index.html',
            inject:'body',
            minify:{
                removeComments:true,
                collapseWhitespace:true
            }
        })
    ]
};
