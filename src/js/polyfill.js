export default function polyfill() {
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	if (!Element.prototype.closest) {
		Element.prototype.closest = function(s) {
			var el = this;

			do {
				if (el.matches(s)) return el;
				el = el.parentElement || el.parentNode;
			} while (el !== null && el.nodeType === 1);
			return null;
		};
	}

	if (!Object.entries) {
		Object.entries = function(obj) {
			var ownProps = Object.keys(obj),
				i = ownProps.length,
				resArray = new Array(i); // preallocate the Array
			while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

			return resArray;
		};
	}

	if (typeof Array.prototype.forEach != 'function') {
		Array.prototype.forEach = function(callback) {
			for (var i = 0; i < this.length; i++) {
				callback.apply(this, [this[i], i, this]);
			}
		};
	}

	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = Array.prototype.forEach;
	}
}
