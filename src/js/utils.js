export const delay = async (time, callback) => {
	// setTimeout(() => callback, time);   //sync
	const delay = new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, time);
	});
	await delay;
	callback();
};
