import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.sass';
import bindModals from './modules/bindModals';
import houseMaterials from './modules/houseMaterials';
import quiz from './modules/quiz';

document.addEventListener('DOMContentLoaded', () => {
	// bindModals();
	quiz();
	houseMaterials();
});
