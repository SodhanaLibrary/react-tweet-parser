var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

module.exports = {
  entry : {
    'react-tweet-parser':'./src/parser/TweetParser.js',
    'react-tweet-parser.min':'./src/parser/TweetParser.js'
  },

  output: {
    path: './lib',
    filename: '[name].js',
    library: 'react-tweet-parser',
    libraryTarget: 'umd'
  },

  devtool: "source-map",

  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    }
  ],

  module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['react','es2015','stage-2']
				}
			},
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", "css!sass")
      }
	 ]
 },

 plugins: [
    new ExtractTextPlugin("./[name].css"),
    new webpack.optimize.UglifyJsPlugin({
     exclude:['react-tweet-parser.js'],
     minimize: true,
     compress: { warnings: false }
   })
 ]
};
