import ComponentDOM from '../ComponentDOM/ComponentDOM';
import polyfill from '../../js/polyfill';
import '@babel/polyfill';

import Header from '../Header/Header';
import Container from '../Container/Container';

export default class App {
	constructor() {
		polyfill();
	}

	render() {
		return `
			<div>
				${Header()}
				<div data-render="Container" id="container"></div>
			</div>
			`;
	}

	afterRender() {
		ComponentDOM.append('Container', new Container());
	}
}
