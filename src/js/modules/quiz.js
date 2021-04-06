import axios from 'axios';
import { delay } from '../utils';
import { runPreloader } from './preloader';
import { quizSlider } from './sliders';

export default () => {
	const nextBtn = document.querySelector('.quiz__btn');
	const modalBtn = document.querySelector('.modal__btn');
	const quizTitle = document.querySelector('.quiz__title');
	const quizAnswers = document.querySelectorAll('.quiz__answer');
	const quizBox = document.querySelector('.quiz__box');
	const quizSuccess = document.querySelector('.quiz__success');
	const quizColumn = document.querySelector('.quiz__column');
	const inputSizeTrack = document.querySelector('.quiz__input-size input');
	const modalName = document.querySelector('.modal__input-name');
	const modalPhone = document.querySelector('.modal__input-phone');
	const modalChoose = document.querySelector('.modal__choose');
	const choosedAnswers = { name: null, phone: null, answers: [] };

	const closest = (el, sel) => {
		if (el != null) return el.matches(sel) ? el : el.querySelector(sel) || closest(el.parentNode, sel);
	};

	// quizSlider.slideTo(5);

	nextBtn.disabled = true;
	modalChoose.style.display = 'none';

	for (const answer of quizAnswers) {
		answer.addEventListener('click', (e) => {
			const slideId = quizSlider.realIndex;
			const slideParent = quizSlider.slides[slideId];
			const slideParentStage = slideParent.classList[1];
			if (quizSlider.realIndex + 1 !== 7) {
				const quizQuestion = closest(e.target, '.quiz__question').getAttribute('data-real-question');
				const quizRawQuestion = closest(e.target, '.quiz__question').textContent;
				const quizTitle = closest(e.target, '.quiz__answer-title');
				const quizValue = quizTitle.textContent.replace(/\n\t/gm, '');
				const activeQuizTitle = document.querySelector(`.${slideParentStage} .quiz__answer-title._active`);
				if (activeQuizTitle) {
					activeQuizTitle.classList.remove('_active');
				}
				quizTitle.classList.add('_active');
				nextBtn.disabled = false;

				choosedAnswers.answers.push({ question: quizQuestion, answer: quizValue, rawQuestion: quizRawQuestion });
			}
			// quizSlider.slideNext();
		});
	}
	quizSlider.on('slideChange', () => {
		nextBtn.disabled = true;
		if (quizSlider.realIndex + 1 === 3) {
			inputSize();
		} else if (quizSlider.realIndex + 1 === 6) {
			quizSlider.allowSlideNext = false;
			nextBtn.addEventListener('click', () => {
				runPreloader(3000, 'Подождите, производим расчет');
				delay(200, () => (quizSlider.allowSlideNext = true));

				delay(2500, () => {
					modalChoose.style.display = 'flex';
					quizSlider.slideNext();
				});
			});
		} else if (quizSlider.realIndex + 1 === 7) {
			quizColumn.style.maxWidth = '100%';
			quizColumn.style.padding = '0';
			for (const present of modalChoose.children) {
				present.addEventListener('click', (e) => {
					const activePresent = document.querySelector('.modal__choose-item > h4._active');
					console.log(activePresent);
					if (activePresent) {
						activePresent.classList.remove('_active');
					}
					e.target.children[1].classList.add('_active');
				});
			}
			modalBtn.addEventListener('click', (e) => {
				const isWrongName = !modalName.value.match(/[a-zа-я]/);
				const isWrongPhone = !modalPhone.value.match(/\d+/);
				// const isPresentChoosed = document.querySelector('.modal__choose-item > h4._active');
				const isPresentChoosed = choosedAnswers.answers.find((answer) => answer.question === 'Подарок при заказе');
				const isFieldEmpty = modalPhone.value.trim() === '' || modalName.value.trim() === '';
				const present = document.querySelector('.modal__choose-item > h4._active').textContent.replace(/\n\t/gm, '');

				for (const answer of choosedAnswers.answers) {
					if (answer.question === 'Подарок при заказе') {
						answer.answer = present;
					}
				}
				if (!isPresentChoosed) {
					choosedAnswers.answers.push({ question: 'Подарок при заказе', answer: present, type: 'present' });
				}

				choosedAnswers.name = modalName.value;
				choosedAnswers.phone = modalPhone.value;
				const postData = JSON.stringify(choosedAnswers).replace(/\\t/g, '').replace(/\\n/g, '');
				console.log('Вы выбрали эти ответы во время опроса:', postData);

				if (isWrongName) {
					modalAlertHandler(false, 'Введите корректное имя');
				}
				if (isWrongPhone) {
					modalAlertHandler(false, 'Телефон должен состоять из цифр');
				}
				if (!isPresentChoosed) {
					modalAlertHandler(false, 'Пожалуйста, выберите подарок');
				}
				if (isFieldEmpty) {
					setTimeout(() => {
						modalAlertHandler(false, 'Пожалуйста, заполните все поля формы');
					}, 100);
				}

				if (!isFieldEmpty && !isWrongName && !isWrongPhone && isPresentChoosed) {
					axios
						.post('./server/mail.php', {
							postData,
						})
						.then((response) => {
							console.log(response);
						})
						.catch((error) => {
							if (error) {
								modalAlertHandler(false, 'Ошибка отправки запроса. Попробуйте позднее');
							} else if (!error) {
								modalAlertHandler(true, 'Ваша заявки принята. Ожидайте звонка');
							}
						});
				}
			});

			quizBox.classList.add('_modal');
			quizSuccess.classList.add('_active');
			nextBtn.style.opacity = '0';
		}
	});
};

export const inputSize = () => {
	const nextBtn = document.querySelector('.quiz__btn');
	const inputSizeContainer = document.querySelector('.quiz__input-size');
	const inputSizeLine = document.querySelector('.quiz__input-size-line');
	const inputSizeTrack = document.querySelector('.quiz__input-size input');
	const inputSizeDesc = document.querySelector('.quiz__answer-desc');
	const numberSize = document.querySelector('.quiz__answer-number span');
	const incrementSize = document.querySelector('.quiz__answer-increment');
	const decrementSize = document.querySelector('.quiz__answer-decrement');
	const maxWidth = inputSizeTrack.offsetWidth;
	const maxValue = 500;

	const isMobile = maxWidth <= 200;

	const sizeFill = setInterval(() => {
		if (inputSizeTrack.value >= 50) {
			clearInterval(sizeFill);
			inputSizeDesc.classList.add('_active');
			nextBtn.disabled = false;
			return false;
		}
		inputSizeTrack.value++;
		numberSize.innerHTML = inputSizeTrack.value;
		inputSizeLine.style.width = `${(inputSizeTrack.value * maxWidth) / maxValue}px`;
	}, 30);

	const inputSizeHandler = (e) => {
		if (nextBtn.disabled) {
			nextBtn.disabled = false;
		}
		const track = inputSizeTrack;
		if (track.value >= 250) {
			track.style.marginLeft = '45px';
		} else if (e.target.value < 250) {
			track.style.marginLeft = '43px';
		}
		if (track.value >= 400) {
			track.style.marginLeft = '48px';
		} else if (e.target.value < 400) {
			track.style.marginLeft = '43px';
		}
		if (track.value >= 470) {
			console.log('>470');
			track.style.marginLeft = '50px';
		} else if (track.value < 470) {
			track.style.marginLeft = '43px';
		}

		numberSize.innerHTML = inputSizeTrack.value;
		inputSizeLine.style.width = `${(inputSizeTrack.value * maxWidth) / maxValue}px`;
	};

	inputSizeTrack.addEventListener('change', inputSizeHandler);

	inputSizeTrack.addEventListener('input', inputSizeHandler);

	incrementSize.addEventListener('click', (e) => {
		inputSizeTrack.value++;
		inputSizeHandler(e);
	});
	decrementSize.addEventListener('click', (e) => {
		inputSizeTrack.value--;
		inputSizeHandler(e);
	});
};

export const modalAlertHandler = (isSuccess, alertText) => {
	const successAlert = document.querySelector('.modal__alert-success');
	const errorAlert = document.querySelector('.modal__alert-error');
	if (isSuccess) {
		successAlert.textContent = alertText;
		successAlert.classList.add('_active');
		setTimeout(() => successAlert.classList.remove('_active'), 2000);
	} else if (!isSuccess) {
		errorAlert.textContent = alertText;
		errorAlert.classList.add('_active');
		setTimeout(() => errorAlert.classList.remove('_active'), 2000);
	}
};
