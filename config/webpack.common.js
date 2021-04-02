const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { PROJECT } = require('./helpers');

module.exports = {
	experiments: {
		asset: true,
	},
	entry: { index: PROJECT.path.src + '/js/index.js' },
	output: {
		path: PROJECT.path.build,
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				include: path.resolve(__dirname, '../src/html/includes'),
				// use: [{ loader: 'raw-loader', options: { esModule: false } }], //unneeded
				use: [{ loader: 'html-loader', options: { esModule: false } }],
			},
			{
				test: /.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-transform-runtime'],
					},
				},
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/inline',
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyPlugin({
			patterns: [{ from: './src/server', to: 'server' }],
		}),
	],

	resolve: {
		extensions: ['.js'],
		alias: {
			'@img': PROJECT.path.src + '/assets/images',
		},
	},
};
