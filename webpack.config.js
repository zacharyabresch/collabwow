const path = require('path');
const nodeExternals = require('webpack-node-externals');

const sharedConfig = {
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
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
  }
};

module.exports = [
  { ...sharedConfig, ...serverConfig },
  { ...sharedConfig, ...clientConfig }
];
