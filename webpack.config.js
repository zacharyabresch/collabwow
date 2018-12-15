const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const sharedConfig = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }
    ]
  }
};
const serverConfig = {
  target: 'node',
  externals: [nodeExternals()],
  entry: path.resolve('./src/server/index.js'),
  output: {
    filename: 'server.js',
    path: path.resolve('./dist')
  }
};

const clientConfig = {
  target: 'web',
  entry: path.resolve('./src/client/index.js'),
  output: {
    filename: 'client.js',
    path: path.resolve('./dist')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'src/client/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: { extensions: ['.js'] },
  devServer: {
    contentBase: '/dist',
    hot: true
  },
  module: {
    rules: [
      ...sharedConfig.module.rules,
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  }
};

module.exports = [
  { ...sharedConfig, ...serverConfig },
  { ...sharedConfig, ...clientConfig }
];
