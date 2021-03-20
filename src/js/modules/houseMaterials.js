export default () => {
	const allPoints = document.querySelectorAll('.house__point');
	const allModals = document.querySelectorAll('.house__modal');
	const modalHandler = (e, markClick) => {
		const childModal = e.target.children[0];
		const isModalActive = childModal.classList.contains('_active');
		if (!isModalActive) {
			childModal.classList.add('_active');
			// if (markClick) {
			// 	childModal.classList.add('_clicked');
			// }
		} else if (isModalActive) {
			childModal.classList.remove('_active');
			// if (markClick) {
			// 	childModal.classList.remove('_clicked');
			// }
		}
	};

	for (const point of allPoints) {
		point.addEventListener('click', modalHandler); // по наведению чтобы открывалось надо делать?
		// point.addEventListener('mouseenter', modalHandler);
		// point.addEventListener('mouseleave', modalHandler);
	}

	// for (const modal of allModals) {
	// 	modal.addEventListener('mouseenter', modalHandler);
	// 	modal.addEventListener('mouseleave', modalHandler);
	// }
};
