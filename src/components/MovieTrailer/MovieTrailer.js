import ComponentDOM from '../ComponentDOM/ComponentDOM';
import likeSVG from '../../images/like.svg';
import dislikeSVG from '../../images/dislike.svg';
import dateSVG from '../../images/date.svg';
import questionMarkSVG from '../../images/questionMark.svg';
import globalVariable from '../../js/globalVariable';

import './MovieTrailer.scss';

export default class MovieTrailer {
	constructor(movie, elem) {
		this.movie = movie;
		this.elem = elem;
	}

	static setTrailerElem() {
		MovieTrailer.trailerElem = document.getElementById('movie-trailer-inline');
	}

	openTrailer() {
		MovieTrailer.removeTrailer();
		this.appendTrailer();
	}

	static removeTrailer() {
		MovieTrailer.setTrailerElem();
		if (MovieTrailer.trailerElem) {
			MovieTrailer.trailerElem.parentNode.removeChild(MovieTrailer.trailerElem);
		}
		let trailerBgElem = document.getElementById('movie-trailer-bg');
		if (trailerBgElem) {
			trailerBgElem.parentNode.removeChild(trailerBgElem);
		}
	}

	appendTrailer() {
		if (MovieTrailer.openedTrailerEventCode !== this.movie.EventCode) {
			MovieTrailer.openedTrailerEventCode = this.movie.EventCode;
			let elemParent = document.getElementById('movies-list');
			let elemIndex = [...elemParent.children].indexOf(this.elem);
			let moviePerRow = Math.round(elemParent.clientWidth / this.elem.clientWidth);
			elemParent.insertBefore(
				ComponentDOM.createElementFromHTML(this.renderTrailerElem(this.movie)),
				elemParent.children[elemIndex - (elemIndex % moviePerRow)],
			);
			this.removeTrailerOpenedClass('remove');
			this.elem.classList.add('trailer-opened');
			MovieTrailer.setTrailerElem();
			this.setBgImage();
			this.setVideoDimensions();
			this.scrollToTrailer();
		} else {
			this.elem.classList.remove('trailer-opened');
			MovieTrailer.removeTrailer();
		}
	}

	removeTrailerOpenedClass(type) {
		this.elem.parentNode.childNodes.forEach(child => {
			child.classList.remove('trailer-opened');
		});
	}

	scrollToTrailer() {
		window.scrollTo(
			0,
			MovieTrailer.trailerElem.offsetTop - document.getElementById('header').clientHeight,
		);
	}
	videoDimensions() {
		let trailerIframe = document.getElementById('movie-trailer-iframe');
		if (trailerIframe) {
			let width = trailerIframe.clientWidth;
			trailerIframe.setAttribute('width', width);
			trailerIframe.setAttribute('height', (9 * width) / 16);
		}
	}

	setVideoDimensions() {
		this.videoDimensions();
		window.removeEventListener('resize', this.videoDimensions);
		window.addEventListener('resize', this.videoDimensions);
	}

	createDate(movie) {
		let date = new Date(movie.ShowDate);
		return `
			<div class="trailer-date display-flex">
				<div class="trailer-date-icon trailer-meta-icon">
					${dateSVG}
				</div>
				<div class="trailer-date-details">
					<div class="trailer-day-month trailer-meta-large">
						${date.getDate()} ${globalVariable.MONTHS[date.getMonth()]}</span>
					</div>
					<div class="trailer-full-year trailer-meta-small">
						${date.getFullYear()}
					</div>
				</div>
			</div>`;
	}
	setBgImage() {
		let image = globalVariable.EVENT_IMAGE_URL + this.movie.EventCode + '.jpg';
		document.body.insertBefore(
			ComponentDOM.createElementFromHTML(
				`<div id="movie-trailer-bg" style="background-image:url(${image})"></div>`,
			),
			document.body.childNodes[0],
		);
	}

	listGenre(genres) {
		genres = genres.split('|');
		return genres
			.map(genre => {
				return `
				<li>${genre}</li>
			`;
			})
			.join(' ');
	}

	renderTrailerElem(movie) {
		let trailerUrl = movie.TrailerURL;
		trailerUrl = trailerUrl.match(/(\?|\&)([^=]+)\=([^&]+)/g)[0];
		let embedUrl = trailerUrl.substring(trailerUrl.indexOf('v=') + 2);
		return `
		<li id="movie-trailer-inline">
			<div class="movie-trailer-content display-flex">

				<div class="movie-trailer-video">
				<iframe width="" height="" id="movie-trailer-iframe"
					src="https://www.youtube.com/embed/${embedUrl}">
				</iframe>
				</div>

				<div class="movie-trailer-details">

					<div class="trailer-title">
						${movie.EventTitle}
					</div>
					<div class="trailer-language">
						${movie.EventLanguage}
					</div>
					<ul class="trailer-genre">
						${this.listGenre(movie.EventGenre)}
					</ul>

					<div class="trailer-meta display-flex">

						<div class="trailer-rating display-flex">
							<div class="trailer-like-icon trailer-meta-icon">${likeSVG}</div>
							<div class="trailer-like">
								<div class="trailer-rating-perc trailer-meta-large">
									${movie.ratings.wtsPerc}%
								</div>
								<div class="trailer-count trailer-meta-small">
									${movie.ratings.totalWTSCount} votes
								</div>
							</div>
						</div>

						${this.createDate(movie)}

					</div><!-- .trailer-meta  -->

					<div class="trailer-description"></div>
					<div class="trailer-user-input">
						<ul class="trailer-user-watch display-flex">
							<li class="trailer-user-input-value trailer-user-will-watch">
								<div class="trailer-user-input-val-inner">
									<span class="trailer-user-input-icon">${likeSVG}</span>
									<span class="trailer-user-input-text">Will Watch</span>
									<span class="trailer-user-input-count">(9838)</span>
								</div>
							</li>
							<li class="trailer-user-input-value trailer-user-maybe">
								<div class="trailer-user-input-val-inner">
									<span class="trailer-user-input-icon">${questionMarkSVG}</span>
									<span class="trailer-user-input-text">May Be</span>
									<span class="trailer-user-input-count">(25)</span>
								</div>
							</li>
							<li class="trailer-user-input-value trailer-user-wont-watch">
								<div class="trailer-user-input-val-inner">
									<span class="trailer-user-input-icon">${dislikeSVG}</span>
									<span class="trailer-user-input-text">Wont Watch</span>
									<span class="trailer-user-input-count">(434)</span>
								</div>
							</li>
						</ul>
					</div><!-- .trailer-user-input -->

				</div><!-- .movie-trailer-details-->

			</div><!-- .movie-trailer-content-->
		</li>
		`;
	}
}
MovieTrailer.openedTrailerEventCode = null;
