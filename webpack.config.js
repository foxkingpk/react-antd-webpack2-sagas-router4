var path = require("path")

var config = {
    entry: { 
        main: "./src/main.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        publicPath: "dist/",
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            use: [
                "babel-loader",
            ],
            exclude:/node_modules/
        },{
            test:/\.less$/,
            use:[
                "style-loader",
                "css-loader",
                "less-loader"
            ]
        },{
            test:/\.css$/,
            use:[
                "style-loader",
                "css-loader"
            ]
        }, {
            test: /\.(png|jpe?g|gif|svg)$/,
            use: [
                {
                    loader:"url-loader",
                    options: {
                        limit: 240, // 10KB 以下使用 base64
                        name: 'img/[name]-[hash:6].[ext]'
                    }
                }
            ]
        }]
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias:{
            COMPONENT: path.resolve(__dirname, "./src/components"),
            REDUX: path.resolve(__dirname, "./redux"),
            ASSETS: path.resolve(__dirname, "./assets"),
            MOCKJS: path.resolve(__dirname, "./mockjs"),
        }
    }
}

module.exports = config;