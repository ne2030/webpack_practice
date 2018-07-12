require('dotenv').config();
const path = require('path');
const Config = process.env.NODE_ENV === 'production' ? require('./webpack.config.prod') : require('./webpack.config.dev');

module.exports = {
    entry: {
        app: ['babel-polyfill', '../front_src/index.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    modules: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            exclude: [/node_modules/, /dist/],
            loader: 'eslint-loader',
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.html$/,
            use: {
                loader: 'html-loader',
                options: {
                    interpolate: true,
                }
            }
        },
        ]
    },
    ...Config
};
