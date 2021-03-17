const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const { styleHandler, filename, generateHtmlFiles } = require('./helpers');

const isDev = false;
const htmlFiles = generateHtmlFiles('../src/html/pages', isDev);

const prodConfig = {
	mode: 'production',
	output: {
		filename: filename('[name]', 'js', isDev),
		assetModuleFilename: 'assets/[name].[contenthash][ext][query]',
	},
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
	optimization: {
		splitChunks: { chunks: 'all' },
		minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: filename('[name]', 'css', isDev),
		}),
		new ImageMinimizerPlugin({
			//minimizer dont work
			minimizerOptions: {
				plugins: [
					['gifsicle', { interlaced: true }],
					['jpegtran', { progressive: true }],
					['optipng', { optimizationLevel: 5 }],
					[
						'svgo',
						{
							plugins: [
								{
									removeViewBox: false,
								},
							],
						},
					],
				],
			},
		}),
		...htmlFiles,
	],
};

module.exports = merge(common, prodConfig);
