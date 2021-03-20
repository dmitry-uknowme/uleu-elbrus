import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.sass';
import houseMaterials from './modules/houseMaterials';
import quiz from './modules/quiz';

document.addEventListener('DOMContentLoaded', () => {
	quiz();
	houseMaterials();
});
