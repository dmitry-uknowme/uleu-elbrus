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

	const inputSize = document.querySelector('.quiz__input-size input');
	const numberSize = document.querySelector('.quiz__answer-number span');
	const incrementSize = document.querySelector('.quiz__answer-increment');
	const decrementSize = document.querySelector('.quiz__answer-decrement');

	const inputSizeHandler = () => {
		inputSize.addEventListener('input', (e) => {
			numberSize.innerHTML = e.target.value;
		});
		inputSize.addEventListener('change', (e) => {
			numberSize.innerHTML = e.target.value;
		});
		incrementSize.addEventListener('click', () => {
			inputSize.value++;
			numberSize.innerHTML = inputSize.value;
		});
		decrementSize.addEventListener('click', () => {
			inputSize.value--;
			numberSize.innerHTML = inputSize.value;
		});
	};

	const toNextStage = () => {
		if (currentStage < maxStage) {
			currentStage++;
			if (currentStage === 3) {
				inputSize.value = parseInt(numberSize.innerHTML);
				inputSizeHandler();
			}
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
