const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../onDevelop'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'Development',
            showErrors: true // 에러 발생시 메세지가 브라우저 화면에 노출 된다.
        })
    ],
    optimization: {
        minimize: false,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            }
        ]
    },
    devtool: 'eval-source-map',
    devServer: {
        hot: true, // 서버에서 HMR을 켠다.
        host: '0.0.0.0', // 디폴트로는 "localhost" 로 잡혀있다. 외부에서 개발 서버에 접속해서 테스트하기 위해서는 '0.0.0.0'으로 설정해야 한다.
        contentBase: './onDevelop/dist', // 개발서버의 루트 경로
        stats: {
            color: true
        },
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
    },
};
