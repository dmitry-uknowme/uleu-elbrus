import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/swiper-bundle.css';
import '../styles/index.sass';
import houseMaterials from './modules/houseMaterials';
import phoneMask from './modules/phoneMask';
import quiz from './modules/quiz';
import { quizSlider } from './modules/sliders';

document.addEventListener('DOMContentLoaded', () => {
	phoneMask();
	quiz();
	houseMaterials();
});
