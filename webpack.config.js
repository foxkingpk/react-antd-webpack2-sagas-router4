const path = require('path');

const config = {
  entry: {
    main: './src/main.js'
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
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
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
  }
};

module.exports = config;
