import ComponentDOM from '../ComponentDOM/ComponentDOM';

import MovieList from './../MovieList/MovieList';
import AppliedFilters from './../AppliedFilters/AppliedFilters';

export default class Container {
	constructor() {}

	render() {
		return `
			<main id="main-wrapper">
				<div class="row">
					<div data-render="AppliedFilters"></div>
					<div data-render="MovieList"></div>
				</div>
			</main>
		`;
	}

	afterRender() {
		ComponentDOM.append('MovieList', new MovieList());
		ComponentDOM.append('AppliedFilters', new AppliedFilters());
	}
}
