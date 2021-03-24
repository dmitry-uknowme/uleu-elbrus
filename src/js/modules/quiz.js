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
				generateMessage(choosedAnswers);

				fetch('https://reqres.in/api/users'),
					{
						method: 'POST',
						body: JSON.stringify(choosedAnswers),
					};
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

export const inputSizeHandler = () => {
	const inputSizeContainer = document.querySelector('.quiz__input-size-line');
	const inputSize = document.querySelector('.quiz__input-size input');
	const numberSize = document.querySelector('.quiz__answer-number span');
	const incrementSize = document.querySelector('.quiz__answer-increment');
	const decrementSize = document.querySelector('.quiz__answer-decrement');

	const k = 500 / 453;
	console.log(k);

	inputSizeContainer.style.width = `${inputSize.value - 60 * k}px`;
	// inputSizeContainer.style.right = `${inputSize.value - 60 * k}px`;
	console.log('width');

	inputSize.addEventListener('input', (e) => {
		e.preventDefault();
		numberSize.innerHTML = e.target.value;
		inputSizeContainer.style.width = `${inputSize.value - 60}px`;
		// inputSizeContainer.style.right = `${510 - inputSize.value}px`;

		// inputSizeContainer.style.width = `${inputSize.value - 15 * 1.1}px`;
		// inputSizeContainer.style.right = `${500 - inputSize.value * 1.1 - 80}px`;
	});
	incrementSize.addEventListener('click', () => {
		inputSize.value++;
		inputSizeContainer.style.width = `${inputSize.value - 60}px`;
		numberSize.innerHTML = inputSize.value;
	});
	decrementSize.addEventListener('click', () => {
		inputSize.value--;
		inputSizeContainer.style.width = `${inputSize.value - 60}px`;
		numberSize.innerHTML = inputSize.value;
	});
};

export const generateMessage = (choosedAnswers) => {
	const [user, ...answers] = choosedAnswers;

	let message = `
					<h1>Заявка на обратный звонок от elbrus-dom.ru</h1>
					<hr>
					<p>
						<b>Имя:</b>
						<span>${user.name}</span>
					</p>
					<p>
						<b>Номер телефона:</b>
						<span>${user.phone}</span>
					</p>	
			
				`;

	for (const answer of answers) {
		message += `
						<p>
							<b>${answer.question}</b>
							<span>${answer.answer}</span>
						</p>
					`;
	}
	console.log(message);
};
