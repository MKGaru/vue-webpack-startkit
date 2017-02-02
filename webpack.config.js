const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {
		client: './client/main',
		components: glob.sync('./src/components/**/*.vue').map(file=>'./'+file.substr('./src'.length)),
		vendor: ['tslib','vue']
	},
	output: {
		// jsonpFunction:'_my_webpack_', // *CHANGE ME*
		libraryTarget: "umd",
		library:'$$[name]',
		umdNamedDefine: true,
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.html', '.vue'],
		modules:[
			path.resolve(__dirname,'src/components'),
			'node_modules'
		]
	},
	module: {
		exprContextCritical:false,
		rules: [
			{	test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: { appendTsSuffixTo: [/\.vue$/] }
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					 cssModules: {
						localIdentName: '[path][name]---[local]---[hash:base64:5]',
						camelCase: true
					}
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin(['components','vendor']),
		new HtmlWebpackPlugin(
			{
				template: "./client/index.html",
				inject: "body"
			}
		),
		new CleanWebpackPlugin(['dist']),
		new CopyWebpackPlugin([
			{ from: 'client/css', to:'css' }
		],{
			copyUnmodified: false
		}),
		new webpack.ProvidePlugin({
		}),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		contentBase: 'dist',
		port: 8080,
		hot: true
	},
	performance: {
		maxAssetSize: 5242880
	}
};
