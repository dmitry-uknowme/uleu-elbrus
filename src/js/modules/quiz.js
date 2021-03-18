export default () => {
	let currentStage = 1;
	const maxStage = 7;
	const quizStage = document.querySelectorAll('.quiz__stage');
	const nextBtn = document.querySelector('.quiz-box__btn');
	const quizTitle = document.querySelector('.quiz__title');
	const quizAnswers = document.querySelectorAll('.quiz__answer');
	const quizBox = document.querySelector('.quiz__box');
	const quizSuccess = document.querySelector('.quiz__success');
	quizStage[currentStage - 1].classList.add('_active');

	const modal = document.querySelector('modal');

	const toNextStage = () => {
		if (currentStage < maxStage) {
			currentStage++;
		}
		if (currentStage >= maxStage) {
			quizBox.classList.add('_modal');
			quizSuccess.classList.add('_active');
			nextBtn.style.opacity = '0';
			quizTitle.style.opacity = '0';
		}
		const activeStage = document.querySelector('.quiz__stage._active');
		if (activeStage) {
			activeStage.classList.remove('_active');
		}
		quizStage[currentStage - 1].classList.add('_active');
	};

	nextBtn.addEventListener('click', toNextStage);

	for (const answer of quizAnswers) {
		answer.addEventListener('click', toNextStage);
	}
};
