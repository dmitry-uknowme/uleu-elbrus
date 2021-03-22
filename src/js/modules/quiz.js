import { quizSlider } from './sliders';

export default () => {
	const nextBtn = document.querySelector('.swiper-button-next');
	const quizTitle = document.querySelector('.quiz__title');
	const quizAnswers = document.querySelectorAll('.quiz__answer');
	const quizBox = document.querySelector('.quiz__box');
	const quizSuccess = document.querySelector('.quiz__success');
	const choosedAnswers = [];

	for (const answer of quizAnswers) {
		answer.addEventListener('click', (e) => {
			if (e.target.children[1]) {
				choosedAnswers.push(e.target.children[1].textContent);
			}
			// choosedAnswers.push(e.target.closest('.quiz__answer-title'));
			quizSlider.slideNext();
		});
	}
	quizSlider.on('slideChange', () => {
		if (quizSlider.realIndex + 1 === 3) {
			inputSizeHandler();
		} else if (quizSlider.realIndex + 1 === 7) {
			quizBox.classList.add('_modal');
			quizSuccess.classList.add('_active');
			nextBtn.style.opacity = '0';
			quizTitle.style.opacity = '0';
			console.log('You choosed this items:', choosedAnswers);
		}
	});
};

// const toNextStage = () => {                                        //replaced with swiper
// 	if (currentStage < maxStage) {
// 		currentStage++;
// 		if (currentStage === 3) {
// 			// inputSize.value = parseInt(numberSize.innerHTML);
// 			inputSizeContainer.style.width = `${inputSize.value * 1.09}px`;
// 			inputSizeHandler();
// 		}
// 	}
// 	if (currentStage >= maxStage) {
// 		quizBox.classList.add('_modal');
// 		quizSuccess.classList.add('_active');
// 		nextBtn.style.opacity = '0';
// 		quizTitle.style.opacity = '0';
// 	}
// 	const activeStage = document.querySelector('.quiz__stage._active');
// 	if (activeStage) {
// 		activeStage.classList.remove('_active');
// 	}
// 	quizStage[currentStage - 1].classList.add('_active');
// };

// nextBtn.addEventListener('click', toNextStage);

// for (const answer of quizAnswers) {
// 	answer.addEventListener('click', toNextStage);
// }
// };

export const inputSizeHandler = () => {
	const inputSizeContainer = document.querySelector('.quiz__input-size');
	const inputSize = document.querySelector('.quiz__input-size input');
	const numberSize = document.querySelector('.quiz__answer-number span');
	const incrementSize = document.querySelector('.quiz__answer-increment');
	const decrementSize = document.querySelector('.quiz__answer-decrement');
	inputSize.addEventListener('input', (e) => {
		e.preventDefault();
		numberSize.innerHTML = e.target.value;
		inputSizeContainer.style.width = `${inputSize.value * 1.09 - 42}px`;
	});
	inputSize.addEventListener('change', (e) => {
		numberSize.innerHTML = e.target.value;
		inputSizeContainer.style.width = `${inputSize.value * 1.09}px`;
	});
	incrementSize.addEventListener('click', () => {
		inputSize.value++;
		inputSizeContainer.style.width = `${inputSize.value}px`;
		// inputSize.style.width = `${inputSize.value}px`;
		numberSize.innerHTML = inputSize.value;
	});
	decrementSize.addEventListener('click', () => {
		inputSize.value--;
		numberSize.innerHTML = inputSize.value;
	});
};
