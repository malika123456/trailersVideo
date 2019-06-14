import './SingleMovie.scss';
import MovieTrailer from '../MovieTrailer/MovieTrailer';
import globalVariable from '../../js/globalVariable';

import likeSVG from '../../images/like.svg';
import playSVG from '../../images/play.svg';

export default class SingleMovie {
	constructor(movie) {
		this.movie = movie;
	}

	createDate(movie) {
		let date = new Date(movie.ShowDate);
		return `
			<div class="single-movie-date display-flex">
				<span>${date.getDate()}</span>
				<span>${globalVariable.MONTHS[date.getMonth()]}</span>
			</div>`;
	}

	bindMovieItemEvents() {
		let moviesLoaded = document.querySelectorAll('.movie-item');
		let crrMovieLoaded = moviesLoaded[moviesLoaded.length - 1];
		this.bindTrailerOpenEvent(crrMovieLoaded);
		this.bindImageLoadEvent(crrMovieLoaded);
	}

	bindTrailerOpenEvent(movie) {
		movie.addEventListener('click', event => {
			let target = event.target;
			let movieSelected = target.closest('.movie-item');
			if (movieSelected) {
				let trailer = new MovieTrailer(this.movie, movieSelected);
				trailer.openTrailer();
			}
		});
	}

	bindImageLoadEvent(movie) {
		movie.querySelector('.single-movie-thumbnail').addEventListener('load', event => {
			let singleMovieElem = movie.querySelector('.single-movie');
			setTimeout(() => {
				singleMovieElem.classList.add('lazy-load');
			});
		});
	}

	render() {
		let movie = this.movie;
		return `
			<div class="single-movie">

				<div class="single-movie-content">
					${this.createDate(movie)}

					<div class="single-movie-img">
						<img data-src="${globalVariable.EVENT_IMAGE_URL +
							movie.EventCode +
							'.jpg'}" class="single-movie-thumbnail"/>
					</div>

					<div class="single-movie-play-btn-wrapper">
						<button class="single-movie-play-btn">
							${playSVG}
						</button>
					</div>

					<div class="single-movie-rating">
						<div class="single-movie-like display-flex">
							<div class="single-movie-like-icon">${likeSVG}</div>
							<div class="single-movie-like-perc">${movie.ratings.wtsPerc}%</div>
						</div>
						<div class="single-movie-count">${movie.ratings.totalWTSCount} votes</div>
					</div>

				</div>

				<div class="single-movie-title">
					${movie.EventTitle}
				</div>

			</div>
		`;
	}

	afterRender() {
		this.bindMovieItemEvents();
	}
}
