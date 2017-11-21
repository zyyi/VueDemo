
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

module.exports = {
    // 第一部分: 入口和出口的设置
    // 入口
    // entry: './src/main.js',
    entry: {
        app: "./src/main.js",
        // 把js部分需要分离的文件名，写入到这里，利用插件进行分割
        vendor: ["vue"]
    },
    // 出口
    output: {
        path: path.join(__dirname + "/dist"),
        filename: "bundle.js"
    },
    // 第二部分：加载器的添加
    module: {
        rules: [
            // 解析.vue文件的vue-loader
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            // 解析.css文件的css-loader
            // {
            //     test: /\.css$/,
            //     use: [ 'style-loader', 'css-loader' ]
            // },
            // 抽离css样式插件
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
            },
            // 将ES6语法转为ES5
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['env']
                  }
                }
            },
            // 解析图片文件
            {
                test:/\.(jpg|png|jpeg|gif|ttf|woff|woff2|eot|svg)$/,
                use:'url-loader'
            }
        ]
    },
    // 配置开发服务器，用来监听src源文件的变化，
    // 如果源文件有变化，自动进行打包处理，显示结果
    devtool: "eval",
    devServer: {
        // 告诉当前的服务器，监听的区域
        contentBase: __dirname + 'src',
        host: 'localhost',        
        hot: true, // 是否提供热更新功能
        open: true, // 是否自动打开浏览器
        port: 8080, // 端口号的配置
        openPage: ''
    },

    // webpack 第三部分 插件
    plugins: [
        // 自动生成html文件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            htmlWebpackPlugin: {
                "files": {
                    "css":["app.css"],
                    "js": ["bundle.js", "vendor.js"]
                }
            },
            // 压缩 情怀至上
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        // 从bundle.js中提取css的插件
        new ExtractTextPlugin("app.css"),

        // 提取公共代码
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }), 
        // 默认会把所有入口节点的公共代码提取出来，生成一个common.js
        
    ] 
}