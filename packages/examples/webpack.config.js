const path = require('path');
const { BabelAASPlugin } = require('@babel-aas/webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        use: '@babel-aas/webpack-plugin'
      }
    ]
  },
  plugins: [
    new BabelAASPlugin({
      serverUrl: 'http://localhost:9001',
      presets: ['@babel/preset-env', '@babel/preset-react']
    })
  ]
}