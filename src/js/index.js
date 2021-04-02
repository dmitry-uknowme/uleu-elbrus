import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/swiper-bundle.css';
import '../styles/index.sass';
import houseMaterials from './modules/houseMaterials';
import quiz from './modules/quiz';
import Swiper from 'swiper';
import { quizSlider } from './modules/sliders';
import { removePreloader } from './modules/preloader';

document.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		// removePreloader();
	}, 0);
	quiz();
	houseMaterials();
});
