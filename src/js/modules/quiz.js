import { quizSlider } from './sliders';

export default () => {
	const nextBtn = document.querySelector('.swiper-button-next');
	const modalBtn = document.querySelector('.modal__btn');
	const quizTitle = document.querySelector('.quiz__title');
	const quizAnswers = document.querySelectorAll('.quiz__answer');
	const quizBox = document.querySelector('.quiz__box');
	const quizSuccess = document.querySelector('.quiz__success');
	const inputSize = document.querySelector('.quiz__input-size input');
	const modalName = document.querySelector('.modal__input-name');
	const modalPhone = document.querySelector('.modal__input-phone');
	const choosedAnswers = [];

	const closest = (el, sel) => {
		if (el != null) return el.matches(sel) ? el : el.querySelector(sel) || closest(el.parentNode, sel);
	};

	for (const answer of quizAnswers) {
		answer.addEventListener('click', (e) => {
			if (quizSlider.realIndex + 1 !== 3 || quizSlider.realIndex + 1 !== 7) {
				const quizQuestion = closest(e.target, '.quiz__question').textContent.trim();
				const quizValue = closest(e.target, '.quiz__answer-title').textContent.trim();
				choosedAnswers.push({ question: quizQuestion, answer: quizValue });
			}
			quizSlider.slideNext();
		});
	}
	quizSlider.on('slideChange', () => {
		if (quizSlider.realIndex + 1 === 3) {
			nextBtn.addEventListener('click', (e) => {
				const quizQuestion = closest(document.querySelector('.quiz__stage_size'), '.quiz__question').textContent.trim();
				const quizValue = parseInt(inputSize.value);
				choosedAnswers.push({ question: quizQuestion, answer: quizValue });
			});
			inputSizeHandler();
		} else if (quizSlider.realIndex + 1 === 7) {
			modalBtn.addEventListener('click', (e) => {
				choosedAnswers.unshift({ name: modalName.value, phone: modalPhone.value });
				console.log('Вы выбрали эти ответы во время опроса:', choosedAnswers);

				fetch('https://reqres.in/api/users'),
					{
						method: 'POST',
						body: JSON.stringify(choosedAnswers),
					};
				console.log(JSON.stringify(choosedAnswers));
				// .then((response) => response.json())
				// .then((json) => console.log(json))
				// .catch((err) => console.error(err));
			});
			quizBox.classList.add('_modal');
			quizSuccess.classList.add('_active');
			nextBtn.style.opacity = '0';
			quizTitle.style.opacity = '0';
			// console.log('Вы выбрали эти ответы во время опроса:', choosedAnswers);
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
