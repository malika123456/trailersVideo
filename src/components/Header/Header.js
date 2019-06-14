import './Header.scss';
import logo from '../../images/logo.jpg';

export default function Header() {
	return `
		<header id="header">
			<div class="row display-flex">
				<div class="logo-wrapper">
					<img src="${logo}"/>
				</div>
				<div class="time-btn">
					<button class="btn-primary">COMING SOON</button>
					<button class="btn-secondary">NOW SHOWING</button>
				</div>
				<div class="sort-options" data-render="FilterOptions"></div>
			</div>
		</header>
	`;
}
