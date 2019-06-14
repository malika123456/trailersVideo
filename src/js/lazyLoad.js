export default function lazyLoad(lazyImages) {
	lazyImages.forEach(image => {
		if (
			image.getBoundingClientRect().top < window.innerHeight + window.pageYOffset + 300 &&
			!image.src
		) {
			image.src = image.getAttribute('data-src');
			image.onload = () => image.classList.add('loaded');
		}
	});

	// if all loaded removeEventListener
}
