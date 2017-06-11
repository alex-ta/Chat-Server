import path from 'path'
import webpack from 'webpack';

export default {
  devtools: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/index.js')
  ],
  output: {
    path: '/',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
	loaders:[
		  {
			test: /\.jsx?$/,
			include: [
			  path.join(__dirname, 'client'),
			  path.join(__dirname, 'server/shared')
			],
			loaders: [ 'react-hot', 'babel' ]
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
			query: { a: 1 }
		  },
		  {
			include: [
			  path.join(__dirname, 'client'),
			  path.join(__dirname, 'server/shared')
			],
			test: /\.css$/,
			loader: "css-loader",
			query: { b: 2 }
		  }
		]	
  },
  resolve: {
    extentions: [ '', '.js' ]
  }
}
