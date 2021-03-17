const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');

const { HotModuleReplacementPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { styleHandler, filename, generateHtmlFiles } = require('./helpers');

const isDev = true;

const htmlFiles = generateHtmlFiles('../src/html/pages', isDev);

const devConfig = {
	mode: 'development',
	output: {
		filename: filename('[name]', 'js', isDev),
		assetModuleFilename: 'assets/[name].[contenthash][ext]',
	},
	devtool: 'eval',
	devServer: {
		contentBase: path.resolve(__dirname, '../build'),
		port: 3000,
		open: true,
	},

	target: 'web',
	devtool: 'eval',
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: styleHandler(isDev, 'sass-loader'),
			},

			{
				test: /\.css$/,
				use: styleHandler(isDev),
			},
		],
	},

	plugins: [
		// require('postcss-preset-env')({
		// 	browsers: 'last 2 versions',
		// }),
		new MiniCssExtractPlugin({
			filename: filename('[name]', 'css', isDev),
		}),
		new HotModuleReplacementPlugin(),
		new ReactRefreshWebpackPlugin(),
		...htmlFiles,
	],
};

module.exports = merge(common, devConfig);
