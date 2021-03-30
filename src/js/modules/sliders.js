import Swiper from 'swiper';
import { Navigation } from 'swiper/core';

Swiper.use([Navigation]);

export const quizSlider = new Swiper('.quiz__container', {
	direction: 'horizontal',
	wrapperClass: 'quiz__wrapper',
	slideClass: 'quiz__stage',
	// allowTouchMove: false,
	navigation: {
		nextEl: '.quiz__btn',
		prevEl: '.swiper-button-prev',
	},
	observeParents: true,
	observeSlideChildren: true,
	observer: true,
	resizeObserver: true,
	// autoHeight: true,
	roundLengths: true,
});
