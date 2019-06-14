export default {
	append(compName, elem) {
		let allNode = document.querySelectorAll('[data-render="' + compName + '"]');
		let crrNode = allNode[allNode.length - 1];
		if (typeof elem === 'string') {
			crrNode.innerHTML = elem;
		} else {
			crrNode.innerHTML = elem.render();
			if (elem.afterRender) {
				elem.afterRender();
			}
		}
	},
	createElementFromHTML(htmlString) {
		let div = document.createElement('div');
		div.innerHTML = htmlString.trim();
		return div.firstChild;
	},

	appendList(compName, elem) {
		let allNode = document.querySelectorAll('[data-render="' + compName + '"]');
		let crrNode = allNode[allNode.length - 1];
		crrNode.appendChild(this.createElementFromHTML(elem));
	},
};
