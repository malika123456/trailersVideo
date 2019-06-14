import axios from 'axios';
import globalVariable from '../../js/globalVariable';
import ComponentDOM from './../ComponentDOM/ComponentDOM';
import './MovieList.scss';

import movieListService from '../../services/movie-list';

import SingleMovie from './../SingleMovie/SingleMovie';
import MovieTrailer from './../MovieTrailer/MovieTrailer';

import lazyLoad from './../../js/lazyLoad';

import FilterOptions from './../FilterOptions/FilterOptions';
import AppliedFilters from './../AppliedFilters/AppliedFilters';

export default class MovieList {
	constructor() {
		this.moviesListData = {};
		this.genres = [];
		this.getMovieList();
		this.filtersApplied = {
			languages: [],
			genres: [],
		};
	}

	getMovieList() {
		movieListService
			.getMovieList()
			.then(() => {
				this.getMovieListSuccess(movieListService.movieListData);
			})
			.catch(err => {
				this.getMovieListError('An error occured, please try again later.');
				console.error('error', err);
			});
	}

	getAllFilters() {
		return Object.values(this.filtersApplied).reduce((all, filter) => {
			return all.concat(filter);
		});
	}

	getAllGenres(genres) {
		genres = genres.split('|');
		genres.forEach(genre => {
			if (this.genres.indexOf(genre) === -1) {
				this.genres.push(genre);
			}
		});
	}

	getMovieListSuccess(data) {
		this.languages = data[0];
		this.moviesListData = Object.entries(data[1]);

		this.renderMovieItems();
		this.displayFilterOptions();
		this.lazyLoadImages();
	}

	renderMovieItems(filterType) {
		this.movieCount = 0;
		MovieTrailer.removeTrailer();
		ComponentDOM.append('_movieItemsLi', '');
		if (this.moviesListData.length > 0) {
			this.moviesListData.forEach(item => {
				let movie = item[1];
				if (!filterType) {
					this.getAllGenres(movie.EventGenre);
					this.singleMovieItem(movie);
				} else if (this.getSelectedFilters(movie) || this.checkFiltersIsSelected()) {
					this.singleMovieItem(movie);
				}
			});
		}
		if (this.movieCount === 0) {
			this.getMovieListError('Movie Not Found!');
		}
	}

	getMovieListError(message) {
		ComponentDOM.appendList(
			'_movieItemsLi',
			`
			<li id="movie-item-error">
				<div class="movie-item-error-text">${message}</div>
			</li>
		`,
		);
	}

	getSelectedFilters(movie) {
		let result = false;
		let crrGenre = movie.EventGenre.split('|');
		let isGenreSelected = this.filtersApplied.genres.some(r => crrGenre.includes(r));
		if (this.filtersApplied.languages.length && this.filtersApplied.genres.length) {
			if (this.filtersApplied.languages.includes(movie.EventLanguage) && isGenreSelected) {
				result = true;
			}
		} else if (this.filtersApplied.languages.includes(movie.EventLanguage) || isGenreSelected) {
			result = true;
		}
		return result;
	}

	checkFiltersIsSelected() {
		if (this.filtersApplied.languages.length === 0 && this.filtersApplied.genres.length === 0) {
			return true;
		}
		return false;
	}

	singleMovieItem(movie) {
		let movieItem = new SingleMovie(movie);

		ComponentDOM.appendList(
			'_movieItemsLi',
			`
			<li class="movie-item">
				${movieItem.render()}
			</li>
		`,
		);

		movieItem.afterRender();
		this.movieCount++;
	}

	displayFilterOptions() {
		ComponentDOM.append('FilterOptions', new FilterOptions(movieListService.movieListData));
		FilterOptions.displayFilterDropDown(this.languages, 'languages');
		FilterOptions.displayFilterDropDown(this.genres, 'genres');
		this.bindFilterSelectEvent('languages');
		this.bindFilterSelectEvent('genres');
		this.bindAppliedFilters();
	}

	bindFilterSelectEvent(filterType) {
		document
			.querySelector('[data-filter-type="' + filterType + '"]')
			.addEventListener('click', event => {
				let target = event.target;
				if (target.nodeName === 'LI') {
					let filterType = target.closest('[data-filter-type]').getAttribute('data-filter-type');
					let filterVal = target.getAttribute('data-value');
					FilterOptions.addOrRemoveSelectedFilter.call(this, filterVal, filterType);
					this.lazyLoadImages();
				}
			});
	}

	bindAppliedFilters() {
		document.getElementById('applied-filters').addEventListener('click', event => {
			let target = event.target.parentElement;
			if (target.nodeName === 'LI') {
				let filterType = target.closest('[data-filter-type]').getAttribute('data-filter-type');
				let filterVal = target.getAttribute('data-value');
				FilterOptions.addOrRemoveSelectedFilter.call(this, filterVal, filterType);
				this.lazyLoadImages();
			}
		});
	}

	lazyLoadImages() {
		let lazyLoadFunc = lazyLoad.bind(null, [
			...document.querySelectorAll('.single-movie-thumbnail'),
		]);
		lazyLoadFunc();
		window.removeEventListener('scroll', lazyLoadFunc);
		window.addEventListener('scroll', lazyLoadFunc);
	}

	render() {
		return `
			<ul id="movies-list" data-render="_movieItemsLi">
			</ul>
		`;
	}

	afterRender() {}
}
