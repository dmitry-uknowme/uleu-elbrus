import Swiper from 'swiper';
import { Navigation, EffectCube, EffectFade, EffectFlip, EffectCoverflow } from 'swiper/core';
import 'swiper/swiper-bundle.css';
import { inputSizeHandler } from './quiz';

Swiper.use([Navigation, EffectCube, EffectFade, EffectFlip, EffectCoverflow]);

export const quizSlider = new Swiper('.quiz__container', {
	wrapperClass: 'quiz__wrapper',
	slideClass: 'quiz__stage',
	allowTouchMove: false,
	navigation: {
		nextEl: '.swiper-button-next',
	},
	// on: {
	// 	slideChange: (slider) => {
	// 		if (slider.realIndex + 1 === 3) {
	// 			inputSizeHandler();
	// 		} else if (slider.realIndex + 1 === 7) {
	// 			quizBox.classList.add('_modal');
	// 			quizSuccess.classList.add('_active');
	// 			nextBtn.style.opacity = '0';
	// 			quizTitle.style.opacity = '0';
	// 		}
	// 	},
	// },
});
