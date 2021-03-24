import Swiper from 'swiper';
import { Navigation } from 'swiper/core';

Swiper.use([Navigation]);

export const quizSlider = new Swiper('.quiz__container', {
	wrapperClass: 'quiz__wrapper',
	slideClass: 'quiz__stage',
	allowTouchMove: false,
	navigation: {
		nextEl: '.swiper-button-next',
	},
	observeParents: true,
	observeSlideChildren: true,
	observer: true,
	resizeObserver: true,
});
