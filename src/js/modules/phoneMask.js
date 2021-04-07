import IMask from 'imask';

export default () => {
	const element = document.getElementById('maskedPhone');
	const maskOptions = {
		mask: '+{7}(000)000-00-00',
	};
	const mask = IMask(element, maskOptions);
};
