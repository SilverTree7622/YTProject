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
            {
                test: /.css?$/,
                exclude: [],
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],

    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        // path alias를 설정하는 부분
        alias: {
            "@src": path.resolve(__dirname, "src"),
            "@util": path.resolve(__dirname, "src/util"),
        }
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, ''),
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
            template: 'index.html',
        }),
    ]
};