const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = (env, argv) => {
	const { mode, port } = argv

	const isDev = mode !== 'production'

	return {
		mode,

		entry: [
			'./client',
			isDev && `webpack-hot-middleware/client?http://localhost:${port}`
		].filter(Boolean),

		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env', {
									useBuiltIns: "usage",
									corejs: 3
								}]
							],
							plugins: [
								isDev && require.resolve('react-refresh/babel')
							].filter(Boolean)
						}
					}
				}
			]
		},

		plugins: [
			new HtmlWebpackPlugin({
				template: 'template.html'
			}),
			isDev && new webpack.HotModuleReplacementPlugin(),
			isDev && new ReactRefreshWebpackPlugin()
		].filter(Boolean)
	}
}