module.exports = {
	plugins: [
		require('postcss-preset-env')({
			browsers: 'last 10 versions',
		}),
	],
};
