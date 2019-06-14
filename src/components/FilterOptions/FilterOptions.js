import ComponentDOM from './../ComponentDOM/ComponentDOM';
import AppliedFilters from './../AppliedFilters/AppliedFilters';
import './FilterOptions.scss';

const DEFAULT_FILTER_TEXT = { languages: 'All Languages', genres: 'All Genres' };

export default class FilterOptions {
	constructor() {}

	static displayFilterDropDown(filters, filterType) {
		filters.forEach(opt => {
			ComponentDOM.appendList(
				'_moviesSortBy-' + filterType,
				`
				<li class="options" data-value="${opt}">${opt}</li>
			`,
			);
		});
		document.querySelector('[data-filter-type="' + filterType + '"]').classList.remove('hidden');
	}

	static addOrRemoveSelectedFilter(filterVal, filterType) {
		let filterSelectElem = document.querySelector('[data-filter-type="' + filterType + '"]');
		let filterOptionElem = filterSelectElem.querySelector('li[data-value="' + filterVal + '"]');
		let filterValIndex = this.filtersApplied[filterType].indexOf(filterVal);

		if (filterValIndex === -1) {
			this.filtersApplied[filterType].push(filterVal);
			filterOptionElem.setAttribute('data-selected', 'selected');
		} else {
			this.filtersApplied[filterType].splice(filterValIndex, 1);
			filterOptionElem.removeAttribute('data-selected');
		}
		if (this.filtersApplied[filterType].length > 0) {
			ComponentDOM.append('_selected-' + filterType, this.filtersApplied[filterType].join(', '));
		} else {
			ComponentDOM.append(
				'_selected-' + filterType,
				filterSelectElem.querySelector('.selected-filter-text').getAttribute('title'),
			);
		}
		AppliedFilters.renderAppliedList(filterVal, filterType);
		this.renderMovieItems(filterType);
	}

	bindSelectEvents() {
		document.querySelectorAll('.select-option-wrapper').forEach(elem => {
			elem.addEventListener('mouseover', event => {
				this.bindMouseOver(event);
			});
			elem.addEventListener('mouseleave', event => {
				this.bindMouseLeave(event);
			});
		});
	}

	bindMouseOver(event) {
		let target = event.target;
		if (target.className.indexOf('option-selected') !== -1) {
			target.nextElementSibling.classList.remove('hidden');
		}
	}

	bindMouseLeave(event) {
		let target = event.target;
		target.querySelector('.select-option').classList.add('hidden');
	}

	render() {
		return `
			<div id="filter-movies" class="display-flex">

				<div class="select-option-wrapper">
					<button class="option-selected">
						<span>Fresh<span>
					</button>
					<ul class="select-option hidden">
						<li class="options">Popular</li>
						<li class="options">Fresh</li>
					</ul>
				</div>


				<div class="select-option-wrapper hidden"  id="filter-by-language" data-filter-type="languages">
					<button class="option-selected">
						<span data-render="_selected-languages" class="selected-filter-text" title="${
							DEFAULT_FILTER_TEXT.languages
						}"></span>
					</button>
					<ul class="select-option hidden" data-render="_moviesSortBy-languages">
					</ul>
				</div>

				<div class="select-option-wrapper hidden" id="filter-by-genre"  data-filter-type="genres">
					<button class="option-selected">
						<span data-render="_selected-genres" class="selected-filter-text" title="${
							DEFAULT_FILTER_TEXT.genres
						}"></span>
					</button>
					<ul class="select-option hidden"  data-render="_moviesSortBy-genres">
					</ul>
				</div>

			</div>
		`;
	}
	afterRender() {
		ComponentDOM.append('_selected-languages', DEFAULT_FILTER_TEXT.languages);
		ComponentDOM.append('_selected-genres', DEFAULT_FILTER_TEXT.genres);
		this.bindSelectEvents();
	}
}
