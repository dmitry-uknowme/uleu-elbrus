module.exports = {
	plugins: [
		require('postcss-preset-env')({
			browsers: '> 0.25%, not dead',
		}),
	],
};
