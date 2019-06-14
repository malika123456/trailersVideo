import ComponentDOM from './../ComponentDOM/ComponentDOM';
import './AppliedFilters.scss';

export default class AppliedFilters {
	constructor() {}

	static renderAppliedList(val, filterType) {
		let appliedFilterElem = document.getElementById('applied-filters');
		let valIndex = AppliedFilters.allAppliedFilter.indexOf(val);
		if (valIndex === -1) {
			AppliedFilters.allAppliedFilter.push(val);
			ComponentDOM.appendList(
				'_appliedFilters',
				`
					<li data-value="${val}" data-filter-type="${filterType}"><button>${val}</button></li>
				`,
			);
		} else if (valIndex !== -1) {
			AppliedFilters.allAppliedFilter.splice(valIndex, 1);
			let elem = appliedFilterElem.querySelector('[data-value="' + val + '"]');
			elem.parentNode.removeChild(elem);
		}

		if (AppliedFilters.allAppliedFilter.length > 0) {
			appliedFilterElem.classList.remove('hidden');
		} else {
			ComponentDOM.append('_appliedFilters', '');
			appliedFilterElem.classList.add('hidden');
		}
	}

	render() {
		return `
			<section class="applied-filter-wrapper hidden display-flex"  id="applied-filters">
				<div class="applied-filter-title">Applied Filters:</div>
				<ul data-render="_appliedFilters" class="applied-filter-list display-flex"></ul>
			</section>
		`;
	}
}

AppliedFilters.allAppliedFilter = [];
