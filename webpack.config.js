const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        port: 9999,
        static: './dist',
        hot: true,
    },
    plugins: [
        // 플러그인 인스턴스 생성
        new HtmlWebpackPlugin({
            /** 플러그인 옵션 설정 **/
            // 문서 타이틀
            title: 'Webpack 러닝 가이드',
            // 문서 메타
            meta: {
                // <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                'X-UA-Compatible': {
                    'http-equiv': 'X-UA-Compatible',
                    'content': 'IE=edge',
                },
                // <meta name="theme-color" content="#4285f4" />
                'theme-color': '#4285f4',
            },
            template: 'src/index.html',
        }),
    ]
};