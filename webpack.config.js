const path = require('path');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env) {
  const config = {
    entry: {
      main: './src/main.js',
      vendor: ['react', 'react-dom', 'react-router-dom', 'react-redux']
    },
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: '[name].bundle.js',
      publicPath: '/'
    },
    devServer: {
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          use: [
            'babel-loader'
          ],
          exclude: /node_modules/
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'less-loader']
          })
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1000, // 10KB 以下使用 base64
                name: 'imgs/[name]-[hash:6].[ext]'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        COMPONENT: path.resolve(__dirname, './src/components'),
        API: path.resolve(__dirname, './src/api'),
        HTTP: path.resolve(__dirname, './src/http'),
        REDUX: path.resolve(__dirname, './redux'),
        ASSETS: path.resolve(__dirname, './assets'),
        MOCKJS: path.resolve(__dirname, './mockjs'),
        UTILS: path.resolve(__dirname, './src/utils')
      }
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '[name].min.css',
        allChunks: true
      }),
      // 提供公共代码
      new Webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      // compile time plugins
      new Webpack.DefinePlugin({
        'process.env.NODE_ENV': env && env.production ? '"production"' : '"development"'
      }),
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, 'dist/index.html'),
        template: 'index.html',
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
      })
    ]
  };
  if (env && env.production) {
    config.plugins.push(new Webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        drop_console: false
      }
    }));
  }
  return config;
}
