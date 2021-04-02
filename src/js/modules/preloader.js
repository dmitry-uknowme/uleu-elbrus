import { delay } from '../utils';

export const removePreloader = async () => {
	const page = document.querySelector('.app');
	const preloader = document.querySelector('.preloader');
	const preloaderStyles = document.querySelector('style');
	const preloaderIcon = document.querySelector('.preloader__image');

	delay(100, () => {
		preloaderIcon.classList.remove('_bounce');
		preloaderIcon.classList.add('_big-bounce');
		preloaderIcon.classList.add('_neon');
	});
	delay(1000, () => preloader.classList.add('_hide'));
	delay(500, () => page.classList.add('_loaded'));
};

export const runPreloader = (timeDelay, text) => {
	const page = document.querySelector('.app');
	const preloader = document.querySelector('.preloader');
	const preloaderText = document.querySelector('.preloader__text');
	if (text) {
		preloaderText.innerHTML = text;
	}
	const preloaderStyles = document.querySelector('style');
	const preloaderIcon = document.querySelector('.preloader__image');
	delay(100, () => preloader.classList.remove('_hide'));
	delay(timeDelay - 500, () => {
		preloaderIcon.classList.remove('_bounce');
		preloaderIcon.classList.add('_neon');
	});
	delay(timeDelay, () => {
		preloader.classList.add('_hide');
	});
};
