import axios from 'axios';
import globalVariable from '../js/globalVariable';

export default {
	movieListData: {},
	getMovieList() {
		return axios
			.get('/api/movies.json')
			.then(res => {
				this.movieListData = res.data;
				return true;
			})
			.catch(err => {
				console.error(res.err);
			});
	},
};
