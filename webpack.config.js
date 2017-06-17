const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/shared')
        ],
        loaders: ['babel']
      },
      {
        test: /\.(jpg|png|svg)$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/shared')
        ],
        loader: 'url-loader',
        options: {
          limit: 250000,
        },
      },
      {
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/shared')
        ],
        test: /\.css$/,
        loader: "style-loader",
        query: {
          a: 1
        }
      },
      {
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/shared')
        ],
        test: /\.css$/,
        loader: "css-loader",
        query: {
          b: 2
        }
      }
    ]
  }
}
