export default () => {
	let currentStage = 1;
	const maxStage = 6;
	const quizStage = document.querySelectorAll('.quiz__stage');
	const nextBtn = document.querySelector('.quiz-box__btn');
	const quizAnswers = document.querySelectorAll('.quiz__answer');
	quizStage[currentStage - 1].classList.add('_active');

	const toNextStage = () => {
		if (currentStage < maxStage) {
			currentStage++;
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
